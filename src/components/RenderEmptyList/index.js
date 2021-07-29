import React from 'react';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import PropTypes from 'prop-types';

import spacings from '@/config/spacings';

import Label from '@/components/Label';
import noMovies from '../../assets/animations/empty-list.json';

const RenderEmptyList = ({ textMessage, Icon }) => (
  <StyledEmptyListContainer>
    <StyledLottie source={Icon || noMovies} autoPlay loop />
    <Label
      textAlign='center'
      fontWeight={500}
      fontSize={18}
      marginTop={-spacings.LARGE}
    >
      {textMessage}
    </Label>
  </StyledEmptyListContainer>
);

const StyledEmptyListContainer = styled.View`
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
`;

const StyledLottie = styled(Lottie)`
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;
`;

RenderEmptyList.defaultProps = {
  textMessage: '',
  Icon: ''
};

RenderEmptyList.propTypes = {
  textMessage: PropTypes.string,
  Icon: PropTypes.node
};

export default RenderEmptyList;
