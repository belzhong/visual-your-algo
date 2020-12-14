import React from 'react';
import Vector from './vector';

function VuaMap({ data, x, y, width, height, highlight, operation }) {
  return (
    <Vector 
      data={['Map', ...data.map(val => val.join(': '))]}
      x={x}
      y={y}
      width={width}
      height={height}
      highlight={findHighlight(data, highlight)}
      operation={operation}
    />
  );
}

function findHighlight(data, highlight) {
  for (let i = 1; i < data.length; ++i) {
    if (data[i][0] === highlight) {
      return i;
    }
  } 
  return -1;
}

export default VuaMap;
