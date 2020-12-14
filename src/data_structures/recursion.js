import { vuaMAryTreeHead, vuaMAryTreeNode } from './m_ary_tree.js';
import { dataType, parent, original } from './attribute/attributes.js';
import { mAryTreeHead } from './type/data_structure_types.js';
import { read } from './type/operation_types.js';
import { addSnapshot } from './snapshot/snapshot.js';

export const hotpoints = new Map();

export function addListener(fun) {
  hotpoints.set(fun, new vuaMAryTreeHead());

  return function () {
    addStack(fun);
    const result = fun(...arguments);
    popStack(fun);
    return result;
  }
}

function addStack(fun) {
  const active = hotpoints.get(fun);
  const type = active[dataType];
  const node = new vuaMAryTreeNode(fun.name);
  if (type === mAryTreeHead) {
    active.next = node;
  } else {
    active.children.push(node);
  }
  node.name = node.name;
  hotpoints.set(fun, node);
}

function popStack(fun) {
  const active = hotpoints.get(fun);
  hotpoints.set(fun, active[parent]);
  addSnapshot(active[parent], read, active[original]);
}
