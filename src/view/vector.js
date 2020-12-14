import React from 'react';
import { Rectangle, Text } from '../svg';
import { UNSELECTED, WRITE, READ } from './color';
import { read } from '../data_structures/type/operation_types';

function Vector({ data, x, y, width, height, highlight, operation }) {
  highlight = new Set([highlight]);
  const len = data.length;
  const gap = (width - x) / len;//允许的格子长度
  const min = Math.min(height, gap);//调整高度和宽度 因为长方形很丑
  const rectangleWidth = min;
  const rectangleHeight = min;
  const rectangles = getRectangles(data, highlight, x, y, rectangleWidth, rectangleHeight, operation);
  const texts = getTexts(rectangles, data);

  return (
    <>
      {rectangles}
      {texts}
    </>
  );
}

function getTexts(rectangles, data) {
  const texts = [];

  for (let i = 0; i < data.length; ++i) {
    texts.push(<Text 
      key={i}
      data={rectangles[i].props}
      text={data[i]}
    />)
  }

  return texts;
}

function getRectangles(data, highlight, x, y, width, height, operation) {
  const rectangles = [];

  for (let i = 0; i < data.length; ++i) {
    rectangles.push(
      <Rectangle 
        key={i}
        x={x + i * width}
        y={y}
        width={width}
        height={height}
        fill={highlight.has(i) ? (operation === read ? READ : WRITE) : UNSELECTED}
      />
    );
  }

  return rectangles;
}

export default Vector;
