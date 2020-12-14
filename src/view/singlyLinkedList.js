import React from 'react';
import { Rectangle, Text, ArrowedLines } from '../svg';
import { UNSELECTED, WRITE, READ } from './color';
import { read } from '../data_structures/type/operation_types';

function SinglyLinkedList({ data, x, y, width, height, highlight, operation }) {
  highlight = new Set([highlight]);
  const len = data.length;
  const gap = (width - x) / (len * 2);//默认间隔的距离和一个格子长度相等
  const min = Math.min(height, gap);//调整高度和宽度 因为长方形很丑
  const rectangleWidth = min;
  const rectangleHeight = min;
  const rectangleGap = min;

  const rectangles = getRectangles(data, highlight, x, y, rectangleWidth, rectangleHeight, rectangleGap, operation);
  const texts = getTexts(rectangles, data);

  return (
    <>
      {rectangles}
      {texts}
      <ArrowedLines data={rectangles} mode={'END'}/>
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

function getRectangles(data, highlight, x, y, width, height, gap, operation) {
  const rectangles = [];

  for (let i = 0; i < data.length; ++i) {
    rectangles.push(
      <Rectangle 
        key={i}
        x={x + i * (gap + width)}
        y={y}
        width={width}
        height={height}
        fill={highlight.has(i) ? (operation === read ? READ : WRITE) : UNSELECTED}
      />
    );
  }

  return rectangles;
}

export default SinglyLinkedList;
