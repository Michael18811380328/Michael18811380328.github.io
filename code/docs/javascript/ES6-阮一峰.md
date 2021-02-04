## ES6补充

#### 0.浏览器中的ES6

方法一：引入文件相关js文件

```html
<script src="traceur.js"></script>
<script src="bootstrap.js"></script>
<script type="module">
  //code  这里写你的jsx代码
</script>
```

注意：严格模式('use strict')，注意格式。

#### 1.let和const

优先使用常量(const)。let 定义变量 ，有块级别作用域（只在本块有用，不会影响其他的）

注意：在同一个块级作用域中，let不能重复定义同一变量。

```js
const a = 'Tab';
alert(a);	
// 1.不能重复定义
// 2.常量不能修改
```

#### 2.模板引擎（字符串拼接）

新的“字符串拼接”方法比较简单，没有繁琐的加号和引号，只需要在所需要的字符串“边界”加上``即可。

```js
var str1 = `我是${name}，今年${age}岁，性别${sex}的了，爱好${hobby}`; //注意此处有两个“ `` ”
var str2 = '我是'+name+'，今年'+age+'岁，性别'+sex+'，爱好'+hobby+''; //这个是原来的写法
```

#### 3. 解构赋值

就根据“对应”赋值，请看以下几个例子：

```js
'use strict';
let a = 12;
let b = 5;
let c = 8;

let [a,b,c] = [12,5,8];
console.log(a,b,c);  //12 5 8
```

json格式的赋值

```js
let {a,b,c} = {a:12,b:5,c:8};
let [a,[b,c],d] = [12,[1,3],8];
```

与顺序无关，与结构有关（左右结构一致）：

```js
let {a,b,c} = {b:5,a:12,c:8};
console.log(a,b,c);   //12  5  8
```

应用，我们现在利用jsonp获取了一组数据

```js
let json = {
  q:"aaa",
  p:false,
  s:["aaa"]
};
let {s,q} = json;
console.log(s,q);  //s为数组的数据，q为字符串aaa
```

解构赋值的默认值问题

```js
let {time=1000,id=0} = {};
console.log(time,id);   //  1000   0
```



#### 4.扩展运算符

数组或者对象的深浅拷贝问题，今天我们就利用es6的三个点来处理下。上面的代码就是arr2与arr公用一段内存地址，所以导致srr2数据改变的时候arr也必然会变的。这就是浅拷贝。

```js
var arr = [12,5,8];
arr2 = arr;
arr2.pop();
alert(arr);  // 12 5
```

那么我们下面就简单的说几种深度复制数组方式。
方式一：利用for循环把原数组的每一项都遍历，然后扔到新的数组中。

```js
var arr = [12,5,8];
var arr2 =[];
for(var i = 0;i < arr.length; i++){
  arr2.push(arr[i]);    
}
arr2.pop();
alert(arr);   //  12  5  8
```

方式二：利用Array.from(原数组);

```js
var arr = [12,5,8];
var arr2 = Array.from(arr);
arr2.pop();
console.log(arr2);  // 12  5 
console.log(arr);   // 12  5  8
```



**附加：Array.from用法**

**Array.from(arr, [mapfn], [thisArg])**
arr：伪数组或者可以遍历的对象(具有length属性)。length绝对够数组会转化成什么样。from会根据length属性创建新的数组。
mapFn：类似于array.map方法，对数组元素进行操作后返回数组
thisArg: 对于this关键字的指向。

**用途**

1.将具有length的对象转化为数组

2.数组深复制

3.计算字符串真实长度Array.from(string).length

4.可以控制函数执行的次数

~~~js
Array.from({length:3}, () => {
  console.log('0');
});
~~~

方式三：扩展运算符

```js
var arr = [12,5,8];
var arr2 = [...arr];
```

我们知道函数的参数是一个集合(arguments)并不是一个真正的数组。那么我们怎么才能在这个arguments中加一项呢？？

```js
function show(...arr){
  arr.push(8);
  console.log(arr);
}
show(12,5);  //12 5 8
```



#### 5. Map对象

ES6提供了新的数据结构Map，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。{"b" => "banana"}并且每一项都包含了key和value
我们来新建一个Map对象，并为其赋值：

```js
let map = new Map();
map.set('a','apple');
map.set('b','banana');
console.log(map); 
//Map {"a" => "apple", "b" => "banana"}

console.log(map.get('b'));  
map.delete("a");

console.log(map.size); //1
console.log(map.length); //undefined
```

获取Map对象里面的值（map.get();) 

删除Map对象里面的值（map.delete();）

获取Map对象的“长度”：(map.size());

迭代器对象：map.entries()

