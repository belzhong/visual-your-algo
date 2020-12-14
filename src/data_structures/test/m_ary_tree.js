import { vuaMAryTreeHead, vuaMAryTreeNode } from '../m_ary_tree.js';
import { snapshots } from '../snapshot/snapshot.js';
import { getRandomInteger, getRandomIntegerArray } from './random.js';

const data = new getRandomIntegerArray(getRandomInteger(5, 80));
const head = new vuaMAryTreeHead();

function constructTree(head, data) {
  head.next = new vuaMAryTreeNode(getRandomInteger(5, 20));
  let p = 0;
  const queue = [head.next];

  while (p < data.length) {
    const cur = queue.shift();
    for (let i = 0; i < 3 && i + p < data.length; ++i) {
      const val = data[i + p];
      const node = new vuaMAryTreeNode(val);
      cur.children.push(node);
      queue.push(node);
    }
    p += 3;
  }
}

function printMAryTree(head) {
  let cur = head.next !== null ? [head.next] : []; 
  let next = [];

  while (cur.length !== 0) {
    const values = [];
    for (const node of cur) {
      values.push(node.value);
      next.push(...node.children);
    }
    cur = next;
    next = [];
  }
}

constructTree(head, data);
snapshots.forEach(snapshot => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(snapshot.data[snapshot.index]);
});
