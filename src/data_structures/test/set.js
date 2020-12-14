import { vuaSet } from '../set.js';
import { getRandomIntegerArray, getRandomInteger } from './random.js';
import { snapshots } from '../snapshot/snapshot.js';

const data = getRandomIntegerArray(getRandomInteger(5, 20));
const s = new vuaSet();

data.forEach(val => s.add(val));
s.delete(data[0]);

snapshots.forEach(snapshot => console.log(snapshot.data[snapshot.index], snapshot.highlight));