```js
let map = new Map();
map.set('a','apple');
map.set('b','banana');
console.log(map.entries());  //  MapIterator {["a", "apple"], ["b", "banana"]}

// MDN说明: Map.prototype.entries() 这个方法返回一个新的迭代器对象，对于每一个元素包含键值对(在这个map对象中按照插入的顺序输出)
// The entries() method returns a new Iterator(迭代器) object that contains the [key, value] pairs for each element in the Map object in insertion order.
//关于迭代器(Iterator)和生成器(generator) 在ES6中新引入，单独学习。

// 迭代器中的元素不能直接读取，可以通过下面两种方法进行读取。
// 方法一：
let arr = [];
let map = new Map();
for(let [key, val] of map.entries()) {
    arr.push([key, val]);
}
// 方法二：
var map = new Map();
Array.from(map);
```

遍历Map对象（for...of... ）

```js
let map = new Map();
map.set('a','apple');
map.set('b','banana');
for(let name of map){
  console.log(name);  //["a", "apple"]  ["b", "banana"]
}
//循环出来的是以数组套键值对的方式
```

如果我们只要Map中的“值”怎么办？

```js
let map = new Map();
map.set('a','apple');
map.set('b','banana');
for(let val of map.values()){
  console.log(val);   //apple   banana
}
```

如果我们只要Map中的“键(key)”怎么办？

```js
let map = new Map();
map.set('a','apple');
map.set('b','banana');
for(let key of map.keys()){
  console.log(key);  // a  b
}
```

如果我们只要Map中的“键 --- 值”怎么办？

```js
let map = new Map();
map.set('a','apple');
map.set('b','banana');
for(let [key,value] of map.entries()){
  console.log(key,value);   //a apple     b banana
}
```



#### 6. for循环

a) for ... in ...循环

```js
//循环数组
let arr = [12,5,8];
for(let i = 0;i<arr.length;i++) {
  console.log(i);    //0 1  2
  console.log(arr[i]);  //12  5  8
} 
let arr = [12,5,8];
for(let i in arr) {
  console.log(i);      //0 1  2
  console.log(arr[i]);  //12  5  8
}
```

```js
//循环json数据
let json = {a:12,b:5,c:8};
for(let name in json){
  console.log(name);  //a  b c
  console.log(json[name]);  //12 5 8
}
```

b) for ... of ...循环

```js
//循环数组
let arr = [12,5,8];
for(let name of arr){
  console.log(name);  // 12 5 8
}
//循环json数据
let json = {a:'apple',b:'banana'};
for(let name of json){
  console.log(name); //error
}
//报错，因为不能用for ...of...来循环json数据
```

c) 删除json的某一条数据

```json
let json = {a:12,b:5};
delete json.a;
console.log(json);  // b:5
```



#### 7. 箭头函数

ES6标准新增了一种新的函数：Arrow Function（箭头函数）。

我们先回顾下ES5函数定义与调用：

```js
var show = function(){
  alert(12);
};
show();   // 12
```

```js
const show = (num1, num2) =>{
  alert(num1 + num2);
};
show(1, 11);  // 12 
```

a) 函数有返回值

```js
//ES5函数写法
var sum = function(a,b){
  return a+b;
}
alert(sum(12,5));
//ES6函数写法
let sum = (a,b) => {
  return a+b;
}
alert(sum(12,5));
//进化一下  ---   省略花括号
let sum = (a,b) => a+b;
alert(sum(12,5));
```

b) 参数是1个

```js
var show = function(a){ return 'welcome'}
//相当于   省略括号
var show = a => 'welcome'
```

c) 参数是0个

```js
var show = function(){ return 'welcome'}
//相当于   省略括号
var show = () => 'welcome'
```

**注意：箭头函数下 ，arguments 不能使用了**
```js
var show = (a,b) => console.log(this.arguments);     // 报错
```

数组排序

```js
var arr = [12,55,8];
//es5写法
arr.sort(function(n1,n2){
  return n1 - n2;
});
//es6写法
arr.sort((n1,n2) => n1-n2);
alert(arr);
```



#### 8. 面向对象

##### a) 单例模式（单体模式）

```js
let name = 'Datura';
let age = 18;
let person = {
  name,
  age,
  sex:'Man',
  showName:function(){return this.name},
  showAge:function(){return this.age}    
};
alert(person.showAge());    //18
alert(person.sex);    //Man
```

##### b) 工厂模式

###### es5的面向对象工厂模式：

首先让我们一起来回一下es5面向对象的写法：
i) 首先定义一个构造函数（此处是 Person）；
ii) 定义Person的“属性”，用this.xxx = xxx；
iii) 把方法挂在原型上，Person.prototype.xxx = function(){ xxx }；
iiii) 调用

