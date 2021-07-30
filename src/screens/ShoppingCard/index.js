import React, { memo, useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROCERY_KEY } from '@/helpers/constants/storageKeys';

import colors from '@/config/colors';
import spacings from '@/config/spacings';

import { Label, Select } from '@/components';
import Header from '@/components/Header';
import Loading from '@/components/Loading';

import {
  pickupOptions,
  paymentOptions,
  cpfOptions
} from '@/helpers/functions/utils';
import { PICKUP_STORE, CASH, NAO } from '@/helpers/constants/common';

import {
  StyledContainer as StyledMainContainer,
  StyledRow
} from '@/helpers/commonStyles';

import EmptyList from '@/components/RenderEmptyList';

const ShoppingCard = () => {
  const { isFocused } = useIsFocused();
  const [listProducts, setListProducts] = useState([]);
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(PICKUP_STORE);
  const [selectedFilterPayment, setSelectedFilterPayment] = useState(CASH);
  const [selectedFilterCpf, setSelectedFilterCpf] = useState(NAO);

  const onGoBack = () => goBack();

  const handleSelectFilter = useCallback(valueSelected => {
    setSelectedFilter(valueSelected);
  }, []);

  const handleSelectFilterPayment = useCallback(valueSelected => {
    setSelectedFilterPayment(valueSelected);
  }, []);

  const handleSelectFilterCPF = useCallback(valueSelected => {
    setSelectedFilterCpf(valueSelected);
  }, []);

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
                {item?.price}
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
            showBackButton
            backgroundColor={colors.PRIMARY}
            backButtonColor={colors.COLOR_WHITE}
            onBackPress={onGoBack}
            isFocused={isFocused}
            slim={false}
            countProducts={listProducts.length}
          />

          <StyledMainContainer>
            {isLoading ? (
              <>
                <StyledViewAlert>
                  <Label
                    textAlign='center'
                    fontWeight={500}
                    fontSize={13}
                    color={colors.DARK_TEXT}
                  >
                    Em 10 horas este carrinho será esvaziado
                  </Label>
                </StyledViewAlert>
                <StyledScrollView>
                  <StyledMainContainer paddingLeft={8} paddingRight={8}>
                    <StyledFlatList
                      data={listProducts}
                      key={item => item.id}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => renderItem(item)}
                    />

                    <StyledViewFooter>
                      <StyledTouchableHighlight onPress={onGoBack}>
                        <Label
                          textAlign='center'
                          fontWeight={600}
                          fontSize={14}
                          color={colors.WHITE}
                        >
                          Continuar comprando
                        </Label>
                      </StyledTouchableHighlight>
                    </StyledViewFooter>

                    <StyledCustomRow
                      paddingLeft={16}
                      paddingRight={16}
                      marginBottom={15}
                    >
                      <Label
                        textAlign='center'
                        fontWeight={600}
                        fontSize={14}
                        color={colors.DARK_TEXT}
                      >
                        Forma de envio
                      </Label>
                      <StyledRow>
                        <StyledSelect>
                          <Select
                            value={selectedFilter}
                            items={pickupOptions}
                            onValueChange={handleSelectFilter}
                            backgroundColor={colors.WHITE}
                            elevation={10}
                          />
                        </StyledSelect>
                      </StyledRow>

                      <Label
                        textAlign='center'
                        fontWeight={600}
                        fontSize={14}
                        color={colors.DARK_TEXT}
                        marginTop={15}
                      >
                        Forma de pagamento
                      </Label>
                      <StyledRow>
                        <StyledSelect>
                          <Select
                            value={selectedFilterPayment}
                            items={paymentOptions}
                            onValueChange={handleSelectFilterPayment}
                            backgroundColor={colors.WHITE}
                            elevation={10}
                          />
                        </StyledSelect>
                      </StyledRow>

                      <Label
                        textAlign='center'
                        fontWeight={600}
                        fontSize={14}
                        color={colors.DARK_TEXT}
                        marginTop={15}
                      >
                        CPF Nota??
                      </Label>
                      <StyledRow>
                        <StyledSelect>
                          <Select
                            value={selectedFilterCpf}
                            items={cpfOptions}
                            onValueChange={handleSelectFilterCPF}
                            backgroundColor={colors.WHITE}
                            elevation={10}
                          />
                        </StyledSelect>
                      </StyledRow>
                    </StyledCustomRow>

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
                          R$ 0,00
                        </Label>
                      </StyledTotal>
                    </StyledContainerTotal>

                    <StyledTouchableHighlight onPress={onGoBack}>
                      <Label
                        textAlign='center'
                        fontWeight={600}
                        fontSize={14}
                        color={colors.WHITE}
                      >
                        Finalizar a compra
                      </Label>
                    </StyledTouchableHighlight>
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

const StyledViewAlert = styled.View`
  width: 100%;
  height: 40px;
  background: ${colors.ALERT_SHOPPING_CARD};
  justify-content: center;
  align-items: center;
`;

const StyledContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.WHITE};
  border-bottom-width: 1;
  border-bottom-color: ${colors.COLOR_GRAY};
  margin-bottom: 5px;
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

const StyledSelect = styled.View`
  flex: 1;
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
`;

const StyledViewFooter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background: ${colors.WHITE};
`;

const StyledCustomRow = styled(StyledRow)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: ${colors.WHITE};
  padding: 10px;
`;

const StyledContainerTotal = styled.View`
  flex: 1;
  background: ${colors.WHITE};
  margin-bottom: 20px;
  padding: 10px;
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
`;

export default memo(ShoppingCard);
