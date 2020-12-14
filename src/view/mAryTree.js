import React from 'react';
import { Rectangle, Text, Line } from '../svg';
import { parentIndex } from '../data_structures/attribute/attributes';
import { UNSELECTED, WRITE, READ } from './color';
import { read } from '../data_structures/type/operation_types';

function MAryTree({  data, x, y, width, height, highlight, operation}) {
  const tree = getRectangleTree(data, x, y, width, height, highlight === null ? {row: -1, col: -1} : highlight, operation);
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
  const tree = [[getRootNode(x, y, width, height, highlight.row === 0 ? (operation === read ? READ : WRITE) : UNSELECTED)]];
  let previousWidth = height;

  for (let i = 1; i < data.length; ++i) {
    const layer = data[i];
    const averageWidth = (width - x) / layer.length;
    const rectangleWidth = Math.min(previousWidth, averageWidth);
    const rectangleHeight = rectangleWidth;
    const gap = (width - x - rectangleWidth * layer.length) / (layer.length + 1);
    const layerHeight = y + height * i * 2;
    const rectangles = getLayerRectangles(layer, x, layerHeight, rectangleWidth, rectangleHeight, gap, 
      highlight.row === i ? highlight.col : -1,
      operation);
    tree.push(rectangles);
    previousWidth = rectangleWidth;
  }

  return tree;
}

function getLayerRectangles(layer, x, y, width, height, gap, highlight, operation) {
  const rectangles = [];

  for (let i = 0; i < layer.length; ++i) {
    rectangles.push(
      <Rectangle
        x={gap + x + i * (width + gap)}
        y={y}
        width={width}
        height={height}
        fill={highlight === i ? (operation === read ? READ : WRITE) : UNSELECTED}
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
      x={x / 2 + middlePoint - halfWidth}
      y={y}
      width={rectangleWidth}
      height={rectangleHeight}
      fill={fill}
    />);
}

export default MAryTree;
