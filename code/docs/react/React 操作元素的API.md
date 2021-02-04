## React 操作元素的API

React 中，JSX 标签会转换成原生的JavaScript代码。所以，可以使用JSX标签创建组件，也可以使用React提供的API创建组件。

下面是常见的元素操作和组件操作的API

### 1、创建元素 createElement

~~~js
// API 具有三个参数
// 第一个是元素的类型（必选）
// 第二个是元素的属性
// 第三个是元素的子节点
var React = require('react');

let dom = React.createElement(type, [props], [children]);
let dom2 = React.createElement('div', {className: 'wrapper'}, dom, React.createElement('hr'));
// 快捷创建元素
// React.createElement('div') === React.DOM.div()
~~~


### 2、复制 cloneElement

参数和createElement一致

~~~js
let div = React.createElement('div');
let dom3 = React.cloneElement(div, {className: 'wrapper'}, dom);
~~~

### 3、验证 isValidElement

~~~js
function checkValid() {
  let div = React.createElement('div');
  React.isValidElement(div); // true;
  let div2 = document.getElementById('wrapper');
  React.isValidElement(div2); // false
}
~~~

### 4、组件操作 API（Component class）

创建组件：createClass() 创建并返回一个组件类，内部需要实现render方法

~~~js
let App = React.createClass({
  displayName: 'App',
  render: function() {
    let hr = React.createElement('hr');
    let h2 = React.createElement('h2', null, this.props.children);
    return (React.createElement('div', null, h2, hr));
  }
});

~~~
现在就返回一个APP的类（组件）大型组件需要单独写，class App extends React.Component，如果是小组件，没有复杂方法，可以使用这个API

这几个主要的区别：https://www.zhihu.com/question/27602269/answer/40168594

基本上，使用JSX可以完成上面API的工作
