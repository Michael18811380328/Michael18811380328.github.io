// 集合
function Set() {
  items = {};

  this.has = (value) => {
    // for-in 循环会遍历到继承的属性，不仅仅是自身的属性
    return items.hasOwnProperty(value);
  }

  this.add = (value) => {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    }
    return false;
  }

  this.remove = (value) => {
    if (this.has(value)) {
      // 这里不能设置这个属性是null,否则遍历属性的时候还是存在的，size 错误
      delete items[value];
      return true;
    }
    return false;
  }

  this.clear = () => {
    items = {};
  }

  // es6
  this.size = () => {
    return Object.keys(items).length;
  }

  // es3写法获取对象属性的个数
  this.sizeLegancy = () => {
    let count = 0;
    for (let key in items) {
      if (items.hasOwnProperty(key)) {
        count++;
      }
    }
    return count;
  }

  this.value = () => {
    return Object.keys(items);
  }

  this.unionSet = (set) => {
    let unionSet = new Set();
    let values = this.value();
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }
    values = set.values;
    for (let j = 0; j < values.length; j++) {
      unionSet.add(values[j]);
    }
    return unionSet;
  }

  this.interSet = (otherSet) => {
    let inertSet = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        interSet.add(values[i]);
      }
    }
    return interSet;
  }

  this.difference = (otherSet) => {
    let diffSet = new Set();
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        diffSet.add(values[i]);
      }
    }
    return diffSet;
  }

  this.sebSet = (otherSet) => {
    if (this.size() > otherSet.size()) return false;
    let values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) return false;
    }
    return true;
  }

}

let set = new Set();
