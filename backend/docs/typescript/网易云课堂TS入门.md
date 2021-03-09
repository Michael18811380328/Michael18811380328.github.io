# TS入门课程

网址

https://study.163.com/course/introduction.htm?courseId=1209306804&share=1&shareId=1135155721#/courseDetail?tab=1

## 目录

1-为什么使用ts和文件转换19:01

2-配置文件(自动转换ts文件)06:07

3-基本数据类型和报错解析09:55

4-数组-元组和枚举类型09:40

5-函数类型10:22

6-对象类型和type07:39

7-never和null类型09:32

8-类型练习04:31

9-类(属性和方法)11:18

10-类的继承09:56

11-set和get和static06:03

12-初识命名空间namespace04:18

13-命名空间文件拆分06:57

14-多重命名空间及引入文件07:23

15-模块module的使用11:50

16-初识interface接口的用法11:31

17-接口继承及类的实现09:14

18-泛型Generic的函数应用13:09

19-泛型Generic类的应用04:45



## 1 为什么使用ts和文件转换

TS 是 JS 的超集：TS 功能更强大。可以通过插件转换成浏览器识别的格式（js）-全局的编译器

强调了类型（type）具体参考官网； 什么是TS，为什么使用TS，TS编译环境安装

VScode插件 live-server 热加载 HTML 插件

## 2 配置文件(自动转换ts文件)

多个TS转换成JS文件：通过 `tsc -init` 生成一个 tsconfig.json 文件，包括各种配置，然后直接使用 tsc 命令，就能读取配置文件，然后进行编译。

自动转换的插件：VScode有一个 TS auto compiler 插件，可以在保存TS文件时实时将TS转换成JS文件。

## 3 基本数据类型和报错解析

number string boolean any(避免使用)

## 4 数组/元组/枚举类型

数组

`var items: Array<string> = ['Mike'];`

下面是简写情况，这是完全等价的

`var items: string[] = ['Mike']`

声明数组需要说明数据类型（否则就和JS一样，数据类型随机了）


元组：数组中每个项的数据类型不同

`var items: [string, number, bool] = ['Mike', 120, true];`

这个相对于 any 类型的数组，每一项的数据类型一一对应，所以这个更严谨。

枚举：enum，这是自定义的数据类型

```ts
enum Color {
  Black,
  Yellow,
  Orange
}

let myColor: Color = Color.Yellow;
console.log(myColor); // 1 Yellow对应的下标是1

// 这里打印的不是 Yellow 这个字符串，而是打印的下标

// 在枚举中可以自定义下标，那么下一个元素的下标会递增

enum Animal {
  Rabbit, // 默认是1
  Deer = 100, // 设置100
  Bear, // 101
  Tiger = 20 // 这里设置为20
}

```

## 5 函数

函数的返回值设置类型（可能是void）；函数的参数设置类型；

函数类型

`var myFunc: (a:number, b:string) => number`

```ts
function myFunc(a: number|string, b: number|string):number {
  return Number(a) + Number(b);
}

```

## 6 对象类型和type

声明对象时，就固定了对象的键的数据类型。声明后，不能更改对象的键的数据类型。

```ts
let dataObj: {name: string, age: number} = {
  name: "Mike",
  age: 30,
};
```

对象的属性可以是复杂数据类型（函数、对象、数组等），这样声明对象时，可以设置复杂数据类型的具体参数

```ts
let dateObj: {name: number[], sayHi: (a:number, b:string) => string[]} = {
  name: [1,2,3,4,5],
  sayHi: function (a: number, b: string):string[] {
    console.log(this.name);
    return ['a', 'b', 'c'];
  }
};

let complex: {data: number[], myfunc: (item: number) => number[]} = {
  data: [1,2,3,4],
  myfunc: function(item: number):number[] {
    this.data.push(item);
    return this.data;
  }
}

```

如果数据类型比较复杂，可以自己定义类型

```ts
type MyType = {data: number[], myfunc: (item: number) => number[]};

let complex2: MyType = {
  data: [1,2,3],
  myfunc: function(item: number):number[] {
    this.data.push(number);
    return data;
  }
}
```

## 7 never和null类型

联合类型、检查类型、never、undefined 、null

联合类型：使用管道符设置一个变量是可控的多种数据类型（而不是不可控的any）

检查类型： `typeof data == 'number'`

null 和 undefined 在非严格模式下，可以赋值给其他变量；在严格模式下，不能复制给其他变量。

null 和 undefined 严格模式下面，可以互相赋值。

never 是任何类型的子类型。任何数据类型可以赋值给 never， 但是 never 数据类型不能改成其他数据类型

通常用户函数抛出错误的情况

```ts
var myError = function(msg: string):never {
  throw new Error(msg);
}

let y: number = 10;

y = (() => {
  throw new Error(msg);
})();
// IEFF 函数返回值是 never 类型
```

## 8 类型练习

把一段JS代码转换成TS代码。这个在练习文件中处理。
