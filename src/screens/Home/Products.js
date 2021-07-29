import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';

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

const Products = () => {
  const [discountProducts] = useState([
    {
      id: 1,
      name: 'Açucar União 1kg',
      image: acucar,
      price: '1,20'
    },
    {
      id: 2,
      name: 'Feijão Carioca 1kg',
      image: feijao,
      price: '1,45'
    },
    {
      id: 3,
      name: 'Maça pera 1kg',
      image: maca,
      price: '1,20'
    },
    {
      id: 4,
      name: 'Banana',
      image: banana,
      price: '1.70'
    },
    {
      id: 5,
      name: 'Arroz branco fino 1kg',
      image: arroz,
      price: '1,85'
    },
    {
      id: 5,
      name: 'Arroz integral 1kg',
      image: arroz,
      price: '2,85'
    }
  ]);

  const renderItem = ({ item }) => (
    <StyledViewContent>
      <StyledCustomCard>
        <StyledImage source={item?.image} resizeMode='contain' />
        <Label
          fontSize={12}
          color={colors.DARK_TEXT}
          lineHeight={20}
          fontWeight={400}
        >
          {item?.name}
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
    </StyledViewContent>
  );

  return (
    <StyledMainContainer marginTop={20}>
      <StyledRow>
        <FlatList
          data={discountProducts}
          keyExtractor={item => item.id}
          numColumns={2}
          renderItem={renderItem}
        />
      </StyledRow>
    </StyledMainContainer>
  );
};

const StyledViewContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.WHITE};
`;

const StyledCustomCard = styled.View`
  flex: 1;
  background: ${colors.WHITE};
  margin-left: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 60px;
  height: 60px;
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

export default Products;