```js
function Person(name,age){
  this.name = name;
  this.age = age;
}
Person.prototype.showName = function() {
  return this.name;    
};
Person.prototype.showAge = function() {
  return this.age;    
};
var p1 = new Person('alice',18);
alert(p1.showAge());   //18
```

###### es5继承：

```js
//定义一个Person构造函数
function Person(name,age){
  this.name = name;
  this.age = age;
}
Person.prototype.showName = function(){
  return this.name;    
};
Person.prototype.showAge = function(){
  return this.age;    
};

//Worker构造函数
//继承属性 
function Worker(name,age,job) {
  //改变this指向，继承Person的属性
  Person.apply(this,arguments);
  //定义worker新的属性
  this.job = job;
}

//继承方法
Worker.prototype = new Person();
//给worker指定“亲爹”
Worker.prototype.construcotr = Worker;
//定义worker新的方法
Person.prototype.showJob = function(){
  return this.job;
};

//调用
var p2 = new Worker('Datura',20,'boss');
alert(p2.showName());   //Datura
alert(p2.showJob());      //boss
```



###### es6的面向对象工厂模式

i) 首先定义一个构造函数（此处是 Person），注意用class关键字而不是function；
ii) 定义Person的“属性”，写在constructor(){this.xxx = xxx }；
iii) 定义方法，xxx () { xxx }；
iiii) 调用
iiiii) 注意constructor和方法之间没有“;”，可以给属性初始值或默认值

```js
class Person{
  constructor(name, age=25){  //可以给属性初始值或默认值,正常es的function函数也可以给默认值
    this.name = name;
    this.age = age;
  }
  showName(){
    return this.name;    
  }
  showAge(){
    return this.age;
  }    
}
var p1 = new Person('alice',18);
alert(p1.showAge());   // 18
```

###### es6继承：

```js
//父类构造函数Person
class Person{
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
  showName(){
    return this.name;   
  }
  showAge(){
    return this.age;
  }    
}

//子类继承父类
class Worker extends Person {
  constructor(name,age,job='搬砖的'){   //继承父类属性，并新加属性给默认值
    super(name,age);    
    //这里必须传参，也就是需要把原来构造函数的参数传入。
    //子类必须在constructor方法中调用super方法，否则新建实例时会报错。
    //这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
    this.job = job;
  }
  //给子类定义新方法showJob
  showJob(){
    return this.job;
  }    
}
//调用
var w1 = new Worker('rose',17);
alert(w1.showJob());
alert(w1.showName());
```



#### 9. 模块化

注意：目前还没有浏览器支持模块化 第三方：seajs require.js 模块化工具
那么我们来学习下,es6自带的模块化

~~~js
a).导出，将变量a“暴露”出去
const a =12;
export default a;

b).导入1.js文件“暴露”的东西，并用modA 接收
import modA from './1.js'; (./代表同级目录下)

c).同一个模块导出多个值 export default {a:12,b:5};

d).不同模块间的引入
import modA from './mod1.js';
import modB from './mod2.js';
let sum = modA+modB;
export default sum;
~~~

实例：

```js
//mod1.js文件的内容
const a = 12;
export default a;
```

```js
//mod2.js文件的内容
const b = 5;
export default c;
```

```html
//主入口（模块）的内容
<script src="traceur.js"></script>
<script src="bootstrap.js"></script>
<script type="module">
    import modA from './mod1.js';
    import modB from './mod2.js';
    alert(modA+modB);   //17
</script>
```

一个子模块“暴露”一个json数据

```js
//mod3.js文件的内容
export default {a:12,b:5};
//主入口（模块）的内容
import modA from './mod3.js';
console.log(modA.a+modA.b);   //  17
```
在研究react和webpack的时候，经常看到在js文件中出现require，还有import，这两个都是为了JS模块化编程使用。CSS的是**@import**



##### 1.静态化

ES6 模块的设计思想，是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

Require是CommonJS的语法，CommonJS的模块是对象，输入时必须查找对象属性。

