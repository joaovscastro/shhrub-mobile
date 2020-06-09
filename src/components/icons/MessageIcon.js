import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MessageIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="66"
      height="66"
      fill="none"
      viewBox="0 0 66 66"
    >
      <Path
        fill="#699FF3"
        fillRule="evenodd"
        d="M62.46 51.392a.5.5 0 00.854-.355l-.053-14.998V15.197a6.947 6.947 0 00-6.948-6.947h-32.42a6.947 6.947 0 00-6.948 6.947v9.553H41a3 3 0 013 3v15.237h10.055l8.406 8.405z"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="#699FF3"
        fillRule="evenodd"
        d="M5.459 49.5V35.75a5.5 5.5 0 015.5-5.5h22a5.5 5.5 0 015.5 5.5V49.5a5.5 5.5 0 01-5.5 5.5H11.277l-4.9 4.69a.5.5 0 01-.846-.36v-8.938a5.54 5.54 0 01-.072-.892zM16.5 39a.5.5 0 01.5-.5h15.5a.5.5 0 01.5.5v1.75a.5.5 0 01-.5.5H17a.5.5 0 01-.5-.5V39zm8.75 5a.5.5 0 00-.5.5v1.75a.5.5 0 00.5.5h7.25a.5.5 0 00.5-.5V44.5a.5.5 0 00-.5-.5h-7.25z"
        clipRule="evenodd"
        opacity="0.3"
      ></Path>
    </Svg>
  );
};

export default MessageIcon;
