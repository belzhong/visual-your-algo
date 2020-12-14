import randomInteger from './randomInteger';

function randomIntegerArray(n = randomInteger(5, 20), lo = 0, hi = n * 10) {
  const data = new Array(n);

  for (let i = 0; i < n; ++i) {
    data[i] = randomInteger(lo, hi);
  }
  
  return data;
}

export default randomIntegerArray;
