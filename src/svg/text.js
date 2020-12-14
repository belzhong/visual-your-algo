import React from 'react';

function Text(props) {
  let {data, text} = props;
  if (text instanceof Object) {
    text = text.hasOwnProperty('show') ? text.show() : JSON.stringify(text);
  }
  const {x, y, width, height} = data;
  return (
    <text
      x={x + width / 4}
      y={y + 3 * height / 4}
      fontSize={height / 2}
      textLength={width / 2}
      lengthAdjust={'spacingAndGlyphs'}
    >{text}</text>
  );
}

export default Text;
