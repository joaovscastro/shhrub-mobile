import React from 'react';
import Svg, { Path } from 'react-native-svg';

const VerifiedSealBig = () => {
  return (
    <Svg width="15" height="15" fill="none" viewBox="0 0 20 20">
      <Path
        fill="#2196F3"
        d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0z"
      ></Path>
      <Path
        fill="#FAFAFA"
        d="M15.068 7.88l-5.416 5.417a.831.831 0 01-1.179 0L5.765 10.59a.832.832 0 111.178-1.178l2.12 2.119 4.827-4.827a.832.832 0 111.178 1.178z"
      ></Path>
    </Svg>
  );
};

export default VerifiedSealBig;
