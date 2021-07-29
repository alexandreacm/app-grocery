import React, { memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import colors from '@/config/colors';
import StatusBarColor from '@/config/StatusBarColor';
import Label from '@/components/Label';

import imgLogo from '@/assets/images/logo_50.png';

const Header = ({
  showBackButton,
  onBackPress,
  slim,
  backgroundColor,
  backButtonColor,
  isFocused,
  leftIcon,
  title,
  countProducts
}) => {
  const { navigate } = useNavigation();
  return (
    <>
      <StyledSafeArea backgroundColor={backgroundColor} />
      {isFocused && (
        <StatusBarColor backgroundColor={backgroundColor} isPrimaryColorDark />
      )}
      <StyledContainer backgroundColor={backgroundColor} slim={slim}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress}>
            <Icon name='arrow-back' size={26} color={backButtonColor} />
          </TouchableOpacity>
        ) : (
          <>
            <Image source={imgLogo} width={30} height={30} />
            <Label
              textAlign='center'
              fontWeight={400}
              fontSize={14}
              color={colors.WHITE}
            >
              {title}
            </Label>
          </>
        )}

        {leftIcon ? (
          <>
            {countProducts > 0 ? (
              <StyledIconTouchableOpacity
                backgroundColor={backButtonColor}
                testID='right-icon'
                onPress={() => {
                  navigate('shopping-card');
                }}
              >
                <Icon name='shopping-cart' size={25} color={backButtonColor} />
                <StyledViewCountProducts>
                  <Label
                    textAlign='center'
                    fontWeight={500}
                    fontSize={13}
                    color={colors.WHITE}
                  >
                    {countProducts}
                  </Label>
                </StyledViewCountProducts>
              </StyledIconTouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ width: 20 }}
                testID='right-icon'
                onPress={() => {
                  navigate('shopping-card');
                }}
              >
                <Icon name='shopping-cart' size={25} color={backButtonColor} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <Label />
        )}
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.View`
  width: 100%;
  height: ${({ slim }) => (slim ? 48 : 56)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledSafeArea = styled.SafeAreaView`
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledIconTouchableOpacity = styled.TouchableOpacity`
  width: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledViewCountProducts = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 15.5;
  background: ${colors.DANGER};
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-left: 20px;
  margin-top: -25px;
  z-index: 9999;
`;

Header.defaultProps = {
  onBackPress: () => {},
  slim: false,
  showBackButton: false,
  backgroundColor: colors.PRIMARY,
  backButtonColor: colors.WHITE,
  isFocused: true,
  leftIcon: false,
  title: 'Rede Nacional',
  countProducts: 0
};

Header.propTypes = {
  onBackPress: PropTypes.func,
  slim: PropTypes.bool,
  showBackButton: PropTypes.bool,
  backgroundColor: PropTypes.string,
  backButtonColor: PropTypes.string,
  isFocused: PropTypes.bool,
  leftIcon: PropTypes.bool,
  title: PropTypes.string,
  countProducts: PropTypes.number
};

export default memo(Header);
