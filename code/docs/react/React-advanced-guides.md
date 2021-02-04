# React 高级指导

### 1、深入JSX语法

jsx实际上是一个语法糖，babel 将 jsx 转化为 JS，React.createElement 的过程（创建标签和属性）。

如果标签中是大写，说明是一个组件，必须在作用域中声明。组件实际上就是一个函数。

~~~jsx
import React from 'react';

function Hello(props) {
  return <div>Hello {this.props.name}</div>;
}

function HelloWorld() {
  return <Hello name="Amirica"/>
}
// 只要在定义域内定义一个函数，返回值是一个JSX即可作为一个单向的组件
~~~

#### 大括号

JSX中 { } 内部的 JS 语句：if 和 for 不能在大括号内使用（可以使用 && 进行判断）可以在return之前操作 if 和 for等复杂变量处理过程，将需要显示的变量暂时存储在变量中，这样实现条件渲染和循环。

#### 扩展属性

~~~jsx
const props = {name: "Mike", age: '16'}; //object
return <Hello {...props}>;

// 将一个对象作为props进行传递。优点：大型应用数据多，统配向下传递属性，可以方便的进行树结构创建。缺点：很多不相关的属性创建到节点内部。
~~~

jsx 中使用 && 进行条件渲染。需要注意：前面的条件必须返回 false 的情况下才不会渲染后面的对象。

~~~jsx
{this.props.commentsNumber.length && <span></span>}
 // 当数组的长度是0(空数组)，长度是0，界面会渲染一个0，而不会渲染后面的span。
~~~

 如果想要以jsx的形式在界面上输出 true 或 false null undefined， 那么需要转化成字符串进行输出。否则JSX中进行判断操作。

### 2、PropTypes监测数据类型

注意: `React.PropTypes` 自 React v15.5 起已弃用。请使用 [`prop-types` ](https://www.npmjs.com/package/prop-types)库代替。

~~~jsx
import PropTypes from 'prop-types';

class Hello extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

Hello.propTypes = {
  name: PropTypes.string.isRequired
};
~~~

在开发模式下，react会监测传值的类型；

~~~jsx
// 你也可以限制你的属性值是某个特定值之一
optionalEnum: PropTypes.oneOf(['News', 'Photos']),

// 限制它为列举类型之一的对象
optionalUnion: PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Message)
]),
requiredAny: PropTypes.any.isRequired,
~~~

### 3、静态类型检查

1. 使用 flow-bin 库检查数据类型：这个比propTypes 强大(facebook)

~~~bash
npm install flow-bin --save-dev flow-bin
npm run flow init 
# 增加 "flow": "flow" 到 package.json 脚本中

npm install --save-dev babel-preset-flow

# 稍后运行
npm run flow

# 详情查阅 flow 的说明文档
~~~

2. typeScript - 微软



### 4、ref

在这三种情况下使用 ref 。尽量减少 ref 的使用。如果必须使用，首先考虑使用状态提升的方式，将子组件的状态放到父组件中，不同组件就可以共享这个状态。ref 的更新在 componentDidMount and componentDidUpdate 阶段。

- 处理焦点、文本选择或媒体控制。
- 触发强制动画。
- 集成第三方 DOM 库

目前使用ref的情况：获取选中文本的位置，获取滚动元素的位置。

不能在函数式组件上使用 ref

~~~jsx
<HelloWorld ref={this.helloworld}> // wrong
// 因为函数式组件没有实例，无法获取；可以使用点语法获取当前组件的ref。
 
<Editor ref={(editor) => this.editor = editor}> //correct
// 直接使用一个变量接一下 a = 组件 使用组件点语法获取 editor 。
this.editor.value...
~~~

通常情况下，父组件不会直接获取子组件的属性。这样会保证子组件很好的封装性。

~~~jsx
// 子组件最好不要直接调用父组件的函数
this.props.getCommentNumber();

