# TS 常见问题整理（60多个，持续更新ing）

2020-03-03阅读 1.1K0

https://cloud.tencent.com/developer/article/1593335

## **前言**

- 用 React 全家桶 + TS 写项目快一年了，大大小小的坑踩了很多，在此整理了在项目中遇到的疑惑和问题。
- 体会：不要畏惧 TS，别看 TS 官方文档内容很多，其实在项目中常用的都是比较基础的东西，像泛型运用、一些高级类型这种用的很少（封装库、工具函数、UI组件时用的比较多）。只要把常用的东西看熟，最多一个小时就能上手 TS。
- 如果本文对你有所帮助，还请点个赞，谢谢啦~~

## **纯 TS 问题**

### **1. TS 1.5 版本的改动**

- **TypeScript 1.5 之前的版本：**`module` 关键字既可以称做“内部模块”，也可以称做“外部模块”。这让刚刚接触 TypeScript 的开发者会有些困惑。
- **TypeScript 1.5 的版本：** 术语名已经发生了变化，“内部模块”的概念更接近于大部分人眼中的“**命名空间**”， 所以自此之后称作“**命名空间**”（**也就是说 module X {…} 相当于现在推荐的写法 namespace X {…}）**，而 "外部模块" 对于 JS 来讲就是模块（ES6 模块系统将每个文件视为一个模块），所以自此之后简称为“**模块**”。
- **不推荐使用命名空间**

**之前**

```javascript
module Math {
    export function add(x, y) { ... }
}
```

**之后**

```javascript
namespace Math {
    export function add(x, y) { ... }
}
```

### **2. null 和 undefined 是其它类型（包括 void）的子类型，可以赋值给其它类型（如：数字类型），赋值后的类型会变成 null 或 undefined**

- **默认情况下，编译器会提示错误，这是因为 tsconfig.json 里面有一个配置项是默认开启的。**

```javascript
// tsconfig.json 

{
      /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    // 对 null 类型检查，设置为 false 就不会报错了
    // "strictNullChecks": true,              /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
}
```

- **`strictNullChecks`** 参数用于新的严格空检查模式，在严格空检查模式下，null 和 undefined 值都不属于任何一个类型，它们只能赋值给自己这种类型或者 any

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/kfdna6foxh.png?imageView2/2/w/1620)

### **3. never 和 void 的区别**

- **void 表示没有任何类型（可以被赋值为 null 和 undefined）**。
- **never 表示一个不包含值的类型，即表示永远不存在的值**。
- **拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。**

### **4. 元祖越界问题**

```javascript
let aaa: [string, number] = ['aaa', 5];
// 添加时不会报错
aaa.push(6);
// 打印整个元祖不会报错
console.log(aaa); // ['aaa',5,6];
// 打印添加的元素时会报错
console.log(aaa[2]); // error
```

### **5. 枚举成员的特点**

- 是只读属性，无法修改
- 枚举成员值默认从 0 开始递增，可以自定义设置初始值

```javascript
enum Gender {
    BOY = 1,
    GRIL
}
console.log(Gender.BOY);// 1
console.log(Gender);// { '1': 'BOY', '2': 'GRIL', BOY: 1, GRIL: 2 }
```

- 枚举成员值
- 可以没有初始值
- 可以是一个对常量成员的引用
- 可以是一个常量表达式
- 也可以是一个非常量表达式

```javascript
enum Char {
    // const member 常量成员：在编译阶段被计算出结果
    a,                 // 没有初始值
    b = Char.a,// 对常量成员的引用
    c = 1 + 3, // 常量表达式

    // computed member 计算成员：表达式保留到程序的执行阶段
    d = Math.random(),// 非常量表达式
    e = '123'.length,
    // 紧跟在计算成员后面的枚举成员必须有初始值
    f = 6,
    g
}
```

### **6. 常量枚举与普通枚举的区别**

- **常量枚举会在编译阶段被删除**
- **枚举成员只能是常量成员**

```javascript
const enum Colors {
    Red,
    Yellow,
    Blue
}
// 常量枚举会在编译阶段被删除
let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];
```

编译成 JS

```javascript
"use strict";
var myColors = [0 /* Red */, 1 /* Yellow */, 2 /* Blue */];
```

- **常量枚举\*不能包含计算成员，如果\*包含了计算成员，则会在编译阶段报错**

```javascript
// 报错
const enum Color {Red, Yellow, Blue = "blue".length};
console.log(Colors.RED);
```

### **7. 枚举的使用场景**

以下代码存在的问题：

- **可读性差**：很难记住数字的含义
- **可维护性差**：硬编码，后续修改的话牵一发动全身

```javascript
function initByRole(role) {
    if (role === 1 || role == 2) {
        console.log("1,2")
    } else if (role == 3 || role == 4) {
        console.log('3,4')
    } else if (role === 5) {
        console.log('5')
    } else {
        console.log('')
    }
}
```

使用枚举后

```javascript
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest
}

function init(role: number) {
  switch (role) {
    case Role.Reporter:
      console.log("Reporter:1");
      break;
    case Role.Developer:
      console.log("Developer:2");
      break;
    case Role.Maintainer:
      console.log("Maintainer:3");
      break;
    case Role.Owner:
      console.log("Owner:4");
      break;
    default:
      console.log("Guest:5");
      break;
  }
}

init(Role.Developer);
```

### **8. 什么是可索引类型接口**

- **一般用来约束数组和对象**

```javascript
// 数字索引——约束数组
// index 是随便取的名字，可以任意取名
// 只要 index 的类型是 number，那么值的类型必须是 string
interface StringArray {
  // key 的类型为 number ，一般都代表是数组
  // 限制 value 的类型为 string
  [index:number]:string
}
let arr:StringArray = ['aaa','bbb'];
console.log(arr);


// 字符串索引——约束对象
// 只要 index 的类型是 string，那么值的类型必须是 string
interface StringObject {
  // key 的类型为 string ，一般都代表是对象
  // 限制 value 的类型为 string
  [index:string]:string
}
let obj:StringObject = {name:'ccc'};
```

### **9. 什么是函数类型接口**

- **对方法传入的参数和返回值进行约束**

```javascript
// 注意区别

// 普通的接口
interface discount1{
  getNum : (price:number) => number
}

// 函数类型接口
interface discount2{
  // 注意:
  // “:” 前面的是函数的签名，用来约束函数的参数
  // ":" 后面的用来约束函数的返回值
  (price:number):number
}
let cost:discount2 = function(price:number):number{
   return price * .8;
}

// 也可以使用类型别名
type Add = (x: number, y: number) => number
let add: Add = (a: number, b: number) => a + b
```

