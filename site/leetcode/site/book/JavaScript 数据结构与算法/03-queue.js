// 0.创建队列
function Queue() {
  let items = [];
  this.enqueue = function(ele) {
    items.push(ele);
  }
  this.dequeue = function() {
    return items.shift();
  }
  this.front = function() {
    return items[0];
  }
  this.isEmpty = function() {
    return items.length == 0;
  }
  this.clear = function() {
    items = [];
  }
  this.size = function() {
    return items.length;
  }
  this.print = function() {
    console.log(items.toString());
  }
}

let queue = new Queue();
console.log(queue.isEmpty());

queue.enqueue("Mike");
queue.enqueue("Michael");
queue.print();
queue.dequeue();
queue.dequeue();

// 1.优先队列（计算机打印文件需要按照队列进行打印：先输入的文件先打印；根据实际bug的紧急情况在已有队列中入列操作。需要设置队列的属性，比较属性值执行入列操作）

// 优先队列函数
function PriorityQueue() {
  // 新建一个空数组（队列）
  let items = [];
  // 设置队列单个项的属性：元素ele和属性priority，把输入的属性绑定到队列元素上面；
  function QueueElement(ele, priority) {
    this.ele = ele;
    this.priority = priority;
  }
  this.isEmpty = () => {
    return items.length == 0;
  }
  this.print = () => {
    console.log(items);
  }
  // 入列函数
  this.enqueue = (ele, priority) => {
    // 把当前输入值和属性创建一个队列元素对象
    let queueElement = new QueueElement(ele, priority);
    // 如果当前队列是空，直接将当前队列元素push
    if (this.isEmpty()) {
      items.push(queueElement);
    }
    else {
      // 如果当前队列非空，循环比较队列元素的属性和输入新元素的属性大小；如果当前属性小于某个已有属性，在当前位置插入当前新元素；跳出循环
      let added = false;
      for(let i = 0; i < items.length; i++) {
        if(queueElement.priority < items[i].priority) {
          items.splice(i, 0, queueElement);
          added = true;
          break;
        }
      }
      // 如果循环一次，新元素属性大于任何属性，那么直接push到队列末端。（默认的队列是最小优先队列）
      if (!added) {
        items.push(queueElement);
      }
    }
  };
  // 其他队列方法和默认Queue方法类似
}

let priQueue = new PriorityQueue();
priQueue.enqueue("Madd", 1);
priQueue.enqueue("Camila", 3);
priQueue.enqueue("Jack", 2);
priQueue.print();

// 2.循环队列
// 原理：击鼓传花(hot potato)：设置初始的队列元素，给定一个数值（设置n次传递），每一次从前面删除一个元素加到后面。如果n次循环结束，直接删除当前元素。
function hotPotato(nameList, num) {
  let queue = new Queue();
  for(let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }
  let loser = '';
  while (queue.size() > 1) {
    for(let i = 0; i < num ; i++) {
      queue.enqueue(queue.dequeue());
    }
    loser = queue.dequeue();
    console.log('淘汰者' + loser);
  }
  return queue.dequeue();
}
let names = ["Mike","Tom","John","Carl", "Cindy"];
let winner = hotPotato(names, 10);
console.log("winner is " + winner);
