import { original, dataType, index } from './attribute/attributes.js';
import { defineVuaAttributes } from './attribute/define_vua_attributes.js';
import { map } from './type/data_structure_types.js';
import { read, write } from './type/operation_types.js';
import { tracers } from './tracer/tracer.js';
import { addSnapshot } from './snapshot/snapshot.js';

let methodName = '';

const functionHandler = {
  apply(target, thisArg, argumentsList) {
    const ret = Reflect.apply(...arguments);
    const operation = ((methodName === 'has' || methodName === 'get') ? read : write);
    addSnapshot(thisArg[original], operation, argumentsList[0]);
    return ret;
  }
};

const getHandler = {
  get(target, property) {
    let ret = Reflect.get(target, property);
    if (typeof ret === 'function' && ['set', 'get', 'clear', 'delete', 'has'].includes(property)) {
      methodName = property;
      ret = new Proxy(ret.bind(target), functionHandler);
    }
    return ret.bind(target);
  }
};

const constructorHandler = {
  construct(target, argumentsList) {
    const obj = new target(...argumentsList);
    obj.name = '';
    obj.visiable = true;
    const vuaAttributes = [
      [original, obj],
      [dataType, map],
      [index, tracers.length],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, getHandler);
    tracers.push(obj);
    return proxy;
  }
};

export const vuaMap = new Proxy(Map, constructorHandler);
