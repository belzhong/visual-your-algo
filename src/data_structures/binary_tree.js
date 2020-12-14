import { defineVuaAttributes } from './attribute/define_vua_attributes.js';
import { dataType, original, index, parent } from './attribute/attributes.js';
import { binaryTreeNode, binaryTreeHead } from './type/data_structure_types.js';
import { tracers } from './tracer/tracer.js';
import { read, write } from './type/operation_types.js';
import { addSnapshot } from './snapshot/snapshot.js';

function BinaryTreeNode(value = 0, left = null, right = null) {
  this.value = value;
  this.left = left;
  this.right = right;
}

const binaryTreeNodeObjectHandler = {
  get(target, property) {
    if (['value', 'left', 'right'].includes(property)) {
      addSnapshot(target[original], read, target[original]);
    }
    return Reflect.get(...arguments);
  },
  set(target, property, value) {
    const ret = Reflect.set(...arguments);
    if (['value', 'left', 'right'].includes(property)) {
      if (property !== 'value' && value !== null) {
        value[parent] = target[original];
      }
      addSnapshot(target[original], write, target[original]);
    }
    return ret;
  }
};

const binaryTreeNodeConstructorHandler = {
  construct(target, argumentsList) {
    const value = 0 < argumentsList.length ? argumentsList[0] : 0;
    const left = 1 < argumentsList.length ? argumentsList[1] : null;
    const right = 2 < argumentsList.length ? argumentsList[2] : null;
    const obj = new target(value, left, right);
    const vuaAttributes = [
      [original, obj],
      [dataType, binaryTreeNode],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, binaryTreeNodeObjectHandler);
    proxy.value = value;
    return proxy;
  }
};

export const vuaBinaryTreeNode = new Proxy(BinaryTreeNode, binaryTreeNodeConstructorHandler);

function BinaryTreeHead(next = null) {}

const binaryTreeHeadObjectHandler = {
  set(target, property, value) {
    const ret = Reflect.set(...arguments);
    if (property === 'next') {
      if (value !== null) {
        value[parent] = target[original];
      } 
      addSnapshot(target[original], write, target[original]);
    }
    return ret;
  }
};

const binaryTreeHeadConstructorHandler = {
  construct(target, argumentsList) {
    const next = 0 < argumentsList.length ? argumentsList[0] : null;
    const obj = new target();
    const vuaAttributes = [
      [original, obj],
      [dataType, binaryTreeHead],
      [index, tracers.length]
    ];
    defineVuaAttributes(obj, vuaAttributes);
    tracers.push(index);
    const proxy = new Proxy(obj, binaryTreeHeadObjectHandler);
    proxy.next = next;
    return proxy;
  }
};

export const vuaBinaryTreeHead = new Proxy(BinaryTreeHead, binaryTreeHeadConstructorHandler);
