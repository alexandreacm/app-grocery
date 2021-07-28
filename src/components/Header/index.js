import React, { memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import colors from '@/config/colors';
import StatusBarColor from '@/config/StatusBarColor';
import Label from '@/components/Label';

import imgLogo from '@/assets/images/logo_50.png';

const Header = ({
  showBackButton,
  onBackPress,
  slim,
  backgroundColor,
  backButtonColor,
  isFocused,
  leftIcon,
  title
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
          <>
            <Image source={imgLogo} width={30} height={30} />
            <Label
              textAlign='center'
              fontWeight={400}
              fontSize={14}
              color={colors.WHITE}
            >
              {title}
            </Label>
          </>
        )}

        {leftIcon ? (
          <StyledIcon backgroundColor={backButtonColor} testID='right-icon'>
            <Icon name='shopping-cart' size={26} color={backButtonColor} />
          </StyledIcon>
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

const StyledIcon = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const StyledEmptyIcon = styled.View`
  width: 30px;
  height: 30px;
`;

Header.defaultProps = {
  onBackPress: () => {},
  slim: false,
  showBackButton: false,
  backgroundColor: colors.PRIMARY,
  backButtonColor: colors.WHITE,
  isFocused: true,
  leftIcon: false,
  title: ''
};

Header.propTypes = {
  onBackPress: PropTypes.func,
  slim: PropTypes.bool,
  showBackButton: PropTypes.bool,
  backgroundColor: PropTypes.string,
  backButtonColor: PropTypes.string,
  isFocused: PropTypes.bool,
  leftIcon: PropTypes.bool,
  title: PropTypes.string
};

export default memo(Header);
