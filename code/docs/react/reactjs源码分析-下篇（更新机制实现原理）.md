# [reactjs源码分析-下篇（更新机制实现原理）](http://purplebamboo.github.io/2015/09/15/reactjs_source_analyze_part_two/)

## 前言

紧接上文，虚拟dom差异化算法（diff algorithm）是reactjs最核心的东西，按照官方的说法。他非常快，非常高效。目前已经有一些分析此算法的文章，但是仅仅停留在表面。大部分小白看完并不能了解。所以我们下面自己动手实现一遍，等你完全实现了，再去看那些文字图片流的介绍文章，就会发现容易理解多了。

## 实现更新机制

下面我们探讨下更新的机制。

一般在reactjs中我们需要更新时都是调用的setState。看下面的例子：

```jsx
var HelloMessage = React.createClass({
  getInitialState: function() {
    return {type: 'say:'};
  },
  changeType:function(){
    this.setState({type:'shout:'})
  },
  render: function() {
    return React.createElement("div", {onclick:this.changeType},this.state.type, "Hello ", this.props.name);
  }
});

React.render(React.createElement(HelloMessage, {name: "John"}), document.getElementById("container"));

/**

//生成的html为：

<div data-reactid="0" id="test">
    <span data-reactid="0.0">hello world</span>
</div>

点击文字，say会变成shout

*/
```

点击文字，调用setState就会更新，所以我们扩展下ReactClass，看下setState的实现：

```jsx
//定义ReactClass类
var ReactClass = function(){
}

ReactClass.prototype.render = function(){}

//setState
ReactClass.prototype.setState = function(newState) {

  //还记得我们在ReactCompositeComponent里面mount的时候 做了赋值
  //所以这里可以拿到 对应的ReactCompositeComponent的实例_reactInternalInstance
  this._reactInternalInstance.receiveComponent(null, newState);
}
```

可以看到setState主要调用了对应的component的receiveComponent来实现更新。所有的挂载，更新都应该交给对应的component来管理。

就像所有的component都实现了mountComponent来处理第一次渲染，所有的componet类都应该实现receiveComponent用来处理自己的更新。

### 自定义元素的receiveComponent

所以我们照葫芦画瓢来给自定义元素的对应component类（ReactCompositeComponent）实现一个receiveComponent方法：

```jsx
//更新
ReactCompositeComponent.prototype.receiveComponent = function(nextElement, newState) {

  //如果接受了新的，就使用最新的element
  this._currentElement = nextElement || this._currentElement

  var inst = this._instance;
  //合并state
  var nextState = $.extend(inst.state, newState);
  var nextProps = this._currentElement.props;


  //改写state
  inst.state = nextState;


  //如果inst有shouldComponentUpdate并且返回false。说明组件本身判断不要更新，就直接返回。
  if (inst.shouldComponentUpdate && (inst.shouldComponentUpdate(nextProps, nextState) === false)) return;

  //生命周期管理，如果有componentWillUpdate，就调用，表示开始要更新了。
  if (inst.componentWillUpdate) inst.componentWillUpdate(nextProps, nextState);


  var prevComponentInstance = this._renderedComponent;
  var prevRenderedElement = prevComponentInstance._currentElement;
  //重新执行render拿到对应的新element;
  var nextRenderedElement = this._instance.render();


  //判断是需要更新还是直接就重新渲染
  //注意这里的_shouldUpdateReactComponent跟上面的不同哦 这个是全局的方法
  if (_shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
    //如果需要更新，就继续调用子节点的receiveComponent的方法，传入新的element更新子节点。
    prevComponentInstance.receiveComponent(nextRenderedElement);
    //调用componentDidUpdate表示更新完成了
    inst.componentDidUpdate && inst.componentDidUpdate();

  } else {
    //如果发现完全是不同的两种element，那就干脆重新渲染了
    var thisID = this._rootNodeID;
    //重新new一个对应的component，
    this._renderedComponent = this._instantiateReactComponent(nextRenderedElement);
    //重新生成对应的元素内容
    var nextMarkup = _renderedComponent.mountComponent(thisID);
    //替换整个节点
    $('[data-reactid="' + this._rootNodeID + '"]').replaceWith(nextMarkup);

  }

}

//用来判定两个element需不需要更新
//这里的key是我们createElement的时候可以选择性的传入的。用来标识这个element，当发现key不同时，我们就可以直接重新渲染，不需要去更新了。
var _shouldUpdateReactComponent ＝ function(prevElement, nextElement){
  if (prevElement != null && nextElement != null) {
    var prevType = typeof prevElement;
    var nextType = typeof nextElement;
    if (prevType === 'string' || prevType === 'number') {
      return nextType === 'string' || nextType === 'number';
    } else {
      return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
  }
  return false;
}
```

