import React, { memo } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import colors from '@/config/colors';
import Label from '@/components/Label';

const CardQuickSearch = ({ icon, name, onPress }) => (
  <StyledContainer>
    <StyledTouchableOpacity onPress={onPress}>
      <StyledImage source={icon} resizeMode='cover' />
      <Label
        textAlign='center'
        fontWeight={400}
        fontSize={11}
        color={colors.COLOR_TEXT_TRANSACTION}
        lineHeight={18}
        marginTop={15}
      >
        {name}
      </Label>
    </StyledTouchableOpacity>
  </StyledContainer>
);

const StyledContainer = styled.View`
  flex: 1;
  margin-right: 8px;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  elevation: 10;
  box-shadow: 0px 1px 25px ${colors.CARD_BACKGROUND_SHADOW};
  background-color: ${colors.WHITE};
`;

const StyledImage = styled.Image`
  width: 35px;
  height: 35px;
`;

const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 91px;
  height: 120px;
  justify-content: center;
  align-items: center;
`;

CardQuickSearch.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      testUri: PropTypes.string
    })
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default memo(CardQuickSearch);
