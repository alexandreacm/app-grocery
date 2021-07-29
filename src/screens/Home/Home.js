import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';

import Header from '@/components/Header';

import colors from '@/config/colors';
import spacings from '@/config/spacings';

import { StyledContainer as StyledMainContainer } from '@/helpers/commonStyles';

import SliderMarketing from './SliderMarketing';
import QuickSearch from './QuickSearch';
import CardsAccepted from './CardsAccepted';
import DiscountProduct from './DiscountProduct';
import HeaderTitle from './HeaderTitle';
import Products from './Products';

import slider1 from '../../assets/images/sliders/slider1.jpg';
import slider2 from '../../assets/images/sliders/slider2.png';
import slider3 from '../../assets/images/sliders/slider3.jpg';

const Home = () => {
  const { isFocused } = useIsFocused();
  const [images] = useState([slider1, slider2, slider3]);
  return (
    <>
      <Header
        leftIcon
        backgroundColor={colors.PRIMARY}
        backButtonColor={colors.COLOR_WHITE}
        isFocused={isFocused}
        title='Rede Nacional'
        slim={false}
      />

      <HeaderTitle />

      <StyledMainContainer marginLeft={10} marginRight={10}>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <SliderMarketing items={images} />
          <Products />
          <DiscountProduct />
          <QuickSearch />
          <CardsAccepted />
        </StyledScrollView>
      </StyledMainContainer>
    </>
  );
};

const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 5,
    paddingBottom: spacings.LARGE,
    paddingLeft: spacings.EXTRA_SMALL,
    paddingRight: spacings.EXTRA_SMALL,
    backgroundColor: colors.COLOR_GRAY
  }
})`
  flex: 1;
`;

export default Home;
