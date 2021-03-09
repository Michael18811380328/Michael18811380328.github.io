# React 中的事件处理

## 基本使用

`React`框架自身实现了一套事件处理机制，它的基本用法和`DOM`事件很相似。例如，给某个`react`元素绑定点击事件：

~~~jsx
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick = () => {
    //
  }
  render() {
    return (<button onClick={this.onClick}></button>);
  }
}
~~~

- 事件类型采用小驼峰命名法，因此是 `onClick`，而不是 `onclick`，其他事件类型相同。
- 直接将函数的声明(this.onClick)当成事件句柄传递

我们将它的这套事件处理机制称之为`SyntheticEvent`，即**合成事件**

## 合成事件（Synthetic Event）

### 事件冒泡

`React`中，默认的事件传播方式为**冒泡**：

```jsx
import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {
  render() {
    return (
      <div onClick={() => {console.log("ancestor");}}>
        <div onClick={() => {console.log("parent");}}>
          <div onClick={() => {console.log("child");}}></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

在该示例中，`3`个`div`嵌套显示，并且每个元素上均绑定`onClick`事件：

当用户点击 `div`元素时，可以看到，控制台先后输出了`child -> parent -> ancestor`，==这是因为在React的事件处理系统中，默认的事件流就是冒泡==，如果说我们希望以捕获的方式来触发事件的话，可以使用`onClickCapture`来绑定事件，也就是在事件类型后面加一个后缀`Capture`：

```jsx
import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {
  render() {
    return (
      <div onClickCapture={() => {console.log("ancestor");}}>
        <div onClickCapture={() => {console.log("parent");}}>
          <div onClickCapture={() => {console.log("child");}}></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

这时，还是点击`div`，就可以看到事件流是从`ancestor -> parent -> child `传播了。

### 事件委托

在合成事件系统中，所有的事件都是绑定在`document`元素上，即，虽然我们在某个`react`元素上绑定了事件，但是，最后事件都委托给`document`统一触发。

![图片描述](https://segmentfault.com/img/bVbm5eh?w=879&h=466)

#### 在合成事件中只能阻止合成事件中的事件传播

我们在红色区域的`div`里，也就是最里层的那个元素上，使用`e.stopPropagation()`方法来阻止事件流的传播：

```jsx
<div onClick={() => {console.log("ancestor")}}>
    <div onClick={() => {console.log("parent");}}>
        <div onClick={e => { console.log("child"); e.stopPropagation();}}></div>
    </div>
</div>
```

点击红色区域的，我们可以看到控制台上只输出了`child`，说明这时已经成功阻止了冒泡。执行流程如下：

![图片描述](https://segmentfault.com/img/bVbm5ej?w=885&h=459)

从图中我们可以看到，`react` 阻止的事件流，并没有阻止真正`DOM`元素的事件触发，当红色`div`元素被点击时，真正的元素还是按照冒泡的方式，层层将事件交给上级元素进行处理，最后事件传播到`docuement`，触发合成事件，在合成事件中，`child`触发时，`e.stopPropagation();`被调用，合成事件中的事件被终止。因此，==合成事件中的`stopPropagation`无法阻止事件在真正元素上的传递，它只阻止合成事件中的事件流。==相反，如果我们在红色的`div`上，绑定一个真正的事件，那么，合成事件则会被终止。

![图片描述](https://segmentfault.com/img/bVbm5en?w=879&h=480)

#### 事件对象

在`SyntheticEvent`中，我们依然可以获取到事件发生时的`event`对象：

```jsx
import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {

  state = {
    x: 0,
    y: 0
  }

  render() {
    return (
      <div>
        <div
          style={styles["DEBUG_DISPLAY"]}
          onClick={e => {
            console.log(e)
          }}
          >
          x: {this.state.x}，y: {this.state.y}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

以上示例中，我们给`div`元素绑定了一个`click`事件，在用户点击时，在控制台输出`event`对象：

接下来将用户点击时的坐标在`div`元素中显示出来，可以通过`clientX`和`clientY`来访问：

```jsx
<div
    style={styles["DEBUG_DISPLAY"]}
    onClick={e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        });
    }}
    >
    x: {this.state.x}，y: {this.state.y}
</div>
```

合成事件中的`event`对象，并不是原生的`event`，只是说，我们可以通过它获取到原生`event`对象上的某些属性，比如以上示例中的`clientX`和`clientY`。而且，对于这个`event`对象，在整个合成事件中，只有一个，被全局共享，也就是说，当这次事件调用完成之后，这个`event`对象会被清空，等待下一次的事件触发，因此，我们无法在异步的操作中获取到`event`：

```jsx
<div
    style={styles["DEBUG_DISPLAY"]}
    onClick={e => {
        setTimeout(() => {
            this.setState({
                x: e.clientX,
                y: e.clientY
            });
        }, 1000);
    }}
    >
    x: {this.state.x}，y: {this.state.y}
</div>
```

当用户点击`div`，`1`秒之后获取点击时的坐标，这时，可以看到控制台抛出错误：

![图片描述](https://segmentfault.com/img/bVbm5fD?w=560&h=750)

在异步操作中想要获取`event`对象中的数据，在事件发生时就需要将数据通过变量保存下来：

```jsx
<div
    style={styles["DEBUG_DISPLAY"]}
    onClick={e => {
        const { clientX, clientY } = e;
        setTimeout(() => {
            this.setState({
                x: clientX,
                y: clientY
            });
        }, 1000);
    }}
    >
    x: {this.state.x}，y: {this.state.y}
</div>
```

### 混合使用

`react`鼓励我们使用合成事件，但是，在某些需求中，还是需要通过原生事件来进行处理，这时，就涉及到合成事件和原生事件的混合使用，例如以下示例：

```jsx
import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {

  state = {
    isShow: "none"
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              isShow: "block"
            });
          }}
        >点击显示</button>
        <div style={{
          display: this.state.isShow,
          width: "100px",
          height: "100px",
          backgroundColor: "red"
        }}></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

在这个示例中，我们提供一个按钮和一个`div`元素，当用户点击按钮时，显示`div`，当点击页面其他区域时，则隐藏。以上代码已经实现点击按钮显示`div`的功能：

![图片描述](https://segmentfault.com/img/bVbm5fJ?w=560&h=750)

要实现 *点击其他区域隐藏`div`元素* 的功能，需要将事件绑定在`document`元素上，接下来，在`compnentDidMount`生命周期函数中，来绑定该事件：

```jsx
class App extends Component {

  state = {
    ...
  }

  componentDidMount() {
    document.addEventListener("click", e => {
        this.setState({
            isShow: "none"
        });
    })
  }

  render() {
    ...
  }
}
```

当点击按钮时，`isShow: "block"`，当点击其他区域时，`isShow: "none"`。这时我们发现，点击按钮时，`div`显示不出来了。

![图片描述](https://segmentfault.com/img/bVbm5fQ?w=359&h=248)

这个现象的原因是，实际上，在`document`元素身上，现在已经存在`2`个`click`事件，一个是合成事件绑定的`click`，另外一个是我们自己添加的监听器。当用户点击按钮时，`synthetic`中的`click`首先被触发，这时，`isShow`状态被设置成`block`，页面元素被显示出来，紧跟着，`native`中的`click`事件被触发，又把`isShow`的状态改为`none`，`div`元素又被隐藏了起来。

处理方法：

```jsx
import React, { Component } from "react"
import ReactDOM from "react-dom"

class App extends Component {

  state = {
    isShow: "none"
  }

  button = React.createRef();

  componentDidMount() {
    document.addEventListener("click", e => {
      // 当 native 事件被触发时，我们判断一下当前目标元素是否为 button，
      // 如果不是点击的按钮，则就意味着将元素隐藏
      if (e.target !== this.button.current) {
        this.setState({
          isShow: "none"
        });
      }
    })
  }

  render() {
    return (
      <div>
        <button
          ref={this.button}
          onClick={() => {
            this.setState({
              isShow: "block"
            });
          }}
        >点击显示</button>
        <div style={{
          display: this.state.isShow,
          width: "100px",
          height: "100px",
          backgroundColor: "red"
        }}></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```