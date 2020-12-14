import { original, index, dataType, parent, parentIndex, binaryPosition } from '../attribute/attributes.js';
import { 
  variable, vector, matrix,
  singlyLinkedListHead, singlyLinkedListNode,
  mAryTreeHead, mAryTreeNode, orphanage,
  set, map,
  binaryTreeNode, binaryTreeHead
} from '../type/data_structure_types.js';
import { read } from '../type/operation_types.js';

export const snapshots = [];

export function addSnapshot(tracer, operation, highlight = null) {
  tracer = getTracer(tracer);
  if (tracer === undefined) {
    return;
  }
  const type = tracer[dataType];
  highlight = getHighlight(tracer, highlight, type);
  const tracerIndex = tracer[index];
  const prevData = getPreviousData();
  const types = getPreviousTypes();
  const name = getName(tracer);
  const data = (tracerIndex < snapshots.length && operation === read) ?
    prevData : getData(tracer, type, prevData, tracerIndex);
  types[tracerIndex] = type;
  const snapshot = {
    type,
    index: tracerIndex,
    name,
    highlight,
    data,
    operation,
    [dataType]: types 
  };
  snapshots.push(snapshot);
}

function getName(tracer) {
  const type = tracer[dataType];
  if (type === matrix) {
    return tracer[parent].name;
  }
  return tracer.name;
}

function getHighlight(tracer, highlight, type) {
  switch(type) {
    case singlyLinkedListHead:
      return getSinglyLinkedListHighlight(tracer, highlight);
    case mAryTreeHead:
      return getMAryTreeHighlight(tracer, highlight);
    case binaryTreeHead:
      return getBinaryTreeHighlight(tracer, highlight);
    default:
      return highlight;
  }
}

function getBinaryTreeHighlight(head, highlight) {
  let cur = head.next === null ? [] : [[{ node: head.next,  binaryPosition: 'left'}]];

  const pos = {
    row: 0,
    col: 0,
  };

  while (cur.length !== 0) {
    const next = [];
    let col = 0;
    for (let charityIndex = 0; charityIndex < cur.length; ++charityIndex) {
      const charity = cur[charityIndex];
      for (let i = 0; i < charity.length; ++i) {
        const node = charity[i].node === null ? null : charity[i].node[original];
        if (node !== null) {
          if (node === highlight) {
            pos.col = col;
            return pos;
          }
          ++col;
          next.push([{ node: node.left,  binaryPosition: 'left'}, 
            { node: node.right,  binaryPosition: 'right'}]);
        }
      }
    }
    cur = next;
    ++pos.row;
  }
  return {
    row: -1,
    col: -1
  };
}

function getMAryTreeHighlight(tracer, highlight) {
  let cur = tracer.next === null ? [] : [[tracer.next]];
  const pos = {
    row: 0,
    col: 0,
  };

  while (cur.length !== 0) {
    let col = 0;
    const next = [];
    for (const charity of cur) {
      for (let i = 0; i < charity.length; ++i) {
        const node = charity[i][original];
        if (node === highlight) {
          pos.col = col;
          return pos;
        }
        if (node !== null) {
          ++col;
          next.push(node.children)
        }
      }
    }
    cur = next;
    ++pos.row;
  }

  return {
    row: -1,
    col: -1
  };
}

function getSinglyLinkedListHighlight(tracer, highlight) {
  let selected = -1;
  let p = tracer.next;
  while (p !== null) {
    ++selected;
    p = p[original];
    if (p === highlight) {
      break;
    }
    p = p.next;
  }
  return tracer === null ? -1 : selected;
}

function getPreviousTypes() {
  const last = snapshots.length - 1;
  return last === -1 ? [] : snapshots[last][dataType].slice();
}

function getPreviousData() {
  const last = snapshots.length - 1;
  return last === -1 ? [] : snapshots[last].data.slice();
}

function getData(tracer, type, prev, index) {
  switch(type) {
    case variable:
      prev[index] = getVariable(tracer);
      break;
    case vector:
      prev[index] = getVector(tracer);
      break;
    case matrix:
      prev[index] = getMatrix(tracer);
      break;
    case singlyLinkedListHead:
      prev[index] = getSinglyLinkedListNode(tracer);
      break;
    case mAryTreeHead:
      prev[index] = getMAryTree(tracer);
      break;
    case set:
      prev[index] = getSet(tracer);
      break;
    case map:
      prev[index] = getMap(tracer);
      break;
    case binaryTreeHead:
      prev[index] = getBinaryTree(tracer);
      break;
    default:
  }
  return prev;
}

function getTracer(tracer) {
  const type = tracer[dataType];
  switch(type) {
    case singlyLinkedListNode:
      return getSinglyLinkedListHead(tracer);
    case orphanage:
    case binaryTreeNode:
    case mAryTreeNode:
      return getTreeHead(tracer);
    default:
      return tracer;
  }
}

function getBinaryTree(head) {
  let cur = head.next === null ? [] : [[{ node: head.next,  binaryPosition: 'left'}]];
  const tree = [];

  while (cur.length !== 0) {
    const layer = [];
    const next = [];
    for (let charityIndex = 0; charityIndex < cur.length; ++charityIndex) {
      const charity = cur[charityIndex];
      for (let i = 0; i < charity.length; ++i) {
        const node = charity[i].node === null ? null : charity[i].node[original];
        if (node !== null) {
          layer.push({
            value: node.value,
            [parentIndex]: charityIndex,
            [binaryPosition]: charity[i].binaryPosition
          });
          next.push([{ node: node.left,  binaryPosition: 'left'}, 
            { node: node.right,  binaryPosition: 'right'}]);
        }
      }
    }
    cur = next;
    tree.push(layer);
  }
  tree.pop();
  return tree;
}

function getMap(s) {
  const data = [];

  for (const val of s) {
    data.push(val);
  }

  return data;
}

function getSet(s) {
  const data = [];

  for (const val of s) {
    data.push(val);
  }

  return data;
}

function getMAryTree(head) {
  let cur = head.next === null ? [] : [[head.next]];
  const tree = [];

  while (cur.length !== 0) {
    const layer = [];
    const next = [];
    for (let charityIndex = 0; charityIndex < cur.length; ++charityIndex) {
      const charity = cur[charityIndex];
      for (let i = 0; i < charity.length; ++i) {
        const node = charity[i][original];
        if (node !== null) {
          layer.push({
            value: node.value,
            [parentIndex]: charityIndex
          });
          next.push(node.children)
        }
      }
    }
    cur = next;
    tree.push(layer);
  }
  tree.pop();
  return tree;
}

function getTreeHead(node) {
  while (node !== undefined && node[dataType] !== mAryTreeHead && node[dataType] !== binaryTreeHead) {
    node = node[parent];
  }

  return node;
}

function getVariable(tracer) {
  return tracer.value;
}

function getVector(tracer) {
 return tracer.slice(); 
}

function getMatrix(tracer) {
  const matrix = tracer[parent];
  return matrix.map(row => row[original].slice());
}

function getSinglyLinkedListHead(node) {
  while (node[dataType] !== singlyLinkedListHead) {
    node = node[parent];
  }

  return node;
}

function getSinglyLinkedListNode(head) {
  let p = head;
  const data = [];
  while (p.next !== null) {
    const next = p.next[original];
    data.push(next.value);
    p = next;
  }
  return data;
}
