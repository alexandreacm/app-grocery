import React, { useCallback, useMemo, memo } from 'react';
import { ActionSheetIOS, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Label from '@/components/Label';

import themeColors from '@/config/colors';

import { StyledSelectContainer } from '@/helpers/commonStyles';

const Select = ({
  itens,
  onValueChange,
  value,
  width,
  backgroundColor,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight
}) => {
  const handleOpenIosSheet = useCallback(() => {
    const labels = itens.map(({ label }) => label);
    labels.unshift('Cancelar');

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: labels,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex !== 0) {
          onValueChange(itens[buttonIndex - 1].value, buttonIndex - 1);
        }
      }
    );
  }, [itens, onValueChange]);

  const itemLabel = useMemo(() => {
    return itens.find(item => item.value === value)?.label;
  }, [itens, value]);

  return (
    <StyledSelectContainer
      width={width}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      backgroundColor={backgroundColor}
    >
      <TouchableOpacity onPress={handleOpenIosSheet}>
        <Label fontSize={14} fontWeight={500} color={themeColors.MUTED_TEXT}>
          {itemLabel}
        </Label>
      </TouchableOpacity>
    </StyledSelectContainer>
  );
};

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
  itens: [],
  onValueChange: () => {},
  value: undefined,
  backgroundColor: themeColors.SELECT_BACKGROUND_COLOR
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
  onValueChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  itens: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string
    })
  )
};

export default memo(Select);
