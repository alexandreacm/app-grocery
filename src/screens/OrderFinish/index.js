import React from 'react';
import styled from 'styled-components/native';

import { useNavigation } from '@react-navigation/native';

import colors from '@/config/colors';

import { Label } from '@/components';
import Icon from 'react-native-vector-icons/FontAwesome';

import { StyledContainer as StyledMainContainer } from '@/helpers/commonStyles';

const OrderFinish = () => {
  const { navigate } = useNavigation();
  return (
    <StyledMainContainer
      justifyContent='center'
      paddingLeft={16}
      paddingRight={16}
    >
      <StyledViewIcon>
        <Icon name='check-circle' size={80} color={colors.ACTION_SUCCESS} />
      </StyledViewIcon>

      <Label
        textAlign='center'
        fontWeight={600}
        fontSize={25}
        lineHeight={30}
        color={colors.DARK_TEXT}
      >
        PEDIDO ENVIADO
      </Label>

      <Label
        textAlign='center'
        fontWeight={400}
        fontSize={14}
        color={colors.DARK_TEXT}
        marginTop={15}
        marginBottom={15}
      >
        O seu pedido será validado pelo mercado responsável.Acompanhe o status
        através do menu "Meus Pedidos"
      </Label>

      <StyledTouchableHighlight
        onPress={() => {
          navigate('Home');
        }}
      >
        <Label
          textAlign='center'
          fontWeight={600}
          fontSize={16}
          lineHeight={30}
          color={colors.WHITE}
        >
          MEUS PEDIDOS
        </Label>
      </StyledTouchableHighlight>
    </StyledMainContainer>
  );
};

const StyledTouchableHighlight = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background: ${colors.PRIMARY};
  padding: 10px;
  border-radius: 10px;
`;

const StyledViewIcon = styled.View`
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

export default OrderFinish;
