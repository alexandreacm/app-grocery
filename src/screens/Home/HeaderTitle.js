import React from 'react';
import styled from 'styled-components/native';

import colors from '@/config/colors';
import Label from '@/components/Label';

import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderTitle = () => (
  <StyledViewTitle>
    <Icon name='shopping-basket' size={16} color={colors.DANGER} />
    <Label
      textAlign='center'
      fontSize={14}
      fontWeight={400}
      color={colors.DANGER}
      marginLeft={10}
    >
      Mercado Online
    </Label>
  </StyledViewTitle>
);

const StyledViewTitle = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  border-bottom-width: 0.8;
  border-bottom-color: ${colors.DANGER};
`;

export default HeaderTitle;
