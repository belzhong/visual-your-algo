import React from 'react';
import ArrowedLine from './arrowedLine';

function ArrowedLines({data, mode}) {
  const lines = [];

  for (let i = 1; i < data.length; ++i) {
    lines.push(<ArrowedLine key={i} a={data[i - 1].props} b={data[i].props} mode={mode}/>);
  }

  return lines;
}

export default ArrowedLines;