// 可以设置组件的回调函数
// father
onCommentAdded = (response) => {
  this.getCommentNumber();
}
// son 
this.props.onCommentAdded(response);
// 子组件获取评论数量后，调用组件的回调函数，具体做什么事情需要父组件决定；
~~~

父组件获取子组件的ref的情况：父组件需要获取子组件（设置子组件）节点的位置；

可以获取选中的部分，获取选中文本的坐标，计算后设置属性（buttonTop），将这个参数直接传递给子组件中的菜单，以行内样式设置子组件的位置。

不推荐直接获取元素的做法！

### 5、非受控组件

大部分情况，表单使用受控组件处理（react处理）；少数情况使用非受控组件（DOM）处理；

```js
// 非受控组件，不建议下面的写法，需要使用ref

<input type="text" ref={(input) => this.input = input}>
  
handleClick = () => {
	console.log(this.input.value);  
}
```

大部分表单可以写成受控组件。文件上传表单是非受控组件。使用上面的ref方法，将已经上传的内容（文件名），设置组件的属性中。

### 6、性能优化

1、使用 React 生产版本，使用 uglify-js ，使用其他插件优化代码，去掉注释；

2、避免重复渲染：当一个组件的props和status发生变化后，React会比较前后的差异进行渲染。如果知道某些情况下，即使发生变化也不需要渲染界面，可以手动操作。shouldComponentUpdate 默认是 true。

如果不设置，那么会通过 diff 算法比较整个节点树是否发生变化，稍后判断进行渲染。如果设置false， 直接跳过整个情况（不进行 diff 比较）。

~~~jsx
shouldComponentUpdate(nextProps, nextState) {
  return true;
}

// return false;
~~~

大部分情况下，你可以使用`React.PureComponent`而不必写你自己的`shouldComponentUpdate`，它只做一个浅比较。但是由于浅比较会忽略属性或状态**突变**的情况，此时你不能使用它。

使用不可突变的数据结构 [Immutable.js] 可以解决状态突变的情况。原始集合在新集合创建后仍然可以使用。新集合和原始集合结构共享。

### 7、协调 reconciliation

如果完全更新一个DOM树，那么算法的时间复杂度是o(n³)。通过对比不同组件和不同节点是否相同减少计算量。这时的算法复杂度是o(n)。两个重要原理：两个不同类型的元素会产生完全不同的树；根据key的属性，判断稳定的子节点。不同类型的元素直接渲染，相同类型的元素仅仅更新属性。keys是一个索引，在同一个序列中的所有子节点具有不同的keys。使用 map 方法渲染子节点是需要加入唯一的固定的key值。

### 8、context

避免了props的逐层传递，直接跨越中间的组件进行数据传递。（例如全局的数据，用户的信息，主题，语言等）。用于多个层级多个组件的情况。目前实际开发中还没有用到。

~~~jsx
// 常见 context API
const { Provider, Consumer } = React.createContext(defaultValue);
// 创建：渲染 consumer 时，可以根据组件树上层中最接近的组件中匹配 Provider 读取当前的 context 值。如果上层组件树中没有一个 Provider 那么需要用到 default Value。

<Provider value={} />

<Consumer>
  {value => /* render sth based on the context value */}
</Consumer>

对于每一个provider更新，consumer将会更新(不受到props更新的影响)。
~~~

### 9、fragments

一个空的元素。一个组件的根元素必须是一个单独的元素。

~~~jsx
function Glossary(props) {
  return (
  	<dl>
    	{props.items.map(item => (
       	<React.Fragment key={item.id}>
    			<dt>{item.term}</dt>
    			<dt>{item.description}</dt>
    		</React.Fragment>
       ))}
    </dl>
  );
}
~~~



### React

注意：重点是查漏补缺

http://www.runoob.com/react/react-tutorial.html



#### 安装

1、webpack 编译流程（http://www.runoob.com/react/react-install.html）

