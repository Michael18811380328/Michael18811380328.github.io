# 17 webpack构建分析

【课程主题】从源码探究构建工具之手动实现webpack
1、webpack基本使用：从模块谈起，到底什么是webpack
2、打包文件分析：分析bundile.min.js源码
3、读完源码我们来写简易webpack

### webpack 在哪里使用

create-react-app、vue-cli 等脚手架已经打包了webpack工具，所以高级框架不会直接配置 webpack。需要安装 webpack webpack-cli。

为什么使用webpack? 因为浏览器不能直接读取JS的引用关系，不能识别require，所以需要打包成一个文件，这样浏览器读取打包后的文件，可以正常运行。打包后是一个 IIFE 立即执行函数，不同函数（模块）作为立即执行的参数传入。

`touch webpack.config.js` 新建配置文件

- entry 入口模块
- module 一个模块即为一个文件，从entry模块递归找出所有的依赖模块
- Chunk 代码块，一个代码块由多个模块组合而成，用于代码的合并和分割
- loader 模块转换器
- plugin 插件
- output 输出结果

~~~js
const path = require('path');
module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js'
  }
};
~~~

##### 执行流程

~~~js
开始
加载入口函数（index.js）
执行 webpackBootstrap
__webpack_require__ require 函数转换
执行模块
（如果有其他依赖模块，递归执行第34步）
结束
~~~

### webpack 的作用

依赖文件（模块）搜集；分析依赖关系

内部实现 require 函数重写（浏览器不支持require）

入口文件ID是0，按照顺序存入函数的参数，然后webpack依次require，根据不同的依赖关系，执行不同的函数

##### 官方解释

webpack 是模块打包机：分析项目结构，找到 JS 模块和其他浏览器不能直接运行的扩展语言（Sass TS）并将其打包成合适的合适以供浏览器使用。

构建：把源代码转换成线上可实行的CSS JS HTML代码

##### 具体作用

~~~md
代码转换：TS SaSS 编译成 JS CSS
文件优化：压缩JS文件，压缩合并图片
代码分割：提取多个页面的公共代码，提取首屏加载不需要的代码，并将其异步加载实现首屏优化
模块合并：将多个模块合并成一个文件
自动刷新：监听本地源代码的变化，自动重新构建，刷新浏览器
代码校验：检验代码规范，单元测试
自动发布：自动构建线上发布代码，并传输到发布系统
~~~

##### bundle.main.js 结构分析

首先把函数内部折叠，分析整理的结构和关系

~~~js
(function(modules) {
  // IEFF 自执行函数
})
([]);
~~~

下面看传参，传参是一个数组，数组的每一项是一个模块，对应一个ID

~~~js
(function(modules) {
  //
})
([
  (function(module, exports, __webpack_require__) {
    const fn = __webpack_require__(1);
    fn();
  }),
  (function(module, exports, __webpack_require__) {
    const name = __webpack_require__(2);
    const fn = () => {
      console.log(name);
    }
    module.exports = fn;
  }),
  (function(module, exports) {
    const name = 'Michael An';
    module.exports = name;
  })
]);
~~~

函数体，实现 require 转换

~~~js
// 内部自执行函数和改写的require方法
(function(modules) {
  // cache(缓存，如果已经处理过的模块，直接从缓存中读取)
  var installedModules = {};
  
  // 改写的 require 函数
  function __webpack_require__(moduleId) {
    // check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 如果不在缓存中，创建新的模块并放到缓存中（计算斐波那契数列也使用缓存）
    // (扩展：算法中凡是能重复计算的部分，可以使用对象存储缓存)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    // 执行模块的方法
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    
    // 将模块标记为已加载（flag：动词，标记）
    module.l = true;
    return module.exports;
  }
  __webpack_require__.m = modules;
  // ...
  // 加载模块的入口
  return __webpack_require__(__webpack_require__.s = 0);
})([module1, module2, module3]);
~~~

### 自定义简易webpack

分析依赖关系前，首先把不同的JS代码读入，然后获取require部分，需要使用AST

AST（抽象语法树）编译原理  babel 也会用到AST（astexplorer.net 可以在线把字符串转换成AST）高级语言执行，需要编译器，编译成为二进制代码。如果写语言，需要会编译原理。

词法分析（扫描）代码去掉注释，一个一个字母读代码，移除空白，分割成tokens。语法分析 解析器 把tokens 一位数组，转换成树，监测语法错误，删除不完整的括号。

如果直接读文件（结果是字符串），然后使用正则表达式处理依赖关系，模块很大就复杂了。所以使用AST构建文件结构。

读取文件后，转换成AST，然后一步一步处理文件内容。

新建项目和脚本 package.json

~~~bash
npm init
npm install -D @babel/core @babel/genarator @babel/parser @babel/traverse
~~~

~~~json
{
  "name": 'test',
  "version": '1.0.0',
  "main": 'index.js',
  "scripts": {
    "wypack": 'node wypack/wypack.js'
  },
  'devDependencies': {
    'webpack': '^4.41.6',
    'webpack-cli': '^3.3.11'
  }
}
~~~

下面是脚本 wypack.js

~~~js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator');
const ejs = require('ejs');
const config = require('../wypack.json');
const entry = config.entry;
let id = 0;

// AST
const createAST = filePath => {
  // 默认读取文件的结果是 array Buffer，这里需要设置格式utf-8
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // parse 用来转换成AST
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  
  // 单文件的依赖放在一个数组
  let dependencies = [];
  // 依赖搜集：@babel/travers用来遍历更新@babel/parser生成的AST
  traverse(ast, {
    CallExpression(p) {
      const node = p.node;
      if (node.callee.name === "require") {
        node.callee.name = '__webpack_require__';
        let resultPath = node.arguments[0].value;
        // 判断是否有后缀名，如果没有加上JS后缀名
        resultPath = resultPath + (path.extname(resultPath) ? '' : 'js');
        dependencies.push(resultPath);
      }
    }
  });
  // 重新生成代码
  let code = generator(ast).code;
  let moduleId = id++;
  return {
    moduleId,
    filePath,
    code,
    dependencies
  };
};

// 处理多个文件的依赖
const createGraph = entry => {
  const ast = createAST(entry);
  const queue = [ast];
  // 处理文件绝对路径
  for (const item of queue) {
    const dirname = path.dirname(ast.filePath);
    item.dependencies.map(relativePath => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAST(absolutePath);
      queue.push(child);
    });
  }
  console.log(queue);
  return queue;
}

const modules = createGraph(entry);
const entryId = modules[0].moduleId;

let code = [];
modules.map((item, index) => {
  const packCode = {
    id: modules[index].mapping,
    code: modules[index].code,
  };
  code.push(packCode);
});

let reg = new RegExp(/__webpack_require__\((.+?)\)/g);

code = code.map((item, index) => {
  if (item.code.match(reg)) {
    item = item.code.replace(
      reg,
			`__webpack_require__(${Object.values(item.id)})`
    );
  } else {
    item = item.code;
  }
  return item;
});
console.log(code);

let { path, filename } = config.output; 
let output = `${path}\\${filename}`;
let template = fs.readFileSync('./wypack/template.ejs', 'utf-8');

let package = ejs.render(template, {
  entryId,
  code
});

createAST(entry);
fs.writFileSync(output, package);
~~~
