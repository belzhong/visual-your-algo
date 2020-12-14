import React from 'react';

function Rectangle(props) {
  //x, y, width, height, fill
  return <rect {...props} strokeWidth={1} stroke={'black'} ></rect>;
}

export default Rectangle;
