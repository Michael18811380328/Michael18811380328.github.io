# React新生命周期--getDerivedStateFromProps

## 新的生命周期过程

先来看看最新版本react的生命周期图：

![img](https://upload-images.jianshu.io/upload_images/12185313-85b3010f0b8b7d16.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

看看它的变化

> 新增：getDerivedStateFromProps，getSnapshotBeforeUpdate
> UNSAFE：UNSAFE_componentWillMount，UNSAFE_componentWillUpdate，UNSAFE_componentWillReceiveProps

## getDerivedStateFromProps

React生命周期的命名一直都是非常语义化的，这个生命周期的意思就是`从props中获取state`，可以说是太简单易懂了。

可以说，这个生命周期的功能实际上就是将`传入的props映射到state上面`。

由于16.4的修改，这个函数会在`每次re-rendering之前被调用`，这意味着什么呢？

**意味着即使你的props没有任何变化，而是父state发生了变化，导致子组件发生了re-render，这个生命周期函数依然会被调用**。看似一个非常小的修改，却可能会导致很多隐含的问题。

## 使用

这个生命周期函数是为了替代`componentWillReceiveProps`存在的，所以在你需要使用`componentWillReceiveProps`的时候，就可以考虑使用`getDerivedStateFromProps`来进行替代了。

两者的参数是不相同的，而`getDerivedStateFromProps`是一个静态函数，也就是这个函数不能通过this访问到class的属性，也并不推荐直接访问属性。而是应该通过参数提供的nextProps以及prevState来进行判断，根据新传入的props来映射到state。

需要注意的是，**如果props传入的内容不需要影响到你的state，那么就需要返回一个null**，这个返回值是必须的，所以尽量将其写到函数的末尾。

```js
static getDerivedStateFromProps(nextProps, prevState) {
    const {type} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (type !== prevState.type) {
        return {
            type,
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}
```

#### Case1 -- 多来源的不同状态

假设我们有一个列表，这个列表受到页面主体，也就是根组件的驱动，也受到其本身数据加载的驱动。

因为这个页面在开始渲染的时候，所有的数据请求可能是通过batch进行的，所以要在根组件进行统一处理，而其列表的分页操作，则是由其本身控制。

这会出现什么问题呢？该列表的状态受到两方面的控制，也就是re-render可能由props驱动，也可能由state驱动。这就导致了getDerivedStateFromProps会在两种驱动状态下被重新渲染。

当这个函数被多次调用的时候，就需要注意到，state和props的变化将会怎样影响到你的组件变化。

```js
// 组件接收一个type参数
static propTypes = {
    type: PropTypes.number
}

// 组件还具有自己的状态来渲染列表
class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            type: 0,
        }
    }
}
```

如上面代码的例子所示，组件既受控，又控制自己。当type发生变化，会触发一次`getDerivedStateFromProps`，在这里更新组件的type状态，然而，在进行异步操作之后，组件又会更新list状态，这时你的`getDerivedStateFromProps`函数就需要注意，不能够仅仅判断type是否变化来更新状态，因为list的变化也会更新到组件的状态。这时就必须返回一个null，否则会导致组件无法更新并且报错。

#### Case2 -- 组织好你的组件

考虑一下，如果你的组件内部既需要修改自己的type，又需要接收从外部修改的type。

是不是非常混乱？getDerivedStateFromProps中你根本不知道该做什么。

```tsx
static getDerivedStateFromProps(nextProps, prevState) {
    const {type} = nextProps;
    // type可能由props驱动，也可能由state驱动，这样判断会导致state驱动的type被回滚
    if (type !== prevState.type) {
        return {
            type,
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}
```

如何解决这个棘手的问题呢？

好好组织你的组件，在非必须的时候，摒弃这种写法。type要么由props驱动，要么完全由state驱动。
如果实在没有办法解耦，那么就需要一个hack来辅助：绑定props到state上。

```tsx
constructor(props) {
    super(props);
    this.state = {
        type: 0,
        props,
    }
}
static getDerivedStateFromProps(nextProps, prevState) {
    const {type, props} = nextProps;
    // 这段代码可能看起来非常混乱，这个props可以被当做缓存，仅用作判断
    if (type !== props.type) {
        return {
            type,
            props: {
                type,
            },
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}
```

上面的代码可以保证在进行多数据源驱动的时候，状态能够正确改变。当然，这样的代码很多情况下是会影响到别人阅读你的代码的，对于维护造成了非常大的困难。

从这个生命周期的更新来看，react更希望将受控的`props`和`state`进行分离，就如同`Redux`作者Dan Abramov在redux文档当中写的一样[Presentational and Container Components](https://links.jianshu.com/go?to=https%3A%2F%2Flink.juejin.im%3Ftarget%3Dhttps%3A%2F%2Fmedium.com%2F%40dan_abramov%2Fsmart-and-dumb-components-7ca2f9a7c7d0)，将所有的组件分离称为展示型组件和容器型组件，一个只负责接收`props`来改变自己的样式，一个负责保持其整个模块的`state`。这样可以让代码更加清晰。但是在实际的业务逻辑中，我们有时很难做到这一点，而且这样可能会导致容器型组件变得非常庞大以致难以管理，如何进行取舍还是需要根据实际场景决定的。

#### Case3 -- 异步

以前，我们可以在props发生改变的时候，在componentWillReceiveProps中进行异步操作，将props的改变驱动到state的改变。

```go
componentWillReceiveProps(nextProps) {
    if (props.type !== nextProps.type) {
        // 在这里进行异步操作或者更新状态
        this.setState({
            type: props.type,
        });
        this._doAsyncOperation();
    }
}
```

这样的写法已经使用了很久，并且并不会存在什么功能上的问题，但是将componentWillReceiveProps标记为deprecated的原因也并不是因为功能问题，而是性能问题。

**当外部多个属性在很短的时间间隔之内多次变化，就会导致componentWillReceiveProps被多次调用。这个调用并不会被合并，如果这次内容都会触发异步请求，那么可能会导致多个异步请求阻塞。**

> getDerivedStateFromProps is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.

这个生命周期函数会在每次调用render之前被触发，而读过一点react源码的童鞋都会了解，**reactsetState操作是会通过transaction进行合并的，由此导致的更新过程是batch的，而react中大部分的更新过程的触发源都是setState，所以render触发的频率并不会非常频繁**(感谢 @leeenx20 的提醒，这里描述进行了修改)。

在使用getDerivedStateFromProps的时候，遇到了上面说的props在很短的时间内多次变化，也只会触发一次render，也就是只触发一次getDerivedStateFromProps。这样的优点不言而喻。

那么如何使用getDerivedStateFromProps进行异步的处理呢？

> If you need to perform a side effect (for example, data fetching or an animation) in response to a change in props, use componentDidUpdate lifecycle instead.

官方教你怎么写代码系列，但是其实也没有其他可以进行异步操作的地方了。为了响应props的变化，就需要在componentDidUpdate中根据新的props和state来进行异步操作，比如从服务端拉取数据。

```csharp
// 在getDerivedStateFromProps中进行state的改变
static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.type !== prevState.type) {
        return {
            type: nextProps.type,
        };
    }
    return null;
}
// 在componentDidUpdate中进行异步操作，驱动数据的变化
componentDidUpdate() {
    this._loadAsyncData({...this.state});
}
```

## 小结

以上是本期开发过程中使用新的生命周期函数的时候遇到的一点小问题和一些相关思考。react为了防止部分开发者滥用生命周期，可谓非常尽心尽力了。既然你用不好，我就干脆不让你用。一个静态的生命周期函数可以让状态的修改更加规范和合理。

至于为什么全文没有提到`getSnapshotBeforeUpdate`，因为自己并没有用到#诚实脸。简单看了一下，这个函数返回一个update之前的快照，并且传入到`componentDidUpdate`中，组件更新前后的状态都可以在`componentDidUpdate`中获取了。一些需要在组件更新完成之后进行的操作所需要的数据，就可以不需要挂载到`state`或者是cache下来了。比如[官方例子](https://links.jianshu.com/go?to=https%3A%2F%2Flink.juejin.im%3Ftarget%3Dhttps%3A%2F%2Freact.docschina.org%2Fdocs%2Freact-component.html%23getsnapshotbeforeupdate)中所举例的保留更新之前的页面滚动距离，以便在组件update完成之后恢复其滚动位置。也是一个非常方便的周期函数。