```bash
// 使用淘宝 cnpm 安装速度较快
npm install -g cnpm --registry=http://registry.npm.taobao.org
npm config set registry https://registry.npm.taobao.org

cnpm install [name]

// 快速搭建 React 开发环境
cnpm install -g create-react-app
create-reast-app my-app
cd my-app/
npm start
localhost://3000
开始界面 index.html
App.js

https://blog.csdn.net/u012859720/article/details/70597119/
```

```jsx
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App"></div>
    );
  }
}
 
export default App;
```

2、忽略文件：这部分文件不会上传到github（对于node-module和个人本地配置文件需要忽略处理）；

.gitignore（隐藏文件）

```bash
# See https://help.github.com/ignore-files/ for more about ignoring files.
# testing
/coverage

# production
/build

#Idea

/.idea


# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

src/config.js

# backup files
*~
```

ES6 与 传统代码——ES6 需要使用 this.props

```jsx
function Clock(props) {
  return (
    <div>
      {props.data.toLocaleTimeString()}
    </div>
  );
}

class Clock extends React.Component {
  render () {
    return (
      <div>this.props.data.toLocaleTimeString()</div>
    );
  }
}
```

JSX 语法补充：

注释写在花括号中，{/* test */} 在测试的时候写jsx注释很方便



#### React 组件

为了提高代码的复用性，最好使用复合组件；在一个界面中使用多个独立的组件，这样可以最好的做到组件的复用。组件的主要目的就是组件的复用。

```jsx
/* es5 函数定义组件 */
function Hello(props) {
  return (<h1 className={this.props.h1}>Hello</h1>);
}

/* es6 类定义组件 */
class Welcome extends React.Compoennt {
  consotructor(props) {
    super(props);
    this.state = {
      input: this.props.time
    };
  }
  render() {
    return (<h1>Hello</h1>);
  }
}
// 现在常用ES6的方法，使用ES5的方法自己也要会做。
```

#### React 受控组件

1.受控组件：在原生的HTML中，input（type='text'） textarea select 三个元素的内部的属性可以随着用户的输入变化。

2.react 中使用 state 控制属性的变化，将原生的受控组件和 react 中 state 结合。

```jsx
class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  
  handleChange = (e) => {
    let text = e.target.value.trim();
    this.setState({
      value: text
    });
  } 
  
  handleSubmit = (e) => {
    e.preventDefault();
    seafile.addComment(this.state.value).then((res) => {
      console.log(res.data.success);
    })
  }
  
  render() {
    <form>
      <input type="text" value={this.state.value} onChange={this.handleChange}/>
      <button onClick={this.hanldeSubmit}>Submit</button>
    </form>
  }
}
```

使用受控组件可以过滤用户输入，在handlechange 函数中，设置正则表达式或者简单的trim函数可以过滤部分输入。

`<input type='file' />`是非受控组件。将本地的n个文件上传到服务器中。

当界面上有多个input时，可以只写一个函数，handleinputChange 处理所有的input输入。通过 event.target.type 或者 event.target.name 进行选择，判断是哪个组件发生输入并进行不同的界面操作。

~~~html
<input type="textarea" name="comment" onChange="handleInputChange"/>
<input type="checkoutbox" name="comment-number" onChange="handleInputChange"/>
~~~

~~~jsx
handleInputChange = (e) => {
  let value = e.target.type === 'textarea' ? e.target.value : e.target.checked;
  const name = e.target.name;
  this.setState({
    //
  });
}
~~~

受控组件使用很多会形成很多的处理函数（2n）根据场合使用受控组件和非受控组件。

#### React组合&继承

React中使用组件进行数据传递。可以进行组件的嵌套组合，实现功能的复用（函数、属性）；react中不推荐使用继承的方法。

对于对话框和侧旁栏，使用前可能不清除内部的功能和需要的资源。



#### React 理念

