# React组件创建

## React.createClass

这是旧版本的api，使用React.createClass创建组件，配套的一些api，有getDefaultProps, getinitialstate。官方已经不建议使用了，使用下面新的api替代。

## ES6 classes

```jsx
import * as React from 'react';

class Page extends React.Component {  
  render() {    
    return (<div>      home    </div>)  
  }
}
```

这是一个实现了render方法的class。也是一个基本的react组件。

## 无状态函数

```jsx
function Button(props, context) {    
  return (        
    <button>            
      <em>{props.text}</em>            
      <span>{context.name}</span>        
    </button>    
  );
}
```

纯函数,不存在state，只接受props和context。纯函数有优点，优点就是易于测试，无副作用。

# React数据流

State 和 props 已经熟悉，所以不介绍了。

### 事件

react里面的用户事件都是合成事件，被React封装过。内部使用的还是事件的委托机制。 常用的事件有点击事件onClick，input的onChange事件等，官网都可以查到。

#### 合成事件的this指向问题

就像上文一样，我们绑定事件的方式很奇怪，使用了bind来显示绑定this的指向。因为传递到组件内部的只是一个函数，而脱离了当前对象的函数的this指向是不能指到当前组件的，需要显示指定。

#### 通过bind

```jsx
<button onClick={this.update.bind(this)}>更新</button>
```

#### 构造器内部指定

```jsx
import * as React from 'react';

class Child extends React.Component {  
  constructor(props) {     
    super(props)      
    this.update = this.update.bind(this)  
  }
  
  update() {      
    this.props.onChange('小明名字改了')  
  }  
  
  render() {    
    return (
      <div>      
        {this.props.parentName}      
        <button onClick={this.update}>更新</button>    
      </div>
    )  
  }
}
```

#### 箭头函数

```jsx
import * as React from 'react';

class Child extends React.Component {  
  update => e = {      
    this.props.onChange('小明名字改了')  
	} 
	render() {    
    return (<div>      
        {this.props.parentName}      
        <button onClick={this.update}>更新</button>    
     </div>)  
  }
}
```

#### 装饰器

```jsx
import * as React from 'react'

class Child extends React.Component {  
  constructor(props) {     
    super(props)   
  }
  
  @autoBind  
  
  update() {      
    this.props.onChange('小明名字改了')  
  }  
  
  render() {    
    return (<div>      
        {this.props.parentName}      
        <button onClick={this.update}>更新</button>    
      </div>
 		)  
  }
}
```

装饰器是es7语法，如果需要使用需要安装对应的babel：present版本。而typescript则原生支持。

> autoBind原理大概就是劫持get方法，get时改变this指向

### 如何获得evnt原生事件

通过e.nativeEvent获取原生事件对象

```jsx
import * as React from 'react'

class Child extends React.Component {  
  constructor(props) {     
    super(props)      
    this.update = this.update.bind(this)  
  }  
  
  update(e) {      
    console.log(e.nativeEvent)  
  }  
  
  render() {    
    return (
      <div>      
        <button onClick={this.update}>更新</button>    
      </div>
    )  
  }
}
```

### 解决冒泡和取消默认事件

```
e.preventDefault() //取消默认行为
```

```
e.stopPropagation() //取消冒泡
```

这个和浏览器原生事件处理方案是一致的。问题是我们只可以调合成事件的 `e`的方法，不可以通过 `e.nativeEvent`方法做这些操作，原因是上文讲过的委托。

#### **判断回文字符串** 🐛

回文：回文字符串是指正着读和反着读该字符串都是相同拼写

```jsx
function palindrome(str){
    // \W匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。
    var re = /[\W_]/g;
    // 将字符串变成小写字符,并干掉除字母数字外的字符
    var lowRegStr = str.toLowerCase().replace(re,'');
    // 如果字符串lowRegStr的length长度为0时，字符串即是palindrome
    if(lowRegStr.length===0)
        return true;
    // 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome
    if(lowRegStr[0]!=lowRegStr[lowRegStr.length-1])
        return false;
    //递归
    return palindrome(lowRegStr.slice(1,lowRegStr.length-1));
}
```

#### **数组去重** 🐛

```jsx
function unique(arr) {
    var obj = {}
    var data = []
    for (var i in arr) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = true;
            data.push(arr[i]);
        }
    }
    return data;
}
```

# ReactDom

## ref

特殊的props，ref组件对象的引用，现在官方也不建议直接给ref赋值，需要通过函数来赋值。

```jsx
ReactDOM.render((  
  <div>    
    <Calendar ref={ref => this.c = ref} any-ss="text"/>  
  </div>), document.getElementById('root'))
```

## render

顶层api,只有在根组件时候才需要使用。第一个参数是Component,第二个参数是dom节点

## findDOMNode

通过传入component实例获取此component根dom节点，在这里可以去dom节点进行操作了，虽然极其不建议这么做，但是你确实可以做。

## unmountComponentAtNode

卸载此组件，并销毁组件state和事件

接收组件的引用，也就是ref。仅仅是取消挂载，组件还在，如果需要彻底清除的话，需要手动删掉此dom。

# 组件之间通讯

## 父子之间通讯

父子之间通讯又分为父->子，子->父。

因为react单向数据流向的缘故，父->子通信的话直接通过props。父组件数据变动，直接传递给子组件。

子->父组件之间就要通过回调函数来通信了，父组件传递一个回调函数给子组件，子组件通过调用此函数的方式通知父组件通信。

## 跨级组件通信

react为了实现祖先组件和后辈组件之间的通信问题，引入了contextApi。

MessageList中的color会自动更新到儿孙组件里面去，实现跨级通信。如果需要反过来通信，则需要借助其他工具，比如事件系统(Pub/Sub)。

## 没有嵌套关系组件之间通信

组件之间通信最主流的两种方式脱胎于观察这模式和中介者模式这两种。

跨级之间通信现在最主流的方式就是观察这模式的实现Pub/Sub，react社区中的redux也是使用这种方式实现的。

vue2.X版本也去掉了跨组件通信的功能。那如何在2.x中做跨组件通信呢？如果不借助外力的话，是不是可以使用 `$ parent` 和 `$ childen` 的递归调用实现全局组件通信呢？比如我想广播一个事件，我就查找到所有的子组件，挨个触发`$emit(xx)`，上报一个事件也是同理，只不过需要查找所有的$parent。结合起来就可以实现组件之间的通信，只不过这种查找效率比较低，需要慎用和优化
