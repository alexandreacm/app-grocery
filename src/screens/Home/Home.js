import React from 'react';
import styled from 'styled-components/native';
import { useIsFocused } from '@react-navigation/native';

import Label from '@/components/Label';
import Header from '@/components/Header';

import colors from '@/config/colors';

import { StyledContainer as StyledMainContainer } from '@/helpers/commonStyles';

const Home = () => {
  const { isFocused } = useIsFocused();

  return (
    <>
      <Header
        leftIcon
        backgroundColor={colors.PRIMARY}
        backButtonColor={colors.COLOR_WHITE}
        isFocused={isFocused}
        title='Super Nacional'
        slim={false}
      />
      <StyledMainContainer>
        <Label>HOME</Label>
      </StyledMainContainer>
    </>
  );
};

export default Home;
