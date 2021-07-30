import React, { useState, memo } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import colors from '@/config/colors';
import { Label } from '@/components';

import {
  StyledContainer as StyledMainContainer,
  StyledRow
} from '@/helpers/commonStyles';

import arroz from '../../assets/images/arroz.jpg';
import feijao from '../../assets/images/feijao.jpeg';
import acucar from '../../assets/images/acucar.jpg';
import maca from '../../assets/images/maca.jpg';
import banana from '../../assets/images/banana.jpg';
import sal from '../../assets/images/sal.png';

const Products = ({ onHandleSaveProduct }) => {
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
      id: 5,
      name: 'Arroz branco fino 1kg',
      image: arroz,
      price: '1,85',
      category: {
        categoryId: 2,
        categoryName: 'Alimentos'
      }
    },
    {
      id: 6,
      name: 'Sal tradicional 1kg',
      image: sal,
      price: '2,85',
      category: {
        categoryId: 2,
        categoryName: 'Alimentos'
      }
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

        <StyledTouchableOpacity
          onPress={() => {
            onHandleSaveProduct({ item });
          }}
        >
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
          key={item => item.id}
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
  background-color: ${colors.BUTTON_ADD};
`;

Products.defaultProps = {
  onHandleSaveProduct: () => {}
};

Products.propTypes = {
  onHandleSaveProduct: PropTypes.func
};

export default memo(Products);