不要被这么多代码吓到，其实流程很简单。
它主要做了什么事呢？首先会合并改动，生成最新的state,props然后拿以前的render返回的element跟现在最新调用render生成的element进行对比（_shouldUpdateReactComponent），看看需不需要更新，如果要更新就继续调用对应的component类对应的receiveComponent就好啦，其实就是直接当甩手掌柜，事情直接丢给手下去办了。当然还有种情况是，两次生成的element差别太大，就不是一个类型的，那好办直接重新生成一份新的代码重新渲染一次就o了。

本质上还是递归调用receiveComponent的过程。

这里注意两个函数：

- inst.shouldComponentUpdate是实例方法，当我们不希望某次setState后更新，我们就可以重写这个方法，返回false就好了。
- _shouldUpdateReactComponent是一个全局方法，这个是一种reactjs的优化机制。用来决定是直接全部替换，还是使用很细微的改动。当两次render出来的子节点key不同，直接全部重新渲染一遍，替换就好了。否则，我们就得来个递归的更新，保证最小化的更新机制，这样可以不会有太大的闪烁。

另外可以看到这里还处理了一套更新的生命周期调用机制。

### 文本节点的receiveComponent

我们再看看文本节点的，比较简单：

```jsx
ReactDOMTextComponent.prototype.receiveComponent = function(nextText) {
  var nextStringText = '' + nextText;
  //跟以前保存的字符串比较
  if (nextStringText !== this._currentElement) {
    this._currentElement = nextStringText;
    //替换整个节点
    $('[data-reactid="' + this._rootNodeID + '"]').html(this._currentElement);

  }
}
```

没什么好说的，如果不同的话，直接找到对应的节点，更新就好了。

### 基本元素element的receiveComponent

最后我们开始看比较复杂的浏览器基本元素的更新机制。
比如我们看看下面的html:

```jsx
<div id="test" name="hello">
    <span></span>
    <span></span>
</div>
```

想一下我们怎么以最小代价去更新这段html呢。不难发现其实主要包括两个部分：

1. 属性的更新，包括对特殊属性比如事件的处理
2. 子节点的更新,这个比较复杂，为了得到最好的效率，我们需要处理下面这些问题：
   - 拿新的子节点树跟以前老的子节点树对比，找出他们之间的差别。我们称之为diff
   - 所有差别找出后，再一次性的去更新。我们称之为patch

所以更新代码结构如下：

```jsx
ReactDOMComponent.prototype.receiveComponent = function(nextElement) {
  var lastProps = this._currentElement.props;
  var nextProps = nextElement.props;

  this._currentElement = nextElement;
  //需要单独的更新属性
  this._updateDOMProperties(lastProps, nextProps);
  //再更新子节点
  this._updateDOMChildren(nextElement.props.children);
}
```

整体上也不复杂，先是处理当前节点属性的变动，后面再去处理子节点的变动

我们一步步来，先看看，更新属性怎么变更：

```jsx
ReactDOMComponent.prototype._updateDOMProperties = function(lastProps, nextProps) {
  var propKey;
  //遍历，当一个老的属性不在新的属性集合里时，需要删除掉。

  for (propKey in lastProps) {
    //新的属性里有，或者propKey是在原型上的直接跳过。这样剩下的都是不在新属性集合里的。需要删除
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
      continue;
    }
    //对于那种特殊的，比如这里的事件监听的属性我们需要去掉监听
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace('on', '');
      //针对当前的节点取消事件代理
      $(document).undelegate('[data-reactid="' + this._rootNodeID + '"]', eventType, lastProps[propKey]);
      continue;
    }

    //从dom上删除不需要的属性
    $('[data-reactid="' + this._rootNodeID + '"]').removeAttr(propKey)
  }

  //对于新的属性，需要写到dom节点上
  for (propKey in nextProps) {
    //对于事件监听的属性我们需要特殊处理
    if (/^on[A-Za-z]/.test(propKey)) {
      var eventType = propKey.replace('on', '');
      //以前如果已经有，说明有了监听，需要先去掉
      lastProps[propKey] && $(document).undelegate('[data-reactid="' + this._rootNodeID + '"]', eventType, lastProps[propKey]);
      //针对当前的节点添加事件代理,以_rootNodeID为命名空间
      $(document).delegate('[data-reactid="' + this._rootNodeID + '"]', eventType + '.' + this._rootNodeID, nextProps[propKey]);
      continue;
    }

    if (propKey == 'children') continue;

    //添加新的属性，或者是更新老的同名属性
    $('[data-reactid="' + this._rootNodeID + '"]').prop(propKey, nextProps[propKey])
  }

}
```