1. 静态界面：使用props进行单向数据传递，从顶向下进行数据传递，不需要使用state。
2. 动态界面：使用props进行从上到下传递（repoID），state进行组件内部的数据产生和传递（comment）。简单界面使用从上到下的开发过程，复杂界面使用从下到上的开发流程。尽量减少state使用：确定state的使用位置，确定使用state的组件。
3. 组件化会增加代码复用性（后期开发显著增加代码复用性，初期代码比较复杂）



#### 开发流程

1. UI 设计：根据UI中不同图层，确定组件的相对位置；根据产品功能，根据后端传来的数据（默认是字典的JSON），确定组件的内容。基本上，一个组件做到实现一个单一的功能。如果一个组件可以实现很多功能（后期增加很多新的功能，需要拆分成独立功能的子组件）。
2. 静态开发：不考虑用户交互的情况，直接静态页面进行开发（listComments），数据自顶向下进行传递。完成静态开发后，可以进行逐步测试，确保当前静态功能的实现（显示当前评论数量，显示当前已有评论，删除评论）。
3. 动态开发：主要针对用户输入或者操作。用户在底组件中输入，从下层获取数据直接请求，或者使用父组件的函数统一进行请求。

#### React 状态提升

需求：react是一个数据单向传值的框架，如果子组件不能直接给父组件传值。

如果内部多个子组件共同使用相同的数据，并且互相影响。那么可以将这部分共有的数据存放在父组件的属性中，将handleChange作为props传递给子组件。不同子组件会更改福钻进的某个参数，这部分参数会影响其他子组件的行为。确保父组件内部的数据改变会改变子组件的属性。

案例：公里和英里进行转换，总数是固定的，不同子组件需要根据单位进行转换，将唯一的数据存放在父组件中，这样可以减少组件传值造成的bug。

tips：在Chrome react 工具可以查看不同组件的传值，不需要每次console.log。

~~~jsx
class Text extends React.Compontent {
  
  constrcutor(props) {
    super(props);
    this.state({
      lan: null,
      length: 0
    });
  }
  
  handleInputChange = (e) => {
    if (e.target.name === 'zh') {
      this.setState({
        lan: 'zh',
        length: e.target.value
      })
    }
    else if (e.target.name === 'en') {
      this,setState({
        lan: 'en',
        length: e.target.value
      })
    }
  }
  
  render() {
    const lan = this.state.lan;
    const chinese = lan === "zh" ? length : length * 0.5;
    const english = lan === "en" ? length : length * 2;
    return (
      <div>{chinese}</div>
      <div>{english}</div>
    );
  }
}
~~~

不管输入的是英语还是汉语的单位，那么长度会转化成为英语和汉语进行处理显示。

### 传递Refs

refs 在高阶组件中进行传值。React 如果需要获取界面中的信息（例如元素的实际宽度，那么需要使用Refs进行传值，让子组件获取父组件的高度和滚动的距离）

### Render Props

### 协同

react可以很好的和其他库进行兼容，例如 jquery 或者 backbone。

可访问性

~~~html
<Lable htmlFor="test">Name</Lable>
<input id="test" type="text" name="name"></input>
~~~

焦点边框：点击输入区域会出现边框

解决方案：使用css outline: 0;

~~~jsx
// react bubble
import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';

class Tmp extends React.Component {
  constructor(...args) {
    super(...args)
  }
}
~~~

~~~jsx
class LosinForm extends React.Component {

  constructor(...args) {
    super(...args)
  }

  // 使用默认的 defauleProps defaultValue defaultChecked 设置表单初始值。
  // 当然可以绑定状态 state; 
  // this.setState({ value: this.props.name });

  render() {
    return (
      <form action="http://www.baidu.com" method="get">
        <input type="text" name="userName" defaultValue={this.props.userName}/>
        <input type='submit' value="提交"/>
      </form>
    );
  }
}

$(function() {
  ReactDOM.render(
    <LoginForm userName="Michael"/>
  );
});

~~~
