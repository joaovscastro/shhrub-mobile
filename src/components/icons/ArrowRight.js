import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ArrowRight = () => {
  return (
    <Svg width="12" height="20" fill="none" viewBox="0 0 12 20">
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1.75 18.5l8.5-8.5-8.5-8.5"
      ></Path>
    </Svg>
  );
};

export default ArrowRight;