属性的变更并不是特别复杂，主要就是找到以前老的不用的属性直接去掉，新的属性赋值，并且注意其中特殊的事件属性做出特殊处理就行了。

下面我们看子节点的更新，也是最复杂的部分。

```jsx
ReactDOMComponent.prototype.receiveComponent = function(nextElement){
  var lastProps = this._currentElement.props;
  var nextProps = nextElement.props;
  this._currentElement = nextElement;
  //需要单独的更新属性
  this._updateDOMProperties(lastProps,nextProps);
  //再更新子节点
  this._updateDOMChildren(nextProps.children);
}

//全局的更新深度标识
var updateDepth = 0;
//全局的更新队列，所有的差异都存在这里
var diffQueue = [];

ReactDOMComponent.prototype._updateDOMChildren = function(nextChildrenElements){
  updateDepth++
  //_diff用来递归找出差别,组装差异对象,添加到更新队列diffQueue。
  this._diff(diffQueue,nextChildrenElements);
  updateDepth--
  if(updateDepth == 0){
    //在需要的时候调用patch，执行具体的dom操作
    this._patch(diffQueue);
    diffQueue = [];
  }
}
```

就像我们之前说的一样，更新子节点包含两个部分，一个是递归的分析差异，把差异添加到队列中。然后在合适的时机调用`_patch`把差异应用到dom上。

那么什么是合适的时机，updateDepth又是干嘛的？

这里需要注意的是，`_diff`内部也会递归调用子节点的receiveComponent于是当某个子节点也是浏览器普通节点，就也会走_updateDOMChildren这一步。所以这里使用了updateDepth来记录递归的过程，只有等递归回来updateDepth为0时，代表整个差异已经分析完毕，可以开始使用patch来处理差异队列了。

所以我们关键是实现`_diff`与`_patch`两个方法。

我们先看_diff的实现：

