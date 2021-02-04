# React 的 PureComponent 与 Component

## 1、官方文档解释

在 React 中，Component 和 PureComponent 有一些区别，官方的解释如下：

> `React.Component` is the base class for React components when they are defined using [ES6 classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):

>```jsx
>class Greeting extends React.Component {
>      render() {
>         return <h1>Hello, {this.props.name}</h1>;
>      }
>}
>```
> 

>See the [React.Component API Reference](https://reactjs.org/docs/react-component.html) for a list of methods and properties related to the base `React.Component` class.

中文的意思是：React.Component 基于 React 的组件，使用 ES6 的类语法（class）可以点击链接查看一系列的方法和属性。

>### `React.PureComponent`

>`React.PureComponent` is similar to [`React.Component`](https://reactjs.org/docs/react-api.html#reactcomponent). The difference between them is that [`React.Component`](https://reactjs.org/docs/react-api.html#reactcomponent) doesn’t implement [`shouldComponentUpdate()`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate), but `React.PureComponent` implements it with a shallow prop and state comparison.

>If your React component’s `render()` function renders the same result given the same props and state, you can use `React.PureComponent` for a performance boost in some cases.

> Note
>
> `React.PureComponent`’s `shouldComponentUpdate()` only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only extend `PureComponent` when you expect to have simple props and state, or use [`forceUpdate()`](https://reactjs.org/docs/react-component.html#forceupdate) when you know deep data structures have changed. Or, consider using [immutable objects](https://facebook.github.io/immutable-js/) to facilitate fast comparisons of nested data.
>
> Furthermore, `React.PureComponent`’s `shouldComponentUpdate()` skips prop updates for the whole component subtree. Make sure all the children components are also “pure”.

中文意思：React.PureComponent 与 React.Component 基本相同。

区别：Component 没有直接实现 shouldComponentUpdate 这个方法；但是 PureComponent通过浅层的Porps 和 state 的对比，内部实现了这个生命周期函数。

如果你的组件 render 函数渲染时具有相同的 props 和 state，那么可以使用 PureComponent 来提高性能。

注意：PureComponent仅仅实现对象的浅对比。如果对象中包含复杂的数据结构，会产生较大的区别。除非你的state 和 props 是简单的，或者当你的深层数据结构变化时使用 forceUpdate，或者使用 immutable 对象来快速比较嵌套（复杂）的数据。

此外：PureComponent会跳过整个组件子树的props更新，要确保全部的子组件也是 pure 的形式。



## 2、区别具体说明

### 2.1 性能不同

它们几乎相同，PureComponent 通过prop、state的浅比较来实现 shouldComponentUpdate，某些情况下可以用 PureComponen t提升性能.

1.浅对比(shallowEqual)，即 react 中的一个函数，然后根据下面的方法进行是不是`PureComponent`的判断，帮我们做了本来应该我们在`shouldComponentUpdate`中做的事情。

**小结：Component 中需要手动执行的 ComponentShouldUpdate 函数，在PureComponent中已经自动完成了（自动浅对比）。**

```js
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
```

而本来我们做的事情如下，这里判断了`state`有没有发生变化（prop同理），从而决定要不要重新渲染，这里的函数在一个继承了`Component`的组件中，而这里`this.state.person`是一个对象，你会发现，在这个对象的引用没有发生变化的时候是不会重新`render`的（即下面提到的第三点），所以我们可以用`shouldComponentUpdate`进行优化，这个方法如果返回`false`，表示不需要重新进行渲染，返回`true`则重新渲染，默认返回`true`

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return (nextState.person !== this.state.person);
}
```

2.如下显示的是一个 Test 组件，设置了一个`state`是`isShow`，通过一个按钮点击可以改变它的值，结果是：初始化的时候输出的是`constructor`，`render`，而第一次点击按钮，会输出一次render，即重新渲染了一次，界面也会从显示`false`变成显示`true`，但是当这个组件是继承自`PureComponent`的时候，再点击的时，不会再输出`render`，即不会再重新渲染了，而当这个组件是继承自`Component`时，还是会输出`render`，还是会重新渲染，这时候就是`PureComponent`内部做了优化的体现。同理也适用于`string`，`number`等基本数据类型，因为基本数据类型，值改变了就算改变了。

**小结：如果传值都是简单对象，可以放心使用；如果传值有复杂对象，需要慎重使用。**

```jsx
import React, { PureComponent } from 'react';

class Test extends PureComponent{
  constructor() {
    super();
    this.state = {
      isShow: false
    };
  }
  
  changeState = () => {
    this.setState({ isShow: true });
  };

  render() {
    return (
      <div>
        <button onClick={this.changeState}>Click it</button>
        <div>{this.state.isShow.toString()}</div>
      </div>
    );
  }
}
```

5.当这个`this.state.arr`是一个数组时，且这个组件是继承自`PureComponent`时，初始化依旧是输出`constructor`和`render`，但是当点击按钮时，界面上没有变化，也没有输出`render`，证明没有渲染，但是我们可以从下面的注释中看到，每点击一次按钮，我们想要修改的`arr`的值已经改变，而这个值将去修改`this.state.arr`,但是因为在`PureComponent`中`浅比较`这个数组的引用没有变化所以没有渲染，`this.state.arr`也没有更新，因为在`this.setState()`以后，值是在`render`的时候更新的。

**小结：如果是复杂数据类型，这里会造成错误的显示（setState浅复制更新，但是界面不会重新渲染）**

6.但是当这个组件是继承自`Component`的时候，初始化依旧是输出`constructor`和`render`，但是当点击按钮时，界面上出现了变化，即我们打印处理的`arr`的值输出，而且每点击一次按钮都会输出一次`render`，证明已经重新渲染，`this.state.arr`的值已经更新。

**小结：如果是复杂数据类型，使用Component可以正确显示**

```jsx
import React, { PureComponent } from 'react';

class Test extends PureComponent {
  constructor() {
    super();
    this.state = {
      arr:['1']
    };
  }
  
  changeState = () => {
    let { arr } = this.state;
    arr.push('2');
    console.log(arr);
    // ["1", "2"]
    // ["1", "2", "2"]
    // ["1", "2", "2", "2"] 
    this.setState({ arr });
  };

  render() {
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <div>
          {this.state.arr.map((item) => { return item; })}
        </div>
      </div>
    );
  }
}
```

7.下面的例子用`扩展运算符`产生新数组，使`this.state.arr`的引用发生了变化，所以初始化的时候输出`constructor`和`render`后，每次点击按钮都会输出`render`，界面也会变化，不管该组件是继承自`Component`还是`PureComponent`的

**小结：如果state或者Props是深复制，那么两种方法都可以实现更新**

```jsx
import React, { PureComponent } from 'react';

class Test extends PureComponent{
  
  constructor() {
    super();
    this.state = {
      arr:['1']
    };
  }
  
  changeState = () => {
    let { arr } = this.state;
    this.setState({
      arr: [...arr, '2']
    })
  };

  render() {
    console.log('render');
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <div>
          {this.state.arr.map((item) => {
            return item;
          })}
          </div>
      </div>
    );
  }
}
```

### 2.2. 对子组件的影响

**PureComponent不仅会影响本身，而且会影响子组件，所以PureComponent最好用在数据展示组件中**

1.我们让`IndexPage`组件里面包含一个子组件`Example`来展示`PureComponent`是如何影响子组件的

2.父组件继承`PureComponent`，子组件继承`Component`时：下面的结果初始化时输出为`constructor`，`IndexPage render`，`example render`，但是当我们点击按钮时，界面没有变化，因为这个`this.state.person`对象的引用没有改变，只是改变了它里面的属性值所以尽管子组件是继承`Component`的也没有办法渲染，因为父组件是`PureComponent`，父组件根本没有渲染，所以子组件也不会渲染

3.父组件继承`PureComponent`，子组件继承`PureComponent`时：因为渲染在父组件的时候就没有进行，相当于被拦截了，所以子组件是`PureComponent`还是`Component`根本不会影响结果，界面依旧没有变化

4.父组件继承`Component`，子组件继承`PureComponent`时：结果和我们预期的一样，即初始化是会输出`constructor`，`IndexPage render`，`example render`，但是点击的时候只会出现`IndexPage render`，因为父组件是`Component`，所以父组件会渲染，但是
 当父组件把值传给子组件的时候，因为子组件是`PureComponent`，所以它会对`prop`进行浅比较，发现这个`person`对象的引用没有发生变化，所以不会重新渲染，而界面显示是由子组件显示的，所以界面也不会变化

5.父组件继承`Component`，子组件继承`Component`时：初始化是会输出`constructor`，`IndexPage render`，`example render`，当我们第一次点击按钮以后，界面发生变化，后面就不再改变，因为我们一直把它设置为sxt2，但是每点击一次都会输出`IndexPage render`，`example render`，因为每次不管父组件还是子组件都会渲染

6.所以正如下面第四条说的，如果`state`和`prop`一直变化的话，还是建议使用`Component`，并且`PureComponent`的最好作为展示组件

```jsx
import React, { PureComponent, Component } from 'react';
import Example from "../components/Example";

