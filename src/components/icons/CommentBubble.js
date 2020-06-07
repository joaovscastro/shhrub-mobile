import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CommentBubble = () => {
  return (
    <Svg width="25" height="24" fill="none" viewBox="0 0 25 24">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.5"
        strokeWidth="2"
        d="M21.5 11.5a8.38 8.38 0 01-.9 3.8A8.5 8.5 0 0113 20a8.38 8.38 0 01-3.8-.9L3.5 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.38 8.38 0 0113 3h.5a8.48 8.48 0 018 8v.5z"
      ></Path>
    </Svg>
  );
};

export default CommentBubble;
