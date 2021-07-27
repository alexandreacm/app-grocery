import React from 'react';
import { ActivityIndicator } from 'react-native';

import { StyledContainer } from './styles';
import { theme } from '../../global/styles/theme';

export function Load() {
  return (
    <StyledContainer>
      <ActivityIndicator size='large' color={theme.colors.primary} />
    </StyledContainer>
  );
}
