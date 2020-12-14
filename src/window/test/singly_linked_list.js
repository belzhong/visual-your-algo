function addIntoHead(head, data) {
  data.forEach(val => {
    const tmp = new vuaSinglyLinkedListNode(val, head.next);
    head.next = tmp;
  });
}

function printList(head) {
  let p = head.next;
  const data = [];
  while (p !== null) {
    data.push(p.value);
    p = p.next;
  }
  console.log(data.join(' '));
}

function sortList(head) {
  for (let i = head.next; i !== null; i = i.next) {
    let min = i;
    for (let j = i.next; j !== null; j = j.next) {
      if (j.value < min.value) {
        min = j;
      }
    }
    const tmp = min.value;
    min.value = i.value;
    i.value = tmp;
  }
}

const data = getRandomIntegerArray(30);
const head = new vuaSinglyLinkedListHead();
addIntoHead(head, data);
sortList(head);
printList(head);
