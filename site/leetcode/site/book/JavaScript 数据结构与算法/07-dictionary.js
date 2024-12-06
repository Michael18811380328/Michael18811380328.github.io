// 方法一：创建一个字典类，基于数组
function Dictionary() {

  this.dataStore = [];
  this.add = add;
  this.find = find;
  this.remove = remove;
  this.count = count;
  this.showAll = showAll;
  this.clear = clear;

  function add(key, value) {
    this.dataStore[key] = value;
  }

  function find(key) {
    return this.dataStore[key];
  }

  function remove(key) {
    if (this.dataStore[key]) {
      delete this.dataStore[key];
    } else {
      return 'Not Found';
    }
  }

  function showAll() {
    var sortKeys = Object.keys(this.dataStore).sort();
    for (var key in sortKeys) {
      console.log(sortKeys[key] + '->' + this.dataStore[sortKeys[key]]);
    }
  }

  function count() {
    var n = 0;
    for (var key in this.dataStore) {
      n++;
    }
    return n;
  }

  function clear() {
    for (var key in this.dataStore) {
      delete this.dataStore[key];
    }
  }
}


// test
var dictionary = new Dictionary();
dictionary.add('tel', '18812345678');
dictionary.showAll();
dictionary.remove('tel');
dictionary.showAll();


// 方法二：字典类似于 Map 对象
function Dictionary() {

  items = {};

  this.has = (key) => {
    return key in items;
  }

  this.set = (key, value) => {
    items[key] = value;
  }

  this.get = (key) => {
    return items.has[key] ? items[key] : undefined;
  }

  this.remove = (key) => {
    if (this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  }

  this.values = () => {
    let values = [];
    for (let key in items) {
      if (this.has(key)) {
        values.push(items[key]);
      }
    }
    return values;
  }

  this.keys = () => {
    return items.keys
  }

  this.clear = () => {
    items = {};
  }

  this.size = () => {
    return Object.keys(items).length;
  }

  this.getItems = () => {
    return items;
  }
}
