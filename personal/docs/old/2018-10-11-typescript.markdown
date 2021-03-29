---
layout:       post
title:        "TypeScript（ 入门 ）"
subtitle:     "TypeScript is a superset of JavaScript"
date:         2018-10-08 22:00:00
author:       "ZeFeng"
header-img:   "img/TS.jpg"
header-mask:  0.3
catalog:      true
tags:
    - TypeScript
---
推荐一个微信公众号，分享前端干货的公众号。<br />
微信搜索：<b>前端大神之路</b><br />
<img src="https://00feng00.github.io/img/wx_public_channel.jpg">
<br />
## 前言
 TypeScript是由微软开发的自由和开源的编程语言。TypeScript是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。
## 正文 快速入门TS
<b>说明：</b><br />
TS使用方式有两种，一种是从头搭建项目的时候使用TS，另外一种是在已有的项目使用TS。对TS使用不是很熟悉的同学，建议从头搭建使用，这样遇到的坑会相对少很多。
## 搭建TypeScript
安装TS有两种方式：<br />
1）、通过npm（Node.js包管理器）<br />
2）、安装Visual Studio的TypeScript插件，默认是有TS的，如果你的Visual Studio没有安装TS，
[下载地址](https://www.tslang.cn/#download-links) <br />
## 1、npm 安装
```
npm install -g typescript
```
## 2、准备工作：

1）、新建demo.ts文件，文件里面写以下代码：

```
function demo (person) {
  return "Hello, " + person;
}
let user = "前端 大神之路";
document.body.innerHTML = demo(user);
```
可以看到虽然我们使用了.ts拓展名，但是上面的代码只是js而已。<br />
2）、使用命令行，运行TypeScript编译器：
```
tsc demo.ts
```
结果输出为一个demo.js文件，它包含了和输入文件中相同的JavsScript代码。 <br />
下面我们开始使用TS的功能：
```
function demo (person: string) {
  return "Hello, "+person;
}
let user = "前端 大神之路";
document.body.innerHTML = demo(user);
```
可以看到，我们给 person函数的参数添加: string类型注解，这个有什么用呢，下面会继续讲到。

## 类型注解
TS类型注解是一种轻量级的为函数或变量添加约束的方式。举个例子，上面的例子我们可以看到demo函数接收一个字符串参数,如果我们把user 改成数组会发生什么？

```
function demo (person: string) {
  return "Hello, "+person;
}
let user = [0, 1, 2, 3];
document.body.innerHTML = demo(user);
```
重新编译，会看到产生了一个错误。
```
demo.ts(7,26): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```
同样的，如果不传person这个参数，TS会告诉你使用了非期望个数的参数调用了这个函数。可以知道TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。<br />
（Tip: 尽管报错了，demo.js还是被创建了，所以就算你代码有错误，还是可以使用TS的，只是TS会警告你代码可能不会按预期执行）
## 3、接口
我们接着上面的例子进行拓展，讲一下接口。
```
interface Person {
  firstName: string;  
  lastName: string;
}
function demo (person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
let user = { firstName: "前端大神", lastName: "之路"};
document.body.innerHTML = demo(user);
```
通过代码，我们可以看到我们使用接口来描述一个拥有firstName和lastName字段的person对象。

（当两个类型内部的结构兼容那么这两个类型也就是兼容的。 因此这也就是允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements语句。）

## 4、类
我们继续改写上面的例子，我们使用类来改写：
```
class name { 
  fullName: string;
  constructor (public firstName, public middleInitial, public  lastName) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;  
  }
}
interface Person {
  firstName: string;  
  lastName: string;
}
function demo (person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
let user = { firstName: "前端大神", lastName: "之路"};
document.body.innerHTML = demo(user);
```
 通过代码我们可以看到，TS是支持JS基于类的面向对象编程这个新特性，当然啦，其他新特性也是支持的。<br />
 name带有一个构造函数和一些公共字段。 (注意: 类和接口可以一起使用的，我们可以自行决定抽象的级别。)<br />
 构造函数的参数上使用public等同于创建了同名的成员变量。<br />
 重新运行tsc demo.ts，你会看到生成的JavaScript代码和原先的一样。<br />
 TypeScript里的类只是JavaScript里常用的基于原型面向对象编程的简写。<br />






