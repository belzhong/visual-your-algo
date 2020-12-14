import { original, dataType, index } from './attribute/attributes.js';
import { defineVuaAttributes } from './attribute/define_vua_attributes.js';
import { vector } from './type/data_structure_types.js';
import { tracers } from './tracer/tracer.js';
import { read, write } from './type/operation_types.js';
import { addSnapshot } from './snapshot/snapshot.js';

function Vector() {}

function isNormalInteger(str) {
  if (typeof str === 'symbol') return false;
  const n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}

const objectHandler = {
  get(target, property) {
    if (isNormalInteger(property)) {
      addSnapshot(target[original], read, parseInt(property));
    }
    return Reflect.get(...arguments);
  },
  set(target, property) {
    const result = Reflect.set(...arguments);
    if (isNormalInteger(property)) {
      addSnapshot(target[original], write, parseInt(property));
    }
    return result;
  }
};

const constructorHandler = {
  construct(target, argumentsList) {
    const obj = new Array(...argumentsList);
    obj.name = '';
    const vuaAttributes = [
      [original, obj],
      [dataType, vector],
      [index, tracers.length],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, objectHandler);
    tracers.push(obj);
    return proxy;
  }
};

export const vuaVector = new Proxy(Vector, constructorHandler);
