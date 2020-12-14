import { vuaVector } from '../vector.js';
import { getRandomIntegerArray, getRandomInteger } from './random.js';
import { snapshots } from '../snapshot/snapshot.js';

function swap(data, a, b) {
  const tmp = data[a];
  data[a] = data[b];
  data[b] = tmp;
}

function partition(data, lo, hi) {
  const pivot = lo;

  for (let i = lo + 1; i < hi; ++i) {
    if (data[i] < data[pivot]) {
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

const data = new vuaVector(...getRandomIntegerArray(getRandomInteger(5, 20)));
quickSort(data);
const data1 = new vuaVector(...getRandomIntegerArray(getRandomInteger(5, 20)));
quickSort(data1);
snapshots.forEach(snapshot => console.log(snapshot));
