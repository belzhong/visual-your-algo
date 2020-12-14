import { original, dataType, index, parent } from './attribute/attributes.js';
import { defineVuaAttributes } from './attribute/define_vua_attributes.js';
import { mAryTreeHead, mAryTreeNode, orphanage } from './type/data_structure_types.js';
import { tracers } from './tracer/tracer.js';
import { read, write } from './type/operation_types.js';
import { addSnapshot } from './snapshot/snapshot.js';

function Orphanage() {}

function isNormalInteger(str) {
  if (typeof str === 'string') {
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  return false;
}

const orphanageObjectHandler = {
  set(target, property, value) {
    const result = Reflect.set(...arguments);
    if (isNormalInteger(property)) {
      const selected = target[original][parseInt(property)];
      value[parent] = target[parent];
      addSnapshot(target[original], write, selected === null ? null : selected[original]);
    }
    return result;
  }
};

const orphanageConstructorHandler = {
  construct(target, argumentsList) {
    const stepfather = argumentsList[0];
    const obj = [];
    const vuaAttributes = [
      [original, obj],
      [parent, stepfather],
      [dataType, orphanage],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, orphanageObjectHandler);
    return proxy;
  }
};

const vuaOrphanage = new Proxy(Orphanage, orphanageConstructorHandler);

function MAryTreeNode(value = 0) {
  this.value = value;
}

const mAryTreeNodeObjectHandler = {
  get(target, property) {
    if (property === 'value') {
      addSnapshot(target[parent], read, target[original]);
    }
    return Reflect.get(...arguments);
  },
  set(target, property) {
    const result = Reflect.set(...arguments);
    if (property === 'value') {
      addSnapshot(target[parent], write, target[original]);
    }
    return result;
  }
};

const mAryTreeNodeConstructorHandler = {
  construct(target, argumentsList) {
    const value = argumentsList.length === 0 ? 0 : argumentsList[0];
    const obj = new target(value);
    const children = new vuaOrphanage(obj);
    obj.children = children;
    const vuaAttributes = [
      [original, obj],
      [dataType, mAryTreeNode],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, mAryTreeNodeObjectHandler);
    return proxy;
  }
};

export const vuaMAryTreeNode = new Proxy(MAryTreeNode, mAryTreeNodeConstructorHandler);

function MAryTreeHead(next = null) {}

const mAryTreeHeadObjectHandler = {
  set(target, property, value) {
    const result = Reflect.set(...arguments);
    if (property === 'next') {
      if (value !== null) {
        value[parent] = target[original];
      }
      addSnapshot(target[original], write, target[original]);
    }
    return result;
  }
};

const mAryTreeHeadConstructorHandler = {
  construct(target, argumentsList) {
    const next = argumentsList.length === 0 ? null : argumentsList[0];
    const obj = new target();
    obj.name = '';
    if (next !== null) {
      next[parent] = obj;
    }
    const vuaAttributes = [
      [original, obj],
      [dataType, mAryTreeHead],
      [index, tracers.length]
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, mAryTreeHeadObjectHandler);
    tracers.push(obj);
    proxy.next = next;
    return proxy;
  }
};

export const vuaMAryTreeHead = new Proxy(MAryTreeHead, mAryTreeHeadConstructorHandler);
