import React, { memo, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  useNavigation,
  useIsFocused,
  CommonActions
} from '@react-navigation/native';
import styled from 'styled-components/native';

import { Label, Button, Modal } from '@/components';

import colors from '@/config/colors';
import fontSizes from '@/config/fonts';

import StatusBarColor from '@/config/StatusBarColor';

import { StyledContainer as StyledMainContainer } from '@/helpers/commonStyles';

import signal from '@/assets/animations/no-wifi-signal.gif';
import imgBackGround from '@/assets/images/imgBackGround.png';
import checkMark from '@/assets/animations/signal.json';

const NoInternet = () => {
  const { dispatch } = useNavigation();
  const isFocused = useIsFocused();
  const [showModal, setShowModal] = useState(false);
  const { isConnected } = useNetInfo();

  const onTryAgain = () => {
    if (!isConnected) {
      setShowModal(true);
    } else {
      dispatch(CommonActions.goBack());
    }
  };

  return (
    <>
      <Modal
        visible={showModal}
        confirm={() => {
          setShowModal(false);
        }}
        centeredButtons
        justConfirmButton
        confirmLabel='OK'
        description='Sem conexão com a internet.'
        withAnimation
        targetAnimation={checkMark}
      />
      {isFocused && <StatusBarColor backgroundColor={colors.PRIMARY} />}
      <StyledMainContainer
        justifyContent='center'
        backgroundColor={colors.WHITE}
      >
        <StyledImageBackground source={imgBackGround} resizeMode='contain'>
          <StyledNoInternetImg source={signal} />
        </StyledImageBackground>

        <Label
          textAlign='center'
          fontSize={fontSizes.REGULAR}
          fontWeight={500}
          lineHeight={24}
          marginTop={40}
          marginBottom={44}
        >
          Ops! Sem internet
        </Label>
        <StyledViewButton>
          <Button width={241} height={48} onPress={onTryAgain}>
            Tentar novamente
          </Button>
        </StyledViewButton>
      </StyledMainContainer>
    </>
  );
};

const StyledViewButton = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledNoInternetImg = styled.Image`
  width: 194px;
  height: 194px;
`;

const StyledImageBackground = styled.ImageBackground`
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
`;

export default memo(NoInternet);
