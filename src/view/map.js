import React from 'react';
import Vector from './vector';

function VuaMap({ data, x, y, width, height, highlight, operation }) {
  console.log(findHighlight(data, highlight));
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
  for (let i = 0; i < data.length; ++i) {
    if (data[i][0] === highlight) {
      return i + 1;
    }
  } 
  return -1;
}

export default VuaMap;