class Test extends PureComponent{
  
  constructor() {
    super();
    this.state = {
      person: {
        name: 'sxt'
      }
    };
  }
  
  changeState = () => {
    let { person } = this.state;
    person.name = 'sxt2';
    this.setState({ person });
  };

  render() {
    const { person } = this.state;
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <Example person={person} />
      </div>
    );
  }
}


import React, { Component } from 'react';
class Example extends Component {
  render() {
    const { person } = this.props;
    return(
      <div>{person.name}</div>
    );
  }
}
```

小结：如果 state props 是复杂（引用）类型，则要引用内存地址不同，才会正确渲染组件

如果prop和state每次都会变，那么PureComponent的效率还不如Component，因为你知道的，进行浅比较也是需要时间

若有shouldComponentUpdate，则执行它，若没有这个方法会判断是不是PureComponent，若是，进行浅比较继承自`Component`的组件，若是`shouldComponentUpdate`返回`false`，就不会渲染了，继承自`PureComponent`的组件不用我们手动去判断`prop`和`state`，所以在`PureComponent`中使用`shouldComponentUpdate`会有如下警告:

**Test has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.**

也是比较好理解的，就是不要在`PureComponent`中使用`shouldComponentUpdate`，因为根本没有必要.

## 3、参考资料

官方文档 https://reactjs.org/docs/react-api.html

https://www.jianshu.com/p/c41bbbc20e65