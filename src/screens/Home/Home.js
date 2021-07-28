import React, { useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';

import Label from '@/components/Label';
import Header from '@/components/Header';

import colors from '@/config/colors';
import spacings from '@/config/spacings';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { StyledContainer as StyledMainContainer } from '@/helpers/commonStyles';

import SliderMarketing from './SliderMarketing';
import QuickSearch from './QuickSearch';
import CardsAccepted from './CardsAccepted';
import DiscountProduct from './DiscountProduct';

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
      <StyledMainContainer marginLeft={10} marginRight={10}>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <SliderMarketing items={images} />
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

const StyledViewTitle = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  border-bottom-width: 0.8;
  border-bottom-color: ${colors.DANGER};
`;

export default Home;
