import React, { memo } from 'react';
import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types';

import themeColors from '@/config/colors';

import { StyledSelectContainer } from '@/helpers/commonStyles';

const Select = ({
  items,
  onValueChange,
  value,
  backgroundColor,
  width,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  elevation
}) => (
  <StyledSelectContainer
    width={width}
    marginTop={marginTop}
    marginBottom={marginBottom}
    marginLeft={marginLeft}
    marginRight={marginRight}
    paddingTop={paddingTop}
    paddingBottom={paddingBottom}
    paddingRight={paddingRight}
    paddingLeft={paddingLeft}
    backgroundColor={backgroundColor}
    elevation={elevation}
  >
    <Picker
      mode='dropdown'
      selectedValue={value}
      onValueChange={onValueChange}
      dropdownIconColor={themeColors.PRIMARY_TEXT}
    >
      {items.map(item => (
        <Picker.Item
          fontFamily='Poppins-Bold'
          color={themeColors.SELECT_TEXT_COLOR}
          key={item.value}
          label={item.label.toUpperCase()}
          value={item.value}
        />
      ))}
    </Picker>
  </StyledSelectContainer>
);

Select.defaultProps = {
  width: 'auto',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 8,
  paddingRight: 8,
  items: [],
  onValueChange: () => {},
  value: undefined,
  backgroundColor: themeColors.SELECT_BACKGROUND_COLOR,
  elevation: 0
};

Select.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  backgroundColor: PropTypes.string,
  elevation: PropTypes.number,
  onValueChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string
    })
  )
};

export default memo(Select);
