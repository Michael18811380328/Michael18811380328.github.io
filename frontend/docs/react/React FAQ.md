### 事件处理函数的性能

如果在render阶段执行绑定，不管使用 bind(this) 还是箭头函数，都不利于性能（会在渲染时创建一个新函数）

现在很多代码在render阶段设置箭头函数处理，这样不利于性能，应当避免这种写法。

~~~jsx
<button onClick={this.handleClick.bind(this)}></button>
<button onClick={() => this.handleClick()}></button>
~~~

注意：在绑定事件时，如果使用箭头函数，后面需要加上括号；否则不能加上括号，会直接调用函数。

~~~jsx
<button onClick={this.handleClick()}></button>
// 这样在渲染过程函数直接执行
~~~



### 事件处理函数的传参

给事件处理的回调函数传递参数的两种方法（通常需要传递数组中的某项参数）

方法一：通过箭头函数传递参数

~~~jsx
{this.state.array.map((item, index) => {
  return (
    <Fragment>
      <button key={index} onClick={this.handleClick.bind(this, item)}></button>
      <span key={index} onClick={(e) => this.handleClick(e, item)}></span>
    </Fragment>
  );
})}
// 两个方法都可以。如果使用第一种，函数的实参是item，而不是 this and item。
~~~

方法二：通过data属性传递参数；这种情况对于 PureComponent 可能产生性能问题

~~~jsx
<span data-test={item} onClick={this.handleClick}></span>

handleClick = (event) => {
  console.log(event.targte.data-test.item);
}
~~~



### 避免函数多次调用

例如想要防止`onClick`或者`onScroll`这样的事件处理程序的回调被触发的太快，那么可以限制执行回调的速度，可以通过以下几种方式做到这点：

- **throttling**: 基于时间的频率来进行更改 (例如 [`_.throttle`](https://lodash.com/docs#throttle))
- **debouncing**: 一段时间的不活动之后进行更改 (例如 [`_.debounce`](https://lodash.com/docs#debounce))
- **requestAnimationFrame**:基于[`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)来进行更改 (例如 [`raf-schd`](https://github.com/alexreardon/raf-schd))

可以看这个比较`throttle`和`debounce`的[可视化页面](http://demo.nimius.net/debounce_throttle/)



### 节流函数和防抖函数

lodash库

节流是阻止函数在给定时间内被多次调用。下面这个例子会阻止“click”事件每秒钟的多次调用。

~~~jsx
import throttle from 'lodash.throttle';

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickThrottled = throttle(this.handleClick, 1000);
  }

  componentWillUnmount() {
    this.handleClickThrottled.cancel();
  }

  render() {
    return <button onClick={this.handleClickThrottled}>Load More</button>;
  }

  handleClick() {
    this.props.loadMore();
  }
}
~~~

防抖确保函数上次执行后的一段时间内，不会再次执行。当必须进行一些昂贵的计算来响应快速派发的事件时（比如鼠标滚动或键盘事件时），防抖是非常有用的。下面这个例子以250ms的延迟来改变文本输入。

~~~jsx
import debounce from 'lodash.debounce';

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder="Search..."
        defaultValue={this.props.value}
      />
    );
  }

  handleChange(e) {
    // React pools events, so we read the value before debounce.
    // Alternately we could call `event.persist()` and pass the entire event.
    // For more info see reactjs.org/docs/events.html#event-pooling
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}
~~~

样式

通常情况下使用css外部文件链接形式增加样式。动画：查看 [React Transition Group](https://reactcommunity.org/react-transition-group/) 和 [React Motion](https://github.com/chenglou/react-motion)。

