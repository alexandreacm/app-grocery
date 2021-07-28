import React from 'react';
import PropTypes from 'prop-types';
import { SliderBox } from 'react-native-image-slider-box';
import colors from '@/config/colors';

import { StyledContainer as StyledMainContainer } from '@/helpers/commonStyles';

const SliderMarketing = ({ items }) => {
  return (
    <StyledMainContainer>
      <SliderBox
        images={items}
        sliderBoxHeight={150}
        dotColor={colors.WHITE}
        inactiveDotColor='#90A4AE'
        paginationBoxVerticalPadding={10}
        autoplay
        circleLoop
        resizeMethod='resize'
        resizeMode='cover'
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 0,
          padding: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingVertical: 10
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: 'rgba(128, 128, 128, 0.92)'
        }}
        ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
        imageLoadingColor='#2196F3'
      />
    </StyledMainContainer>
  );
};

SliderMarketing.defaultProps = {
  items: []
};

SliderMarketing.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      image: PropTypes.node
    })
  )
};

export default SliderMarketing;
