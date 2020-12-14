import { vuaVariable } from '../variable.js';
import { getRandomIntegerArray, getRandomInteger } from './random.js';
import { snapshots } from '../snapshot/snapshot.js';

function swap(data, a, b) {
  const tmp = data[a].value;
  data[a].value = data[b].value;
  data[b].value = tmp;
}

function partition(data, lo, hi) {
  const pivot = lo;

  for (let i = lo + 1; i < hi; ++i) {
    if (data[i].value < data[pivot].value) {
      swap(data, i, ++lo);
    }
  }
  swap(data, pivot, lo);

  return lo;
}

function quickSort(data, lo = 0, hi = data.length) {
  if (lo < hi) {
    const pivot = partition(data, lo, hi);
    quickSort(data, lo, pivot);
    quickSort(data, pivot + 1, hi);
  }
}

const data = getRandomIntegerArray(getRandomInteger(5, 20)).map(value => new vuaVariable(value));
quickSort(data);

snapshots.forEach(snapshot => console.log(...snapshot.data));
