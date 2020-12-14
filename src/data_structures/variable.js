import { original, dataType, index } from './attribute/attributes.js';
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
snapshots.forEach(snapshot => console.log(...snapshot.data[snapshot.index]));
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
snapshots.forEach(snapshot => console.log(...snapshot.data[snapshot.index]));
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
snapshots.forEach(snapshot => console.log(...snapshot.data[snapshot.index]));
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
snapshots.forEach(snapshot => console.log(...snapshot.data[snapshot.index]));
import { defineVuaAttributes } from './attribute/define_vua_attributes.js';
import { variable } from './type/data_structure_types.js';
import { read, write } from './type/operation_types.js';
import { tracers } from './tracer/tracer.js';
import { addSnapshot } from './snapshot/snapshot.js';

function Variable(next = null, name = '', visiable = true) {
  this.value = next;
  this.name = name;
  this.visiable = visiable;
}

const objectHandler = {
  get(target, property) {
    if (property === 'value') {
      addSnapshot(target[original], read);
    }
    return Reflect.get(...arguments);
  },
  set(target, property) {
    const result = Reflect.set(...arguments);
    if (property === 'value' || property === 'name' || property === 'visiable') {
      addSnapshot(target[original], write);
    }
    return result;
  }
};

const constructorHandler = {
  construct(target, argumentsList) {
    const obj = new target(...argumentsList);
    const vuaAttributes = [
      [original, obj],
      [dataType, variable],
      [index, tracers.length],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, objectHandler);
    tracers.push(obj);
    //摸一下 有个记录
    proxy.value = argumentsList[0];
    return proxy;
  }
};

export const vuaVariable = new Proxy(Variable, constructorHandler);
