import { original, dataType, index, rowIndex, parent } from './attribute/attributes.js';
import { defineVuaAttributes } from './attribute/define_vua_attributes.js';
import { matrix } from './type/data_structure_types.js';
import { tracers } from './tracer/tracer.js';
import { read, write } from './type/operation_types.js';
import { addSnapshot } from './snapshot/snapshot.js';

function Matrix(row, col, filler = 0) {}

function isNormalInteger(str) {
  if (typeof str === 'string') {
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }
  return false;
}

const objectHandler = {
  get(target, property) {
    if (isNormalInteger(property)) {
      addSnapshot(target[original], read, {
        row: target[rowIndex],
        col: parseInt(property)
      });
    }
    return Reflect.get(...arguments);
  },
  set(target, property) {
    const result = Reflect.set(...arguments);
    if (isNormalInteger(property)) {
      addSnapshot(target[original], write, {
        row: target[rowIndex],
        col: parseInt(property)
      });
    }
    return result;
  }
};

const constructorHandler = {
  construct(target, argumentsList) {
    const [row, col, filler] = argumentsList;
    const obj = new Array(row);
    obj.name = '';
    const vuaAttributes = [
      [original, obj],
      [dataType, matrix],
      [index, tracers.length],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    for (let i = 0; i < row; ++i) {
      const tmp = new Array(col);
      tmp.fill(filler);
      defineVuaAttributes(tmp, [
        [original, tmp],
        [parent, obj],
        [dataType, matrix],
        [index, tracers.length],
        [rowIndex, i],
      ]);
      obj[i] = new Proxy(tmp, objectHandler);
    }
    tracers.push(obj);
    return obj;
  }
};

export const vuaMatrix = new Proxy(Matrix, constructorHandler);
