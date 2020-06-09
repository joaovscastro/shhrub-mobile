import React from 'react';
import Svg, { Path } from 'react-native-svg';

const RemoveIcon = () => {
  return (
    <Svg width="25" height="25" fill="none" viewBox="0 0 28 28">
      <Path
        fill="#000"
        d="M7 9.333v14.834a1.5 1.5 0 001.5 1.5h11a1.5 1.5 0 001.5-1.5V9.333H7z"
      ></Path>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M16.333 5.25V4.5a1 1 0 00-1-1h-2.666a1 1 0 00-1 1v.75H6.333a.5.5 0 00-.5.5v.75a.5.5 0 00.5.5h15.334a.5.5 0 00.5-.5v-.75a.5.5 0 00-.5-.5h-5.334z"
        clipRule="evenodd"
        opacity="0.3"
      ></Path>
    </Svg>
  );
};

export default RemoveIcon;
