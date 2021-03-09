# react 中通过ref获取高阶（HOC）子组件实例的解决方案

今天写react项目遇到一个父子组件通信的问题。这是一个非常常规的问题了，随便搜一下就能得到解决方案。总体来说可以分为两类：

> 1. 子组件需要获取父组件的信息，这通过`props`就可以解决；
> 2. 父组件需要知道子组件的信息，这可以通过`ref`解决。

我们这里讲的属于后者，但是又有些特殊，特殊就在于子组件是个高阶组件，比如使用`@connect` `@withRouter`包裹过的组件（其实大部分组件都会被这两个包裹），具体示例如下：

```jsx
@withRouter
export default class childComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div>this is childComponent</div>)
  }
}

@withRouter
export default class parentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}; 
  }
  render () {
    return <childComponent ref={(v) => { this.childCp = v; }}/>
  }
 }
```

上面的childComponent被withRouter包裹过一遍后，这时候你在`parentComponent`中通过`ref`获取到的是并不会是`childComponent`，而是`withRouter`组件。这就比较尴尬了，我们大多数情况肯定是需要获取自己写的组件实例的。有一点需要讲明白：就是通过`ref`获取到的不是`childComponent`，在原理上是对的，如果获取到是`childComponent`组件那才是有问题的，有悖伦理知道哇。

既然通过官方提供的`ref`无法获取到我们想要的`ref`，那我们就来仔细想下`ref`获取到的是啥？我们回归到javascript语言层面来看，那不就是组件中的this么。

```javascript
@withRouter
export default class childComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}; // 我们需要获取到的就是这个this而已
  }
  render() {
    return (<div>this is childComponent</div>)
  }
}
```

知道我们需要获取到的是啥了，那就好办了，我给`childComponent`传一个`prop`专门来get这个this不就好了，比如使用`getInstance`：

```javascript
@withRouter
export default class childComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    const { getInstance } = props;
    if (typeof getInstance === 'function') {
      getInstance(this); // 在这里把this暴露给`parentComponent`
    }
  }
  render() {
    return (<div>this is childComponent</div>)
  }
}
@withRouter
export default class parentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}; 
  }
  render () {
    return (
     <childComponent 
       ref={(withRouter) => { this.childCpWrapper = withRouter; }}  // 这里获取的是`withRouter`组件，一般没啥用，这里写出来只是为了对比
       getInstance={(childCp) => { this.childCp = childCp; }} // 这里通过`getInstance`传一个回调函数接收`childComponent`实例即可
    />
    );
  }
 }
```

perfect ! 问题解决了，这样我不管你怎么用啥高阶组件、用多少个高阶组件包裹我们`childComponent`，我们都可以通过一个`getInstance`，穿越千山万水直接获取`childComponent`实例。

当然完美也是相对的，比如上面的方案中，我们得在每一个`childComponent`的构造函数中写那段暴露`this`的代码，麻烦、费劲。这时候我们可以写一个HOC专门来做这件事情，比如`withRef`:

```javascript
// 只做一件事，把`WrappedComponent`回传个`getInstance`（如果有的话）
export default (WrappedComponent) => {
  return class withRef extends Component {
    static displayName = `withRef(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    render() {
      // 这里重新定义一个props的原因是:
      // 你直接去修改this.props.ref在react开发模式下会报错，不允许你去修改
      const props = {
        ...this.props,
      };
      // 在这里把getInstance赋值给ref，
      // 传给`WrappedComponent`，这样就getInstance能获取到`WrappedComponent`实例
      // 感谢评论区的[yangshenghaha]同学的完善
      props.ref = (el)=>{
          this.props.getInstance && this.props.getInstance(el);this.props.ref && this.props.ref(el);
      }
      return (
        <WrappedComponent {...props} />
      );
    }
  };
};
```

然后我们可以这样使用`withRef`

```javascript
@withRouter
@withRef  // 这样使用是不是方便多了，注意：这句必须写在最接近`childComponent`的地方
export default class childComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (<div>this is childComponent</div>)
  }
}
@withRouter
export default class parentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {}; 
  }
  render () {
    return (
     <childComponent 
       // 这里获取的是`withRouter`组件，一般没啥用，这里写出来只是为了对比
       ref={(withRouter) => { this.childCpWrapper = withRouter; }}  
      // 这里通过`getInstance`传一个回调函数接收`childComponent`实例即可
       getInstance={(childCp) => { this.childCp = childCp; }} 
    />
    );
  }
 }
```

通过这个小问题，对高阶组件的理解是不是也更深了些，问题才是最好的教材啊。最后说一点吧，通信方式有很多(暴露给全局，EventEmmiter, Props, ref...)，但是我建议：遇到通信问题还是优先考虑redux action驱动，数据优先，能通过数据驱动解决的尽量用数据驱动，毕竟这才是我们用react的重要原因