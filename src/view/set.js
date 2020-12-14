import React from 'react';
import Vector from './vector';

function VuaSet({ data, x, y, width, height, highlight }) {
  data = ['Set', ...data];
  return (
    <Vector 
      data={data}
      x={x}
      y={y}
      width={width}
      height={height}
      highlight={data.indexOf(highlight)}
    />
  );
}

export default VuaSet;
