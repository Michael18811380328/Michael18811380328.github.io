# React 高阶 API

使用方法：`react` 是React库的入口点。如果你通过 `<script>` 标签加载React，这些高阶API可用于 `React` 全局。如果你使用ES6，你可以使用 `import React from 'react'` 。如果你使用ES5，你可以使用 `var React = require('react')` 。

## 概览

### Components

React 组件可以让你把UI分割为独立、可复用的片段，并将每一片段视为相互独立的部分。

React组件可以通过继承 `React.Component` 或 `React.PureComponent` 来定义。

- [`React.Component`](https://react.docschina.org/docs/react-api.html#react.component)
- [`React.PureComponent`](https://react.docschina.org/docs/react-api.html#react.purecomponent)

如果不用ES6类，你可以使用 `create-react-class` 模块。参阅 [Using React without JSX](https://react.docschina.org/docs/react-without-es6.html) 了解更多信息。

### Creating React Elements

推荐 [使用JSX](https://react.docschina.org/docs/introducing-jsx.html) 描述你的UI外观。每个JSX元素仅是调用 [`React.createElement`](https://react.docschina.org/docs/react-api.html#createelement) 的语法糖。如果使用了JSX，你通常不会直接调用以下方法。

- [`createElement()`](https://react.docschina.org/docs/react-api.html#createelement)
- [`createFactory()`](https://react.docschina.org/docs/react-api.html#createfactory)

参阅 [Using React without JSX](https://react.docschina.org/docs/react-without-jsx.html) 了解更多。

### Transforming Elements

`React` 同时也提供了其他API：

- [`cloneElement()`](https://react.docschina.org/docs/react-api.html#cloneelement)
- [`isValidElement()`](https://react.docschina.org/docs/react-api.html#isvalidelement)
- [`React.Children`](https://react.docschina.org/docs/react-api.html#react.children)

### Fragments

`React` also provides a component for rendering multiple elements without a wrapper.

- [`React.Fragment`](https://react.docschina.org/docs/react-api.html#reactfragment)

### Other

- [`React.forwardRef`](https://react.docschina.org/docs/react-api.html#reactforwardref)



## Reference

### `React.Component`

用 [ES6 类](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) 定义时，`React.Component`是React组件的基类。

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

有关 `React.Component` 的方法和属性列表，请参阅 [`React.Component API Reference`](https://react.docschina.org/docs/react-component.html)。

------

### `React.PureComponent`

`React.PureComponent` 与 [`React.Component`](https://react.docschina.org/docs/react-api.html#react.component) 几乎完全相同，但 `React.PureComponent`通过prop和state的浅对比来实现 [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)。

如果React组件的 `render()` 函数在给定相同的props和state下渲染为相同的结果，在某些场景下你可以使用 `React.PureComponent` 来提升性能。

> Note

> `React.PureComponent` 的 `shouldComponentUpdate()` 只会对对象进行浅对比。如果对象包含复杂的数据结构，它可能会因深层的数据不一致而产生错误的否定判断(表现为对象深层的数据已改变视图却没有更新, 原文：false-negatives)。当你期望只拥有简单的props和state时，才去继承 `PureComponent` ，或者在你知道深层的数据结构已经发生改变时使用 [`forceUpdate()`](https://react.docschina.org/docs/react-component.html#forceupdate) 。或者，考虑使用 [不可变对象](https://facebook.github.io/immutable-js/) 来促进嵌套数据的快速比较。
>
> 此外,`React.PureComponent` 的 `shouldComponentUpate()` 会忽略整个组件的子级。请确保所有的子级组件也是”Pure”的。

### `createElement()`

```
React.createElement(
  type,
  [props],
  [...children]
)
```

根据给定的类型创建并返回新的 [`React element`](https://react.docschina.org/docs/rendering-elements.html) 。参数type既可以是一个html标签名称字符串(例如`'div'` 或 `'span'` )，也可以是一个 [`React component`](https://react.docschina.org/docs/components-and-props.html) 类型(一个类或一个函数)。

`React.DOM` 提供了DOM组件的 `React.createElement()` 的便捷包装。举个例子，`React.DOM.a(...)` 是 `React.createELement('a', ...)` 的一个便捷包装。这个用法被认为是过时的，我们推荐您使用JSX，或者直接使用 `React.createElement()` 。

用 [`JSX`](https://react.docschina.org/docs/introducing-jsx.html) 编写的代码会被转换成用 `React.createElement()` 实现。如果使用了JSX，你通常不会直接调用 `React.createElement()` 。参阅 [`React Without JSX`](https://react.docschina.org/docs/react-without-jsx.html) 了解更多。

------

### `cloneElement()`

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

以 `element` 作为起点，克隆并返回一个新的React元素(React Element)。生成的元素将会拥有原始元素props与新props的浅合并。新的子级会替换现有的子级。来自原始元素的 `key` 和 `ref` 将会保留。

`React.cloneElement()` 几乎相当于：

```
<element.type {...element.props} {...props}>{children}</element.type>
```

然而，它也保留了 `ref`。这意味着，如果你通过 `ref` 获取到子级组件时，不会一不小心从祖先组件里窃取了它。你将获得与你新元素相同的 `ref` 。

这个API是一个替换已弃用的 `React.addons.cloneWithProps()` 的方案。

------

### `createFactory()`

```
React.createFactory(type)
```

根据给定的类型返回一个创建React元素的函数。类似 [`React.createElement`](https://react.docschina.org/docs/react-api.html#createElement) ，参数type既可以一个html标签名称字符串，也可以是一个 [`React component`](https://react.docschina.org/docs/components-and-props.html) 类型(一个类或时一个函数)。

这个方法过时了，我们推荐你使用JSX或直接使用 `React.createElement()` 来替代它。

如果使用了JSX，你通常不会直接调用 `React.createFactory()` 。参阅 [`React Without JSX`](https://react.docschina.org/docs/react-without-jsx.html)了解更多 。

------

### `isValidElement()`

```
React.isValidElement(object)
```

验证对象是否是一个React元素。返回 `true` 或 `false` 。

------


遍历数组的很重要的部分

### `React.Children`

`React.Children` 提供了处理 `this.props.children` 这个不透明数据结构的工具。

`React.Children.map`

```
React.Children.map(children, function[(thisArg)])
```

在包含在 `children` 里的每个子级上调用函数，调用的函数的 `this` 设置为 `thisArg` 。如果 `children` 是一个嵌套的对象或数组，它将被遍历。如果 `children` 是 `null` 或 `undefined`，返回 `null` 或 `undefined` 而不是一个空数组。

`React.Children.forEach`

```
React.Children.forEach(children, function[(thisArg)])
```

类似 [`React.Children.map()`](https://react.docschina.org/docs/react-api.html#react.children.map) ，但是不返回数组。

`React.Children.count`

```
React.Children.count(children)
```

返回 `children` 中的组件总数，相等于传给 `map` 或 `forEach` 时，回调函数被调用次数。

`React.Children.only`

```
React.Children.only(children)
```

返回`children`里仅有的子级。否则抛出异常。

`React.Children.toArray`

```
React.Children.toArray(children)
```

返回以赋key给每个子级 `child` 的扁平数组形式来组成不透明的 `children` 数据结构。如果你打算在你的渲染方法里操纵子级集合这很有用，特别是你想在 `this.props.children` 传下之前对它重新排序或切割。

> Note:
>
> 当children是扁平列表时，`React.Children.toArray()` 改变key来保留嵌套数组的语义。也就是说，为了在展开时保留嵌套数组的语义，`toArray` 会自动的给数组中每个 key 加了上前缀，以便将每个元素的key被限定到包含它的输入数组。

### `React.forwardRef`

`React.forwardRef` accepts a render function that receives `props` and `ref` parameters and returns a React node. Ref forwarding is a technique for passing a [ref](https://react.docschina.org/docs/refs-and-the-dom.html) through a component to one of its descendants. This technique can be particularly useful with [higher-order components](https://react.docschina.org/docs/higher-order-components.html):

```js
function enhance(Component) {
  class Enhanced extends React.Component {
    // ...

    render() {
      const {forwardedRef, ...rest} = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Intercept the "ref" and pass it as a custom prop, e.g. "forwardedRef"
  function enhanceForwardRef(props, ref) {
    return <Enhanced {...props} forwardedRef={ref} />;
  }

  // These next lines are not necessary,
  // But they do give the component a better display name in DevTools,
  // e.g. "ForwardRef(withTheme(MyComponent))"
  const name = Component.displayName || Component.name;
  enhanceForwardRef.displayName = `enhance(${name})`;

  return React.forwardRef(enhanceForwardRef);
}
```



# React.Component

组件能够让你将UI分割成独立的、可重用的部分，并对每一部分单独考量。[`React`](https://react.docschina.org/docs/react-api.html)提供了`React.Component` 。

## 概览

`React.Component`是一个抽象基础类，因此直接引用`React.Component`几乎没意义。相反，你通常会继承自它，并至少定义一个[`render()`](https://react.docschina.org/docs/react-component.html#render)方法。

通常你定义一个React组件相当于一个纯[JavaScript类](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes)：

```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

若你仍未使用 ES6，你可以使用 [`create-react-class`](https://react.docschina.org/docs/react-api.html#createclass)模块。查看 [Using React without ES6](https://react.docschina.org/docs/react-without-es6.html)了解更多。

### 组件生命周期

每一个组件都有几个你可以重写以让代码在处理环节的特定时期运行的“生命周期方法”。方法中带有前缀 **will** 的在特定环节之前被调用，而带有前缀 **did** 的方法则会在特定环节之后被调用。

#### 装配

这些方法会在组件实例被创建和插入DOM中时被调用：

- [`constructor()`](https://react.docschina.org/docs/react-component.html#constructor)
- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`componentWillMount()` / `UNSAFE_componentWillMount()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillmount)
- [`render()`](https://react.docschina.org/docs/react-component.html#render)
- [`componentDidMount()`](https://react.docschina.org/docs/react-component.html#componentdidmount)

#### 更新

属性或状态的改变会触发一次更新。当一个组件在被重渲时，这些方法将会被调用：

- [`componentWillReceiveProps()` / `UNSAFE_componentWillReceiveProps()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillreceiveprops)
- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
- [`componentWillUpdate()` / `UNSAFE_componentWillUpdate()`](https://react.docschina.org/docs/react-component.html#unsafe_componentwillupdate)
- [`render()`](https://react.docschina.org/docs/react-component.html#render)
- [`getSnapshotBeforeUpdate()`](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)
- [`componentDidUpdate()`](https://react.docschina.org/docs/react-component.html#componentdidupdate)

#### 卸载

当一个组件被从DOM中移除时，该方法被调用：

- [`componentWillUnmount()`](https://react.docschina.org/docs/react-component.html#componentwillunmount)

#### 错误处理

在渲染过程中发生错误时会被调用：

- [`componentDidCatch()`](https://react.docschina.org/docs/react-component.html#componentdidcatch)

### 其他API

每一个组件还提供了其他的API：

- [`setState()`](https://react.docschina.org/docs/react-component.html#setstate)
- [`forceUpdate()`](https://react.docschina.org/docs/react-component.html#forceupdate)

### 类属性

- [`defaultProps`](https://react.docschina.org/docs/react-component.html#defaultprops)
- [`displayName`](https://react.docschina.org/docs/react-component.html#displayname)

### 实例属性

- [`props`](https://react.docschina.org/docs/react-component.html#props)
- [`state`](https://react.docschina.org/docs/react-component.html#state)



## 参考

### `render()`

```
render()
```

`render()`方法是必须的。

当被调用时，其应该检查`this.props` 和 `this.state`并返回以下类型中的一个:

- **React元素。** 通常是由 JSX 创建。该元素可能是一个原生DOM组件的表示，如`<div />`，或者是一个你定义的合成组件。
- **字符串和数字。** 这些将被渲染为 DOM 中的 text node。
- **Portals。** 由 [`ReactDOM.createPortal`](https://react.docschina.org/docs/portals.html) 创建。
- `null`。 什么都不渲染。
- **布尔值。** 什么都不渲染。（通常存在于 `return test && <Child />`写法，其中 `test` 是布尔值。）

当返回`null` 或 `false`时，`ReactDOM.findDOMNode(this)` 将返回 `null`。

`render()`**函数应该纯净，意味着其不应该改变组件的状态**，其每次调用都应返回相同的结果，同时不直接和浏览器交互。若需要和浏览器交互，将任务放在`componentDidMount()`阶段或其他的生命周期方法。保持`render()` 方法纯净使得组件更容易思考。

> 注意
>
> 若 [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)返回false，`render()`函数将不会被调用。

### `constructor()`

```
constructor(props)
```

React组件的构造函数将会在装配之前被调用。当为一个`React.Component`子类定义构造函数时，你应该在任何其他的表达式之前调用`super(props)`。否则，`this.props`在构造函数中将是未定义，并可能引发异常。

==构造函数是初始化状态的合适位置==。若你不初始化状态且不绑定方法，那你也不需要为你的React组件定义一个构造函数。

可以==基于属性来初始化状态==。这样有效地“分离（forks）”属性并根据初始属性设置状态。这有一个有效的`React.Component`子类构造函数的例子：

```js
constructor(props) {
  super(props);
  this.state = {
    color: props.initialColor
  };
}
```

==当心这种模式，因为状态将不会随着属性的更新而更新。保证属性和状态同步==，你通常想要[状态提升](https://react.docschina.org/docs/lifting-state-up.html)。

若你通过使用它们为状态“分离”属性，你可能也想要实现[`UNSAFE_componentWillReceiveProps(nextProps)`](https://react.docschina.org/docs/react-component.html#componentwillreceiveprops)以保持最新的状态。但状态提升通常来说更容易以及更少的异常。

------

### `static getDerivedStateFromProps()`

```
static getDerivedStateFromProps(nextProps, prevState)
```

组件实例化后和接受新属性时将会调用`getDerivedStateFromProps`。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态。

注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。如果你只想处理变化，你可能想去比较新旧值。

调用`this.setState()` 通常不会触发 `getDerivedStateFromProps()`。

------

### `UNSAFE_componentWillMount()`

```
UNSAFE_componentWillMount()
```

`UNSAFE_componentWillMount()`在装配发生前被立刻调用。其在`render()`之前被调用，==因此在这方法里同步地设置状态将不会触发重渲==。

避免在该方法中引入任何的副作用或订阅。对于这些使用场景，我们推荐使用`constructor()`来替代。

==这是唯一的会在服务端渲染调起的生命周期钩子函数==。

> 注意
>
> 这一生命周期之前叫做`componentWillMount`。这一名字在17版前都有效。可以使用[`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles)来自动更新你的组件。

------

### `componentDidMount()`

```
componentDidMount()
```

`componentDidMount()`在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。==若你需要从远端加载数据，这是一个适合实现网络请求的地方。在该方法里设置状态将会触发重渲==。

这一方法是一个发起任何绑定的好地方（addeventlistener）,别忘了在`componentWillUnmount()取消`。

==在这个方法中调用`setState()`将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生==。这保证了即使`render()`将会调用两次，==但用户不会看到中间状态==。谨慎使用这一模式，因为它常==导致性能问题==。

然而，它对于像==模态框(Modal)和工具提示框==这样的例子是必须的。这时，在渲染依赖==DOM节点的尺寸或者位置的视图==前，你需要先测量这些节点。(获取当前按钮的位置 需要通过ref获取节点的尺寸或者位置，然后进一步计算)

------

### `UNSAFE_componentWillReceiveProps()`

```
UNSAFE_componentWillReceiveProps(nextProps)
```

> 注意
>
> 推荐你使用[`getDerivedStateFromProps`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)生命周期而不是`UNSAFE_componentWillReceiveProps`。[关于此建议在此了解详情。](https://react.docschina.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes)

`UNSAFE_componentWillReceiveProps()`在装配了的组件接收到新属性前调用。若你需要更新状态响应属性改变（例如，重置它），你可能需对比`this.props`和`nextProps`并在该方法中使用`this.setState()`处理状态改变。

注意==即使属性未有任何改变，React可能也会调用该方法==，因此若你想要处理改变，请确保比较当前和之后的值。这可能会发生在当父组件引起你的组件重渲。

在 [装配](https://react.docschina.org/docs/react-component.html#mounting)期间，React并不会调用带有初始属性的`UNSAFE_componentWillReceiveProps`方法。其仅会调用该方法如果某些组件的属性可能更新。调用`this.setState`通常不会触发`UNSAFE_componentWillReceiveProps`。

> 注意
>
> 这一生命周期之前叫做`componentWillReceiveProps`。这一名字在17版前都有效。可以使用[`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles)来自动更新你的组件。

------

### `shouldComponentUpdate()`

```
shouldComponentUpdate(nextProps, nextState)
```

使用`shouldComponentUpdate()`以让React知道当前状态或属性的改变是否不影响组件的输出。默认行为是在每一次状态的改变重渲，在大部分情况下你应该依赖于默认行为。

当接收到新属性或状态时，`shouldComponentUpdate()` 在渲染前被调用。默认为`true`。该方法并不会在初始化渲染或当使用`forceUpdate()`时被调用。

当他们状态改变时，返回`false` 并不能阻止子组件重渲。

当前，若`shouldComponentUpdate()`返回`false`，而后[`UNSAFE_componentWillUpdate()`](https://react.docschina.org/docs/react-component.html#componentwillupdate)，[`render()`](https://react.docschina.org/docs/react-component.html#render)， 和 [`componentDidUpdate()`](https://react.docschina.org/docs/react-component.html#componentdidupdate)将不会被调用。注意，在未来React可能会将`shouldComponentUpdate()`作为一个线索而不是一个严格指令，返回`false`可能仍然使得组件重渲。

在观察后，若你判定一个具体的组件很慢，你可能需要调整其从[`React.PureComponent`](https://react.docschina.org/docs/react-api.html#react.purecomponent)继承，其实现了带有浅属性和状态比较的`shouldComponentUpdate()`。若你确信想要手写，你可能需要用`this.props`和`nextProps`以及`this.state` 和 `nextState`比较，并返回`false`以告诉React更新可以被忽略。

------

### `UNSAFE_componentWillUpdate()`

```
UNSAFE_componentWillUpdate(nextProps, nextState)
```

当接收到新属性或状态时，`UNSAFE_componentWillUpdate()`为在渲染前被立即调用。在更新发生前，使用该方法是一次准备机会。该方法不会在初始化渲染时调用。

注意你不能在这调用`this.setState()`，若你需要更新状态响应属性的调整，使用[`getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops) 代替。

> 注意
>
> 这一生命周期之前叫做`componentWillUpdate`。这一名字在17版前都有效。可以使用[`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles)来自动更新你的组件。

> 注意
>
> 若[`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)返回false，`UNSAFE_componentWillUpdate()`将不会被调用。

------

### `getSnapshotBeforeUpdate()`

`getSnapshotBeforeUpdate()`在最新的渲染输出提交给DOM前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给`componentDidUpdate()`。

例如：

```js
class ScrollingList extends React.Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the current height of the list so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return this.listRef.current.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (snapshot !== null) {
      this.listRef.current.scrollTop +=
        this.listRef.current.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```

在上面的例子中，为了支持异步渲染，在`getSnapshotBeforeUpdate` 中读取`scrollHeight`而不是`componentWillUpdate`，这点很重要。由于异步渲染，在“渲染”时期（如`componentWillUpdate`和`render`）和“提交”时期（如`getSnapshotBeforeUpdate`和`componentDidUpdate`）间可能会存在延迟。如果一个用户在这期间做了像改变浏览器尺寸的事，从`componentWillUpdate`中读出的`scrollHeight`值将是滞后的。

------

### `componentDidUpdate()`

```
componentDidUpdate(prevProps, prevState)
```

`componentDidUpdate()`会在更新发生后立即被调用。该方法并不会在初始化渲染时调用。

当组件被更新时，使用该方法是操作DOM的一次机会。这也是一个适合发送请求的地方，要是你对比了当前属性和之前属性（例如，如果属性没有改变那么请求也就没必要了）。

> 注意
>
> 若[`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)返回false，`componentDidUpdate()`将不会被调用。

------

### `componentWillUnmount()`

```
componentWillUnmount()
```

`componentWillUnmount()`在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在`componentDidMount`环节创建的DOM元素。

------

### `componentDidCatch()`

```
componentDidCatch(error, info)
```

错误边界是React组件，并不是损坏的组件树。错误边界捕捉发生在子组件树中任意地方的JavaScript错误，打印错误日志，并且显示回退的用户界面。错误边界捕捉渲染期间、在生命周期方法中和在它们之下整棵树的构造函数中的错误。

如果定义了这一生命周期方法，一个类组件将成为一个错误边界。在错误边界中调用`setState()`让你捕捉当前树之下未处理的JavaScript错误，并显示回退的用户界面。只使用错误边界来恢复异常，而不要尝试将它们用于控制流。

详情请见[*React 16中的错误处理*](https://react.docschina.org/blog/2017/07/26/error-handling-in-react-16.html)。

> 注意
>
> 错误边界只捕捉树中发生在它们**之下**组件里的错误。一个错误边界并不能捕捉它自己内部的错误。

------

### `setState()`

```
setState(updater, [callback])
```

`setState()`将需要处理的变化塞入（译者注：setState源码中将一个需要改变的变化存放到组件的state对象中，采用队列处理）组件的state对象中， 并告诉该组件及其子组件需要用更新的状态来重新渲染。这是用于==响应事件处理和服务端响应的更新用户界面的主要方式==。

将`setState()`认为是一次*请求*而不是一次立即执行更新组件的命令。为了更为可观的性能，React可能会推迟它，稍后会一次性更新这些组件。React不会保证在setState之后，能够立刻拿到改变的结果。

`setState()`不是立刻更新组件。其可能是==批处理或推迟更新==。这使得在调用`setState()`后立刻读取`this.state`的一个潜在陷阱。代替地，使用`componentDidUpdate`或一个`setState`==回调==（`setState(updater, callback)`），当中的每个方法都会保证在更新被应用之后触发。若你需要基于之前的状态来设置状态，阅读下面关于`updater`参数的介绍。

==除非`shouldComponentUpdate()` 返回`false`，否则`setState()`永远都会导致重渲==。若使用可变对象同时条件渲染逻辑无法在`shouldComponentUpdate()`中实现，仅当新状态不同于之前状态时调用`setState()`，将避免不必要的重渲。

------------------------------------------------------------------------------

第一个函数是带签名的`updater`函数：

```
(prevState, props) => stateChange
```

`prevState`是之前状态的引用。其不应该被直接改变。代替地，改变应该通过构建一个来自于`prevState` 和 `props`输入的新对象来表示。例如，假设我们想通过`props.step`在状态中增加一个值：

```
this.setState((prevState, props) => {
  return {counter: prevState.counter + props.step};
});
```

updater函数接收到的`prevState` 和 `props`保证都是最新的。updater的输出是和`prevState`的浅合并。

`setState()`的第二个参数是一个可选地回调函数，其将会在`setState`执行完成同时组件被重渲之后执行。通常，对于这类逻辑，我们推荐使用`componentDidUpdate`。

你可以选择性地传递一个对象作为 `setState()`的第一个参数而不是一个函数：

```
setState(stateChange, [callback])
```

其仅是将`stateChange`浅合并到新状态中。例如，调整购物车中物品数量：

```
this.setState({quantity: 2})
```

这一形式的`setState()`也是异步的，并在相同的周期中多次调用可能会被合并到一起。例如，若你在相同的周期中尝试多次增加一件物品的数量，其等价于：

```
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

之后的调用在同一周期中将会重写之前调用的值，因此数量仅会被加一。若之后的状态依赖于之前的状态，我们推荐使用updater函数形式：

```
this.setState((prevState) => {
  return {counter: prevState.quantity + 1};
});
```

更多细节，查看[State & 生命周期指南](https://react.docschina.org/docs/state-and-lifecycle.html)。

------

### `forceUpdate()`

```
component.forceUpdate(callback)
```

默认情况，当你的组件或状态发生改变，你的组件将会重渲。若你的`render()`方法依赖其他数据，你可以通过调用`forceUpdate()`来告诉React组件需要重渲。

调用`forceUpdate()`将会导致组件的 `render()`方法被调用，并忽略`shouldComponentUpdate()`。这将会触发每一个子组件的生命周期方法，涵盖，每个子组件的`shouldComponentUpdate()` 方法。若当标签改变，React仅会更新DOM。

通常你应该尝试避免所有`forceUpdate()` 的用法并仅在`render()`函数里从`this.props`和`this.state`读取数据。

------



## 类属性

### `defaultProps`

`defaultProps`可以被定义为组件类的一个属性，用以为类设置默认的属性。这对于未定义（undefined）的属性来说有用，而对于设为空（null）的属性并没用。例如

==defaultProps==

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

若未设置`props.color`，其将被设置默认为`'blue'`:

```
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```

若`props.color`设为null，则其值则为null：

```
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```

------

### `displayName`

`displayName`被用在调试信息中。JSX会自动设置该值；查看[深入JSX](https://react.docschina.org/docs/jsx-in-depth.html)。

------

## 实例属性

### `props`

`this.props`包含了组件该调用者定义的属性。查看[组件 & Props](https://react.docschina.org/docs/components-and-props.html)关于属性的介绍。

特别地，`this.props.children`是一个特别属性，其通常由JSX表达式中的子标签定义，而不是标签本身。

### `state`

状态是该组件的特定数据，其可能改变多次。状态由用户定义，且其应为纯JavaScript对象。

若你不在`render()`方法中使用它，其不应该该被放在状态上。例如，你可直接将timer IDs放在实例上。

查看[State & 生命周期](https://react.docschina.org/docs/state-and-lifecycle.html)了解更多关于状态的信息。

永远不要直接改变`this.state`，因为调用`setState()`会替换你之前做的改变。将`this.state`当成不可变的。





# ReactDOM

如果你用一个`<script>`标签导入React, 所有的顶阶的API都能在`ReactDOM`的全局范围内被调用。 如果你用的是 npm搭配ES6标准，你可以用`import ReactDOM from 'react-dom'`。如果是npm和ES5，你可以用`var ReactDOM = require('react-dom')`。

## 总览

`react-dom`这个软件包提供了针对DOM的方法，可以在你应用的顶级域中调用，也可以在有需要的情况下用作跳出React模型的出口。你的大部分组件都不应该需要使用这个包。

- [`render()`](https://react.docschina.org/docs/react-dom.html#render)
- [`unmountComponentAtNode()`](https://react.docschina.org/docs/react-dom.html#unmountcomponentatnode)
- [`findDOMNode()`](https://react.docschina.org/docs/react-dom.html#finddomnode)

### 浏览器兼容

React兼容所有常用的浏览器，包括IE9及以上的版本。

> 注意
>
> 我们不支持那些不兼容ES5方法的老版浏览器，但如果你的应用包含了polyfill，例如[es5-shim 和 es5-sham](https://github.com/es-shims/es5-shim)，你可能会发现你的应用仍然可以在这些浏览器中正常运行。如果你选择这么干，你就只能孤军奋战了。

------

## ==常用API==

### `render()`

```
ReactDOM.render(
  element,
  container,
  [callback]
)
```

渲染一个React元素，添加到位于提供的`container`里的DOM元素中，并返回这个组件的一个 [引用](https://react.docschina.org/docs/more-about-refs.html) (或者对于[无状态组件](https://react.docschina.org/docs/components-and-props.html#functional-and-class-components)返回`null`).

如果这个React元素之前已经被渲染到`container`里去了，这段代码就会进行一次更新，并且只会改变那些反映元素最新状态所必须的DOM元素。

回调函数是可选的。如果你提供了，程序会在渲染或更新之后执行这个函数。

> 注意:
>
> `ReactDOM.render()` 控制你传进来的容器节点里的的内容。第一次被调用时，内部所有已经存在的DOM元素都会被替换掉。==之后的调用会使用React的DOM比较算法进行高效的更新。==
>
> `ReactDOM.render()`不会修改容器节点（只修改容器的子项）。你可以在不覆盖已有子节点的情况下添加一个组件到已有的DOM节点中去。
>
> `ReactDOM.render()` 目前会返回一个引用， 指向 `ReactComponent`的根实例。但是这个返回值是历史遗留，应该避免使用。因为未来版本的React可能会在某些情况下进行异步渲染。如果你真的需要一个指向 `ReactComponent` 的根实例的引用，推荐的方法是添加一个 [callback ref](https://react.docschina.org/docs/more-about-refs.html#the-ref-callback-attribute) 到根元素上。

------

### `unmountComponentAtNode()`

```
ReactDOM.unmountComponentAtNode(container)
```

从DOM元素中移除已挂载的React组件，清除它的事件处理器和state。如果容器内没有挂载任何组件，这个函数什么都不会干。 有组件被卸载的时候返回`true`，没有组件可供卸载时返回 `false`。

------

### `findDOMNode()`

```
ReactDOM.findDOMNode(component)
```

如果这个组件已经被挂载到DOM中，函数会返回对应的浏览器中生成的DOM元素 。 当你需要从DOM中读取值时，比如表单的值，或者计算DOM元素的尺寸，这个函数会非常有用。 **大多数情况下，你可以添加一个指向DOM节点的引用，从而完全避免使用findDOMNode 这个函数.** 当 `render` 返回 `null` 或者 `false` 时, `findDOMNode` 也返回 `null`.

> 注意:
>
> `findDOMNode` 是用于操作底层DOM节点的备用方案。在大部分情况下都不提倡使用这个方案，因为它破坏了组件的抽象化。
>
> `findDOMNode` 只对挂载过的组件有效（也就是已经添加到DOM中去的组件）。如果你试图对一个未挂载的组件调用这个函数 （比如在一个还未创建的组件的 `render()` 函数中中调用 `findDOMNode()`），程序会抛出一个异常。
>
> `findDOMNode` 不能用于函数式的组件中。



# ReactDOMServer

如果你通过 `<script>` 标签加载React，这些高阶API可用于 `ReactDOMServer` 全局。如果你使用ES6，你可以写成 `import ReactDOMServer from 'react-dom/server'`。如果你使用ES5，你可以写成 `var ReactDOMServer = require('react-dom/server')`。

## 概览

`ReactDOMServer` 类可以让你==在服务端渲染你的组件==。

PS：componentWillMount的内容在服务端渲染代码。ComponentDidMount在浏览器渲染代码。尽量使用后面的生命周期函数。

- [`renderToString()`](https://react.docschina.org/docs/react-dom-server.html#rendertostring)
- [`renderToStaticMarkup()`](https://react.docschina.org/docs/react-dom-server.html#rendertostaticmarkup)

------

## Reference

### `renderToString()`

```
ReactDOMServer.renderToString(element)
```

把一个React元素渲染为原始的HTML。这个方法最好只在服务端使用。React将会返回一段HTML字符串。你可以用这个方法在服务端生成HTML，并根据初始请求发送标记来加快页面的加载速度，同时让搜索引擎可以抓取你的页面来达到优化SEO的目的。

如果在一个已经有了服务端渲染标记的节点上调用 [`ReactDOM.render()`](https://react.docschina.org/docs/react-dom.html#render) ，React将保留该节点，仅作绑定事件处理，这会让你有一个非常高效的初次加载体验。

------

### `renderToStaticMarkup()`

```
ReactDOMServer.renderToStaticMarkup(element)
```

类似 [`renderToString`](https://react.docschina.org/docs/react-dom-server.html#rendertostring)，但是不会创建额外的DOM属性，例如 `data-reactid` 这些仅在React内部使用的属性。如果你希望把React当作一个简单的静态页面生成器来使用，这很有用，因为去掉额外的属性可以节省很多字节。



# ==DOM Elements==

React实现了一套与浏览器无关的DOM系统，兼顾了性能和跨浏览器的兼容性。借此机会，我们清理了浏览器DOM实现中一些不一致的问题。

在React中，所有的DOM特性和属性（包括事件处理函数）都是小驼峰命名法命名。比如说，与HTML中的`tabindex`属性对应的React实现命名则是`tabIndex`。`aria-*`和`data-*`属性是例外的，一律使用小写字母命名。

## React和HTML DOM属性的区别

有许多的属性在React和Html之间行为是不一样的

### checked属性

`<input>`标签type属性值为`checkbox`或`radio`时，支持`checked`属性。这对于构建受控组件很有用。与之相对`defaultChecked`这是非受控组件的属性，用来设定对应组件首次加载时是否选中状态。

### 类名属性

在React中，使用`className`属性指定一个CSS类。这个特性适用于所有的常规DOM节点和SVG元素，比如`<div>`，`<a>`和其它的元素。

如果你在React中使用Web组件（这是一种不常见的使用方式），请使用`class`属性。

### ==dangerouslySetInnerHTML函数==

`dangerouslySetInnerHTML`是React提供的替换浏览器DOM中的`innerHTML`接口的一个函数。一般而言，使用JS代码设置HTML文档的内容是危险的，因为这样很容易把你的用户信息暴露给[跨站脚本](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击.所以，你虽然可以直接在React中设置html的内容，但你要使用 `dangerouslySetInnerHTML` 并向该函数传递一个含有`__html`键的对象，用来提醒你自己这样做很危险。例如：

```js
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor

因为在javascript中`for`是一个保留字，所以React元素使用 `htmlFor`代替。

### onChange函数

`onChange`事件处理函数的表现正如你所期望的：==无论form表单何时发生变化，这个事件都会被触发==。我们特意不使用浏览器已有的默认行为，因为`onChange`在浏览器中的表现和这个名字不相称，而且==React真实依靠这个事件实现了对用户输入的实时响应处理==。

### selected

The `selected` attribute is supported by `<option>` components. You can use it to set whether the component is selected. This is useful for building controlled components.`<option>`组件支持`selected`属性。你可以使用该属性设定组件是否选中的状态。这对构建受控组件很有用。

### style属性

`style`属性接受一个键为小驼峰命名法命名的javascript对象作为值，而不是像css字符串。这和DOM中style属性接受javascript对象对象key的命名方式保持一致性，更高效而且能够防止跨站脚本（XSS）的安全漏洞。例如：

```
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

要注意，样式属性不会自动补齐前缀的。为了支持旧的浏览器，你需要手动支持相关的样式特性：

```
const divStyle = {
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}
```

样式key使用小驼峰命名法是为了和JS访问DOM特性对对象的处理保持一致性（例如 `node.style.backgroundImage`）。浏览器后缀[除了`ms`](http://www.andismith.com/blog/2012/02/modernizr-prefixed/)以外，都应该以大写字母开头。这就是为什么`WebkitTransition`有一个大写字母`W`。

### suppressContentEditableWarning

一般来说，当一个拥有子节点的元素被标记为`contentEditable`时，React会发出一个警告信息，因为此时`contentEditable`是无效的。这个属性会触发这样的警告信息。一般不要使用这个属性，除非你要构建一个类似[Draft.js](https://facebook.github.io/draft-js/)这样需要手动处理`contentEditable`属性的库。

### value

`<input>` 和 `<textarea>` 组件都支持`value`属性。你可以使用该属性设置组件的值。这对构建受控组件非常有用。`defaultValue`属性对应的是非受控组件的属性，用来设置组件第一次加载时的值。

## 所有受支持的HTML属性

React支持以下所有的属性，同时也==支持所有的`data-*` 和 `aria-*`属性==：

React也支持以下这些RDFa属性（有几个RDFa属性和HTML属性重叠，所以不包含在以下列表中）：

```
about datatype inlist prefix property resource typeof vocab
```

而且，React也支持下列非标准属性：

- `autoCapitalize autoCorrect` for Mobile Safari.
- `color` for `<link rel="mask-icon" />` in Safari.
- `itemProp itemScope itemType itemRef itemID` for [HTML5 microdata](http://schema.org/docs/gs.html).
- `security` for older versions of Internet Explorer.
- `unselectable` for Internet Explorer.
- `results autoSave` for WebKit/Blink input fields of type `search`.



# 合成事件

此参考指南记录了构成React事件系统的一部分的`SyntheticEvent`封装器。

您的事件处理函数将会接收`SyntheticEvent`的实例，一个基于浏览器原生事件的跨浏览器实现。它拥有和浏览器原生事件一样的接口，包括`stopPropagation()`和`preventDefault()`，除了那些所有浏览器功能一样的事件。

如果由于某些原因，你得使用一些底层的浏览器事件，只需用`nativeEvent`的属性就能找到。每个`SyntheicEvent`对象都有如下属性：

> 敲黑板： 由于在v0.14版本中，事件处理函数返回`false`不会再阻止事件传播, 所以必须得手动触发`e.stopPropagation()`和`e.preventDefault()` 方法。

### 事件池

`SyntheticEvent`是共享的。那就意味着在调用事件回调之后，`SyntheticEvent`对象将会被重用，并且所有属性会被置空。这是出于性能因素考虑的。 因此，您无法以异步方式访问事件。

```js
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```

> 敲黑板：
>
> 如果您想以异步的方式访问事件的属性值，你必须在事件回调中调用`event.persist()`方法，这样会在池中删除合成事件，并且在用户代码中保留对事件的引用。

## 支持的事件

React标准化了事件，使其在不同的浏览器中拥有一致的属性。

下面的事件处理函数由冒泡阶段的事件触发。在事件名后面加`Capture`就能在事件捕获阶段注册事件处理函数。举个例子，你可以使用`onClickCapture`代替`onClick`在事件捕获阶段来处理点击事件。

### Clipboard Events

事件名:

```
onCopy onCut onPaste
```

属性:

```
DOMDataTransfer clipboardData
```

------

### Composition Events

事件名:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

属性:

```
string data
```

------

### Keyboard Events

事件名:

```
onKeyDown onKeyPress onKeyUp
```

属性:

```
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

------

### Focus Events

事件名:

```
onFocus onBlur
```

这些焦点事件适用于React DOM中的所有元素，而不仅仅是表单元素。

属性:

```
DOMEventTarget relatedTarget
```

------

### Form Events

事件名:

```
onChange onInput onSubmit
```

查阅[表单](https://react.docschina.org/docs/forms.html)了解关于onChange事件的更多细节.

------

### Mouse Events

事件名:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

`onMouseEnter` 和 `onMouseLeave` 事件由失去焦点的元素到正在输入的元素传播，并不是普通的冒泡，也没有捕获阶段。

属性:

```
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

------

### Selection Events

事件名:

```
onSelect
```

------

### Touch Events

事件名:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

属性:

```
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

------

### UI Events

事件名:

```
onScroll
```

属性:

```
number detail
DOMAbstractView view
```

------

### Wheel Events

事件名:

```
onWheel
```

属性:

```
number deltaMode
number deltaX
number deltaY
number deltaZ
```

------

### Media Events

事件名:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted 
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay 
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend 
onTimeUpdate onVolumeChange onWaiting
```

------

### Image Events

事件名:

```
onLoad onError
```

------

### Animation Events

事件名:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

属性:

```
string animationName
string pseudoElement
float elapsedTime
```

------

### Transition Events

事件名:

```
onTransitionEnd
```

属性:

```
string propertyName
string pseudoElement
float elapsedTime
```

------

### Other Events

事件名:

```
onToggle
```



# Test Utilities

**Importing**

```
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 with npm
```

## Overview

`ReactTestUtils` makes it easy to test React components in the testing framework of your choice. At Facebook we use [Jest](https://facebook.github.io/jest/) for painless JavaScript testing. Learn how to get started with Jest through the Jest website’s [React Tutorial](http://facebook.github.io/jest/docs/en/tutorial-react.html#content).

> Note:
>
> Airbnb has released a testing utility called Enzyme, which makes it easy to assert, manipulate, and traverse your React Components’ output. If you’re deciding on a unit testing utility to use together with Jest, or any other test runner, it’s worth checking out: <http://airbnb.io/enzyme/>

- [`Simulate`](https://react.docschina.org/docs/test-utils.html#simulate)
- [`renderIntoDocument()`](https://react.docschina.org/docs/test-utils.html#renderintodocument)
- [`mockComponent()`](https://react.docschina.org/docs/test-utils.html#mockcomponent)
- [`isElement()`](https://react.docschina.org/docs/test-utils.html#iselement)
- [`isElementOfType()`](https://react.docschina.org/docs/test-utils.html#iselementoftype)
- [`isDOMComponent()`](https://react.docschina.org/docs/test-utils.html#isdomcomponent)
- [`isCompositeComponent()`](https://react.docschina.org/docs/test-utils.html#iscompositecomponent)
- [`isCompositeComponentWithType()`](https://react.docschina.org/docs/test-utils.html#iscompositecomponentwithtype)
- [`findAllInRenderedTree()`](https://react.docschina.org/docs/test-utils.html#findallinrenderedtree)
- [`scryRenderedDOMComponentsWithClass()`](https://react.docschina.org/docs/test-utils.html#scryrendereddomcomponentswithclass)
- [`findRenderedDOMComponentWithClass()`](https://react.docschina.org/docs/test-utils.html#findrendereddomcomponentwithclass)
- [`scryRenderedDOMComponentsWithTag()`](https://react.docschina.org/docs/test-utils.html#scryrendereddomcomponentswithtag)
- [`findRenderedDOMComponentWithTag()`](https://react.docschina.org/docs/test-utils.html#findrendereddomcomponentwithtag)
- [`scryRenderedComponentsWithType()`](https://react.docschina.org/docs/test-utils.html#scryrenderedcomponentswithtype)
- [`findRenderedComponentWithType()`](https://react.docschina.org/docs/test-utils.html#findrenderedcomponentwithtype)

## Reference

## Shallow Rendering

When writing unit tests for React, shallow rendering can be helpful. Shallow rendering lets you render a component “one level deep” and assert facts about what its render method returns, without worrying about the behavior of child components, which are not instantiated or rendered. This does not require a DOM.

> Note:
>
> The shallow renderer has moved to `react-test-renderer/shallow`.
> [Learn more about shallow rendering on its reference page.](https://react.docschina.org/docs/shallow-renderer.html)

## Other Utilities

### `Simulate`

```
Simulate.{eventName}(
  element,
  [eventData]
)
```

Simulate an event dispatch on a DOM node with optional `eventData` event data.

`Simulate` has a method for [every event that React understands](https://react.docschina.org/docs/events.html#supported-events).

**Clicking an element**

```
// <button ref="button">...</button>
const node = this.refs.button;
ReactTestUtils.Simulate.click(node);
```

**Changing the value of an input field and then pressing ENTER.**

```
// <input ref="input" />
const node = this.refs.input;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Note
>
> You will have to provide any event property that you’re using in your component (e.g. keyCode, which, etc…) as React is not creating any of these for you.

------

### `renderIntoDocument()`

```
renderIntoDocument(element)
```

Render a React element into a detached DOM node in the document. **This function requires a DOM.**

> Note:
>
> You will need to have `window`, `window.document` and `window.document.createElement`globally available **before** you import `React`. Otherwise React will think it can’t access the DOM and methods like `setState` won’t work.

------

### `mockComponent()`

```
mockComponent(
  componentClass,
  [mockTagName]
)
```

Pass a mocked component module to this method to augment it with useful methods that allow it to be used as a dummy React component. Instead of rendering as usual, the component will become a simple `<div>` (or other tag if `mockTagName` is provided) containing any provided children.

> Note:
>
> `mockComponent()` is a legacy API. We recommend using [shallow rendering](https://react.docschina.org/docs/test-utils.html#shallow-rendering) or [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock) instead.

------

### `isElement()`

```
isElement(element)
```

Returns `true` if `element` is any React element.

------

### `isElementOfType()`

```
isElementOfType(
  element,
  componentClass
)
```

Returns `true` if `element` is a React element whose type is of a React `componentClass`.

------

### `isDOMComponent()`

```
isDOMComponent(instance)
```

Returns `true` if `instance` is a DOM component (such as a `<div>` or `<span>`).

------

### `isCompositeComponent()`

```
isCompositeComponent(instance)
```

Returns `true` if `instance` is a user-defined component, such as a class or a function.

------

### `isCompositeComponentWithType()`

```
isCompositeComponentWithType(
  instance,
  componentClass
)
```

Returns `true` if `instance` is a component whose type is of a React `componentClass`.

------

### `findAllInRenderedTree()`

```
findAllInRenderedTree(
  tree,
  test
)
```

Traverse all components in `tree` and accumulate all components where `test(component)`is `true`. This is not that useful on its own, but it’s used as a primitive for other test utils.

------

### `scryRenderedDOMComponentsWithClass()`

```
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Finds all DOM elements of components in the rendered tree that are DOM components with the class name matching `className`.

------

### `findRenderedDOMComponentWithClass()`

```
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

Like [`scryRenderedDOMComponentsWithClass()`](https://react.docschina.org/docs/test-utils.html#scryrendereddomcomponentswithclass) but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

------

### `scryRenderedDOMComponentsWithTag()`

```
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Finds all DOM elements of components in the rendered tree that are DOM components with the tag name matching `tagName`.

------

### `findRenderedDOMComponentWithTag()`

```
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

Like [`scryRenderedDOMComponentsWithTag()`](https://react.docschina.org/docs/test-utils.html#scryrendereddomcomponentswithtag) but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

------

### `scryRenderedComponentsWithType()`

```
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Finds all instances of components with type equal to `componentClass`.

------

### `findRenderedComponentWithType()`

```
findRenderedComponentWithType(
  tree,
  componentClass
)
```

Same as [`scryRenderedComponentsWithType()`](https://react.docschina.org/docs/test-utils.html#scryrenderedcomponentswithtype) but expects there to be one result and returns that one result, or throws exception if there is any other number of matches besides one.

 

# 浅层渲染

**Importing**

```
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 with npm
```

## 概述

当为 React 写单元测试时, 浅渲染会变得十分有用。浅渲染使您渲染组件的“第一层”，并且对组件的 render 方法的返回值进行断言，不用担心子组件的行为，组件并没有实例化或被渲染。浅渲染并不需要 DOM。

例如，如果您有如下的组件：

```js
function MyComponent() {
  return (
    <div>
      <span className="heading">Title</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

你可以断言(assert)：

```js
import ShallowRenderer from 'react-test-renderer/shallow';

// in your test:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Title</span>,
  <Subcomponent foo="bar" />
]);
```

浅测试（Shallow testing）当前还有一些局限, 即不支持 refs。

> 注意：
>
> 我们还建议看看 Enzyme [Shallow Rendering API](http://airbnb.io/enzyme/docs/api/shallow.html)。它在相同的功能上提供了一个更棒的高级 API。

## 参考

### `shallowRenderer.render()`

你可以把 shallowRenderer 想象成一个用来渲染你正在测试的组件的“地方”，并且你可以从那里取到该组件的输出。

`shallowRenderer.render()` 和 [`ReactDOM.render()`](https://react.docschina.org/docs/react-dom.html#render)很像。但是它不需要 DOM 并且只渲染一层。这就意味着你可以测试与子组件行为隔离的组件。

### `shallowRenderer.getRenderOutput()`

在 `shallowRenderer.render()` 被调用后, 你可以调用 `shallowRenderer.getRenderOutput()` 来获取浅渲染的输出.

然后，您就可以开始开始对输出进行断言了。

[编辑本页面](https://github.com/discountry/react/tree/master/content/docs/addons-shallow-renderer.md)



# Test Renderer

**Importing**

```
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 with npm
```

## 概览

该包提供了一个React的渲染器，可以用来将 React 组件渲染成纯 JavaScript 对象，不需要依赖于 DOM 和原生移动环境。

本质上，该包可以在无需使用浏览器或[jsdom](https://github.com/tmpvar/jsdom)的情况下，轻松地抓取由 React DOM 或 React Native渲染出的平台视图层次结构（类似于DOM树）。

示例：

```
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

您可以使用 Jest 的快照测试来自动保存一个该 JSON 树文件的副本，并且在您的测试中检查它是否被更改。[了解更多](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html).

您同样可以通过遍历输出来查找特殊节点，并对相应的节点进行断言。

```
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### TestRenderer

- [`TestRenderer.create()`](https://react.docschina.org/docs/test-renderer.html#TestRenderer.create)

### TestRenderer instance

- [`testRenderer.toJSON()`](https://react.docschina.org/docs/test-renderer.html#testRenderer.toJSON)
- [`testRenderer.toTree()`](https://react.docschina.org/docs/test-renderer.html#testRenderer.toTree)
- [`testRenderer.update()`](https://react.docschina.org/docs/test-renderer.html#testRenderer.update)
- [`testRenderer.unmount()`](https://react.docschina.org/docs/test-renderer.html#testRenderer.unmount)
- [`testRenderer.getInstance()`](https://react.docschina.org/docs/test-renderer.html#testRenderer.getInstance)
- [`testRenderer.root`](https://react.docschina.org/docs/test-renderer.html#testRenderer.root)

### TestInstance

- [`testInstance.find()`](https://react.docschina.org/docs/test-renderer.html#testInstance.find)
- [`testInstance.findByType()`](https://react.docschina.org/docs/test-renderer.html#testInstance.findByType)
- [`testInstance.findByProps()`](https://react.docschina.org/docs/test-renderer.html#testInstance.findByProps)
- [`testInstance.findAll()`](https://react.docschina.org/docs/test-renderer.html#testInstance.findAll)
- [`testInstance.findAllByType()`](https://react.docschina.org/docs/test-renderer.html#testInstance.findAllByType)
- [`testInstance.findAllByProps()`](https://react.docschina.org/docs/test-renderer.html#testInstance.findAllByProps)
- [`testInstance.instance`](https://react.docschina.org/docs/test-renderer.html#testInstance.instance)
- [`testInstance.type`](https://react.docschina.org/docs/test-renderer.html#testInstance.type)
- [`testInstance.props`](https://react.docschina.org/docs/test-renderer.html#testInstance.props)
- [`testInstance.parent`](https://react.docschina.org/docs/test-renderer.html#testInstance.parent)
- [`testInstance.children`](https://react.docschina.org/docs/test-renderer.html#testInstance.children)

## 参考

### `TestRenderer.create()`

```
TestRenderer.create(element, options);
```

通过传来的 React 元素创建一个 `TestRenderer` 的实例。它并不使用真实的 DOM，但是它依然将组件树完整地渲染到内存，所以您可以对它进行断言。返回的实例拥有以下的方法和属性。

### `testRenderer.toJSON()`

```
testRenderer.toJSON()
```

返回一个表示渲染后的 树 的对象。该树仅包含特定平台的节点，像`<div>` 或 `<View>`和他们的属性（props），但是并不包含任何用户编写的组件。这对于[快照测试](http://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest)非常方便。

### `testRenderer.toTree()`

```
testRenderer.toTree()
```

返回一个表示渲染后的 树 的对象。和 `toJSON()` 不同，它表示的内容比 `toJSON()` 提供的内容要更加详细，并且包含用户编写的组件。除非您正在测试渲染器（test rendererer）之上编写您自己的断言库，否则您可能并不需要这个方法。

### `testRenderer.update()`

```
testRenderer.update(element)
```

使用新的根元素重新渲染内存中的树。它模拟根元素的一次React更新。如果新的元素和之前的元素有相同的 type 和 key，该树将会被更新；否则，它将重挂载一个新树。

### `testRenderer.unmount()`

```
testRenderer.unmount()
```

卸载内存中的树，触发相应的生命周期事件。

### `testRenderer.getInstance()`

```
testRenderer.getInstance()
```

如果可用的话，返回与根元素相对应的实例。如果根元素是函数组件（functional component），该方法无效，因为函数组件没有实例。

### `testRenderer.root`

```
testRenderer.root
```

返回根元素“测试实例（test instance）”对象，对于断言树中的特殊节点十分有用。您可以利用它来查找其他更深层的“测试实例（test instance）”。

### `testInstance.find()`

```
testInstance.find(test)
```

找到一个 test(testInstance) 返回 true 的后代 测试实例。如果 test(testInstance) 没有正好只对一个 测试实例 返回 true，将会报错。

### `testInstance.findByType()`

```
testInstance.findByType(type)
```

找到一个匹配指定 类型（type）的 后代 测试实例（testInstances），如果不是正好只有一个测试实例匹配指定的 类型（type），将会报错。

### `testInstance.findByProps()`

```
testInstance.findByProps(props)
```

找到匹配指定 属性（props）的 后代 测试实例（testInstances），如果不是正好只有一个测试实例匹配指定的 类型（type），将会报错。

### `testInstance.findAll()`

```
testInstance.findAll(test)
```

找到所有 `test(testInstance)` 等于 `true` 的后代 测试实例（testInstances）。

### `testInstance.findAllByType()`

```
testInstance.findAllByType(type)
```

找到所有匹配指定 类型（type）的 后代 测试实例（testInstances）。

### `testInstance.findAllByProps()`

```
testInstance.findAllByProps(props)
```

找到所有匹配指定 属性（props）的 后代 测试实例（testInstances）。

### `testInstance.instance`

```
testInstance.instance
```

该测试实例（testInstances）相对应的组件的实例。它只能用于 类组件（class components），因为函数组件（functional components）没有实例。它匹配给定的组件内部的 `this` 的值。

### `testInstance.type`

```
testInstance.type
```

该测试实例（testInstance）相对应的组件的类型（type），例如，一个 `<Button />` 组件有一个 `Button` 类型（type）。

### `testInstance.props`

```
testInstance.props
```

该测试实例（testInstance）相对应的组件的属性（props），例如，一个 `<Button size="small" />` 组件的属性（props）为 `{size: 'small'}`。

### `testInstance.parent`

```
testInstance.parent
```

该测试实例的父测试实例。

### `testInstance.children`

```
testInstance.children
```

该测试实例的子测试实例。

## Ideas

您可以将 `createNodeMock` 函数作为选项（option）传递给 `TestRenderer.create`，可以自行模拟refs。`createNodeMock` 接受当前元素作为参数，并且返回一个模拟的 ref 对象。当您要测试一个依赖于 refs 的组件时，它十分有用。

```
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // mock a focus function
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```

[编辑本页面](https://github.com/discountry/react/tree/master/content/docs/reference-test-renderer.md)



# JavaScript 环境要求

React 16 依赖集合类型 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) 和 [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)。若你要支持老式的可能未提供原生支持的浏览器和设备（例如 IE < 11），考虑在你的应用库中包含一个全局的 polyfill，例如 [core-js](https://github.com/zloirock/core-js) 或 [babel-polyfill](https://babeljs.io/docs/usage/polyfill/)。

一个使用 core-js 支持老版浏览器的 React 16 polyfill 环境大致如下：

```
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

React 也依赖于 `requestAnimationFrame` （甚至包括测试环境）。你可以使用[raf](https://www.npmjs.com/package/raf) 包去 shim `requestAnimationFrame`：

```
import 'raf/polyfill';
```

# React 术语表

## ES6, ES2015, ES2016等

这些缩略词都是指最新版本的ECMAScript语言规范标准，而JavaScript语言是它们的一个实现。ES6版本（也被称为ES2015）包括许多新特性，如：箭头函数、类(class)、模板字面量、`let` 和 `const` 变量声明等。你可以在[这里](https://en.wikipedia.org/wiki/ECMAScript#Versions)了解更多版本新特性。

## 编译器 Compilers

JavaScript编译器用于转换JavaScript代码，并用其它格式返回JavaScript代码。最常见的用例是采用ES6语法编写代码并将其转换为旧版浏览器能够识别的语法。 React最常用的编译器是[Babel](https://babeljs.io/)。

## 打包工具 Bundlers

开发中将JavaScript和CSS代码编写为单独的模块（通常为数百个），打包工具会针对浏览器将它们组合并优化为几个文件。[Webpack](https://webpack.js.org/)和[Browserify](http://browserify.org/)是在React应用程序中常用的打包工具。



## 元素 [Elements](https://react.docschina.org/docs/rendering-elements.html)

React元素是React应用程序的最小单位。初学者很可能把元素的定义和定义内涵更广的“组件”给搞混了。元素用来描述界面上的任何东西。 React 元素都是immutable不可变的。

```
const element = <h1>Hello, world</h1>;
```

通常不直接使用元素，而是从组件返回。

## 组件 [Components](https://react.docschina.org/docs/components-and-props.html)

React组件是小的，可复用的代码片段，它返回一个React元素用于渲染页面。 定义一个组件最简单的方式是使用JavaScript函数，它返回一个React元素：

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

你也可以使用 ES6 class 来定义一个组件:

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

组件可以按照功能分解成不同的部件，并在其他组件中使用。组件可以返回其他组件，数组，字符串或数字。当你的UI中有一部分重复使用了好几次（比如，Button、Panel、Avatar），或者其自身就足够复杂（比如，App、FeedStory、Comment），类似这些都是抽象成一个可复用组件的绝佳选择，这也是一个比较好的做法。 组件名称应始终以大写字母开头 (`<Wrapper/>` **而不是** `<wrapper/>`)。参见 [这里](https://react.docschina.org/docs/components-and-props.html#rendering-a-component)获取更多有关渲染组件的信息。

### [`props`](https://react.docschina.org/docs/components-and-props.html)

`props`是React组件的输入内容。 它们是从父组件传递给子组件的数据。

请记住，`props` 是只读的。 不应该以任何方式修改它们：

```
// 错误!
props.number = 42;
```

如果你需要修改某些值以响应用户输入或网络响应，请使用`state`。

### `props.children`

`props.children`在每个组件上都可用。 它会包含组件的开始和结束标记之间的内容。 例如：

```
<Welcome>Hello world!</Welcome>
```

在`Welcome`组件中的`props.children`中可以获取字符串`Hello world！`：

```
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

定义成类组件时，使用`this.props.children`：

```
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### 状态

当某个组件与其关联的某些数据随时间而改变时，组件中需要使用`state`。例如，`Checkbox`组件中的状态需要转变为`isChecked`，或者`NewsFeed` 组件可能希望追踪其状态中的`fetchedPosts`。

`state`和`props`之间最重要的区别是`props`是从父组件传递的，而`state`是由组件本身管理的。组件不能改变其`props`，但可以改变`state`。 通过使用`this.setState()`。 只有定义为类的组件才可以具有状态。

对于每一个特定的变化数据，应该只有一个“拥有”它的状态的组件。不要尝试同步两个不同组件的状态。状态分享通过[状态提升](https://react.docschina.org/docs/lifting-state-up.html)至最近的父组件来完成，并通过`props`传递给他们。

## 生命周期函数

生命周期函数是在组件的不同阶段可执行自定义功能的钩子。当组件被创建并插入到DOM中时，可用函数([mounting](https://react.docschina.org/docs/react-component.html#mounting))，组件更新，以及从DOM卸载或移除组件时可以使用对应的生命周期函数。

## 受控 & 非受控组件

React有两种不同的方法来处理表单输入。

值由React控制的输入表单元素称为*受控组件*。当用户将数据输入到受控组件中时，会触发状态改变的事件处理程序，并且你的代码将决定输入是否有效（使用更新的值重新渲染）。如果你不重新渲染，那么表单元素将保持不变。

*非受控制组件*的表单元素在React之外工作。当用户将数据输入到表单域（输入框，下拉菜单等）时，不需要React做任何事情，更新的数据就会被呈现出来。这也意味着你不能强迫表单域都有一个确定的值。

在大多数情况下，你应该使用受控组件。

## 键值

“键值”是创建元素数组时需要包含的特殊字符串属性。键值可以帮助React识别哪些元素被更改，添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

确定的标识键值对于重新渲染很重要，这样React才可以确定何时添加，删除或重新排序元素。不要把类似由`Math.random()`生成的值赋给键值。在理想情况下，键值应该对应于来自数据的唯一且稳定的标识符，例如`post.id`。

## Refs
React支持一个可以附加到任何组件的特殊属性`ref`。`ref`属性可以是一个字符串或一个回调函数。当`ref`属性是一个回调函数时，函数接收底层DOM元素或类实例（取决于元素的类型）作为参数。这使你可以直接访问DOM元素或组件实例。

不要过度使用 Refs。如果你发现自己经常在应用程序中使用refs来“搞事情”，请考虑使用[状态提升](https://react.docschina.org/docs/lifting-state-up.html)。

## 事件

React元素的事件处理和DOM元素的很相似。但是有一点语法上的不同:

- React事件绑定属性的命名采用驼峰式写法，而不是小写。
- 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)

## 协调

当一个组件的props或状态发生变化时，React通过比较新返回的元素和先前渲染的元素来决定是否需要实际的DOM更新。当它们不相等时，React将更新DOM。 这个过程被称为“协调”。