### **10. 什么是类类型接口**

- 如果接口用于一个类的话，那么接口会表示“行为的抽象”
- **对类的约束，让类去实现接口，类可以实现多个接口**
- **接口只能约束类的公有成员（实例属性/方法），无法约束私有成员、构造函数、静态属性/方法**

```javascript
// 接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
    name: string;

         // ":" 前面的是函数签名，用来约束函数的参数
    // ":" 后面的用来约束函数的返回值
    speak(words: string): void
}

interface Speakable2 {
    age: number;
}

class Dog implements Speakable, Speakable2 {
    name!: string;
    age = 18;

    speak(words: string) {
        console.log(words);
    }
}

let dog = new Dog();
dog.speak('汪汪汪');
```

### **11. 什么是混合类型接口**

- 一个对象可以同时做为函数和对象使用

```javascript
interface FnType {
    (getName:string):string;
}

interface MixedType extends FnType{
    name:string;
    age:number;
}
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### **12. 什么是函数重载**

- 在 Java 中的函数重载，指的是两个或者两个以上的同名函数，**参数类型不同或者参数个数不同**。函数重载的好处是：不需要为功能相似的函数起不同的名称。
- 在 TypeScript 中，表现为给同一个函数提供多个函数类型定义，**适用于接收不同的参数和返回不同结果的情况。**
- TS 实现函数重载的时候，要求定义一系列的函数声明，在类型最宽泛的版本中实现重载（**前面的是函数声明，目的是约束参数类型和个数，最后的函数实现是重载，表示要遵循前面的函数声明。一般在最后的函数实现时用 any 类型**）
- 函数重载在实际应用中使用的比较少，一般会用联合类型或泛型代替
- 函数重载的声明只用于类型检查阶段，在编译后会被删除
- **TS 编译器在处理重载的时候，会去查询函数申明列表，从上至下直到匹配成功为止，所以要把最容易匹配的类型写到最前面**

```javascript
function attr(val: string): string;
function attr(val: number): number;
// 前面两行是函数申明，这一行是实现函数重载
function attr(val: any): any {
    if (typeof val === 'string') {
        return val;
    } else if (typeof val === 'number') {
        return val;
    } 
}

attr('aaa');
attr(666);
```

- 上面的写法声明完函数后，必须实现函数重载。也可以**只声明函数**。

```javascript
// 后写的接口中的函数声明优先级高
interface Cloner111 {
    clone(animal: Animal): Animal;
}
interface Cloner111 {
    clone(animal: Sheep): Sheep;
}
interface Cloner111 {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}

// ==> 同名接口会合并
// 后写的接口中的函数声明优先级高
interface Cloner111 {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}


interface Cloner222 {
        // 接口内部按书写的顺序来排，先写的优先级高
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Sheep): Sheep;
    clone(animal: Animal): Animal;
}
```

### **13. 什么是访问控制修饰符**

```javascript
class Father {
    str: string; // 默认就是 public
    public name: string;   // 在定义的类中、类的实例、子类、子类实例都可以访问
    protected age: number; // 只能在定义的类和子类中访问，不允许通过实例（定义的类的实例和子类实例）访问
    private money: number; // 只能在定义的类中访问，类的实例、子类、子类实例都不可以访问
    constructor(name: string, age: number, money: number) {
        this.name = name;
        this.age = age;
        this.money = money;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}

const fa = new Father('aaa', 18, 1000);
console.log(fa.name);// aaa
console.log(fa.age);// error
console.log(fa.money);// error

class Child extends Father {
    constructor(name: string, age: number, money: number) {
        super(name, age, money);
    }

