# React.js学习笔记之事件

## 事件系统

> React 标准化了事件对象，因此在不同的浏览器中都会有相同的属性。

组件createClass后创建的是许多方法组成的对象。组件中使用的方法分为React自有的方法与用户定义的方法。其中React自有方法是组件生命周期中的方法，如：`render`、`componentWillUpdate`、`componentDidMount`等。用户自定义的方法可以起符合JS命名规范的方法就可以（最好使用驼峰命名），如：`handleClick`、`handleChange`、`handleMouseover`等。

> 事件绑定语法：onClick = {this.handleClick}

### 绑定事件处理函数

#### 鼠标类

> - onClick
> - onContextMenu
> - onDoubleClick
> - onMouseDown
> - onMouseEnter
> - onMouseLeave
> - onMouseMove
> - onMouseOut
> - onMouseOver
> - onMouseUp

拖拽事件：

> - onDrop
> - onDrag
> - onDragEnd
> - onDragEnter
> - onDragExit
> - onDragLeave
> - onDragOver
> - onDragStart

#### 触摸

> - onTouchCancel
> - onTouchEnd
> - onTouchMove
> - onTouchStart

触摸只会在移动设备上产生

#### 键盘

`onKeyPress`是`onKeyDown`和`onKeyUp`的组合

> - onKeyDown
> - onKeyPress
> - onKeyUp

#### 剪切类

> - onCopy
> - onCut
> - onPaste

对应的是我们常常使用的复制、剪切和粘贴

#### 表单类

(会专门总结表单类事件，在此仅仅简单列出)

> - onChange
> - onInput
> - onSubmit

`onChange`可以用在输入框、单选框、下拉列表里，每当内容发生变化时我们都能获得通知。`onInput`使用在文字输入。`onSubmit`是用在整个表单的输入提交，常用在禁止表单的默认操作。

#### 焦点事件

> - onFocus
> - onBlur

#### UI元素类

> - onScroll

滚动事件触发的时候会触发onScroll事件

#### 滚动

> - onWheel

鼠标滚轮触发的事件，监听滚动幅度，滚动方位

#### 组成事件

> - onCompositionEnd
> - onCompositionStart
> - onCompositionUpdate

#### 图片类

> - onLoad
> - onError

#### 多媒体类

> onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting

### 实例演示

```jsx
var HelloDada = React.createClass({
  getInitialState:function(){
    return{
      name:''
    };
  },
  handleChange:function(e){
    this.setState({
      name:e.target.value
    });
  },
  render:function(){
    return <div>
      <input onChange={this.handleChange} />
    </div>
  }
});
ReactDom.render(<HelloDada/>,document.body);
```

## 事件池

虚拟事件对象已经被合并。这意味着虚拟事件对象将被重新使用，而该事件回调被调用之后所有的属性将无效。这是出于性能的考虑。因此，您不能以异步的方式访问事件。

```jsx
function onClick(event) {
  console.log(event); // =>无效的对象
  console.log(event.type); // => "click"
  var eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  this.setState({clickEvent: event}); // 不起作用.this.state.clickEvent 将只包含空值.
  this.setState({eventType: event.type}); // 您依然可以导出事件属性
}
```

> 如果您想以一个异步的方式来访问事件属性，您应该对事件调用`event.persist()`。这将从事件池中取出合成的事件，并允许该事件的引用，使用户的代码被保留。

## 事件对象

事件处理器将会传入`SyntheticEvent`的实例，一个对浏览器本地事件的跨浏览器封装。它有和浏览器本地事件相同的属性和方法，包括`stopPropagation()`和`preventDefault()`，但是没有浏览器兼容问题。
如果因为一些因素，需要底层的浏览器事件对象，只要使用`nativeEvent`属性就可以获取到它了。

> 对于 v0.14，在事件处理函数中返回 false 将不会阻止事件冒泡。取而代之的是在合适的应用场景下，手动调用`e.stopPropagation()`或者`e.preventDefault()`。

```jsx
    handleChange:function(e){
        console.log(e.target.value);
    }
```

其中`e`是事件对象`target`是事件对象的属性

