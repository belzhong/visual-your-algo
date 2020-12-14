import React from 'react';
import Vector from './vector';

function Matrix({ data, x, y, width, height, highlight, operation }) {
  const gap = (width - x) / data[0].length;//允许的格子长度
  const min = Math.min(height, gap);//调整高度和宽度 因为长方形很丑
  const matrix = [];
  for (let i = 0; i < data.length; ++i) {
    const row = data[i];
    matrix.push(
      <Vector 
        key={i}
        data={row}
        x={x}
        y={y + min * i}
        width={width}
        height={min}
        highlight={highlight === null ? -1 : (highlight.row === i ? highlight.col : -1)}
        operation={operation}
      />
    );
  }

  return (
    <>
      {matrix}
    </>
  );
}

export default Matrix;
