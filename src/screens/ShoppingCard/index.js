import React, { memo, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROCERY_KEY } from '@/helpers/constants/storageKeys';

import colors from '@/config/colors';
import { Label } from '@/components';

import Header from '@/components/Header';

import {
  StyledContainer as StyledMainContainer,
  StyledRow
} from '@/helpers/commonStyles';

import EmptyList from '@/components/RenderEmptyList';

const ShoppingCard = () => {
  const { isFocused } = useIsFocused();
  const [itemsCard, setItemsCard] = useState([]);
  const { goBack } = useNavigation();

  const loadItemsCard = () => {
    try {
      AsyncStorage.getItem(GROCERY_KEY).then(itemsStorage => {
        if (itemsStorage != null && itemsStorage !== undefined)
          setItemsCard(JSON.parse(itemsStorage));
      });
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    loadItemsCard();
  }, []);

  return (
    <>
      <Header
        leftIcon
        showBackButton
        backgroundColor={colors.PRIMARY}
        backButtonColor={colors.COLOR_WHITE}
        onBackPress={() => {
          goBack();
        }}
        isFocused={isFocused}
        slim={false}
        countProducts={itemsCard.length}
      />
      <StyledMainContainer>
        {itemsCard.length ? (
          <StyledViewAlert>
            <Label
              textAlign='center'
              fontWeight={500}
              fontSize={13}
              color={colors.WHITE}
            >
              Em 10 horas este carrinho será eszaziado
            </Label>
          </StyledViewAlert>
        ) : (
          <StyledRow>
            <EmptyList textMessage='Seu carrinho está vazio' />
          </StyledRow>
        )}
      </StyledMainContainer>
    </>
  );
};

const StyledViewAlert = styled.View`
  width: 100%;
  height: 40px;
  background: ${colors.ALERT_SHOPPING_CARD};
  justify-content: center;
  align-items: center;
`;

export default memo(ShoppingCard);
