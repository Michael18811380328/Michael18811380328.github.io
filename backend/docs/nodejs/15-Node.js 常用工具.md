# Node.js 常用工具

util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能 过于精简的不足。

使用方法如下：

```
const util = require('util');
```

------

## util.callbackify

**util.callbackify(original)** 将 `async` 异步函数（或者一个返回值为 `Promise` 的函数）转换成遵循异常优先的回调风格的函数，例如将 `(err, value) => ...` 回调作为最后一个参数。 在回调函数中，第一个参数为拒绝的原因（如果 `Promise` 解决，则为 `null`），第二个参数则是解决的值。

## 实例

**const** util = require('util');

async **function** fn() {
 **return** 'hello world';
}
**const** callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
 **if** (err) **throw** err;
 console.log(ret);
});

以上代码输出结果为：

```
hello world
```

回调函数是异步执行的，并且有异常堆栈错误追踪。 如果回调函数抛出一个异常，进程会触发一个 'uncaughtException' 异常，如果没有被捕获，进程将会退出。

null 在回调函数中作为一个参数有其特殊的意义，如果回调函数的首个参数为 Promise 拒绝的原因且带有返回值，且值可以转换成布尔值 false，这个值会被封装在 Error 对象里，可以通过属性 reason 获取。

```
function fn() {
  return Promise.reject(null);
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
  // 当 Promise 被以 `null` 拒绝时，它被包装为 Error 并且原始值存储在 `reason` 中。
  err && err.hasOwnProperty('reason') && err.reason === null;  // true
});
```

original 为 async 异步函数。该函数返回传统回调函数。

------

## util.inherits

**util.inherits(constructor, superConstructor)** 是一个实现对象间原型继承的函数。

JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有提供对象继承的语言级别特性，而是通过原型复制来实现的。

在这里我们只介绍 util.inherits 的用法，示例如下：

```
var util = require('util'); 
function Base() { 
    this.name = 'base'; 
    this.base = 1991; 
    this.sayHello = function() { 
    console.log('Hello ' + this.name); 
    }; 
} 
Base.prototype.showName = function() { 
    console.log(this.name);
}; 
function Sub() { 
    this.name = 'sub'; 
} 
util.inherits(Sub, Base); 
var objBase = new Base(); 
objBase.showName(); 
objBase.sayHello(); 
console.log(objBase); 
var objSub = new Sub(); 
objSub.showName(); 
//objSub.sayHello(); 
console.log(objSub); 
```

我们定义了一个基础对象 Base 和一个继承自 Base 的 Sub，Base 有三个在构造函数内定义的属性和一个原型中定义的函数，通过util.inherits 实现继承。运行结果如下：

```
base 
Hello base 
{ name: 'base', base: 1991, sayHello: [Function] } 
sub 
{ name: 'sub' }
```

**注意：**Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。

同时，在原型中定义的属性不会被 console.log 作 为对象的属性输出。如果我们去掉 objSub.sayHello(); 这行的注释，将会看到：

```
node.js:201 
throw e; // process.nextTick error, or 'error' event on first tick 
^ 
TypeError: Object #&lt;Sub&gt; has no method 'sayHello' 
at Object.&lt;anonymous&gt; (/home/byvoid/utilinherits.js:29:8) 
at Module._compile (module.js:441:26) 
at Object..js (module.js:459:10) 
at Module.load (module.js:348:31) 
at Function._load (module.js:308:12) 
at Array.0 (module.js:479:10) 
at EventEmitter._tickCallback (node.js:192:40) 
```

------

## util.inspect

**util.inspect(object,[showHidden],[depth],[colors])** 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。

showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。

depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归 2 层，指定为 null 表示将不限递归层数完整遍历对象。 如果 colors 值为 true，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。

特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了 toString 方法也不会调用。

```
var util = require('util'); 
function Person() { 
    this.name = 'byvoid'; 
    this.toString = function() { 
    return this.name; 
    }; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true)); 
```

运行结果是：

```
Person { name: 'byvoid', toString: [Function] }
Person {
  name: 'byvoid',
  toString: 
   { [Function]
     [length]: 0,
     [name]: '',
     [arguments]: null,
     [caller]: null,
     [prototype]: { [constructor]: [Circular] } } }
```

------

## util.isArray(object)

如果给定的参数 "object" 是一个数组返回 true，否则返回 false。

```
var util = require('util');

util.isArray([])
  // true
util.isArray(new Array)
  // true
util.isArray({})
  // false
```

------

## util.isRegExp(object)

如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。

```
var util = require('util');

util.isRegExp(/some regexp/)
  // true
util.isRegExp(new RegExp('another regexp'))
  // true
util.isRegExp({})
  // false
```

------

## util.isDate(object)

如果给定的参数 "object" 是一个日期返回true，否则返回false。

```
var util = require('util');

util.isDate(new Date())
  // true
util.isDate(Date())
  // false (without 'new' returns a String)
util.isDate({})
  // false
```

更多详情可以访问 [http://nodejs.org/api/util.html](https://nodejs.org/api/util.html) 了解详细内容。

 [Node.js 全局对象](https://www.runoob.com/nodejs/nodejs-global-object.html)

[Node.js 文件系统](https://www.runoob.com/nodejs/nodejs-fs.html) 

## 1 篇笔记 写笔记

1. 

     qwq

    106***4150@qq.com

   20

   **util.inhrits()** 可以继承原型方法（node 版本 V10.8.0）。

   ```
   let util = require('util');
   function Base() {
           this.name = 'name';
           this.base = 1995;
           this.sayHello = function() {
                   console.log('hello ' + this.name);
           }
   }
   
   Base.prototype.showName = function() {
           console.log(this.name);
   }
   
   function sub() {
           this.name = 'sub';
   }
   
   util.inherits(sub, Base);
   
   let baseObj = new Base();
   console.log(baseObj);
   baseObj.showName();
   
   let subObj = new sub();
   console.log(subObj);
   console.log(subObj.name);
   subObj.showName();
   ```

   运行结果：

   ```
   Base { name: 'name', base: 1995, sayHello: [Function] }
   name
   sub { name: 'sub' }
   sub
   ```