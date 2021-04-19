# 01-Node.js 教程（ok）

简单的说 Node.js 就是运行在服务端的 JavaScript。

Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台。

Node.js是一个事件驱动I/O服务端JavaScript环境，基于Google的V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

-----

## 使用的版本

我们可以使用以下命令来查看当前的 Node 版本：

```
$ node -v
v4.4.3
```

**注意** 不同版本间可能是有差异的。

------

## 第一个Node.js程序：Hello World！

### 脚本模式

以下是我们的第一个Node.js程序：

console.log("Hello World");

保存该文件，文件名为 helloworld.js， 并通过 node命令来执行：

```
node helloworld.js
```

程序执行后，正常的话，就会在终端输出 Hello World。

### 交互模式

打开终端，键入node进入命令交互模式，可以输入一条代码语句后立即执行并显示结果，例如：

```
$ node
> console.log('Hello World!');
Hello World!
```