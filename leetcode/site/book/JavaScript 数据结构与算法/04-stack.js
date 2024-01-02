// stack in JS 栈（使用数组实现）

// 0 构造函数创建栈
function Stack() {
  // 属性和方法的声明
  let items = [];
  this.push = function(element) {
    items.push(element);
  };
  this.pop = function() {
    return items.pop();
  };
  this.peek = function() {
    return items[items.length - 1];
  };
  // peek 返回栈顶的元素，不对栈进行修改
  this.isEmpty = function() {
    return items.length === 0;
  };
  this.size = function() {
    return items.length;
  };
  this.clear = function() {
    items = [];
  };
  this.print = function() {
    console.log(items.toString());
  };
}

let stack = new Stack();
console.log(stack.isEmpty());

stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();

console.log(stack.peek());
console.log(stack.size());
console.log(stack.isEmpty());

// 1 实践：十进制二进制转化 p39(用被除数除以进制数，返回的余数就是低位到高位的二进制数，使用栈实现，先进后出)
function divideBy2(decNumber) {
  let remStack = new Stack();
  let rem;
  let binary = '';
  // 创建初始化栈对象、余数、二进制的字符串
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / 2);
  }
  // 获取二进制数据并存放在栈中
  while (!remStack.isEmpty()) {
    binary += remStack.pop().toString();
  }
  // 循环输出二进制数据
  return binary;
}
// test
console.log(divideBy2(256));

// 2.推广到任意
baseConverter = (decNumber, base) => {
  // 初始化存储器
  let remStack = new Stack();
  let rem;
  let baseString = '';
  const digit = '0123456789ABCDEF';
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()){
    let index = remStack.pop();
    baseString += digit[index];
    // 将索引对应的字符（十六进制）进行截取获取返回值
    // 如果是八进制不需要考虑这种情况-直接返回8的余数即可
  }
  return baseString;
}

console.log(baseConverter(31, 16));
