# React：Suspense的实现与探讨

Suspense的实现很诡异，也备受争议。用Dan的原话讲：**你将会恨死它，然后你会爱上他。**

## **介绍Suspense**

这个主要解决网络的IO问题

- 在render函数中，我们可以写入一个异步请求，请求数据
- react会从我们缓存中读取这个缓存
- 如果有缓存了，直接进行正常的render
- 如果没有缓存，那么会抛出一个异常，这个异常是一个promise
- 当这个promise完成后（请求数据完成），react会继续回到原来的render中（实际上是重新执行一遍render），把数据render出来
- 完全同步写法，没有任何异步callback之类的东西

如果你还没有明白这是什么意思那我简单的表述成下面这句话：

> 调用render函数->发现有异步请求->悬停，等待异步请求结果->再渲染展示数据

看着是非常神奇的，**用同步方法写异步，而且没有yield/async/await，**简直能把人看傻眼了。这么做的好处自然就是，我们的思维逻辑非常的简单，清楚，没有callback，没有其他任何玩意。



## **一）用现在的React 16+实现Suspense**

这个suspense很神奇，但是当你知道了具体细节了以后，你就觉得，噢～～～～～～原来是这样，那么根据之前我们的介绍，全文的最关键的一个地方就是：**如果没有缓存，那么会抛出一个异常，这个异常是一个promise**

我们知道，无论是什么异常，JavaScript都能捕获，React就是利用了这个语言特性，捕获了所有生命周期函数，render函数，以及事件回调中的任何错误，封装进一个特殊的生命周期里：**ComponentDidCatch**

那么实际上，Suspense就是依赖ComponentDidCatch实现的。

**1.1 createFetcher实现**

```js
var cached = {};

export const createFetcher = (promiseTask) => {
  let ref = cached;
  return () => {
    const task = promiseTask();
    task.then(res => {
      ref = res
    });
    if (ref === cached) {
      throw task
    }
    return ref
  }
}
```

这个函数接受一个参数，是一个函数，这个函数返回一个Promise。这里干的很简单，利用闭包，缓存一个变量ref，然后在最后返回的函数中，进行then操作，将得到的结果设置给缓存ref。

看到这里的时候，我相信你还是模糊的，因为我们都知道，这个函数在第一次调用的时候，必定抛出一个task(Promise），接下来看。

**1.2实现Placeholder**

```jsx
export class Placeholder extends React.Component {
  state = {
    isLoading: false
  };

componentDidCatch(error) {
  if (this._mounted) {
    if (typeof error.then === 'function') {
      this.setState({ isLoading: true });
      error.then(() => {
        if (this._mounted) {
          this.setState({ isLoading: false })
        }
      });
    }
  }
}
componentDidMount() {
  this._mounted = true;
}
componentWillUnmount() {
  console.log('unm')
  this._mounted = false;
}

render() {
  const { children } = this.props;
  const { isLoading } = this.state;
  return isLoading ? '加载数据中，请稍后...' : children;
}
}
```

这里看到，我们的关键性函数，**componentDidCatch，**这个函数主要干了三件事情

- 当我们调用一个带有createFetcher的render函数时，捕获抛出的Promise并渲染「加载中...」字样
- 执行Promise.then操作，切换loading态，渲染我们带有createFetcher的render函数
- 反复执行1、2步骤，直到createFetcher中的promise resolve

不能不说，**非常巧妙的制造了一个小循环，检查直到**promise resolve以后，渲染子组件

**1.3测试用例**

```jsx
export var fetchSometingApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("加载完毕，这是你要的一段数据");
    }, 3000);
  });
}
const getData = createFetcher(fetchSometingApi);

const FangZheng = ({ name }) => {
  return <h1>{getData()}!</h1>
}

class App extends React.Component {

  render() {
    return (
      <Placeholder>
        <FangZheng />
      </Placeholder>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

**1.4使用render prop写一个loading**

```js
//只需要将刚刚的placeholder中的render改成
render() {
        const { children } = this.props;
        const { isLoading } = this.state;

        return children(isLoading)
 }
```

在外部的时候这么使用

```jsx
const getData = createFetcher(fetchSometingApi);

const FangZheng = ({ name }) => {
  return <h1>{getData()}!</h1>
}

class App extends React.Component {
  state = {
    show: false
  }

handleClick = () => {
  this.setState({
    show: true
  })
}

handleClickBack = () => {
  this.setState({
    show: false
  })
}
handleClickClear = () => {
  location.reload();
}

render() {
  return (
    <div>
      <button onClick={this.handleClick}>加载</button>
      <button onClick={this.handleClickBack}>回退</button>
      <button onClick={this.handleClickClear}>清除缓存</button>
      <div>
        {this.state.show ?
          <Loading>
            {isLoading => isLoading ? <Spin /> : <FangZheng />}
          </Loading> :
        null
        }
      </div>
    </div>
  );
}
}
```

第一次读取以后，结果缓存，第二次加载直接出现

## **二）一些思考**

这一种组件的书写方式，可以说完全破坏了我们之前的固有思维：**render必须是纯函数**

我们来说说好处：

1. 非常实用，这一部分啰啰嗦嗦的逻辑在redux中搞的话，必须得指定多个状态然后才能完事
2. **在Jsx层**解决这种常见的副作用，在同构应用中发挥更大的效果，因为代码可以更统一，我个人认为这是一个非常优雅的方式
3. 异步同步化。异步的同步化这几年一直都在做，而且这一次可以说解决得更加彻底，连之前的yield async/await都没了
4. 副作用粒度小，本来一个组件的「自更新」就是他自己的事情，得益于这样的设计，我们的组件可以重新回归，自己状态自己管理这种好事中去。

再来说说坏处：

1. Hack，不得不说，虽然巧妙，但是用throw promise是一个hack，利用语言特性制造的这种hack，可能会导致某些问题难以排查。我想这也就是为什么react team把一个「本来可以放在外面实现的功能，写进了react」，他们一定也在摸索到底会有什么奇怪的bug。
2. render 函数不再纯：一个纯函数的最大好处就是，他的一切结果我们都能预知，带有副作用的函数一两个还好，多了就可能会导致bug。况且，render函数并不是一个普通的函数，而是React的根基，每一个组件都必须要有一个render（无状态组件也叫render） 函数。

## **三）最后总结**

实际上suspense已经可以在我们的日常生活中使用了，也就是像我一样去自己实现一个。从第一直觉来看，suspense是一个优点贼多，缺点感觉又可以忽略不计的新特性。

当然，目前来说，suspense并没有投入大规模使用，有什么神奇的bug还不好说，但是就冲throw promise这一点，我决定下周就再项目中写一个小组件试试手....

最后，今天的分析代码我放在了：[https://github.com/215566435/think-in-suspense](https://link.zhihu.com/?target=https%3A//github.com/215566435/think-in-suspense)