```js
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

above：整体加载fs模块（即加载fs所有方法），生成一个对象"_fs"，然后再从这个对象上读取三个方法，这叫“运行时加载”，因为只有运行时才能得到这个对象，不能在编译时做到静态化。

ES6模块不是对象，而是通过export命令显示指定输出代码，再通过import输入。

```js
import { stat, exists, readFile } from 'fs';
```

above：从fs加载“stat, exists, readFile” 三个方法，其他方法不加载



##### 2.严格模式

ES6模块默认使用严格模式，无论是否声明“use strict”

ES6 模块之中，顶层的**this**指向`undefined`，即不应该在顶层代码使用`this`。 

Module 主要由两个命令组成，import和export，export用于规定模块的对外接口，import命令用于输入其他模块提供的功能



##### 3.Export

模块是独立的文件，该文件内部的所有的变量外部都无法获取。如果希望获取某个变量，必须通过export输出，

```js
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```

或者用更好的方式：用大括号指定要输出的一组变量

```js
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```

除了输出变量，还可以输出函数或者类（class），

```js
export function multiply(x, y) {
  return x * y;
};
```

还可以批量输出，同样是要包含在大括号里，也可以用as重命名：

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

**Attention:**

export 命令规定的是对外接口，必须与模块内部变量建立一一对应的关系

```js
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};


// 报错
export 1;

// 报错
var m = 1;
export m;
```

报错的写法原因是：没有提供对外的接口，第一种直接输出1，第二种虽然有变量m，但还是直接输出1，导致无法解构。

同样的，`function`和`class`的输出，也必须遵守这样的写法。

```js
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```

And：export语句输出的接口，都是和其对应的值是动态绑定的关系，即通过该接口取到的都是模块内部实时的值。

位置：export模块可以位于模块中的任何位置，但是必须是在模块顶层，如果在其他作用域内，会报错。

```js
function foo() {
  export default 'bar' // SyntaxError
}
foo()
```

##### 4.Import

export定义了模块的对外接口后，其他JS文件就可以通过import来加载这个模块，

```js
// main.js
import {firstName, lastName, year} from './profile';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```

import命令接受一对大括号，里面指定要从其他模块导入的变量名，**必须与被导入模块（profile.js）对外接口的名称相同**。

如果想重新给导入的变量一个名字，可以用as关键字，

```js
import { lastName as surname } from './profile';
```

import后的from 可以指定需要导入模块的路径名，可以是绝对路径，也可以是相对路径， .js路径可以省略，如果只有模块名，不带有路径，需要有配置文件指定。

注意，`import`命令具有**提升效果**，会提升到整个模块的头部，首先执行。（是在编译阶段执行的）

因为import是静态执行的，不能使用表达式和变量，即在运行时才能拿到结果的语法结构（e.g. if...else...）

##### 5.module的整体加载

除了指定加载某个输出值，还可以用（*）指定一个对象，所有的变量都会加载在这个对象上。

```js
// circle.js。输出两个函数
export function area(radius) {
  return Math.PI * radius * radius;
}
export function circumference(radius) {
  return 2 * Math.PI * radius;
}


// main.js 加载在个模块
import { area, circumference } from './circle';
console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));

//上面写法是逐一指定要加载的方法，整体加载的写法如下。
import * as circle from './circle';
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

注意，模块整体加载所在的那个对象（上例是`circle`），应该是可以**静态分析的**，所以不允许运行时改变。

```js
import * as circle from './circle';

// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};
```

##### 6.export default

之前的例子中，使用import导入时，都需要知道模块中所要加载的变量名或函数名，用户可能不想阅读源码，只想直接使用接口，就可以用export default命令，为模块指定输出

```js
// export-default.js
export default function () {
  console.log('foo');
}
```

其他模块加载该模块时，`import`命令可以为该匿名函数指定任意名字。

```js
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

export default也可以用于非匿名函数前。

下面比较一下默认输出和正常输出。

```js
// 第一组
export default function crc32() { // 输出
  // ...
}

import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
  // ...
};

import {crc32} from 'crc32'; // 输入
```

可以看出，==使用export default时，import语句不用使用大括号==。

`import`和`export`命令只能在模块的顶层，不能在代码块之中。否则会语法报错。

这样的设计，可以提高编译器效率，但是没有办法实现运行时加载。

因为require是运行时加载，所以import命令没有办法代替require的动态加载功能。

所以引入了**import()函数**。完成动态加载。

```js
import(specifier)
```

specifier用来指定所要加载的模块的位置。import能接受什么参数，import()可以接受同样的参数。

import()返回一个Promise对象。

```js
const main = document.querySelector('main');
import(`./section-modules/${someVariable}.js`).then(module => {
  module.loadPageInto(main);
}).catch(err => {
  main.textContent = err.message;
});
```



**7.import()函数适用场合**

 1）按需加载：

```js
button.addEventListener('click', event => {
  import('./dialogBox.js').then(dialogBox => {
    dialogBox.open();
  }).catch(error => {
    /* Error handling */
  })
});
```

above： import模块在事件监听函数中，只有用户点击了按钮，才会加载这个模块（很少这样写）。

 2）条件加载：

import()可以放在if...else语句中，实现条件加载。

```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```
