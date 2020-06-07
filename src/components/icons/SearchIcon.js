import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = () => {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <Path
        stroke="#939393"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
      ></Path>
    </Svg>
  );
};

export default SearchIcon;
