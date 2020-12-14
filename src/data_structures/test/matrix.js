import { vuaMatrix } from '../matrix.js';
import { getRandomIntegerArray, getRandomInteger } from './random.js';
import { snapshots } from '../snapshot/snapshot.js';

const data = new vuaMatrix(5, 5, 0);

for (let i = 0; i < data.length; ++i) {
  const row = getRandomIntegerArray(data[i].length);
  for (let j = 0; j < data[i].length; ++j) {
    data[i][j] = row[j];
  }
}

function printMatrix(matrix) {
  for (const row of matrix) {
    const buffer = [];
    for (const val of row) {
      buffer.push(val);
    }
    console.log(buffer.join(' '));
  }
  console.log();
}

function dp(matrix) {
  const row = matrix.length;
  const col = matrix[0].length;

  for (let i = 1; i < row; ++i) {
    matrix[i][0] += matrix[i - 1][0];
  }
  for (let i = 1; i < col; ++i) {
    matrix[0][i] += matrix[0][i - 1];
  }

  for (let i = 1; i < row; ++i) {
    for (let j = 1; j < col; ++j) {
      matrix[i][j] += Math.max(matrix[i - 1][j], matrix[i][j - 1]);
    }
  }
}

dp(data);

snapshots.forEach(snapshot => console.log(snapshot));
