import React, { useState } from 'react';
import styled from 'styled-components/native';

import colors from '@/config/colors';
import { Label } from '@/components';

import {
  StyledContainer as StyledMainContainer,
  StyledRow,
  StyledCard
} from '@/helpers/commonStyles';

import arroz from '../../assets/images/arroz.jpg';
import feijao from '../../assets/images/feijao.jpeg';
import acucar from '../../assets/images/acucar.jpg';
import maca from '../../assets/images/maca.jpg';
import banana from '../../assets/images/banana.jpg';

const DiscountProduct = () => {
  const [discountProducts] = useState([
    {
      id: 1,
      name: 'Açucar União 1kg',
      image: acucar,
      price: '1,20',
      category: {
        categoryId: 2,
        categoryName: 'Alimentos'
      }
    },
    {
      id: 2,
      name: 'Feijão Carioca 1kg',
      image: feijao,
      price: '1,45',
      category: {
        categoryId: 2,
        categoryName: 'Alimentos'
      }
    },
    {
      id: 3,
      name: 'Maça pera 1kg',
      image: maca,
      price: '1,20',
      category: {
        categoryId: 1,
        categoryName: 'HortiFruti'
      }
    },
    {
      id: 4,
      name: 'Banana',
      image: banana,
      price: '1.70',
      category: {
        categoryId: 1,
        categoryName: 'HortiFruti'
      }
    },
    {
      id: 4,
      name: 'Arroz branco fino 1kg',
      image: arroz,
      price: '1,85',
      category: {
        categoryId: 2,
        categoryName: 'Alimentos'
      }
    }
  ]);

  return (
    <StyledMainContainer marginTop={20}>
      <StyledHeader>
        <Label
          width='100%'
          fontSize={15}
          color={colors.DARK_TEXT}
          lineHeight={20}
          fontWeight={600}
          marginLeft={8}
        >
          Produtos com superdesconto
        </Label>
      </StyledHeader>

      <StyledRow>
        <StyledScrollView horizontal>
          {discountProducts.map(item => {
            return (
              <StyledCustomCard marginLeft={8}>
                <StyledImage source={item?.image} />
                <Label
                  fontSize={12}
                  color={colors.DARK_TEXT}
                  lineHeight={20}
                  fontWeight={400}
                  marginTop={10}
                >
                  {item.name}
                </Label>
                <Label
                  textAlign='left'
                  fontSize={12}
                  color={colors.DARK_TEXT}
                  lineHeight={20}
                  fontWeight={600}
                >
                  R$ {item.price} /un
                </Label>

                <StyledTouchableOpacity backgroundColor='#F79E1B'>
                  <Label
                    textAlign='left'
                    fontSize={12}
                    color={colors.WHITE}
                    lineHeight={20}
                    fontWeight={500}
                  >
                    Adicionar
                  </Label>
                </StyledTouchableOpacity>
              </StyledCustomCard>
            );
          })}
        </StyledScrollView>
      </StyledRow>
    </StyledMainContainer>
  );
};

const StyledHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledCustomCard = styled(StyledCard)`
  background: ${colors.WHITE};
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 70px;
  height: 70px;
`;

const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingLeft: 8,
    paddingRight: 8
  }
})`
  flex: 1;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 10px;
  elevation: 10;
  box-shadow: ${`0px 1px 25px ${colors.CARD_BACKGROUND_SHADOW}`};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.COLOR_GRAY};
`;

export default DiscountProduct;