```jsx
//差异更新的几种类型
var UPATE_TYPES = {
  MOVE_EXISTING: 1,
  REMOVE_NODE: 2,
  INSERT_MARKUP: 3
}


//普通的children是一个数组，此方法把它转换成一个map,key就是element的key,如果是text节点或者element创建时并没有传入key,就直接用在数组里的index标识
function flattenChildren(componentChildren) {
  var child;
  var name;
  var childrenMap = {};
  for (var i = 0; i < componentChildren.length; i++) {
    child = componentChildren[i];
    name = child && child._currentelement && child._currentelement.key ? child._currentelement.key : i.toString(36);
    childrenMap[name] = child;
  }
  return childrenMap;
}


//主要用来生成子节点elements的component集合
//这边注意，有个判断逻辑，如果发现是更新，就会继续使用以前的componentInstance,调用对应的receiveComponent。
//如果是新的节点，就会重新生成一个新的componentInstance，
function generateComponentChildren(prevChildren, nextChildrenElements) {
  var nextChildren = {};
  nextChildrenElements = nextChildrenElements || [];
  $.each(nextChildrenElements, function(index, element) {
    var name = element.key ? element.key : index;
    var prevChild = prevChildren && prevChildren[name];
    var prevElement = prevChild && prevChild._currentElement;
    var nextElement = element;

    //调用_shouldUpdateReactComponent判断是否是更新
    if (_shouldUpdateReactComponent(prevElement, nextElement)) {
      //更新的话直接递归调用子节点的receiveComponent就好了
      prevChild.receiveComponent(nextElement);
      //然后继续使用老的component
      nextChildren[name] = prevChild;
    } else {
      //对于没有老的，那就重新新增一个，重新生成一个component
      var nextChildInstance = instantiateReactComponent(nextElement, null);
      //使用新的component
      nextChildren[name] = nextChildInstance;
    }
  })

  return nextChildren;
}



//_diff用来递归找出差别,组装差异对象,添加到更新队列diffQueue。
ReactDOMComponent.prototype._diff = function(diffQueue, nextChildrenElements) {
  var self = this;
  //拿到之前的子节点的 component类型对象的集合,这个是在刚开始渲染时赋值的，记不得的可以翻上面
  //_renderedChildren 本来是数组，我们搞成map
  var prevChildren = flattenChildren(self._renderedChildren);
  //生成新的子节点的component对象集合，这里注意，会复用老的component对象
  var nextChildren = generateComponentChildren(prevChildren, nextChildrenElements);
  //重新赋值_renderedChildren，使用最新的。
  self._renderedChildren = []
  $.each(nextChildren, function(key, instance) {
    self._renderedChildren.push(instance);
  })


  var nextIndex = 0; //代表到达的新的节点的index
  //通过对比两个集合的差异，组装差异节点添加到队列中
  for (name in nextChildren) {
    if (!nextChildren.hasOwnProperty(name)) {
      continue;
    }
    var prevChild = prevChildren && prevChildren[name];
    var nextChild = nextChildren[name];
    //相同的话，说明是使用的同一个component,所以我们需要做移动的操作
    if (prevChild === nextChild) {
      //添加差异对象，类型：MOVE_EXISTING
      diffQueue.push({
        parentId: self._rootNodeID,
        parentNode: $('[data-reactid=' + self._rootNodeID + ']'),
        type: UPATE_TYPES.MOVE_EXISTING,
        fromIndex: prevChild._mountIndex,
        toIndex: nextIndex
      })
    } else { //如果不相同，说明是新增加的节点
      //但是如果老的还存在，就是element不同，但是component一样。我们需要把它对应的老的element删除。
      if (prevChild) {
        //添加差异对象，类型：REMOVE_NODE
        diffQueue.push({
          parentId: self._rootNodeID,
          parentNode: $('[data-reactid=' + self._rootNodeID + ']'),
          type: UPATE_TYPES.REMOVE_NODE,
          fromIndex: prevChild._mountIndex,
          toIndex: null
        })

        //如果以前已经渲染过了，记得先去掉以前所有的事件监听，通过命名空间全部清空
        if (prevChild._rootNodeID) {
          $(document).undelegate('.' + prevChild._rootNodeID);
        }

      }
      //新增加的节点，也组装差异对象放到队列里
      //添加差异对象，类型：INSERT_MARKUP
      diffQueue.push({
        parentId: self._rootNodeID,
        parentNode: $('[data-reactid=' + self._rootNodeID + ']'),
        type: UPATE_TYPES.INSERT_MARKUP,
        fromIndex: null,
        toIndex: nextIndex,
        markup: nextChild.mountComponent() //新增的节点，多一个此属性，表示新节点的dom内容
      })
    }
    //更新mount的index
    nextChild._mountIndex = nextIndex;
    nextIndex++;
  }



  //对于老的节点里有，新的节点里没有的那些，也全都删除掉
  for (name in prevChildren) {
    if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
      //添加差异对象，类型：REMOVE_NODE
      diffQueue.push({
        parentId: self._rootNodeID,
        parentNode: $('[data-reactid=' + self._rootNodeID + ']'),
        type: UPATE_TYPES.REMOVE_NODE,
        fromIndex: prevChild._mountIndex,
        toIndex: null
      })
      //如果以前已经渲染过了，记得先去掉以前所有的事件监听
      if (prevChildren[name]._rootNodeID) {
        $(document).undelegate('.' + prevChildren[name]._rootNodeID);
      }
    }
  }
}
```

我们分析下上面的代码，咋一看好多，好复杂，不急我们从入口开始看。

首先我们拿到之前的component的集合，如果是第一次更新的话，这个值是我们在渲染时赋值的。然后我们调用generateComponentChildren生成最新的component集合。我们知道component是用来放element的，一个萝卜一个坑。

注意flattenChildren我们这里把数组集合转成了对象map,以element的key作为标识，当然对于text文本或者没有传入key的element,直接用index作为标识。通过这些标识，我们可以从类型的角度来判断两个component是否是一样的。

