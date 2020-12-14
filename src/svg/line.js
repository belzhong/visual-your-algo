import React from 'react';

function Line(props) {
  const {a, b} = props;
  const isHorizontal = (a.y === b.y);
  const line = {stroke: 'black'};

  if (isHorizontal) {
    line.y1 = line.y2 = a.y + a.height / 2;
    line.x1 = a.x + a.width;
    line.x2 = b.x;
    line.strokeWidth = a.height / 9;
  } else {
    line.x1 = a.x + a.width / 2;
    line.y1 = a.y + a.height / 2;
    line.x2 = b.x + b.width / 2;
    line.y2 = b.y + b.height / 2;
    line.strokeWidth = b.width / 20;
  }

  return (<line {...line}/>);}

export default Line;
