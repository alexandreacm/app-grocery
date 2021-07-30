import React, { memo, useEffect, useState, useCallback } from 'react';
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

import EmptyList from '@/components/RenderEmptyList';

const ShoppingCard = () => {
  const { isFocused } = useIsFocused();
  const [listProducts, setListProducts] = useState([]);
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const onGoBack = () => goBack();

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
                    color={colors.WHITE}
                  >
                    Em 10 horas este carrinho será esvaziado
                  </Label>
                </StyledViewAlert>
                <StyledScrollView>
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
                        color={colors.DARK_TEXT}
                      >
                        Continuar comprando
                      </Label>
                    </StyledTouchableHighlight>
                  </StyledViewFooter>
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
  width: 250px;
  border-width: 1;
  border-color: ${colors.DANGER};
  padding: 5px;
  border-radius: 10px;
`;

const StyledViewFooter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default memo(ShoppingCard);
