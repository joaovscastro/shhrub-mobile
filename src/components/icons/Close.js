import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Close = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      fill="none"
      viewBox="0 0 35 35"
    >
      <Path
        fill="#090909"
        fillRule="evenodd"
        d="M17.5 35C27.165 35 35 27.165 35 17.5S27.165 0 17.5 0 0 7.835 0 17.5 7.835 35 17.5 35z"
        clipRule="evenodd"
        opacity="0.5"
      ></Path>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M12.639 11.154a1 1 0 00-1.415 0l-.07.07a1 1 0 000 1.415l4.861 4.861-4.861 4.861a1 1 0 000 1.415l.07.07a1 1 0 001.415 0l4.86-4.861 4.862 4.861a1 1 0 001.415 0l.07-.07a1 1 0 000-1.415L18.985 17.5l4.861-4.861a1 1 0 000-1.415l-.07-.07a1 1 0 00-1.415 0L17.5 16.015l-4.861-4.861z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default Close;
