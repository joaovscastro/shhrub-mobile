import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const FriendIcon = () => {
  return (
    <Svg width="67" height="67" fill="none" viewBox="0 0 67 67">
      <Rect
        width="55.833"
        height="55.833"
        x="5.583"
        y="5.583"
        fill="#699FF3"
        opacity="0.3"
        rx="10"
      ></Rect>
      <Path
        fill="#699FF3"
        fillRule="evenodd"
        d="M17.219 45.91a2.792 2.792 0 004.645 3.097c3.23-4.846 7.042-7.132 11.636-7.132 4.594 0 8.406 2.286 11.636 7.132a2.792 2.792 0 104.645-3.097c-4.214-6.322-9.708-9.619-16.28-9.619-6.573 0-12.068 3.297-16.282 9.619z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default FriendIcon;
