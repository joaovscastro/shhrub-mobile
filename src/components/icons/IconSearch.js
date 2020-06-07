import React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconSearch = () => {
  return (
    <Svg width="64" height="68" fill="none" viewBox="0 0 64 68">
      <Path
        fill="#699FF3"
        d="M41.29 49.995c-1.498-1.562-1.498-4.095 0-5.657a3.721 3.721 0 015.42 0l15.334 16c1.497 1.562 1.497 4.095 0 5.657a3.721 3.721 0 01-5.421 0l-15.334-16z"
        opacity="0.3"
      ></Path>
      <Path
        fill="#699FF3"
        fillRule="evenodd"
        d="M0 27.708c0 15.303 12.405 27.709 27.708 27.709 15.303 0 27.709-12.406 27.709-27.709C55.417 12.405 43.01 0 27.708 0 12.405 0 0 12.405 0 27.708zm47.5 0C47.5 38.64 38.639 47.5 27.708 47.5c-10.93 0-19.791-8.861-19.791-19.792 0-10.93 8.86-19.791 19.791-19.791 10.93 0 19.792 8.86 19.792 19.791z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default IconSearch;
