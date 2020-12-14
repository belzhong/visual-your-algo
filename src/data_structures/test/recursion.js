import { addListener } from '../recursion.js';
import { snapshots } from '../snapshot/snapshot.js';

function fib(n) {
  return 2 < n ? fib(n - 1) + fib(n - 2) : 1;
}

fib = addListener(fib);

fib(5);

snapshots.forEach(snapshot => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(snapshot.data[snapshot.index]);
  console.log(snapshot.highlight);
  console.log(snapshot.operation);
});
