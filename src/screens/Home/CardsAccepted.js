import React, { memo } from 'react';
import styled from 'styled-components/native';

import colors from '@/config/colors';
import { Label } from '@/components';

import {
  StyledContainer as StyledMainContainer,
  StyledRow,
  StyledCard
} from '@/helpers/commonStyles';

import icBrandsCard from '../../assets/images/icBrandsCard.png';

const QuickSearch = () => {
  return (
    <StyledMainContainer>
      <StyledHeader>
        <Label
          width='100%'
          fontSize={15}
          color={colors.DARK_TEXT}
          lineHeight={20}
          fontWeight={600}
          marginLeft={8}
        >
          Aceitamos estes cartões
        </Label>
      </StyledHeader>
      <StyledRow paddingRight={8} paddingLeft={8}>
        <StyledCustomCard>
          <StyledImage source={icBrandsCard} />
        </StyledCustomCard>
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

const StyledImage = styled.Image`
  width: 265px;
  height: 96px;
`;

const StyledCustomCard = styled(StyledCard)`
  background: #fff;
  justify-content: center;
  align-items: center;
`;

export default memo(QuickSearch);