*(以下内容括号内为类型)*

### 通用属性

- bubbles (boolean) 表示事件是否冒泡
- cancelable(boolean) 表示事件是否可以取消
- currentTarget(DOMEventTarget) 与Target类似，由于事件可以冒泡，所以两者表示的内容是不同的
- defaultPrevented(boolean) 表示事件是否禁止了默认行为
- eventPhase(number) 表示事件所处的阶段
- isTrusted(boolean) 表示事件是否可信。所谓的可信事件表示的是用户操作的事件，不可信事件就是通过JS代码来触发的事件。
- nativeEvent(DOMEvent)
- preventDefault() (void) 对应的defaultPrevented，表示的是禁止默认行为
- stopPropagaTion() (void) 对应的是bubbles，表示的是sh
- target(DOMEventTarget)
- timeStamp(number) 时间戳，也就是事件触发的事件
- type(string) 事件的类型

### 不同事件对象的特有属性

#### 剪切事件

- clipboardData(DOMDataTransfer)表示拿到的数据

#### 键盘事件

- altKey(boolean) 表示是否按下alt键
- charCode(Number) 表示的是按键的字符编码，可以通过编码来判断按下的是什么键
- ctrlKey(boolean) 表示是否按下ctrl键
- getModifierState(key) (function) 表示是否按下辅助按键（辅助按键就是雷士ctrl、shift等辅助按键）可以传入按键编码来判断是否按下
- key(string) 字符串，按下的键
- keyCode(Number) 表示那些不是字符编码的按键
- locale(String) 表示本地化得一些字符串
- location(number) 表示位置
- metaKey(boolean) 表示的是win系统下的win键，mac系统下对应的command键
- repeat(boolean) 表示按键是否重复
- shiftKey(boolean) 表示是否按下shift
- which(Number) 表示经过通用化得charCode和keyCode

#### 焦点事件

- relatedTarget(DOMEventTarget) 相关焦点对象

#### 鼠标事件

- altKey(boolean)
- button(Number)
- buttons(Number)
- clientX(Number) 原点为浏览器左上角
- clinetY(Number) 原点为浏览器左上角
- ctrlKey(boolean)
- getModifierState(key) (function)
- metaKey(boolean)
- pageX(Number) 原点为HTML页面的左上角
- pageY(Number) 原点为HTML页面的左上角
- relatedTarget(DOMEventTarget)
- screenX(Number) 原点为显示器的左上角
- screenY(Number) 原点为显示器的左上角
- shiftKey(boolean)

#### 触摸事件

> 为了使触摸事件生效，在渲染所有组件之前调用 `React.initializeTouchEvents(true)`。

- altKey(boolean)
- ctrlKey(boolean)
- getModifierState(key)
- metaKey(boolean)
- shiftKey(boolean)
- changedTouches(DOMTouchList) 判断手势操作
- targetTouches(DOMTouchList) 判断手势操作
- touches(DOMTouchList) 判断手势操作

#### UI元素事件

- detail(Number) 滚动的距离
- view(DOMAbstractView) 界面，视窗

#### 鼠标滚动

- deltaMode(Number) 可以理解为移动的单位
- deltaX(Number) X轴移动的相对距离固定值
- deltaY(Number) Y轴移动的相对距离固定值
- deltaZ(Number) Z轴移动的相对距离固定值

### 实例

1. 滚动事件对象

```jsx
var HelloDada = React.creatClass({
  getInitialState:function(){
    return {
      backgroundColor:'#FFFFFF'
    }
  },
  handleWheel:function(e){
    var newColor = (parseInt(this.state.backgroundColor.substr(1),16)+e.deltaY*997).tiString(16);
    this.setState({
      backgroundColor:newColor
    })
  },
  render:function(){
    return <div onWheel={this.handleWheel} style={this.state}>
      <p>Dada Shuaige</p>
    </div>
  }
});
ReactDOM.render(<HelloDada />,document.body)
```

2.键盘事件对象