    desc() {
        console.log(`${this.name} ${this.age} ${this.money}`);
    }
}

let child = new Child('bbb', 18, 1000);
console.log(child.name);// bbb
console.log(child.age);// error
console.log(child.money);// error
```

### **14. 重写(override) vs 重载(overload)**

- **重写是指子类重写“\*继承\*”自父类中的方法** 。虽然 TS 和JAVA 相似，但是 TS 中的继承本质上还是 JS 的“**继承**”机制—**原型链机制**
- **重载是指为同一个函数提供多个类型定义**

```javascript
class Animal {
    speak(word: string): string {
        return '动作叫:' + word;
    }
}

class Cat extends Animal {
    speak(word: string): string {
        return '猫叫:' + word;
    }
}

let cat = new Cat();
console.log(cat.speak('hello'));

/**--------------------------------------------**/

function double(val: number): number
function double(val: string): string
function double(val: any): any {
    if (typeof val == 'number') {
        return val * 2;
    }
    return val + val;
}

let r = double(1);
console.log(r);
```

### **15. 继承 vs 多态**

- **继承**：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- **多态**：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应

```javascript
class Animal {
    speak(word: string): string {
        return 'Animal: ' + word;
    }
}

class Cat extends Animal {
    speak(word: string): string {
        return 'Cat:' + word;
    }
}

class Dog extends Animal {
    speak(word: string): string {
        return 'Dog:' + word;
    }
}

let cat = new Cat();
console.log(cat.speak('hello'));
let dog = new Dog();
console.log(dog.speak('hello'));
```

### **16. 什么是泛型**

- **泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，使用时再去指定类型的一种特性。**
- **可以把泛型理解为代表类型的参数**

```javascript
// 我们希望传入的值是什么类型，返回的值就是什么类型
// 传入的值可以是任意的类型，这时候就可以用到 泛型

// 如果使用 any 的话，就失去了类型检查的意义
function createArray1(length: any, value: any): Array<any> {
    let result: any = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

let result = createArray1(3, 'x');
console.log(result);

// 最傻的写法：每种类型都得定义一种函数
function createArray2(length: number, value: string): Array<string> {
    let result: Array<string> = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

function createArray3(length: number, value: number): Array<number> {
    let result: Array<number> = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

// 或者使用函数重载，写法有点麻烦
function createArray4(length: number, value: number): Array<number>
function createArray4(length: number, value: string): Array<string>
function createArray4(length: number, value: any): Array<any> {
    let result: Array<number> = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray4(6, '666');
```

**使用泛型**

```javascript
// 有关联的地方都改成 <T>
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

// 使用的时候再指定类型
let result = createArray<string>(3, 'x');

// 也可以不指定类型，TS 会自动类型推导
let result2 = createArray(3, 'x');
console.log(result);
```

### **17. 什么是类型谓词**

- 类型保护函数：要自定义一个类型保护，只需要简单地为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词
- **类型谓词**的语法为 `parameterName is Type` 这种形式，其中 `parameterName` 必须是当前函数签名里的一个参数名

```javascript
interface Bird {
    fly()
    layEggs()
}
interface Fish {
    swim()
    layEggs()
}

function getSmallPet():Fish | Bird{
    return ;
}
let pet = getSmallPet();

pet.layEggs();
// 当使用联合类型时，如果不用类型断言，默认只会从中获取共有的部分
(pet as Fish).swim();
pet.swim();
```

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/jh1xlqfqrm.png?imageView2/2/w/1620)

image.png

```javascript
interface Bird {
    fly()
    layEggs()
}
interface Fish {
    swim()
    layEggs()
}

function getSmallPet():Fish | Bird{
    return ;
}
let pet = getSmallPet();

// 使用类型谓词 
function isFish(pet:Fish | Bird):pet is Fish {
    return (pet as Fish).swim !== undefined;
}

if(isFish(pet)){
    pet.swim();
}else{
    pet.fly();
}
```

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/q5h5vuxrg2.png?imageView2/2/w/1620)

image.png

### **18. 可选链运算符的使用**

- **可选链**运算符是一种先检查属性是否存在，再尝试访问该属性的运算符，其符号为 `?.`
- 如果运算符左侧的操作数 `?.` 计算为 undefined 或 null，则表达式求值为 undefined 。否则，正常触发目标属性访问、方法或函数调用。
- **可选链运算符处于 stage3 阶段，使用 @babel/plugin-proposal-optional-chaining 插件可以提前使用，TS 3.7版本正式支持使用，以前的版本会报错**

```javascript
a?.b;
// 相当于 a == null ? undefined : a.b;
// 如果 a 是 null/undefined，那么返回 undefined，否则返回 a.b 的值.

a?.[x];
// 相当于 a == null ? undefined : a[x];
// 如果 a 是 null/undefined，那么返回 undefined，否则返回 a[x] 的值

a?.b();
// 相当于a == null ? undefined : a.b();
// 如果 a 是 null/undefined，那么返回 undefined
// 如果 a.b 不是函数的话，会抛类型错误异常，否则计算 a.b() 的结果
```

### **19. 非空断言符的使用**

- **TS 3.7版本正式支持使用**

```javascript
let root: any = document.getElementById('root');
root.style.color = 'red';

let root2: (HTMLElement | null) = document.getElementById('root');
// 非空断言操作符--> 这样写只是为了骗过编译器，防止编译的时候报错，打包后的代码可能还是会报错
root2!.style.color = 'red';
```

### **20. 空值合并运算符的使用**

- **TS 3.7版本正式支持使用**
- **`||` 运算符的缺点：** 当左侧表达式的结果是数字 0 或空字符串时，会被视为 `false`。
- **空值合并运算符：只有左侧表达式结果为 `null` 或 `undefined` 时**，才会返回右侧表达式的结果。**通过这种方式可以明确地区分 `undefined、null` 与 `false` 的值**。

```javascript
const data = {
    str:'',
    // num:0,
    flag:false,
    // flag: null,
};

// data.str 为 "" 时
let str1 = data.str || '空' // '空'
// data.num 为 0 时
let num1 =  data.num || 666 // 666
// data.flag 为 false 时
let status1 =  data.flag || true  // true


// data.str 为 "" 时，可以通过。仅在 str 为 undefined 或者 null 时，不可以通过
let st2r = data.str ?? '空';  
// data.num 为 0 时，可以通过。仅在 num 为 undefined 或者 null 时，不可以通过
let num2 = data.num ?? 666; 
// data.flag 为 false 时，可以通过。仅在 flag 为 undefined 或者 null 时，不可以通过
let status2 = data.flag ?? true;

console.log('str=>', str2);
console.log('num=>', num2);
console.log('status=>', status2);
```

### **21. typeof class 和直接用 class 作为类型有什么区别**

```javascript
class Greeter {
    static message = 'hello';

    greet(){
        return Greeter.message;
    }
}

// 获取的是实例的类型，该类型可以获取实例对象上的属性/方法
let greeter1:Greeter = new Greeter();
console.log(greeter1.greet());// 'hello'


// 获取的是类的类型，该类型可以获取类上面的静态属性/方法
let greeterTwo:typeof Greeter = Greeter;
greeterTwo.message = 'hey';

let greeter2:Greeter = new greeterTwo();
console.log(greeter2.greet());// 'hey'
```

### **22. TS 中的 never 类型具体有什么用？**

### **23. 当使用联合类型时，在类型未确定的情况下，默认只会从中获取共有的部分**

- 使用类型断言

```javascript
interface Bird {
    fly()
    layEggs()
}
interface Fish {
    swim()
    layEggs()
}

function getSmallPet():Fish | Bird{
    return ;
}

let pet = getSmallPet();
pet.layEggs();
// 当使用联合类型时，在类型未确定的情况下，默认只会从中获取共有的部分
// 需要使用类型断言
(pet as Fish).swim();
pet.swim();
```

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/jh1xlqfqrm.png?imageView2/2/w/1620)

image.png

- 可区分的联合类型（借助 never ）

```javascript
enum KindType{
    square = 'square',
    rectangle = 'rectangle',
    circle = 'circle',
}

interface Square {
    kind: KindType.square;
    size: number;
}

interface Rectangle {
    kind: KindType.rectangle;
    width: number;
    height: number;
}

interface Circle {
    kind: KindType.circle;
    radius: number;
}

type Shape = Square | Rectangle | Circle;

function area1(s: Shape) {
    // 如果联合类型中的多个类型，拥有共有的属性，那么就可以凭借这个属性来创建不同的类型保护区块
    // 这里 kind 是共有的属性
    switch (s.kind) {
        case KindType.square:
            return s.size * s.size;
        case KindType.rectangle:
            return s.height * s.width;
        default:
            return;
    }
}
// 以上代码有隐患，如果后续新增类型时，TS 检查以上代码时，虽然缺失后续新增的类型，但不会报错
console.log(area1({kind: KindType.circle, radius: 1}));


function area2(s: Shape) {
    switch (s.kind) {
        case KindType.square:
            return s.size * s.size;
        case KindType.rectangle:
            return s.height * s.width;
        case KindType.circle:
            return Math.PI * s.radius ** 2;
        default:
            // 检查 s 是否是 never 类型
            // 如果是 never 类型，那么上面的分支语句都被覆盖了，就永远都不会走到当前分支
            // 如果不是 never 类型。就说明前面的分支语句有遗漏，需要补上
            return ((e: never) => {
                throw new Error(e)
            })(s)
    }
}

console.log(area2({kind: KindType.circle, radius: 1}));
```

### **24. What's on version 3.3.3333?**

### **25. 在全局环境中，不能给某些变量声明类型**

```javascript
let name: string;

// 加了 export 后就不会报错
// export {} 
```

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/23qvf177nl.png?imageView2/2/w/1620)

image.png

### **26. 不必要的命名空间：命名空间和模块不要混在一起使用，不要在一个模块中使用命名空间，命名空间要在一个全局的环境中使用**

你可能会写出下面这样的代码：**将命名空间导出**

- `shapes.ts`

```javascript
export namespace Shapes {
    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
}
```

- `shapeConsumer.ts`

```javascript
import * as shapes from "./shapes";
let t = new shapes.Shapes.Triangle();
```

**不应该在模块中使用命名空间或者说将命名空间导出：** 使用命名空间是为了提供逻辑分组和避免命名冲突，模块文件本身已经是一个逻辑分组，并且它的名字是由导入这个模块的代码指定，所以没有必要为导出的对象增加额外的模块层。

下面是改进的例子：

- `shapes.ts`

```javascript
export class Triangle { /* ... */ }
export class Square { /* ... */ }
```

- `shapeConsumer.ts`

```javascript
import * as shapes from "./shapes";
let t = new shapes.Triangle();
```

或者

- `shapes.ts`

```javascript
 namespace Shapes {
    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
}
```

- `shapeConsumer.ts`

```javascript
let t = new Shapes.Triangle();
```

### **27. 扩展全局变量的类型**

```javascript
interface String {
    // 这里是扩展，不是覆盖，所以放心使用
    double(): string;
}

String.prototype.double = function () {
    return this + '+' + this;
};
console.log('hello'.double());

// 如果加了这个，就会报错
// export {}
interface Window {
    myname: string
}

// 注意：这里的 window 要小写
console.log(window);

// 如果加了这个，当前模块就会变成局部的
// 然后定义的类型 Window 就是局部的变量，不再是一个全局变量
// 所以上面给 Window 扩展属性/方法就失效了
export {}
```

### **28. export = xxx 和 import xxx = require('xxx')**

- CommonJS 和 AMD 的环境里都有一个 exports 变量，这个变量包含了一个模块的所有导出内容。CommonJS 和 AMD 的 exports 都可以被赋值为一个对象, 这种情况下其作用就类似于 es6 语法里的默认导出，即 export default 语法了。虽然作用相似，但是 export default 语法并不能兼容 CommonJS和 AMD 的 exports。
- 如果一个模块遵循 ES6 模块规范，当默认导出内容时（export default xxx），ES6 模块系统会自动给当前模块的顶层对象加上一个 default 属性，指向导出的内容。当一个 ES6 模块引入该模块时（import moduleName from 'xxx'），ES6 模块系统**默认**会自动去该模块中的顶层对象上查找 default 属性并将值赋值给 moduleName。而如果一个非 ES6 规范的模块引入 ES6 模块直接使用时（var moduleName = require('xxx')），就会报错，可以通过 moduleName.default 来使用。
- **为了支持 CommonJS 和 AMD 的 exports，TypeScript 提供了 export = 语法。export = 语法定义一个模块的导出对象。 这里的对象一词指的是类，接口，命名空间，函数或枚举。若使用 export = 导出一个模块，则必须使用 TypeScript 的特定语法 import module = require("module") 来导入此模块**。

```javascript
// exports === module.exports // 即：这两个变量共用一个内存地址

// 整体导出
// module.exports = {}

// 导出多个变量
exports.c = 3;
exports.d = 4;
```

- 一个 es6 模块默认导出，被一个 node 模块导入使用

```javascript
// 兼容性写法只在 TS 中有效 ！！！！！！
// 兼容性写法只在 TS 中有效 ！！！！！！
// 兼容性写法只在 TS 中有效 ！！！！！！

// a.es6.ts
// 这里只能导出一个
export = function () {
    console.log("I'm default")
}

// b.node.ts
import fn = require('./a.es6.ts');
fn();
```

### **29. 如何在 Node 中使用 TS**

- 安装相关声明文件，如：@types/node；
- 因为 node 模块遵循 CommonJS 规范，一些 node 模块（如：express）的声明文件，用 export = xxx 导出模块声明。TS 进行类型推导时，会无法推断导致报错。所以需要使用 import xxx from "xxx" 或者 import xxx = "xxx" 导入 node 模块；

### **30. 使用 as 替代尖括号表示类型断言**

- 在 TS 可以使用尖括号来表示类型断言，但是在结合 JSX 的语法时将带来解析上的困难。因此，TS 在 `.tsx` 文件里禁用了使用尖括号的类型断言。
- `as` 操作符在 `.ts` 文件和 `.tsx` 文件里都可用

```javascript
interface Person {
    name: string;
    age: number
}

let p1 = {age: 18} as Person;
console.log(p1.name);

// 这种写法在 .tsx 文件中会报错
let p2 = <Person>{age: 18};
console.log(p2.name);
```

### **31. 如何对 JS 文件进行类型检查**

- 在 tsconfig.json 中可以设置 `checkJs:true`，对 `.js` 文件进行类型检查和错误提示。
- 通过在 `.js` 文件顶部添加 `// @ts-nocheck` 注释，让编译器忽略当前文件的类型检查。
- 相反，你可以通过不设置 `checkJs:true` 并在 `.js` 文件顶部添加一个 `// @ts-check` 注释，让编译器检查当前文件。
- 也可以在 tsconfig.json 中配置 include/exclude，选择/排除对某些文件进行类型检查 。
- 你还可以使用 `// @ts-ignore` 来忽略本行的错误。
- 在 `.js` 文件里，类型可以和在 `.ts` 文件里一样被推断出来。当类型不能被推断时，可以通过 JSDoc 来指定类型。

```javascript
/** @type {number} */
var x;

x = 0;      // OK
x = false;  // Error: boolean is not assignable to number
```

- TS 中支持的 JSDoc 注解

### **32. 不要使用如下类型 Number，String，Boolean、Object，应该使用类型number、string、boolean、object**

```javascript
/* 错误 */
function reverse(s: String): String;

/* OK */
function reverse(s: string): string;
```

### **33. 如何在解构一个函数 `function fn({ x: number }) { /\* … \*/ }` 时，即能给变量声明类型，又能给变量设置默认值**

```javascript
// error
function f({ x: number }) {
    console.log(x);
}

// ok
function f({x}: { x: number } = {x: 0}) {
    console.log(x);
}
```

### **34. Pick摘取返回的结果是一个对象（或者说新的接口），里面包含摘取到的属性**

```javascript
interface Test {
    arr: string[]
}
// pick 摘取返回的结果 => {arr: string[]}
let aaa: Pick<Test, 'arr'> = {arr: ['1']};
```

### **35. 无法使用 for of 遍历 map 数据**

```javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
for (let key of map.keys()) {
  console.log(key);
}

// 用 forEach 也可以遍历
map.forEach((value,key) => {
 console.log(key);
});
```

- 设置 target=es5 的时候，会报错误，并且无法执行 for 语句

TS2569: Type 'Map' is not an array type or a string type. Use compiler. option '- downlevellteration' to allow iterating of iterators.

**配置 dom.iterable 和 downlevelIteration 就可以正常运行** tsconfig.json

```javascript
{
    /*当目标是ES5或ES3的时候提供对for-of、扩展运算符和解构赋值中对于迭代器的完整支持*/
    "downlevelIteration": true,
  "lib": [
    "dom",
    "es5",
    "es6",
    "es7",
    "dom.iterable"
  ]
}
```

- 设置 target=es6 的时候，就能正常执行。原因：

注意：如果未指定--lib，则会注入默认的库列表。注入的默认库是： ► For --target ES5: DOM,ES5,ScriptHost ► For --target ES6: DOM,ES6,DOM.Iterable,ScriptHost

### **36. 有时候我们需要复用一个类型，但是又不需要此类型内的全部属性，因此需要剔除某些属性**

- 这个方法在 React 中经常用到，当父组件通过 props 向下传递数据的时候，通常需要复用父组件的 props 类型，但是又需要剔除一些无用的类型。

```javascript
interface User {
    username: string
    id: number
    token: string
    avatar: string
    role: string
}
type UserWithoutToken = Omit<User, 'token'>
```

### **37. 为什么在 exclude 列表里的模块还会被编译器使用**

有时候是被 tsconfig.json 自动加入的，如果编译器识别出一个文件是模块导入目标，它就会加到编译列表里，不管它是否被排除了。因此，要从编译列表中排除一个文件，你需要在排除它的同时，还要排除所有对它进行 import 或使用了 ///指令的文件。

### **38. 使用 import xxx= namespace.xxx 创建命名空间别名**

```javascript
// a.ts
namespace Shape {
    const pi = Math.PI;

    export function cricle(r: number) {
        return pi * r ** 2
    }
}

// b.ts
// 直接使用
// console.log(Shape.cricle(2));

// 或者通过以下方式来使用该命名空间中的变量/函数/类
// import newName = a.b.c.d 用来给常用的、层级较深的对象起一个短的名字
// 这里的 import 的作用是创建一个别名，为任意标识符创建别名，包括导入的模块中的对象
// 不要与用来加载模块的 import x from "module-name" 语法弄混了
import cricle = Shape.cricle;
console.log(cricle(2));  
```

- 注意，这里并没有使用 `require` 关键字，而是直接使用导入符号的限定名赋值。 这与使用 `var` 相似，但它还适用于类型和导入的具有命名空间含义的符号。 重要的是，对于值来讲，`import` 会生成与原始符号不同的引用，所以改变别名的 `var` 值并不会影响原始变量的值。

## **tsconfig.json 常用配置项注释**

```javascript
{
  "compilerOptions": {

    /**************基础配置**************/
    /**************基础配置**************/
    /**************基础配置**************/

    /* 开启增量编译：TS 编译器在第一次编译的时候，会生成一个存储编译信息的文件，下一次编译的时候，会根据这个文件进行增量的编译，以此提高 TS 的编译速度 */
    // "incremental": true,
    /* 指定存储增量编译信息的文件位置 */
    // "tsBuildInfoFile": "./",

    /* 打印诊断信息 */
    // "diagnostics": true,
    /* 打印输出的文件 */
    // "listEmittedFiles": true,
    /* 打印编译的文件（包括引用的声明文件）*/
    // "listFiles": true,

    /* 指定 ECMAScript 的目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    // "target": "es5",
    /* 指定模块代码的生成方式: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "module": "commonjs",

    /* 指定要包含在编译中的库文件——引用类库——即申明文件，如果输出的模块方式是 es5，就会默认引入 "dom","es5","scripthost"  */
    /* 如果在 TS 中想要使用一些 ES6 以上版本的语法，就需要引入相关的类库 */
    // "lib": [],

    /* 允许编译 JS 文件 */
    // "allowJs": true,
    /* 检查 JS 文件*/
    // "checkJs": true,

    /* 指定 JSX 代码生成的模式: 'preserve', 'react-native', or 'react'. */
    /* 'react' 模式下：TS 会直接把 jsx 编译成 js */
    /* 'preserve' 模式下：TS 不会把 jsx 编译成 js，会保留 jsx */
    // "jsx": "preserve",


    /**************声明文件相关配置**************/
    /**************声明文件相关配置**************/
    /**************声明文件相关配置**************/

    /* 生成相应的类型声明文件 —— '.d.ts' */
    // "declaration": true,
    /* 声明文件的输出路径 */
    // "declarationDir": "./d",
    /* 只生成声明文件，不生成 JS */
    // "emitDeclarationOnly": true,
    /* 声明文件目录，默认 node_modules/@types */
    // "typeRoots": [],
    /* 要导入的声明文件包，默认导入上面声明文件目录下的所有声明文件 */
    // "types": [],


    /* 将多个相互依赖的文件合并并且把编译后的内容输出到一个文件里
         * 可以用在产出 AMD 模块的场景中
         * "module":"amd" 时，当一个模块引入了另外一个模块，编译的时候会把这两个模块的编译结果合并到一个文件中
         */
    // "outFile": "./",
    /* 指定编译文件的输出目录 */
    // "outDir": "./out",
    /* 指定输入文件的根目录，用于控制输出目录的结构 */
    // "rootDir": "./",

    /* 启用项目编译 */
    // "composite": true,

    /*  输出的时候移除注释 */
    // "removeComments": true,

    /* 不输出文件 */
    // "noEmit": true,
    /* 发生错误时不输出文件 */
    // "noEmitOnError": true,

    /* 不生成 helper 函数，以前的话设置为 true 后，需要额外安装 ts-helpers */
    /* 类似于 babel ，会给每个文件都生成 helper 函数，会使得最终编译后的包的体积变大 */
    // "noEmitHelpers": true,
    /* 现在可以通过 tslib（TS 内置的库）引入 helper 函数，！！！文件必须是模块 ！！！ */
    /* 编译后自动引入 var tslib_1 = require("tslib") */
    // "importHelpers": true,

    /* 当目标是 ES5 或 ES3 的时候提供对 for-of、扩展运算符和解构赋值中对于迭代器的完整支持 */
    // "downlevelIteration": true,

    /* 把每一个文件转译成一个单独的模块 */
    // "isolatedModules": true,


    /**************严格检查配置**************/
    /**************严格检查配置**************/
    /**************严格检查配置**************/

    /* 开启所有的严格检查配置 */
    "strict": true,
      /* 不允许使用隐式的 any 类型 */
      // "noImplicitAny": true,

      /* 不允许把 null、undefined 赋值给其他类型变量 */
      // "strictNullChecks": true,

      /* 不允许函数参数双向协变 */
      // "strictFunctionTypes": true,

      /* 使用 bind/call/apply 时，严格检查函数参数类型 */
      // "strictBindCallApply": true,

      /* 类的实例属性必须初始化 */
      // "strictPropertyInitialization": true,

      /* 不允许 this 有隐式的 any 类型，即 this 必须有明确的指向*/
      // "noImplicitThis": true,

      /* 在严格模式下解析并且向每个源文件中注入 "use strict" */
      // "alwaysStrict": true,

      /**************额外的语法检查配置，这种检查交给 eslint 就行，没必要配置**************/
      /**************额外的语法检查配置，这种检查交给 eslint 就行，没必要配置**************/
      /**************额外的语法检查配置，这种检查交给 eslint 就行，没必要配置**************/

      /* 有未使用到的本地变量时报错 */
      // "noUnusedLocals": true,

      /* 有未使用到的函数参数时报错 */
      // "noUnusedParameters": true,

      /* 每个分支都要有返回值 */
      // "noImplicitReturns": true,

      /* 严格校验 switch-case 语法 */
      // "noFallthroughCasesInSwitch": true,

      /**************模块解析配置**************/
      /**************模块解析配置**************/
      /**************模块解析配置**************/

      /* 指定模块的解析策略: 'node' (Node.js) or 'classic' (TypeScript pre-1.6)*/
      /* 若未指定，那么在使用了 --module AMD | System | ES2015 时的默认值为 Classic，其它情况时则为 Node */
      // "moduleResolution": "node",

      /* 在解析非绝对路径模块名的时候的基准路径 */
      // "baseUrl": "./",

      /* 基于 'baseUrl' 的路径映射集合 */
      // "paths": {},

      /* 将多个目录放在一个虚拟目录下，用于运行时 */
      /* 当自己编写的库和开发的代码都输出到一个目录下时，开发代码和库的位置不一样，开发代码引入库的路径就会不对 */
      // "rootDirs": [],
      // "rootDirs": ["src","out"],

      /* 允许 export = xxx 导出 ，并使用 import xxx form "module-name" 导入*/
      // "esModuleInterop": true,

      /* 当模块没有默认导出的时候，允许被别的模块默认导入，这个在代码执行的时候没有作用，只是在类型检查的时候生效 */
      // "allowSyntheticDefaultImports": true,


      /* 不要 symlinks 解析的真正路径 */
      // "preserveSymlinks": true,

      /* 允许在模块中以全局变量的方式访问 UMD 模块内容 */
      // "allowUmdGlobalAccess": true,


      /************** Source Map 配置**************/
      /************** Source Map 配置**************/
      /************** Source Map 配置**************/

      /* 指定 ts 文件位置 */
      // "sourceRoot": "",

      /* 指定 map 文件存放的位置 */
      // "mapRoot": "",

      /* 生成目标文件的 sourceMap */
      // "sourceMap": true,

      /* 将代码与sourcemaps生成到一个文件中，要求同时设置了--inlineSourceMap 或--sourceMap 属性*/
      // "inlineSources": true,

      /* 生成目标文件的 inline sourceMap —— 源文件和 sourcemap 文件在同一文件中，而不是把 map 文件放在一个单独的文件里*/
      // "inlineSourceMap": true,

      /* 生成声明文件的 sourceMap */
      // "declarationMap": true,

      /************** 实验性的配置**************/
      /************** 实验性的配置**************/
      /************** 实验性的配置**************/

      /* 启用装饰器 */
      // "experimentalDecorators": true,

      // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */


      /**************高级配置**************/
      /**************高级配置**************/
      /**************高级配置**************/

      /* 强制区分大小写 */
      // "forceConsistentCasingInFileNames": true

  }

    /* 指定需要编译的单个文件列表 */
    // "files": [],

    /* 指定需要编译的文件/目录 */
    // "include": [
    //    // 只写一个目录名等价于 "./src/**/*"
    //    "src"
    //  ]

    /* 需要排除的文件或目录 */
    // "exclude": []

    /* 配置文件继承 */
    // "extends": "./tsconfig.base.json"

  }
```

## **tsconfig.json 配置项问题**

### **1. 三种 JSX 模式**

- 在 TS 中想要使用 JSX 必须做两件事：    

1. 给文件一个 .tsx 扩展名
2. 启用 jsx 选项

- TS 具有三种 JSX 模式：preserve，react 和 react-native，这些模式只在代码生成阶段起作用，类型检查并不受影响。
- **preserve 模式下：** 不会将 JSX 编译成 JS，生成代码中会保留 JSX，以供后续的转换操作使用（比如：Babel）。 另外，输出文件会带有 .jsx 扩展名。
- **react 模式下：** 直接将 JSX 编译成 JS，会生成 React.createElement 的形式，在使用前不需要再进行转换操作了，输出文件的扩展名为 .js。
- **react-native 模式下：** 相当于 preserve，它也保留了所有的 JSX，但是输出文件的扩展名是 .js。

| 模式         | 输入    | 输出                       | 输出文件扩展名 |
| :----------- | :------ | :------------------------- | :------------- |
| preserve     | <div /> | <div />                    | .jsx           |
| react        | <div /> | React.createElement("div") | .js            |
| react-native | <div /> | <div />                    | .js            |

### **2. "lib" 配置项需要注意的问题**

- 当你安装 `TypeScript` 时，会顺带安装 `lib.d.ts` 等声明文件，此文件**包含了 JavaScript 运行时以及 DOM 中存在各种常见的环境声明**。
- 它自动包含在 TypeScript 项目的编译上下文中
- 它能让你快速开始书写经过类型检查的 JavaScript 代码
- `tsconfig.json` 中的 lib 选项用来指定当前项目需要注入哪些声明库文件。如果没有指定，默认注入的库文件列表为：
- 当 `--target ES5`：`DOM,ES5,ScriptHost`
- 当 `--target ES6`：`DOM,ES6,DOM.Iterable,ScriptHost`
- 如果在 TS 中想要使用一些 ES6 以上版本或者特殊的语法，就需要引入相关的类库。如：`ES7` 、 `DOM.Iterable`

### **3. "moduleResolution" 解析策略**

https://www.tslang.cn/docs/handbook/module-resolution.html

### **4. 指定 target 为 es6 时，tsc 就会默认使用 "classic" 模块解析策略，这个策略对于 `import \* as abc from "@babel/types"` 这种非相对路径的导入，不能正确解析。**

- 解决方法：指定解析策略为 node => "moduleResolution": "node"。

### **5. "esModuleInterop" 具体作用是什么**

- 如果一个模块遵循 ES6 模块规范，当默认导出内容时（export default xxx），ES6 模块系统会自动给当前模块的顶层对象加上一个 default 属性，指向导出的内容。当一个 ES6 模块引入该模块时（import moduleName from 'xxx'），ES6 模块系统**默认**会自动去该模块中的顶层对象上查找 default 属性并将值赋值给 moduleName。而如果一个非 ES6 规范的模块引入 ES6 模块直接使用时（var moduleName = require('xxx')），就会报错，需要通过  moduleName.default 来使用。
- **TypeScript 为了兼容，引入了 esModuleInterop 选项，设置 esModuleInterop 为 true ，在编译时自动给该模块添加 default 属性，就可以通过 import moduleName from 'xxx' 的形式导入 非 ES6 模块，不再需要使用 import moduleName = require('xxx') 的形式。**

### **6. "allowSyntheticDefaultImports" 具体作用是什么**

- 允许 默认导入 没有设置默认导出（export default xxx）的模块，可以以 import xxx from 'xxx' 的形式来引入模块

```javascript
// 配置前
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// 配置后
import React from 'react';
import ReactDOM from 'react-dom';
```

### **7. "paths" 配置路径映射集合时，需要注意的问题**

```javascript
{
   "paths": {
      // 这里的路径后面必须跟着 "/*"
      "@public/*": [
        // 这里的路径后面必须跟着 "/*"
        "public/*"
      ],
      "@src/*": [
        "src/*"
      ],
      "@assets/*":[
        "src/assets/*"
      ],
      "@components/*": [
        "src/components/*"
      ]
    }
}
```

### **8. "allowJs" 时需要注意的问题**

- 设置 "allowJs": false ：在 .ts / .tsx 文件中引入 .js / .jsx 文件时，就不会有相关提示

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/cqucutsmd.png?imageView2/2/w/1620)

image.png

## **React + TS 项目问题**

### **1. 使用 import 引入非 JS 模块会报错，而使用 require 则没有问题**

```javascript
import styles from './login.less';
import logo from '@assets/images/logo.svg';

const logo2 = require('@assets/images/logo.svg');
console.log(logo2);// path
```

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/lksfgxnfbq.png?imageView2/2/w/1620)

image.png

**解决办法：** 给这些非 JS 模块添加申明

```javascript
/**
 * style
 */
declare module '*.css'
declare module '*.less'
// declare module "*.less" {
//     const styles: { [className: string]: string };
//     export default styles
// }
declare module '*.scss'


/**
 * 图片
 */
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
```

### **2. import \* as React from 'react' 和 import React from 'react' 有什么区别**

- 第一种写法是将所有用 export 导出的成员赋值给 React ，导入后用 React.xxx 访问
- 第二种写法仅是将默认导出（export default）的内容赋值给 React

### **3. 解决 import \* as xxx from 'xxx' 这种奇怪的引入方式**

- 配置 tsconfig.json

```javascript
{
  // 允许 默认导入 没有设置默认导出（export default xxx）的模块
  // 可以以 import xxx from 'xxx' 的形式来引入模块
    "allowSyntheticDefaultImports":true
}
// 配置前
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// 配置后
import React from 'react';
import ReactDOM from 'react-dom';
```

### **4. 对 antd 组件库进行按需加载**

- 这里使用的是 ts-loader 转译 TS 方案，更多方案请看 **Webpack 转译 Typescript 现有方案**

.babelrc

```javascript
{
  "presets": [
    "@babel/preset-react",
    "@babel/preset-env"
  ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
          /* `style: true` 会加载 less 文件*/
        }
      ]
    ]
}
```

tsconfig.json

```javascript
{
  "compilerOptions": {
    "target": "es5",
    "jsx": "preserve",// 保留 jsx
     ...
}
```

webpack.config.js

```javascript
{
  test: /\.tsx?$/,
    use: [
      'babel-loader',
      'ts-loader'
    ]
},
```

### **5. 声明通过 React.createRef（）创建的 ref 类型**

```javascript
// 源码
// interface RefObject<T> {
//     readonly current: T | null;
// }

const ref1:React.RefObject<HTMLDivElement> = React.createRef();

const inputRef = React.createRef<Comp>();
class EditScene extends React.Component<Props> {
  inputRef:React.RefObject<Comp> 
  constructor(props) {
  super(props);
this.inputRef = React.createRef<Comp>();
}
}
```

### **6. react + redux + react-redux 项目：使用 @connect 装饰器正常，但是一旦结合 TS 后，就会报错**

https://segmentfault.com/a/1190000016047027

```javascript
import {ComponentClass} from 'react'
import {
  connect as nativeConnect,
  MapDispatchToPropsParam,
  MapStateToPropsParam
} from 'react-redux'
import {withRouter as nativeWithRouter} from 'react-router-dom'

export type ComponentDecorator<P = any> = <T extends ComponentClass<P>>(WrappedComponent: T) => T

export const connect: <P, S>(
  mapState: MapStateToPropsParam<Partial<P>, P, S>,
  // mapDispatch?: MapDispatchToPropsParam<Partial<P>, P>
  mapDispatch?: any
) => ComponentDecorator = nativeConnect as any;

export const withRouter: ComponentDecorator = nativeWithRouter as any;
```

### **7. react + redux + react-redux 项目：在使用 mapStateToProps(state) 函数时，想要给仓库中的 state 声明类型**

- **借助 ReturnType**

```javascript
// rootReducer.ts
import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import history from '../history';
import evidenceEdit from './evidence';
import common from './common';
import work from './work';
import setScene from './set-scene';

let reducers = {
  common,
  work,
  setScene,
  evidenceEdit,
  router: connectRouter(history)
};

// 使用 ReturnType 从 rootReducer 推断状态形状
// export type AppState = ReturnType<typeof rootReducer>
export type AppState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

  const rootReducer = combineReducers(reducers);

export default rootReducer;
// setScene 模块
import * as types from '../types/action-types';
import {appEditAction} from '../actions/common';

export interface SetSceneState {
  loadSuccess: boolean;
  loadProgress: number;
}

let initState: SetSceneState = {
  loadSuccess: false,
  loadProgress: 0,
};
export default function (state: SetSceneState = initState, action: appEditAction) {
  switch (action.type) {

    case types.SCENE_DATA_LOADSUCCESS: {
      return {...state, loadSuccess: action.payload.success};
    }
    case types.SCENE_DATA_LOADINGPROGRESS: {
      return {...state, loadProgress: action.payload.num};
    }
    default:
      return state;
  }
}
```

使用

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/t82kv0vi5k.png?imageView2/2/w/1620)

image.png

### **8. react + redux + react-redux 项目：想要给 action creator 函数声明类型**

```javascript
// 在 Mesh 组件中
import workActions from "@store/actions/work";

interface MeshProps {
    // 刚开始我是这样写的，每次都得在组件的 Props 里重新声明一下函数
    // updateSceneData?: (workId: string,data) => appEditAction;
    updateData?: typeof workActions.updateData;
}

@connect(null, {
    updateData: workActions.updateData,
})
class Mesh extends React.Component<MeshProps> {...}
// store/actions/work.ts

import * as types from '../types/action-types';
import {appEditAction} from "@edit-store/actions/common";

export default {
    updateWorkData(workId: string, data: any): appEditAction {
        return {type: types.UPDATE_WORK_ASYNC, payload: {workId, data}}
    }
}
```

### **9. react + redux + react-redux 项目：给 React 组件的 Props 声明类型（较为便捷的方法）**

```javascript
import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import {connect} from "@store/connect";
import {AppState} from "@store/reducers";
import commonActions from "@store/actions/commonActions";

// 组件可能有四个属性来源
// 1.mapStateToProps 的返回值
// 2.actions 对象类型
// 3.来自路由
// 4.父组件传进来的其它属性

// 原先的写法：一个个拼起来，mapStateToProps 返回的状态还得在 Props 接口里再声明一遍，比较混乱、麻烦
// interface Props {
//     loadProgress?: number;
//     markVisible?: boolean;
//     setMarkVisible?: typeof commonActions.setMarkVisible;
// }

function mapStateToProps(state: AppState) {
  const {markVisible,loadProgress} = state;
  return {
    markVisible,
    loadProgress,
  };
}

// 现在的写法：便捷
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof commonActions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>;
type Props = StateProps & RouteProps & DispatchProps & {};

@connect(mapStateToProps, {
  setMarkVisible: commonActions.setMarkVisible
})
export default class App extends React.PureComponent<Props, any> {
  render() {
    const {markVisible, loadProgress} = this.props;
    return (<div > {markVisible} {loadProgress} </div>);
}
}
```

### **10. react + redux + react-redux 项目：想要给 redux-thunk 声明类型**

redux thunk 有一个内置类型 `ThunkAction`，我们可以这样使用：

```javascript
// src/thunks.ts

import { Action } from 'redux'
import { sendMessage } from './store/chat/actions'
import { AppState } from './store'
import { ThunkAction } from 'redux-thunk'

export const thunkSendMessage = (
  message: string
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  const asyncResp = await exampleAPI()
  dispatch(
    sendMessage({
      message,
      user: asyncResp,
      timestamp: new Date().getTime()
    })
  )
}

function exampleAPI() {
  return Promise.resolve('Async')
}
```

### **11. 使用 webpack 的 module.hot 会警告没有类型定义**

```javascript
# 下载这个类型声明文件
$ npm install --save @types/webpack-env
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }
}
```

### **12. tsconfig-paths-webpack-plugin 这个包会将 tsconfig.json 中的 path 配置项内容映射到 webpack 配置中去，这样就不需要在 webpack 中的 alias 配置项里配置路径映射**

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/z8kf4h8s6d.png?imageView2/2/w/1620)

image.png

### **13. react 函数组件声明**

```javascript
interface Greeting {
  name: string;
  age: number;
}

const Hello:React.FC<Greeting> = (props) => <h1>Hello {props.name}</h1>;
// 推荐使用第二种
const Hello2 = (props:Greeting) => <h1>Hello {props.name}</h1>;
```

### **14. 如何编写 react + ts 版的 HOC**

```javascript
import React, { Component } from 'react';

import HelloClass from './HelloClass';

interface Loading {
  loading: boolean
}

// HOC 可以接收一个类组件，也可以接收一个函数组件，所以参数的类型是 React.ComponentType
// 源码：type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
function HelloHOC<P>(WrappedComponent: React.ComponentType<P>) {
  return class extends Component<P & Loading> {
    render() {
      const { loading, ...props } = this.props;
      return loading ? <div>Loading...</div> : <WrappedComponent { ...props as P } />;
    }
    }
  }

  export default HelloHOC(HelloClass);
```

### **15. 快速获取事件处理函数的 event 参数类型**

```js
class Login extends React.Component <Props>{

  handlerLinkBtnClick = (ev) => {
    console.log(ev);
    this.props.historyGo('./register');
  };

handlerLinkBtnMouseMove = (ev) => {
  console.log(ev);
};

render() {
  return (
    <div>
      <header>
        <p >This is Login Page </p>
        <div className={styles.linkBtn}
          onMouseMove={this.handlerLinkBtnMouseMove} 
          onClick={this.handlerLinkBtnClick}>
          Go to Register Page
        </div>
      </header>
    </div>
  );
}
}
```

按住 Ctrl ，然后鼠标移动到事件名上就能获取当前事件处理函数的参数类型

![img](https://ask.qcloudimg.com/http-save/yehe-1260054/4qhmev47bt.png?imageView2/2/w/1620)
