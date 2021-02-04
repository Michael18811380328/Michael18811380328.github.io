# React16新的getDerivedStateFromProps的使用

在很长一段时间内，`componentWillReceiveProps`是在没有附加渲染的情况下更新状态的唯一方法。在版本16.3中，我们引入了一个全新的生命周期函数——`getDerivedStateFromProps`——用来替换`componentWillReceiveProps`，并用更安全的方式处理相同的场景。与此同时，我们意识到人们对如何使用这两种方法有很多误解，我们发现了一些反模式，这些错误导致了微妙而令人困惑的bug。在16.4中，有关`getDerivedStateFromProps`的修复使得派生状态更加可预测，因此错误使用的结果更容易被注意到。

> 注意
>
> 这篇文章中描述的所有反模式都适用于较老的`componentWillReceiveProps`和较新的`getDerivedStateFromProps`.

这篇博客文章将介绍以下主题：

- [何时使用派生状态](https://blog.csdn.net/nnxxyy1111/article/details/80832525#何时使用派生状态)
- 使用派生类遇到的常见bug
  - [反模式：无条件得使用props对state赋值](https://blog.csdn.net/nnxxyy1111/article/details/80832525#反模式：无条件得使用props对state赋值)
  - [反模式：当props改变时清除state](https://blog.csdn.net/nnxxyy1111/article/details/80832525#反模式：当props改变时清除state)
- [首选方案](https://blog.csdn.net/nnxxyy1111/article/details/80832525#首选方案)
- [什么是memoization?](https://blog.csdn.net/nnxxyy1111/article/details/80832525#什么是memoization)

## 何时使用派生状态

`getDerivedStateFromProps`的存在只有一个目的。它使组件能够根据**changes in props**的结果更新其内部状态。

根据一般规则——**谨慎使用派生状态**，我们没有提供很多例子。我们所看到的有关派生状态的所有问题最终都可以归结为（1）无条件地更新状态，或者（2）当props和state不匹配时更新state。（我们将在下面详细讨论这两个问题。）

## 使用派生状态遇到的常见bug

“受控”和“不受控制”的术语通常指的是表单输入，但他们还可以描述任何组件数据的位置。作为props传递进组件的数据可以被认为是**受控的**（因为父组件控制数据）。只存在于内部状态的数据可以被认为是**不受控制的**（因为父类不能直接更改它）。

派生状态最常见的错误是混合这两个;当一个派生状态值也通过`setState`被更新时，数据就没有单一的真实来源。

当这些约束被改变时，就会出现问题。这通常有两种形式。让我们来看看这两种情况。

### 反模式：无条件得使用props对state赋值

一个常见的误解是，当props“改变”时，`getDerivedStateFromProps`和`componentWillReceiveProps`才会被调用。事实上，只要父组件重新渲染，这些生命周期函数就会被调用，不管这些props是否与以前“不同”。正因为如此，使用任何一个去 *无条件* 地覆盖覆盖state都是不安全的。**这样做会导致状态更新丢失。**

让我们看个例子来说明这个问题。这是一个`EmailInput`组件，该组件通过props “email” 来映射state “email”：

```js
class EmailInput extends Component {
  state = { 
    email: this.props.email 
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    this.setState({ email: nextProps.email });
  }
}
```

这个组件可能看起来不错。state被初始化为由props指定的值，并且在输入``时实时更新state。但是，如果我们的组件的父类重新渲染，我们在``输入的任何东西都将丢失！（[参见这个演示示例。](https://codesandbox.io/s/m3w9zn1z8x)）即使我们在重置之前比较`nextProps.email !== this.state.email`，也一样。

在这个简单的例子中，为了解决这个问题，必须通过添加`shouldComponentUpdate`，并判断只有prop email发生改变时才重新渲染。然而在实际情况中，组件通常接受多个prop;任何一个prop发生改变都会导致重新运行和不正确的重置。而且对于Function和object类型的prop，`shouldComponentUpdate`很难判断是否发生了实质性的变化。[这里有一个演示](https://codesandbox.io/s/jl0w6r9w59)，`shouldComponentUpdate`最好作为性能优化使用，而不是为了确保派生状态的正确性。

希望你现在可以清楚地知道为什么**无条件得使用props对state赋值是一个坏主意**。在回顾可能的解决方案之前，让我们看看一个于此相关的另外一个问题模式：如果我们只在属性email改变时更新状态会怎样？

### 反模式：当props改变时清除state

继续上边的例子，我们判断只有当`props.email`发生改变时才去执行更新，以此来避免状态被清除：

```js
class EmailInput extends Component {
  state = {
    email: this.props.email
  };

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.email !== this.props.email) {
      this.setState({
        email: nextProps.email
      });
    }
  }
  
  // ...
}
```

> 注意
>
> 尽管上面的示例显示了`componentWillReceiveProps`，但同样的反模式也适用于`getDerivedStateFromProps`

我们刚刚取得了很大的进步。现在，只有当props真正改变的时候,组件才会擦除我们输入的内容。

现在出现了一个微妙的问题。想象一个使用上述输入组件的密码管理器应用程序。当使用相同的电子邮件在两个帐户的详细信息之间导航时，输入将无法重置。这是因为传递给组件的属性值对于两个帐户都是相同的！这对用户来说是一个惊喜，因为一个账户的未保存的变更似乎会影响到其他的帐户，这些帐户碰巧共享相同的电子邮件。

这种设计从根本上来说是有缺陷的，但这却是一个极易犯的错误。幸运的是，有两种替代方案可以更好地工作。两种方案的关键在于——对于任何数据，您都需要确保只有一个组件作为实际的来源，并避免在其他组件中复制它。现在来看一下这两种方案。

## 首选方案

### 推荐: 完全受控组件

避免上面提到的问题的一种方法是彻底从组件中删除状态。如果"邮件地址"只是作为属性存在，那么我们就不必担心与状态的冲突。我们甚至可以把`EmailInput`转换成轻量的函数组件：

```js
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
123
```

这种方法简化了组件的实现，但是如果我们仍然想要储存一个中间值（draft value），那么父表单组件现在就只能手动完成这件事。

### 推荐: 有"key"的完全非受控组件

另一种方案是，让组件完全拥有中间的email状态（draft email state）。在这个示例中，我们的组件仍然接收一个属性用来设置email的初始值，但是却无法接收这个属性之后的变化：

```js
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}
```

为了在移动到另一项（如密码管理器场景）时可以重新赋值，我们可以使用“key”这个React的特殊属性。当一个“key”发生变化时，React将创建一个新的组件实例，而不是更新当前的一个实例。“key”通常用于动态列表，但在这里也很有用。在我们的例子中，我们可以使用用户ID在新用户被选中时重新创建"EmailInput"：

```js
<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
```

每当ID改变时，`EmailInput`将被重新创建，它的状态将被重置为最新的`defaultEmail`值([示例](https://codesandbox.io/s/6v1znlxyxn))。使用这种方法，您不需要向每个输入项添加`key`。把`key`放在整个表单上可能更有意义。每次改变时，表单中的所有组件都将用一个新初始化的状态重新创建。

在大多数情况下，这是处理有重置要求的状态的最好方法。

> 注意
>
> 这看起来似乎会变慢，不过这点性能差异通常情况是无关紧要的（原文：While this may sound slow, the performance difference is usually insignificant）。相反，如果组件具有在更新上运行的重逻辑，则使用“key”甚至可以更快，因为该子树的diff运算被省略了。

#### 备选 1: 通过ID属性重置非受控组件

如果`key`方案由于某些原因不便使用（比如组件的初始化非常昂贵），一个可行但有点麻烦的解决方案是在`getDerivedStateFromProps`中观察“userID”的变化：

```js
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail,
    prevPropsUserID: this.props.userID
  };

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.userID !== state.prevPropsUserID) {
      return {
        prevPropsUserID: props.userID,
        email: props.defaultEmail
      };
    }
    return null;
  }

  // ...
}
123456789101112131415161718192021
```

这也提供了另一种灵活的处理方案，我们可以有选择的，只重置组件内部的某些状态。([示例](https://codesandbox.io/s/rjyvp7l3rq))

> 注意
>
> 虽然上边的示例使用的是`getDerivedStateFromProps`，对于`componentWillReceiveProps`也同样有效

#### 备选 2: 通过实例方法重置非受控组件

比较不常见的情况是，您需要重新设置状态，却没有合适的ID作为`key`。一种解决方案是在每次想要重置的时候，将“key”重置为一个随机值或自动递增的数字。另一种可行的替代方法是公开实例方法，以强制重置内部状态：

```js
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail
  };

  resetEmailForNewUser(newEmail) {
    this.setState({ email: newEmail });
  }

  // ...
}
```

父级表单组件可以通过ref调用该方法

在某些情况下，Refs可能会很有用，但一般来说，我们建议您谨慎地使用它们。即使在示例中，这种命令式方法也是不理想的，因为要发生两次渲染。

### 回顾

回顾一下，在设计组件时，最重要的是决定它的数据是否需要被控制。

与其尝试在状态中**镜像一个属性值，不如让组件被控制**，并在某些父组件的状态中合并两个不同的值。例如，与其让子组件既接收一个“committed”属性又要维护一个“draft”的状态，不如让父级组件同时管理两个状态——`state.committedValue`和`state.draftValue`——直接控制子组件的值。这使得数据流更加清晰和可预测。

对于**非受控**的组件，如果您试图在某特定的属性（通常是ID）更改时重置状态，那么您有几个选项：

- **推荐：如果要重置全部内部状态，使用`key`特性**
- 备选 1：只重置某些特定的状态字段，关注特定属性的更改（例如`props.userID`)。
- 备选 2：您还可以考虑使用refs调用一个命令式实例方法。

## 什么是memoization?

派生状态可用于确保执行`render`时使用的值仅在输入发生变化时才会重新计算。这种技术被称为[memoization](https://en.wikipedia.org/wiki/Memoization)。

使用派生状态进行记忆并不一定是不好的，但它通常不是最好的解决方案。管理派生状态存在一定的复杂性，并且这种复杂性会随着附加属性而增加。例如，如果我们向组件状态添加第二个派生字段，那么我们的实现将需要分别跟踪两者的更改。

我们来看一个例子，这个组件带有一个prop（一个项目列表），并呈现与用户输入的搜索查询匹配的项目。 我们可以使用派生状态来存储过滤后的列表：

```js
class Example extends Component {
  state = {
    filterText: "",
  };

  // *******************************************************
  // NOTE: this example is NOT the recommended approach.
  // See the examples below for our recommendations instead.
  // *******************************************************

  static getDerivedStateFromProps(props, state) {
    // Re-run the filter whenever the list array or filter text change.
    // Note we need to store prevPropsList and prevFilterText to detect changes.
    if (
      props.list !== state.prevPropsList ||
      state.prevFilterText !== state.filterText
    ) {
      return {
        prevPropsList: props.list,
        prevFilterText: state.filterText,
        filteredList: props.list.filter(item => item.text.includes(state.filterText))
      };
    }
    return null;
  }

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>{this.state.filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    );
  }
}
```

这个实现避免了不必要的重新计算`filteredList`。但我们却做很多啰嗦的工作，因为它必须分别跟踪和检测道具和状态的变化，以便正确更新过滤列表。在这个例子中，我们可以通过使用`PureComponent`并将过滤器操作移动到渲染方法来简化：

```js
// PureComponents only rerender if at least one state or prop value changes.
// Change is determined by doing a shallow comparison of state and prop keys.
class Example extends PureComponent {
  // State only needs to hold the current filter text value:
  state = {
    filterText: ""
  };

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // The render method on this PureComponent is called only if
    // props.list or state.filterText has changed.
    const filteredList = this.props.list.filter(
      item => item.text.includes(this.state.filterText)
    )

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    );
  }
}
```

上面的方法比派生状态版本更清洁和简单。 但是有时，这样并不好——对于大型列表，过滤可能会很慢，如果另一个属性改变，“PureComponent”不会阻止重新渲染。 为了解决这两个问题，我们可以添加一个记忆帮助器，以避免不必要地重新过滤我们的列表：

```js
import memoize from "memoize-one";

class Example extends Component {
  // State only needs to hold the current filter text value:
  state = { filterText: "" };

  // Re-run the filter whenever the list array or filter text changes:
  filter = memoize(
    (list, filterText) => list.filter(item => item.text.includes(filterText))
  );

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };

  render() {
    // Calculate the latest filtered list. If these arguments haven't changed
    // since the last render, `memoize-one` will reuse the last return value.
    const filteredList = this.filter(this.props.list, this.state.filterText);

    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    );
  }
}
```

这非常简单，并且与派生状态版本一样好！

在使用memoization时，需要注意一些约束：

1. 在大多数情况下，您需要**将memoized函数附加到组件实例**。这可以防止组件的多个实例重置彼此的memoized key。
2. 通常情况下，您需要使用具有**可控缓存大小**的记忆辅助程序，以防止随着时间的推移内存泄漏。 （在上面的例子中，我们使用了`memoize-one`，因为它只缓存最近的参数和结果。）
3. 如果父组件每次渲染时都重新创建了“props.list”，本节中显示的任何实现都不起作用。但在大多数情况下，这种设置是合适的。

## 最后

在现实世界的应用程序中，组件通常包含受控和非受控行为的混合。如果每个值都有明确的真相来源，则可以避免上述的反模式。

值得重新思考的是getDerivedStateFromProps（和通常的派生状态）是一个高级特性，也因为这种复杂性，使用时务必谨慎。

