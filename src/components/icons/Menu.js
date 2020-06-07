import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const Menu = () => {
  return (
    <Svg width="25" height="21" fill="none" viewBox="0 0 25 21">
      <Rect width="25" height="2.941" fill="#fff" rx="1"></Rect>
      <Rect width="17.647" height="2.941" y="8.824" fill="#fff" rx="1"></Rect>
      <Rect width="25" height="2.941" y="17.647" fill="#fff" rx="1"></Rect>
    </Svg>
  );
};

export default Menu;
