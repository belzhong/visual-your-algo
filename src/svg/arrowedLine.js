import React from 'react';

export const END = 'END';
export const START = 'START';
export const BIDIRECTION = 'BIDIRECTION';

function ArrowedLine(props) {
  const {a, b, mode} = props;
  const line = {stroke: 'black'};
  // const isHorizontal = (a.y === b.y);
  // if (isHorizontal) {
  const arrowLength = (b.x - a.x - a.width) / 5;
  line.y1 = line.y2 = a.y + a.height / 2;
  line.x1 = a.x + a.width + (mode !== END ? arrowLength : 0);
  line.x2 = b.x - (mode !== START ? arrowLength : 0);
  line.strokeWidth = a.height / 9;
  // } else {
  //   line.x1 = a.x + a.height;
  //   line.y1 = a.y + a.width / 2;
  //   line.x2 = b.x;
  //   line.y2 = b.y + b.width / 2;
  //   line.lineWidth = b.width / 9;
  //   line.arrowLength = (Math.sqrt((line.x1 - line.x2) ** 2 + (line.y1 - line.y2) ** 2)) / 5;
  // }

  if (mode !== START) {
    line.markerEnd = 'url(#arrow)';
  }
  if (mode !== END) {
    line.markerStart = 'url(#arrow)';
  }
  return (<line {...line}/>);
}

export default ArrowedLine;
