import React, { memo, useMemo } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import colors from '@/config/colors';
import { Label, CardQuickSearch } from '@/components';

import { StyledContainer as StyledMainContainer } from '@/helpers/commonStyles';

import icImage1 from '../../assets/images/icImage1.png';
import icImage2 from '../../assets/images/icImage2.png';
import icImage6 from '../../assets/images/icImage6.png';
import icImage4 from '../../assets/images/icImage4.png';
import icImage5 from '../../assets/images/icImage5.png';
import icImage7 from '../../assets/images/icImage7.png';

const QuickSearch = () => {
  const { navigate } = useNavigation();

  const menuUP = useMemo(() => {
    const options = [
      {
        key: 1,
        name: 'Açougue e peixaria',
        icon: icImage1,
        onPress: () => navigate('Statement')
      },
      {
        key: 2,
        name: 'Bebidas',
        icon: icImage4,
        onPress: () => navigate('Report')
      },
      {
        key: 3,
        name: 'Bebidas Alcóolicas',
        icon: icImage2,
        onPress: () => navigate('SecondProof')
      }
    ];

    return options.map(item => (
      <CardQuickSearch
        key={item.name}
        name={item.name}
        icon={item.icon}
        onPress={item.onPress}
      />
    ));
  }, [navigate]);

  const menuDown = useMemo(() => {
    const options = [
      {
        key: 4,
        name: 'Bebê e infantil',
        icon: icImage6,
        onPress: () => navigate('Anticipation')
      },
      {
        key: 5,
        name: 'Doces e Biscoitos',
        icon: icImage5,
        onPress: () => navigate('Doubts')
      },
      {
        key: 6,
        name: 'Frios e Iogurtes',
        icon: icImage7,
        onPress: () => navigate('AttendantChannel')
      }
    ];

    return options.map(item => (
      <CardQuickSearch
        key={item.name}
        name={item.name}
        icon={item.icon}
        onPress={item.onPress}
      />
    ));
  }, [navigate]);

  return (
    <StyledMainContainer marginLeft={8}>
      <StyledHeader>
        <Label
          width='100%'
          fontSize={15}
          color={colors.DARK_TEXT}
          lineHeight={20}
          fontWeight={600}
        >
          Seção
        </Label>
        <Label
          width='100%'
          fontWeight={400}
          fontSize={15}
          color={colors.ACTION_DANGER}
          lineHeight={20}
          marginRight={8}
        >
          Ver Todas
        </Label>
      </StyledHeader>

      <StyledViewQuickSearch>{menuUP}</StyledViewQuickSearch>
      <StyledViewQuickSearch>{menuDown}</StyledViewQuickSearch>
    </StyledMainContainer>
  );
};

const StyledViewQuickSearch = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
`;

const StyledHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 10px;
`;

export default memo(QuickSearch);
