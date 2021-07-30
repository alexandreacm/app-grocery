import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '@/components/Header';

import colors from '@/config/colors';
import spacings from '@/config/spacings';

import { GROCERY_KEY } from '@/helpers/constants/storageKeys';

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
  const [listProducts, setListProducts] = useState([]);
  const { navigate } = useNavigation();

  const onOpenShoppingCard = useCallback(() => {
    navigate('shopping-card');
  }, [navigate]);

  const loadProductsStorage = useCallback(async () => {
    try {
      const productsStorage = await AsyncStorage.getItem(GROCERY_KEY);

      if (productsStorage != null) {
        setListProducts(JSON.parse(productsStorage));
      }
    } catch (error) {
      Alert.alert(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadProductsStorage();
    })();
  }, [loadProductsStorage]);

  const onHandleSaveProduct = useCallback(
    async item => {
      try {
        setListProducts([...listProducts, item]);
        await AsyncStorage.setItem(GROCERY_KEY, JSON.stringify(listProducts));
        Alert.alert(`Item adicionado ao carrinho com sucesso`);
      } catch (error) {
        Alert.alert(error);
      }
    },
    [listProducts]
  );

  return (
    <>
      <Header
        leftIcon
        backgroundColor={colors.PRIMARY}
        backButtonColor={colors.COLOR_WHITE}
        isFocused={isFocused}
        slim={false}
        countProducts={listProducts.length}
        onOpenShoppingCard={onOpenShoppingCard}
      />

      <HeaderTitle />

      <StyledMainContainer marginLeft={10} marginRight={10}>
        <StyledScrollView showsVerticalScrollIndicator={false}>
          <SliderMarketing items={images} />
          <Products onHandleSaveProduct={onHandleSaveProduct} />
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
