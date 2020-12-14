import React from 'react';
import Line from './line';

function Lines({data}) {
  const lines = [];

  for (let i = 1; i < data.length; ++i) {
    lines.push(<Line key={i} a={data[i - 1].props} b={data[i].props}/>);
  }

  return lines;
}

export default Lines;
