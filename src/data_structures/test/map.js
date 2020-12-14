import { vuaMap } from '../map.js';
import { getRandomInteger } from './random.js';
import { snapshots } from '../snapshot/snapshot.js';

const s = new vuaMap();
const n = getRandomInteger(5, 20);

for (let i = 0; i < n; ++i) {
  const key = getRandomInteger(10, 100);
  const value = getRandomInteger(100, 1000);
  s.set(key, value);
}

snapshots.forEach(snapshot => console.log(...snapshot.data[snapshot.index], snapshot.highlight));
