import React, { memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { theme } from '@/config';
import StatusBarColor from '@/config/StatusBarColor';

import imgLogo from '@/assets/images/logo.png';

const Header = ({
  showBackButton,
  onBackPress,
  slim,
  backgroundColor,
  backButtonColor,
  isFocused,
  leftIcon
}) => {
  return (
    <>
      <StyledSafeArea backgroundColor={backgroundColor} />
      {isFocused && (
        <StatusBarColor backgroundColor={backgroundColor} isPrimaryColorDark />
      )}
      <StyledContainer backgroundColor={backgroundColor} slim={slim}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress}>
            <Icon name='arrow-back' size={26} color={backButtonColor} />
          </TouchableOpacity>
        ) : (
          <Image source={imgLogo} width={32} height={32} />
        )}

        {leftIcon ? (
          <StyledIconContainer>
            <StyledIcon backgroundColor={backButtonColor} testID='right-icon'>
              <Icon name='shopping-cart' size={26} color={backButtonColor} />
            </StyledIcon>
            <StyledIcon />
          </StyledIconContainer>
        ) : (
          <StyledEmptyIcon />
        )}
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled.View`
  width: 100%;
  height: ${({ slim }) => (slim ? 48 : 56)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px 0px 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledSafeArea = styled.SafeAreaView`
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const StyledIconContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledIcon = styled.TouchableOpacity`
  width: 37px;
  height: 37px;
  justify-content: center;
  align-items: center;
  margin-right: 27px;
`;

const StyledEmptyIcon = styled.View`
  width: 37px;
  height: 37px;
`;

Header.defaultProps = {
  onBackPress: () => {},
  slim: false,
  showBackButton: false,
  backgroundColor: theme.colors.PRIMARY,
  backButtonColor: theme.colors.WHITE,
  isFocused: true,
  leftIcon: false
};

Header.propTypes = {
  onBackPress: PropTypes.func,
  slim: PropTypes.bool,
  showBackButton: PropTypes.bool,
  backgroundColor: PropTypes.string,
  backButtonColor: PropTypes.string,
  isFocused: PropTypes.bool,
  leftIcon: PropTypes.bool
};

export default memo(Header);
