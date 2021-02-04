# 对React children 的深入理解

本文为翻译文章，[原文链接](https://link.jianshu.com/?t=http://mxstbr.blog/2017/02/react-children-deepdive/#child-components)

React的核心为组件。你可以像嵌套HTML标签一样嵌套使用这些组件，这使得编写JSX更加容易，因为它类似于标记语言。

当我刚开始学习React时，当时我认为“使用 `props.children` 就这么回事，我知道它的一切”。我错了。

因为我们使用的是 JavaScript，我们会改变children。==我们能够给它们发送特殊的属性，以此来决定它们是否进行渲染。==让我们来探究一下React中children的作用。

## child 子组件

我们有一个组件 `` 包含了几个组件 `` 。你可能会这么使用它：

```html
<Grid>
  <Row />
  <Row />
  <Row />
</Grid>
```

这三个 `Row` 组件都成为了 `Grid` 的 `props.children` 。使用一个表达式容器，父组件就能够渲染它们的子组件：

```jsx
class Grid extends React.Component {
  render() {
    return (<div>{this.props.children}</div>);
  }
}
```

父组件也能够决定不渲染任何的子组件或者在渲染之前对它们进行操作。例如 Fullstop 组件就没有渲染子组件。

```jsx
class Fullstop extends React.Component {
  render() {
    return <h1>Hello world!</h1>
  }
}
```

不管你将什么子组件传递给这个组件，它都只会显示“Hello world!”

小结：React 的父组件可以渲染内嵌的若干子组件，或者选择不渲染。

## child 数据类型

React中的Children不一定是组件，它们可以使任何东西。例如，我们能够将上面的字符串作为children传递我们的组件。（实际的子组件数据类型可以是组件、数组、字符串等一个或者多个）

```xml
<Grid>Hello world!</Grid>
```

==注意：如果是传参是字符串，JSX 将会自动删除每行开头和结尾的空格，以及空行。它还会把字符串中间的空白行压缩为一个空格。==

这意味着以下的这些例子都会渲染出一样的情况：

```xml
<Grid>Hello world!</Grid>

<Grid>
  Hello world!
</Grid>

<Grid>
  Hello
  world!
</Grid>

<Grid>

  Hello world!
</Grid>
```

你也可以将多种类型的children完美的结合在一起：

```xml
<Grid>
  Here is a row:
  <Row />
  Here is another row:
  <Row />
</Grid>
```

## child 的功能

我们能够传递任何的 JavaScript 表达式作为children，包括函数。

为了说明这种情况，以下是一个组件，它将执行一个传递过来的作为child的函数：

```jsx
class Executioner extends React.Component {
  render() {
    // See how we're calling the child as a function?
    // 这里应该进行判断，如果children的数据类型是函数，然后执行下面的操作
    return this.props.children()
  }
}
```

你会像这样的使用这个组件

```xml
<Executioner>
  {() => <h1>Hello World!</h1>}
</Executioner>
```

当然，这个例子并没什么用，只是展示了这个想法。

假设你想从服务器获取一些数据。你能使用多种方法实现，像这种将函数作为child的方法也是可行的（可以方便的传参，不需要使用单独的 props 传值）。

```xml
<Fetch url="api.myself.com">
  {(result) => <p>{result}</p>}
</Fetch>
```

不要担心这些超出了你的脑容量。我想要的是当你以后遇到这种情况时不再惊讶。有了children什么事都会发生。

## children API

如果你看过React的文档你就会说“children是一个不透明的数据结构”。从本质上来讲， `props.children` 可以使任何的类型，比如数组、函数、对象等等。

React提供了一系列的函数助手来使得操作children更加方便。

### Map + forEach

两个最显眼的函数助手就是 `React.Children.map` 以及 `React.Children.forEach` 。它们在对应数组的情况下能起作用，除此之外，当函数、对象或者任何东西作为children传递时，它们也会起作用。

```jsx
class IgnoreFirstChild extends React.Component {
  render() {
    return (
      <React.Fragment>
        {React.Children.map(this.props.children, (child, index) => {
          // Ignore the first child
          if (index < 1) return
          return child
        })}
      </React.Fragment>
    )
  }
}
```

`IgnoreFirstChild` 组件在这里会遍历所有的children，忽略第一个child然后返回其他的。

```jsx
<IgnoreFirstChild>
  <h1>First</h1>
  <h1>Second</h1> // <- Only this is rendered
</IgnoreFirstChild>
```

在这种情况下，我们也可以使用 `this.props.children.map` 的方法。但要是有人讲一个函数作为child传递过来将会发生什么呢？`this.props.children` 会是一个函数而不是一个数组，接着我们就会产生一个error！

然而使用 `React.Children.map` 函数，==无论什么参数都不会报错==。

```jsx
<IgnoreFirstChild>
  {() => <h1>First</h1>} // <- Ignored 💪
</IgnoreFirstChild>
```

### Count

因为`this.props.children` 可以是任何类型的，检查一个组件有多少个children是非常困难的。天真的使用 `this.props.children.length` ，当传递了字符串或者函数时程序便会中断。假设我们有个child：`"Hello World!"` ，但是使用 `.length` 的方法将会显示为12。

这就是为什么我们有 `React.Children.count` 方法的原因

```jsx
class ChildrenCounter extends React.Component {
  render() {
    return <p>React.Children.count(this.props.children)</p>
  }
}
```

无论时什么类型它都会返回children的数量

```jsx
// Renders "1"
<ChildrenCounter>
  Second!
</ChildrenCounter>

// Renders "2"
<ChildrenCounter>
  <p>First</p>
  <ChildComponent />
</ChildrenCounter>

// Renders "3"
<ChildrenCounter>
  {() => <h1>First!</h1>}
  Second!
  <p>Third!</p>
</ChildrenCounter>
```

### 转换为数组

如果以上的方法你都不适合，你能将children转换为数组通过 `React.Children.toArray` 方法。如果你需要对它们进行排序，这个方法是非常有用的。

```jsx
class Sort extends React.Component {
  render() {
    const children = React.Children.toArray(this.props.children)
    // Sort and render the children
    return <p>{children.sort().join(' ')}</p>
  }
}
```

```jsx
<Sort>
  // We use expression containers to make sure our strings
  // are passed as three children, not as one string
  {'bananas'}{'oranges'}{'apples'}
</Sort>
```

上例会渲染为三个排好序的字符串。

### onlychild

如果你回过来想刚才的组件，它只能在传递单一child的情况下使用，而且child必须为函数。

```dart
class Executioner extends React.Component {
  render() {
    return this.props.children()
  }
}
```

我们可以试着去强制执行 `propTypes` ，就像下面这样

```go
Executioner.propTypes = {
  children: React.PropTypes.func.isRequired,
}
```

这会使控制台打印出一条消息，部分的开发者将会把它忽视。相反的，我们可以使用在 `render` 里面使用 `React.Children.only`

```dart
class Executioner extends React.Component {
  render() {
    return React.Children.only(this.props.children)()
  }
}
```

这样只会返回一个child。如果不止一个child，它就会抛出错误，让整个程序陷入中断——完美的避开了试图破坏组件的懒惰的开发者。

## 编辑 children

我们可以将任意的组件呈现为children，但是任然可以用父组件去控制它们，而不是用渲染的组件。为了说明这点，让我们举例一个 能够拥有很多 `RadioButton` 组件的 `RadiaGroup` 组件。

`RadioButtons` 不会从 `RadioGroup` 本身上进行渲染，它们只是作为children使用。这意味着我们将会有这样的代码。

```jsx
render() {
  return(
    <RadioGroup>
      <RadioButton value="first">First</RadioButton>
      <RadioButton value="second">Second</RadioButton>
      <RadioButton value="third">Third</RadioButton>
    </RadioGroup>
  )
}
```

这段代码有一个问题。`input` 没有被分组，导致了这样：

为了把 `input` 标签弄到同组，必须拥有相同的`name` 属性。当然我们可以直接给每个`RadioButton` 的`name` 赋值

```xml
<RadioGroup>
  <RadioButton name="g1" value="first">First</RadioButton>
  <RadioButton name="g1" value="second">Second</RadioButton>
  <RadioButton name="g1" value="third">Third</RadioButton>
</RadioGroup>
```

但是这个是无聊的并且容易出错。我们可是拥有JavaScript的所有功能的！

### 改变children的属性

在`RadioGroup` 中我们将会添加一个叫做 `renderChildren` 的方法，在这里我们编辑children的属性

```kotlin
class RadioGroup extends React.Component {
  renderChildren = () => {
    // TODO: Change the name prop of all children
    // to this.props.name
    return this.props.children
  }
  render() {
    return (
      <div className="group">
        {this.renderChildren()}
      </div>
    )
  }
}
```

让我们开始遍历children获得每个child

```kotlin
renderChildren() {
  return React.Children.map(this.props.children, child => {
    // child.name = 'g1'
    // <RadioButton name="g1" value="first">First</RadioButton>
    // 这个方法不正确，需要 React.cloneElement 设置子组件的属性
    // TODO: Change the name prop to this.props.name
    return child
  })
}
```

我们如何编辑它们的属性呢？

### 永恒地克隆元素

这是今天展示的最后一个辅助方法。顾名思义，`React.cloneElement` 会克隆一个元素。我们将想要克隆的元素当作第一个参数，然后将想要设置的属性以对象的方式作为第二个参数。

```jsx
const cloned = React.cloneElement(element, {
  new: 'yes!'
})
```

现在，`clone` 元素有了设置为 `"yes!"` 的属性 `new`

这正是我们的 `RadioGroup` 所需的。我们克隆所有的child并且设置`name` 属性

```jsx
renderChildren() {
  return React.Children.map(this.props.children, child => {
    return React.cloneElement(child, {
      name: this.props.name
    })
  })
}
```

最后一步就是传递一个唯一的 `name` 给`RadioGroup`

```jsx
<RadioGroup name="g1">
  <RadioButton value="first">First</RadioButton>
  <RadioButton value="second">Second</RadioButton>
  <RadioButton value="third">Third</RadioButton>
</RadioGroup>
```

没有手动添加 `name` 属性给所有的 `RadioButton` ，我们只是告诉了 `RadioGroup` 所需的name而已。
