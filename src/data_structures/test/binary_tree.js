import { vuaBinaryTreeNode, vuaBinaryTreeHead } from '../binary_tree.js';
import { snapshots } from '../snapshot/snapshot.js';
import { getRandomInteger, getRandomIntegerArray } from './random.js';

const data = new getRandomIntegerArray(getRandomInteger(5, 80));
const head = new vuaBinaryTreeHead();

function constructTree(head, data) {
  head.next = new vuaBinaryTreeNode(getRandomInteger(5, 20));
  let p = 0;
  const queue = [head.next];

  while (p < data.length) {
    const cur = queue.shift();
    for (let i = 0; i < 2 && i + p < data.length; ++i) {
      const val = data[i + p];
      const node = new vuaBinaryTreeNode(val);
      if (i === 0) {
        cur.left = node;
      } else {
        cur.right = node;
      }
      queue.push(node);
    }
    p += 2;
  }
}

function printMAryTree(head) {
  let cur = head.next !== null ? [head.next] : []; 
  let next = [];
  while (cur.length !== 0) {
    const values = [];
    for (const node of cur) {
      values.push(node.value);
      if (node.left !== null) {
        next.push(node.left);
      }
      if (node.right !== null) {
        next.push(node.right);
      }
    }
    cur = next;
    next = [];
  }
}

constructTree(head, data);
// printMAryTree(head);
snapshots.forEach(snapshot => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(snapshot.data[snapshot.index])
});