generateComponentChildren会尽量的复用以前的component，也就是那些坑，当发现可以复用component（也就是key一致）时，就还用以前的，只需要调用他对应的更新方法receiveComponent就行了，这样就会递归的去获取子节点的差异对象然后放到队列了。如果发现不能复用那就是新的节点，我们就需要instantiateReactComponent重新生成一个新的component。

> 这里的flattenChildren需要给予很大的关注，比如对于一个表格列表，我们在最前面插入了一条数据，想一下如果我们创建element时没有传入key，所有的key都是null,这样reactjs在generateComponentChildren时就会默认通过顺序（index）来一一对应改变前跟改变后的子节点，这样变更前与变更后的对应节点判断（_shouldUpdateReactComponent）其实是不合适的。也就是说对于这种列表的情况，我们最好给予唯一的标识key，这样reactjs找对应关系时会更方便一点。

当我们生成好新的component集合以后，我们需要做出对比。组装差异对象。

对比老的集合和新的集合。我们需要找出涵盖四种情况，包括三种类型（UPATE_TYPES）的变动：

| 类型          | 情况                                                         |
| :------------ | :----------------------------------------------------------- |
| MOVE_EXISTING | 新的component类型在老的集合里也有，并且element是可以更新的类型，在generateComponentChildren我们已经调用了receiveComponent，这种情况下prevChild=nextChild,那我们就需要做出移动的操作，可以复用以前的dom节点。 |
| INSERT_MARKUP | 新的component类型不在老的集合里，那么就是全新的节点，我们需要插入新的节点 |
| REMOVE_NODE   | 老的component类型，在新的集合里也有，但是对应的element不同了不能直接复用直接更新，那我们也得删除。 |
| REMOVE_NODE   | 老的component不在新的集合里的，我们需要删除                  |

所以我们找出了这三种类型的差异，组装成具体的差异对象，然后加到了差异队列里面。

比如我们看下面这个例子，假设下面这些是某个父元素的子元素集合，上面到下面代表了变动流程：

