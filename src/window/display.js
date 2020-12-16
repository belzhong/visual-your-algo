import React from 'react';
import { useSelector } from 'react-redux';
import { dataType } from '../data_structures/attribute/attributes';
import {
  binaryTreeHead, 
  mAryTreeHead, 
  singlyLinkedListHead,
  vector,
  matrix,
  map,
  set
} from '../data_structures/type/data_structure_types';
import { 
  SinglyLinkedList,
  MAryTree,
  Vector,
  Matrix,
  VuaSet,
  VuaMap,
  BinaryTree
} from '../view';
import Control from './control';

function Display({snapshot, width, x, y}) {
  const innerHeight = useSelector(start => start.panel.height);
  const layerNumber = getNumberOfLayers(snapshot);
  const layerHeigth = layerNumber === 0 ? 0 : (innerHeight - y) / (layerNumber * 2);
  const layers = constructEachLayer(snapshot, x, y, width, layerHeigth);
  return (
    <>
      <svg viewBox={`0 0 ${width} ${innerHeight}`}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
            markerWidth="3" markerHeight="3"
            orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        { layers }
      </svg>
      <div 
        style={{width:width}}
        id='control-panel'>
        <Control/>
      </div>
    </>
  );
}

function constructEachLayer(snapshot, x, y, width, layerHeigth) {
  if (snapshot === undefined) { return 0; }
  const data = snapshot.data;
  const layers = [];
  let validLayer = 0;
  for (let i = 0; i < data.length; ++i) {
    const layer = data[i];
    const type = snapshot[dataType][i];
    const highlight = (i === snapshot.index ? snapshot.highlight : null);
    const operation = (i === snapshot.index ? snapshot.operation: null);
    if (layer !== null) {
      switch(type) {
        case vector: {
          layers.push(
            <Vector 
              key={i}
              data={layer}
              x={x}
              y={y + layerHeigth * validLayer}
              width={width}
              height={layerHeigth}
              highlight={highlight}
              operation={operation}
            />
          );
          validLayer += 2;
          break;
        }
        case mAryTreeHead: {
          layers.push(
            <MAryTree
              key={i}
              data={layer}
              x={x}
              y={y + layerHeigth * validLayer}
              width={width}
              height={layerHeigth}
              highlight={highlight}
              operation={operation}
            />
          );
          validLayer += layer.length * 2 + 1;
          break;
        }
        case binaryTreeHead: {
          layers.push(
            <BinaryTree
              key={i}
              data={layer}
              x={x}
              y={y + layerHeigth * validLayer}
              width={width}
              height={layerHeigth}
              highlight={highlight}
              operation={operation}
            />
          );
          validLayer += layer.length * 2 + 1;
          break;
        }
        case matrix: {
          layers.push(
            <Matrix 
              key={i}
              data={layer}
              x={x}
              y={y + layerHeigth * validLayer}
              width={width}
              height={layerHeigth}
              highlight={highlight}
              operation={operation}
            />
          );
          validLayer += layer.length + 1;
          break;
        }
        case singlyLinkedListHead: {
          layers.push(
            <SinglyLinkedList
              key={i}
              data={layer}
              x={x}
              y={y + layerHeigth * validLayer}
              width={width}
              height={layerHeigth}
              highlight={highlight}
              operation={operation}
            />
          );
          validLayer += 2;
          break;
        }
        case set: {
          layers.push(
            <VuaSet
              key={i}
              data={layer}
              x={x}
              y={y + layerHeigth * validLayer}
              width={width}
              height={layerHeigth}
              highlight={highlight}
              operation={operation}
            />
          );
          validLayer += 2;
          break;
        }
        case map: {
          layers.push(
            <VuaMap
              key={i}
              data={layer}
              x={x}
              y={y + layerHeigth * validLayer}
              width={width}
              height={layerHeigth}
              highlight={highlight}
              operation={operation}
            />
          );
          validLayer += 2;
          break;
        }
        default: {
          break;
        }
      }
    }
  }
  return layers;
}

function getNumberOfLayers(snapshot) {
  if (snapshot === undefined) {
    return 0;
  }
  let num = 0;
  const data = snapshot.data;
  for (let i = 0; i < data.length; ++i) {
    const type = snapshot[dataType][i];
    if (type === vector || type === singlyLinkedListHead || type === map || type === set) {
      ++num;
    } else if (type === matrix || type === binaryTreeHead || type === mAryTreeHead) {
      num += data[i].length;
    }
  }

  return num;
}

export default Display;
