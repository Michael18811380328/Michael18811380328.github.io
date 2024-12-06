// 0.linked list 链表
// 大部分语言中的数组具有固定的长度（JS是个例外），从一个数组中直接添加或者改变元素需要占用内存，需要移动元素。数组在内存中是连续放置的，但是链表是一个动态的数据结构，不是连续放置在内存中的数据。实际上链表的每个节点存储自身数据和下一个节点的引用（指针）
// 好处：添加元素或者删除元素不需要改变已有元素在内存中的位置；弊端：访问列表需要从一个开始元素以此迭代列表。
// 实例：一列火车：车厢是一个节点，连接处是一个指针。
// 分类：链表和双向链表

// 与之前不同：指针的灵活使用

// 1.单向链表
function linkedList() {
  let length = 0;
  // 第一个节点的引用存储（head）
  let head = null;
  // 需要加入列表的项，具有node节点和指针（指向下一个空节点）
  let Node = function(ele) {
    this.element = ele;
    this.next = null;
  };
  // API

  this.append = function(ele) {
    let node = new Node(ele);
    let current;
    if (head === null) {
      // 如果列表是空，添加第一个元素
      head = node;
    }
    else {
      current = head;
      // 循环列表找到最后一项
      while (current.next) {
        current = current.next;
      }
      // 将最后一项的next赋值为node，建立链接
      current.next = node;
    }
    length ++;// 更新链表的长度
  };

  // 链表相关API操作不熟练
  this.insert = function(position, ele) {
    if (position >= 0 && position <= length) {
      let node = new Node(ele);
      let current = head;
      let previous;
      let index = 0;
      if (position === 0) {
        node.next = current;
        head = node;
      }
      else {
        while (index++ < current) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length ++;
      return true;
    }
    else {
      return false;
    }
  };

  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head;
      let previous;
      let index = 0;
      if (position === 0) {
        head = current.next;
      }
      else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length --;
      return current.element;
    }
    else {
      return null;
    }
  };

  this.indexOf = function(ele) {
    let current = head;
    let index = -1;
    while (current) {
      if (ele === current.element) {
        return index;
      }
      index ++;
      current = current.next;
    }
    return -1;
  };

  this.remove = function(ele) {
    let index = this.indexOf(ele);
    return this.removeAt(index);
  };

  this.isEmpty = function() {
    return length == 0;
  };

  this.size = function() {
    return length;
  };

  this.toString = function() {
    let current = head;
    let string = '';
    while (current) {
      string = current.element;
      current = current.next;
    }
    return string;
  };

  // 列表使用了node类，所以需要重写继承于对象的toString方法，只输出元素的值。
  this.getHead = function() {
    return head;
  }
}

// test append API
let list = new linkedList();
list.append(15);
list.append(10);
list.print();


// 2.双向链表
// 单向链表只有向下一个节点的链接，双向链表是双向的，可以向上一个节点或者下一个节点进行链接。具有双向的指针。
// 双向链表中可以从头到尾或者从尾到头迭代列表；在单向链表中，如果迭代链表过程中错过了要找的元素，需要从头迭代链表。
// API的主要变动：创建新的元素节点是相同的，需要同时改变前后两个指针的指向。

function DoubleLinkedList() {

  let Node = function(ele) {
    this.element = ele;
    this.next = null;
    this.prev = null;
  };

  let length = 0;
  let head = null;
  let tail = null;

  // API
  this.insert = (position, element) => {
    let node = new Node(element);
    let current = head;
    let previous;
    let index = 0;
    if (position === 0) {
      if (!head) {
        head = node;
        tail = node;
      } else {
        node.next = current;
        current.prev = node;
        head = node;
      }
    } else if (position === length) {
      current = tail;
      current.next = node;
      node.prev = current;
      tail = node;
    } else {
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      node.next = current;
      previous.next = previous;
    }
    length ++;
    return true;
  }

  this.removeAt = (position) => {
    // 检查临界值
    if (position > -1 && position < length) {
      let current = head;
      let previous;
      let index = 0;
    }
    // 移除第一项
    if (position === 0) {
      head = current.next;
      // ...
    }
  }
};

// 改进：如果position大于length/2，最好从尾部开始迭代，改进性能；