```jsx
var Dada =React.creatClass{
  getInitialState:function(){
    return{
      password:''
    }
  },
    handleKeyPress:function(e){
      this.setState({
        paddword:this.state.password+e.which
      });
    },
      handleChange:function(e){
        e.target.value='';
      },
        render:function(){
          return <div>
            <input onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
            <p style={{
                'display':this.state.password.indexOf('495051') >=0?'block':'none'
              }}>Dada handsomeboy</p>
          </div>
        }
};
ReactDOM.render(<Dada />,document.body)
```

## 事件与状态关联

状态不仅仅实现了组件内部结果的清晰对应，还实现了组件与用户之间的交互，使用户与组件的行为紧紧结合起来

```jsx
handleChange:function(e){
    this.setState({Dada:e.target.value});
}
```

> this.setState设置状态

### 实例

```jsx
var Dada =React.creatClass({
  getInitialState:function(){
    return{
      x:0,
      y:0
    }
  },
  handleMouseMove:function(e){
    this.setState({
      x:e.clientX,
      y:e.clientY
    });
  },
  render:function(){
    return <div onMouseMove={this.handleMouseMove} style={{width:'200px',height:'200px',backgroundColor:'#999'}}>
      {this.state.x+'.'+this.state.y}
    </div>
  }
});
ReactDOM.render(<Dada />,document.body)
```

## 小结

本节主要介绍了React的事件系统，很详细的列出了每一个事件对象与事件对象的属性，可以作为一个查找的参考。



react对于每个html元素都添加了很多事件处理函数，这些事件网上一搜就都出来了，这里简单说下在react中利用js进行操作类似于css里的hover所使用的事件。

比如这样一个需求，有以下3个div：

```html
<div class="a abc">a</div>
<div class="b abc">b</div>
<div class="c abc">c</div>123
```

网上很多例子只是简单说了下一个组件是如何操作类似于:hover选择器，没错就是使用onMouseEnter和onMouseLeave，那么现在我要实现这样一个效果： 
\1. 鼠标不在这三个div上的时候，这个三个div里的字体显示红色 
\2. 鼠标放在class为a的组件上的时候，它里面的字体颜色不变，其他的div变成绿色

也许是我以前写前端的时候用习惯了JQuery，处处都是dom操作，现在使用react的时候，一时之间转不过来弯，就好像从面向过程编程过度到面向对象编程一样，我想了一下，想想react改变页面的内容是根据状态，于是我利用onMouseEnter和onMouseLeave事件来动态改变状态hover，然后根据hover的状态值去给这三个div分别添加一个class，这里的class样式在css文本中要写在其他class的下面，因为css是自上而下的。

我的代码如下： 
reactjs中的部分代码

```jsx
construction(props){
  super(props);
  this.state={
    hover: false,
  }
  this.onMouseEnter = this.onMouseEnter.bind(this);
  this.onMouseLeave = this.onMouseLeave.bind(this);
}

onMouseEnter(){
  this.setState({
    hover: true,
  });
}

onMouseLeave(){
  this.setState({
    hover: false,
  })
}

render(){
  return <div>
    <div className={style.a + ' ' + style.abc + ' ' + (this.state.hover?style.aHover:'')}>a</div>
    <div className={style.b + ' ' + style.abc + ' ' + (this.state.hover?style.bHover:'')}>b</div>
    <div className={style.c + ' ' + style.abc + ' ' + (this.state.hover?style.b=cHover:'')}>c</div>
  </div>;
}
```

css的相关样式

```css
.abc{
  //公共的样式
  color: red;
}

//写在其他class的样式表的下面
.aHover,.bHover,.cHover{
  color: green;
}

.aHover:hover,.bHover:hover,.cHover:hover{
  color: red;
}
```

也许有的人会想到用css中的+选择器，比如：.abc:hover + .abc{}，是的，如果只是像这里写的需求的话是可以实现，如果换一下，我鼠标放在b上，b显示红色，其他显示绿色，那么+选择器就无力了，因为css是自上而下，不可逆的，说是+是兄弟级选择器，我看也就是弟弟级选择器，它只能定位到你当前标签后面同级的标签元素。

*注：因为是react，所以不建议使用js对dom进行直接操作、利用css的expression