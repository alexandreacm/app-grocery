import React from 'react';
import { ActivityIndicator } from 'react-native';

import themeColors from '@/config/colors';
import { StyledContainer } from './styles';

export const Loading = () => (
  <StyledContainer>
    <ActivityIndicator size='large' color={themeColors.PRIMARY} />
  </StyledContainer>
);
