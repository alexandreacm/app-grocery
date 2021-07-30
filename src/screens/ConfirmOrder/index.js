import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROCERY_KEY } from '@/helpers/constants/storageKeys';

import colors from '@/config/colors';
import spacings from '@/config/spacings';

import { Label } from '@/components';
import Header from '@/components/Header';
import Loading from '@/components/Loading';

import {
  StyledContainer as StyledMainContainer,
  StyledRow
} from '@/helpers/commonStyles';

import { maskFormatMoney } from '@/helpers/functions/masks';

import EmptyList from '@/components/RenderEmptyList';

const ShoppingCard = () => {
  const { isFocused } = useIsFocused();
  const [listProducts, setListProducts] = useState([]);
  const { goBack, navigate } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const onGoBack = () => goBack();

  const OnNavigateOrders = () => navigate('finish-order');

  const calculateTotalShopping = useMemo(() => {
    try {
      let totalAux = 0;

      if (listProducts.length > 0) {
        listProducts.map(({ item: { price, qtd } }) => {
          totalAux += price * qtd;
        });
      }

      setTotal(totalAux);
    } catch (error) {
      Alert.alert(error.message);
    }

    return maskFormatMoney(total);
  }, [total, listProducts]);

  const renderItem = ({ item }) => {
    return (
      <StyledContent>
        <StyledImage source={item?.image} resizeMode='contain' />
        <StyledContentCenter>
          <StyledProductName>
            <Label
              fontSize={14}
              color={colors.DARK_TEXT}
              lineHeight={20}
              fontWeight={600}
            >
              {item?.name}
            </Label>
            <StyledProductPrice>
              <Label
                fontSize={14}
                color={colors.DARK_TEXT}
                lineHeight={20}
                fontWeight={400}
              >
                {maskFormatMoney(item?.price)}
              </Label>
            </StyledProductPrice>
            <StyledProductPrice>
              <Label
                fontSize={14}
                color={colors.DARK_TEXT}
                lineHeight={20}
                fontWeight={400}
              >
                Quantidade items: {item?.qtd}
              </Label>
            </StyledProductPrice>
          </StyledProductName>
        </StyledContentCenter>
      </StyledContent>
    );
  };

  const loadItemsCard = useCallback(() => {
    try {
      setIsLoading(true);

      AsyncStorage.getItem(GROCERY_KEY).then(itemsStorage => {
        if (itemsStorage != null && itemsStorage !== undefined)
          setListProducts(JSON.parse(itemsStorage));
      });
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error);
    }
  }, []);

  useEffect(() => {
    loadItemsCard();
  }, [loadItemsCard]);

  return (
    <>
      {!isLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            leftIcon
            title='Confirmar pedido'
            showBackButton
            backgroundColor={colors.PRIMARY}
            backButtonColor={colors.COLOR_WHITE}
            onBackPress={onGoBack}
            isFocused={isFocused}
            slim={false}
            countProducts={listProducts.length}
          />

          <StyledMainContainer backgroundColor={colors.WHITE}>
            {isLoading ? (
              <>
                <StyledScrollView>
                  <StyledMainContainer
                    paddingLeft={8}
                    paddingRight={8}
                    paddingBottom={40}
                  >
                    <StyledFlatList
                      data={listProducts}
                      key={item => item.id}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => renderItem(item)}
                    />

                    <StyledContainerConfirm>
                      <StyledSubTotal>
                        <Label
                          textAlign='center'
                          fontWeight={600}
                          fontSize={14}
                          color={colors.DARK_TEXT}
                        >
                          Forma Pagamento:
                        </Label>
                        <Label
                          textAlign='center'
                          fontWeight={400}
                          fontSize={12}
                          color={colors.DARK_TEXT}
                        >
                          Dinheiro
                        </Label>
                      </StyledSubTotal>

                      <StyledSubTotal>
                        <Label
                          textAlign='center'
                          fontWeight={600}
                          fontSize={14}
                          color={colors.DARK_TEXT}
                        >
                          CPF Nota??:
                        </Label>
                        <Label
                          textAlign='center'
                          fontWeight={400}
                          fontSize={12}
                          color={colors.DARK_TEXT}
                        >
                          Não
                        </Label>
                      </StyledSubTotal>
                    </StyledContainerConfirm>

                    <StyledContainerTotal>
                      <StyledSubTotal>
                        <Label
                          textAlign='center'
                          fontWeight={600}
                          fontSize={14}
                          color={colors.DARK_TEXT}
                        >
                          Sub Total:
                        </Label>
                        <Label
                          textAlign='center'
                          fontWeight={400}
                          fontSize={12}
                          color={colors.DARK_TEXT}
                        >
                          R$ 0,00
                        </Label>
                      </StyledSubTotal>

                      <StyledSubTotal>
                        <Label
                          textAlign='center'
                          fontWeight={600}
                          fontSize={14}
                          color={colors.DARK_TEXT}
                        >
                          Frete:
                        </Label>
                        <Label
                          textAlign='center'
                          fontWeight={400}
                          fontSize={12}
                          color={colors.DARK_TEXT}
                        >
                          R$ 0,00
                        </Label>
                      </StyledSubTotal>

                      <StyledTotal>
                        <Label
                          textAlign='center'
                          fontWeight={600}
                          fontSize={16}
                          lineHeight={30}
                          color={colors.DARK_TEXT}
                        >
                          Total:
                        </Label>
                        <Label
                          textAlign='center'
                          fontWeight={600}
                          fontSize={16}
                          lineHeight={30}
                          color={colors.DARK_TEXT}
                        >
                          {calculateTotalShopping}
                        </Label>
                      </StyledTotal>

                      <StyledTouchableHighlight onPress={OnNavigateOrders}>
                        <Label
                          textAlign='center'
                          fontWeight={600}
                          fontSize={14}
                          color={colors.WHITE}
                        >
                          FINALIZAR COMPRA
                        </Label>
                      </StyledTouchableHighlight>
                    </StyledContainerTotal>
                  </StyledMainContainer>
                </StyledScrollView>
              </>
            ) : (
              <StyledRow>
                <EmptyList textMessage='Seu carrinho está vazio' />
              </StyledRow>
            )}
          </StyledMainContainer>
        </>
      )}
    </>
  );
};

const StyledContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.WHITE};
  padding: 10px;
`;

const StyledContentCenter = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
`;

const StyledProductName = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const StyledProductPrice = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

const StyledImage = styled.Image`
  width: 65px;
  height: 65px;
`;

const StyledFlatList = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingLeft: spacings.EXTRA_SMALL,
    paddingRight: spacings.EXTRA_SMALL
  }
})`
  flex: 1;
`;

const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingTop: 20,
    paddingLeft: spacings.EXTRA_SMALL,
    paddingRight: spacings.EXTRA_SMALL
  }
})`
  flex: 1;
`;

const StyledTouchableHighlight = styled.TouchableOpacity`
  flex: 1;
  border-width: 1;
  border-color: ${colors.WHITE};
  background: ${colors.PRIMARY};
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
`;

const StyledContainerConfirm = styled.View`
  flex: 1;
  background: ${colors.WHITE};
  padding: 10px;
  border-top-width: 1;
  border-top-color: ${colors.LINE};
  justify-content: center;
`;

const StyledContainerTotal = styled.View`
  flex: 1;
  background: ${colors.WHITE};
  padding: 10px;
  margin-bottom: 20px;
  border-top-width: 1;
  border-top-color: ${colors.LINE};
`;

const StyledSubTotal = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledTotal = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
`;

export default memo(ShoppingCard);
