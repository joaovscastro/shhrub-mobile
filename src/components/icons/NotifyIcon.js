import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const NotifyIcon = () => {
  return (
    <Svg width="22" height="29" fill="none" viewBox="0 0 22 29">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M9.45 27.956c0 .741.962 1.033 1.374.416l10.448-15.634a.75.75 0 00-.623-1.167H12.6V1.472c0-.741-.962-1.033-1.374-.417L.78 16.69a.75.75 0 00.623 1.167h8.048v10.099z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  );
};

export default NotifyIcon;
