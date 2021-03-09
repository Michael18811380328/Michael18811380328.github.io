# React.children简介

React.Children 是 React 的内置对象，具有很多方法。

this.props.children 或者 props.children 表示某个组件的子组件。注意数据类型：如果没有子组件，null；如果只有一个子组件，object；如果有多个子组件，就是 array。所以直接处理 this.props.children 比较麻烦。

使用 React.Children 处理 this.props.children 可以解决数据类型的问题。下面是主要方法

## map

类似于数组的 map，可以获取每一个子组件并处理

~~~jsx
function handleChildren() {
  React.Children.map(this.props.children, function(child) {
    return <li>{child}</li>
  });
}
~~~

这样可以批量处理子组件

~~~jsx
let NodeList = React.createClass({
  render: function() {
    return (
      <ul>{this.handleChildren()}</ul>
    );
  }
});

React.render(
  <NotesList>
    <span>hello</span>
    <span>Michael</span>
  </NotesList>,
document.body);
~~~

~~~html
<ul>
  <li><span>hello</span></li>
  <li><span>Michael</span></li>
</ul>
~~~

## forEach

不返回对象，只实现 this.props.children 数据处理；通常使用 map 方法；

## count

React.Children.count(this.props.children) 返回子组件的数量（012）
