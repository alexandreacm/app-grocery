import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const App = () => {
  return (
    <View>
      <Icon name='arrow-left' size={24} color='#000' />
      <StyledLabel>HOME</StyledLabel>
    </View>
  );
};

const StyledLabel = styled.Text`
  font-family: 'Poppins-ExtraBold';
  font-size: 15px;
  text-align: center;
`;