![变动](https://img.alicdn.com/tps/TB1oUcQJpXXXXawXVXXXXXXXXXX-1024-768.jpg)

数字我们可以理解为给element的key。

正方形代表element。圆形代表了component。当然也是实际上的dom节点的位置。

从上到下，我们的4 2 1里 2 ，1可以复用之前的component,让他们通知自己的子节点更新后，再告诉2和1，他们在新的集合里需要移动的位置（在我们这里就是组装差异对象加到队列）。3需要删除，4需要新增。

好了，整个的diff就完成了，这个时候当递归完成，我们就需要开始做patch的动作了，把这些差异对象实打实的反映到具体的dom节点上。

我们看下_patch的实现：

```jsx
//用于将childNode插入到指定位置
function insertChildAt(parentNode, childNode, index) {
  var beforeChild = parentNode.children().get(index);
  beforeChild ? childNode.insertBefore(beforeChild) : childNode.appendTo(parentNode);
}

ReactDOMComponent.prototype._patch = function(updates) {
  var update;
  var initialChildren = {};
  var deleteChildren = [];
  for (var i = 0; i < updates.length; i++) {
    update = updates[i];
    if (update.type === UPATE_TYPES.MOVE_EXISTING || update.type === UPATE_TYPES.REMOVE_NODE) {
      var updatedIndex = update.fromIndex;
      var updatedChild = $(update.parentNode.children().get(updatedIndex));
      var parentID = update.parentID;
      //所有需要更新的节点都保存下来，方便后面使用
      initialChildren[parentID] = initialChildren[parentID] || [];
      //使用parentID作为简易命名空间
      initialChildren[parentID][updatedIndex] = updatedChild;
      //所有需要修改的节点先删除,对于move的，后面再重新插入到正确的位置即可
      deleteChildren.push(updatedChild)
    }
  }

  //删除所有需要先删除的
  $.each(deleteChildren, function(index, child) {
    $(child).remove();
  })


  //再遍历一次，这次处理新增的节点，还有修改的节点这里也要重新插入
  for (var k = 0; k < updates.length; k++) {
    update = updates[k];
    switch (update.type) {
      case UPATE_TYPES.INSERT_MARKUP:
        insertChildAt(update.parentNode, $(update.markup), update.toIndex);
        break;
      case UPATE_TYPES.MOVE_EXISTING:
        insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
        break;
      case UPATE_TYPES.REMOVE_NODE:
        // 什么都不需要做，因为上面已经帮忙删除掉了
        break;
    }
  }
}
```

`_patch`主要就是挨个遍历差异队列，遍历两次，第一次删除掉所有需要变动的节点，然后第二次插入新的节点还有修改的节点。这里为什么可以直接挨个的插入呢？原因就是我们在diff阶段添加差异节点到差异队列时，本身就是有序的，也就是说对于新增节点（包括move和insert的）在队列里的顺序就是最终dom的顺序，所以我们才可以挨个的直接根据index去塞入节点。

但是其实你会发现这里有个问题，就是所有的节点都会被删除，包括复用以前的component类型为`UPATE_TYPES.MOVE_EXISTING`的，所以闪烁会很严重。其实我们再看看上面的例子，其实2是不需要记录到差异队列的。这样后面patch也是ok的。想想是为什么呢？

我们来改造下代码：

```jsx
//_diff用来递归找出差别,组装差异对象,添加到更新队列diffQueue。
ReactDOMComponent.prototype._diff = function(diffQueue, nextChildrenElements){
  。。。
  /**注意新增代码**/
  var lastIndex = 0;//代表访问的最后一次的老的集合的位置
  var nextIndex = 0;//代表到达的新的节点的index
  //通过对比两个集合的差异，组装差异节点添加到队列中
  for (name in nextChildren) {
    if (!nextChildren.hasOwnProperty(name)) {
      continue;
    }
    var prevChild = prevChildren && prevChildren[name];
    var nextChild = nextChildren[name];
    //相同的话，说明是使用的同一个component,所以我们需要做移动的操作
    if (prevChild === nextChild) {
      //添加差异对象，类型：MOVE_EXISTING
      。。。。
      /**注意新增代码**/
      prevChild._mountIndex < lastIndex && diffQueue.push({
        parentId:this._rootNodeID,
        parentNode:$('[data-reactid='+this._rootNodeID+']'),
        type: UPATE_TYPES.REMOVE_NODE,
        fromIndex: prevChild._mountIndex,
        toIndex:null
      })
      lastIndex = Math.max(prevChild._mountIndex, lastIndex);
    } else {
      //如果不相同，说明是新增加的节点，
      if (prevChild) {
        //但是如果老的还存在，就是element不同，但是component一样。我们需要把它对应的老的element删除。
        //添加差异对象，类型：REMOVE_NODE
        。。。。。
        /**注意新增代码**/
        lastIndex = Math.max(prevChild._mountIndex, lastIndex);
      }
      。。。
    }
    //更新mount的inddex
    nextChild._mountIndex = nextIndex;
    nextIndex++;
  }

  //对于老的节点里有，新的节点里没有的那些，也全都删除掉
  。。。
}
```

可以看到我们多加了个lastIndex，这个代表最后一次访问的老集合节点的最大的位置。
而我们加了个判断，只有_mountIndex小于这个lastIndex的才会需要加入差异队列。有了这个判断上面的例子2就不需要move。而程序也可以好好的运行，实际上大部分都是2这种情况。

这是一种顺序优化，lastIndex一直在更新，代表了当前访问的最右的老的集合的元素。
我们假设上一个元素是A,添加后更新了lastIndex。
如果我们这时候来个新元素B，比lastIndex还大说明当前元素在老的集合里面就比上一个A靠后。所以这个元素就算不加入差异队列，也不会影响到其他人，不会影响到后面的path插入节点。因为我们从patch里面知道，新的集合都是按顺序从头开始插入元素的，只有当新元素比lastIndex小时才需要变更。其实只要仔细推敲下上面那个例子，就可以理解这种优化手段了。

这样整个的更新机制就完成了。我们再来简单回顾下reactjs的差异算法：

首先是所有的component都实现了receiveComponent来负责自己的更新，而浏览器默认元素的更新最为复杂，也就是经常说的 diff algorithm。

react有一个全局_shouldUpdateReactComponent用来根据element的key来判断是更新还是重新渲染，这是第一个差异判断。比如自定义元素里，就使用这个判断，通过这种标识判断，会变得特别高效。

每个类型的元素都要处理好自己的更新：

1. 自定义元素的更新，主要是更新render出的节点，做甩手掌柜交给render出的节点的对应component去管理更新。
2. text节点的更新很简单，直接更新文案。
3. 浏览器基本元素的更新，分为两块：
   - 先是更新属性，对比出前后属性的不同，局部更新。并且处理特殊属性，比如事件绑定。
   - 然后是子节点的更新，子节点更新主要是找出差异对象，找差异对象的时候也会使用上面的_shouldUpdateReactComponent来判断，如果是可以直接更新的就会递归调用子节点的更新，这样也会递归查找差异对象，这里还会使用lastIndex这种做一种优化，使一些节点保留位置，之后根据差异对象操作dom元素（位置变动，删除，添加等）。

整个reactjs的差异算法就是这个样子。最核心的两个_shouldUpdateReactComponent以及diff,patch算法。

## 小试牛刀

有了上面简易版的reaactjs，我们来实现一个简单的todolist吧。

```jsx
var TodoList = React.createClass({
  getInitialState: function() {
    return {items: []};
  },
  add:function(){
    var nextItems = this.state.items.concat([this.state.text]);
    this.setState({items: nextItems, text: ''});
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    var createItem = function(itemText) {
      return React.createElement("div", null, itemText);
    };
    var lists = this.state.items.map(createItem);
    var input = React.createElement("input", {onkeyup: this.onChange.bind(this),value: this.state.text});
    var button = React.createElement("p", {onclick: this.add.bind(this)}, 'Add#' + (this.state.items.length + 1))
    var children = lists.concat([input,button])
    return React.createElement("div", null,children);
  }
});


React.render(React.createElement(TodoList), document.getElementById("container"));
```

效果如下：

![todolist](https://img.alicdn.com/tps/TB1bPcWJpXXXXcwXFXXXXXXXXXX-537-228.gif)

整个的流程是这样：

- 初次渲染时先使用`ReactCompositeComponent`渲染自定义元素TodoList，调用getInitialState拿到初始值，然后使用`ReactDOMComponent`渲染render返回的div基本元素节点。div基本元素再一层层的使用`ReactDOMComponent`去渲染各个子节点,包括input,还有p。
- 在input框输入文字触发onchange事件，开始调用setState做出变更，直接变更render出来的节点，经过差异算法，一层层的往下。最后改变value值。
- 点击按钮，触发add然后开始更新，经过差异算法，添加一个节点。同时更新按钮上面的文案。

基本上，整个流程都梳理清楚了

# 结语

这只是个玩具，但实现了reactjs最核心的功能，虚拟节点，差异算法，单向数据更新都在这里了。还有很多reactjs优秀的东西没有实现，比如对象生成时内存的线程池管理，批量更新机制，事件的优化，服务端的渲染，immutable data等等。这些东西受限于篇幅就不具体展开了。

reactjs作为一种解决方案，虚拟节点的想法比较新奇，不过个人还是不能接受这种别扭的写法。使用reactjs，就要使用他那一整套的开发方式，而他核心的功能其实只是一个差异算法，而这种其实已经有相关的库实现了。

最后再吐槽下前端真是苦命，各种新技术，各种新知识脑细胞不够用了。也难怪前端永远都缺人。

相关资料：

1. [http://freestyle21.cn/2015/06/21/react-diff-%E7%AE%97%E6%B3%95/](http://freestyle21.cn/2015/06/21/react-diff-算法/)
2. https://github.com/Matt-Esch/virtual-dom
3. [http://zjumty.iteye.com/blog/2207030](http://zjumty.iteye.com/blog/2207030)
4. [http://hao.jser.com/archive/7871/](http://hao.jser.com/archive/7871/)
5. https://github.com/miniflycn/qvd/issues/1
6. [http://fluentconf.com/fluent2014/public/schedule/detail/32395](http://fluentconf.com/fluent2014/public/schedule/detail/32395)
7. [http://calendar.perfplanet.com/2013/diff/](http://calendar.perfplanet.com/2013/diff/)
8. [http://segmentfault.com/a/1190000000606216](http://segmentfault.com/a/1190000000606216)
9. [http://hulufei.gitbooks.io/react-tutorial/content/introduction.html](http://hulufei.gitbooks.io/react-tutorial/content/introduction.html)
10. [http://reactjs.cn/react/docs/multiple-components.html](http://reactjs.cn/react/docs/multiple-components.html)
11. [http://facebook.github.io/react/docs/multiple-components.html](http://facebook.github.io/react/docs/multiple-components.html)