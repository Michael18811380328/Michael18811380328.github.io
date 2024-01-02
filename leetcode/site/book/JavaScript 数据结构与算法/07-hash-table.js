// 哈希表-散列表
// 散列算法: 散列函数可以获取一个内存地址，从而进行快速检索。简单的哈希函数就是把ASCII码相加
function HashTable() {
  let table = [];

  loseHashCode = (key) => {
    let hash = '';
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  }

  this.put = (key, value) => {
    let position = loseHashCode(key);
    table[position] = value;
  }

  this.get = (key) => {
    return table[loseHashCode(key)];
  }

  this.remove = (key) => {
    table[loseHashCode(key)] = undefined;
  }

  this.print = () => {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ' ' + table[i]);
      }
    }
  }

  // 解决哈希冲突：分离链接，线性探查，双散列法
  
  // 分离链接：把哈希表的每一个位置设置一个链表，然后哈希值相同的元素，可以存放在列表中。链表的每一项是一个键值对。
  class ValuePair(key, value) {
    this.key = key;
    this.value = value;
  }

  this.put = (key, value) => {
    let position = loseHashCode(key);
    if (table[position] === undefined) {
      table[position] = new LinkedList();
    }
    let object = new ValuePair(key, value);
    table[position].append(object);
  }

  this.get = (key) => {
    let position = loseHashCode(key);
    if (table[position] === undefiend) {
      return undefined;
    }
    let current = table[position].getHead();
    while (current.next) {
      if (current.element.key === key) {
        return current.element.value;
      }
      current = current.next;
    }
    if (current.element.key === key) {
      return current.element.value;
    }
  }

  this.remove = (key) => {
    let position = loseHashCode(key);
    if (table[position] !== undefined) {
      let current = table[position].getHead();
      while (current.next) {
        if (current.element.key === key) {
          table[position].remove(current.element);
          if (table[position].isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
        current = current.next;
      }
      if (current.element.key === key) {
        table[position].remove(current.element);
        if (table[position].isEmpty()) {
          table[position] = undefined;
        }
        return true;
      }
    }
    return false;
  }

  // 线性探查法：如果产生哈希冲突，那么继续查询下一个地址，然后存放在下一个空位置
  this.put = (key, value) => {
    let position = loseHashCode(key);
    if (table[position] === undefined) {
      table[position] = new ValuePair(key, value);
    }
    else {
      let index = ++position;
      while (table[index] !== undefined) {
        index++;
      }
      table[index] = new ValuePair(key, value);
    }
  }
  // 注意：如果C语言数组的长度不能增加，需要处理内存溢出的问题
  
  this.get = (key) => {
    let position = loseHashCode(key);
    if (table[position] !== undefined) {
      if (table[position].key === key) {
        return table[position].value;
      }
      else {
        let index = ++position;
        while (table[index] === undefined || table[index].key !== key) {
          index++;
        }
        if (table[index].key === key) {
          return table[index].value;
        }
      }
    }
    return undefined;
  }

  this.remove = (key) => {
    let position = loseHashCode(key);
    if (table[position] !== undefined) {
      table[position] = undefined;
      return true;
    } else {
      let index = ++position;
      while (table[index] === undefined || table[index].key !== key) {
        index++;
      }
      if (table[index].key === key) {
        table[index] = undefined;
        return true;
      }
    }
  }
  return false;

  // 上面的散列函数会产生很多冲突，社区推荐更好的散列函数
  function djd2HashCode(key) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  }
}
