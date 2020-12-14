import React from 'react';
import { Rectangle, Text, Line } from '../svg';
import { parentIndex, binaryPosition } from '../data_structures/attribute/attributes';
import { UNSELECTED, WRITE, READ } from './color';
import { read } from '../data_structures/type/operation_types';

function BinaryTree({ data, x, y, width, height, highlight, operation }) {
  console.log(highlight);
  if (data.length === 0) { return null; }
  const tree = getRectangleTree(data, x, y, width, height, highlight === null ? {col: -1, row: -1} : highlight, operation);
  const texts = getTexts(data, tree);
  const lines = getLines(tree, data);
  return (
    <> 
      {
        lines
      }
      {
        tree
      }
      {
        texts
      }
    </>
  );
}

function getLines(tree, data) {
  const lines = [];

  for (let i = 1; i < tree.length; ++i) {
    for (let j = 0; j < tree[i].length; ++j) {
      const node = tree[i][j];
      const parent = tree[i-1][data[i][j][parentIndex]];
      lines.push(
        <Line 
          key={`${i} ${j}`}
          a={parent.props}
          b={node.props}
        />
      )
    }
  }

  return lines;
}

function getTexts(data, tree) {
  const texts = [];
  for (let i = 0; i < data.length; ++i) {
    for (let j = 0; j < data[i].length; ++j) {
      texts.push(<Text key={`${i} ${j}`} data={tree[i][j].props} text={data[i][j].value}/>)
    }
  }
  return texts;
}

function getRectangleTree(data, x, y, width, height, highlight, operation) {
  const tree = [[getRootNode(x, y, width, height, 
    (highlight.row === 0 && highlight.col === 0) ? (operation === read ? READ : WRITE) : UNSELECTED)]];

  let previousWidth = height;

  for (let i = 1; i < data.length; ++i) {
    const layer = data[i];
    const maxNodeNumber = 2 ** i;
    const averageWidth = (width - x) / maxNodeNumber;
    const rectangleWidth = Math.min(previousWidth, averageWidth);
    const rectangleHeight = rectangleWidth;
    const gap = (width - x - rectangleWidth * maxNodeNumber) / (maxNodeNumber + 1);
    const layerHeight = y + height * i * 2;
    const hi = (highlight.row === i ? highlight.col : -1);
    const rectangles = getLayerRectangles(layer, x, layerHeight, rectangleWidth, rectangleHeight, gap, hi, i);
    previousWidth = rectangleWidth;
    tree.push(rectangles);
  }
  return tree;
}

function getLayerRectangles(layer, x, y, width, height, gap, highlight, row, operation) {
  const rectangles = [];

  for (let i = 0; i < layer.length; ++i) {
    rectangles.push(
      <Rectangle
        key={`${row} ${i}`}
        x={gap + x + (layer[i][parentIndex] * 2 + (layer[i][binaryPosition] === 'left' ? 0 : 1)) * (width + gap)}
        y={y}
        width={width}
        height={height}
        fill={i === highlight ? (operation === read ? READ : WRITE) : UNSELECTED}
      />
    );
  }

  return rectangles;
}

function getRootNode(x, y, width, height, fill) {
  const rectangleWidth = Math.min(width, height);
  const rectangleHeight = rectangleWidth;
  const middlePoint = width / 2;
  const halfWidth = rectangleWidth / 2;
  return (
    <Rectangle
      key='0 0'
      x={x / 2 + middlePoint - halfWidth}
      y={y}
      width={rectangleWidth}
      height={rectangleHeight}
      fill={fill}
    />);
}

export default BinaryTree;
