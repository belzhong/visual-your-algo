import { original, dataType, index, parent } from './attribute/attributes.js';
import { defineVuaAttributes } from './attribute/define_vua_attributes.js';
import { singlyLinkedListHead, singlyLinkedListNode } from './type/data_structure_types.js';
import { tracers } from './tracer/tracer.js';
import { read, write } from './type/operation_types.js';
import { addSnapshot } from './snapshot/snapshot.js';

function SinglyLinkedListNode(value = 0, next = null) {
  this.value = value;
  this.next = next;
}

const singlyLinkedListNodeObjectHandler = {
  get(target, property) {
    if (property === 'value' || property === 'next') {
      addSnapshot(target[original], read, target[original]);
    }
    return Reflect.get(...arguments);
  },
  set(target, property, value) {
    const result = Reflect.set(...arguments);
    if (property === 'value' || property === 'next') {
      if (property === 'next' && value !== null) {
        value[parent] = target[original];
      }
      addSnapshot(target[original], write, target[original]);
    }
    return result;
  }
};

const singlyLinkedListNodeConstructorHandler = {
  construct(target, argumentsList) {
    if (argumentsList.length === 0) {
      argumentsList.push(0);
    }
    if (argumentsList.length === 1) {
      argumentsList.push(null);
    }
    const [value, next] = argumentsList;
    const obj = new target(value, next);
    obj[parent] = obj;
    if (next !== null) {
      next[original][parent] = obj;
    }
    const vuaAttributes = [
      [original, obj],
      [dataType, singlyLinkedListNode],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, singlyLinkedListNodeObjectHandler);
    return proxy;
  }
};

function SinglyLinkedListHead(next = null) {
  this.next = next;
}

const singlyLinkedListHeadObjectHandler = {
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

const singlyLinkedListHeadConstructorHandler = {
  construct(target, argumentsList) {
    if (argumentsList.length === 0) {
      argumentsList.push(null);
    }
    const [next] = argumentsList;
    const obj = new target(null);
    obj.name = '';
    if (next !== null) {
      next[parent] = obj;
    }
    const vuaAttributes = [
      [original, obj],
      [dataType, singlyLinkedListHead],
      [index, tracers.length],
    ];
    defineVuaAttributes(obj, vuaAttributes);
    const proxy = new Proxy(obj, singlyLinkedListHeadObjectHandler);
    tracers.push(obj);
    if (next !== null) {
      proxy.next = next;
    }
    return proxy;
  }
};

export const vuaSinglyLinkedListNode = new Proxy(SinglyLinkedListNode, singlyLinkedListNodeConstructorHandler);
export const vuaSinglyLinkedListHead = new Proxy(SinglyLinkedListHead, singlyLinkedListHeadConstructorHandler);
