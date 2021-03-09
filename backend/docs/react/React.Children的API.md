# React.Children 详解

React.Children提供了处理 this.props.children 的 API，this.props.children 支持任何数据（组件、字符串、函数等等）。React.children有5个方法：React.Children.map()，React.Children.forEach()、React.Children.count()、React.Children.only()、React.Children.toArray()，通常与React.cloneElement()结合使用来操作this.props.children。

### React.Children.map()


React.Children.map()有些类似Array.prototype.map()。如果children是数组，则此方法返回一个数组，如果是null 或 undefined 则返回null或undefined。第一参数是children，即示例中的Father组件里的 'hello world!' 和`() => <p>2333</p>`函数。第二个参数是fucntion，function的参数第一个是遍历的每一项，第二个是对应的索引。


```jsx
function Father({children}) {
  return(
    <div>
      {React.Children.map(children, (child, index) => {
        ...
      })}
    </div>
  )        
 }

<Father>
  hello world!
  {() => <p>2333</p>}
</Father>
```

### React.Children.forEach()

跟React.Children.map()一样，区别在于无返回。


### React.Children.count()

　　React.Children.count()用来计数，返回child个数。不要用children.length来计数，如果Father组件里只有'hello world!'会返回12，显然是错误的结果。


```jsx
function Father({children}) {
    return(
      <div>
      {React.Children.count(children)}
      </div>    
    )        
 }
<Father>
    hello world!
    {() => <p>2333</p>}
</Father>
```


### React.Children.only()
　　验证children里只有唯一的孩子并返回他。否则这个方法抛出一个错误。

```jsx
function Father({children}) {
  return(
    <div>
      {React.Children.only(children)}
    </div>    
  )
}

<Father>
  hello world!
</Father>
```


### React.Children.toArray()

　　将children转换成Array，对children排序时需要使用


```jsx
function Father({children}) {
  let children1 = React.Children.toArray(children);
  return(
    <div>
      {children1.sort().join(' ')}
    </div>    
  )        
}


<Father>
  {'ccc'}
  {'aaa'}
  {'bbb'}
</Father>

//渲染结果： aaa bbb ccc
```




如果不用React.Children.toArray()方法，直接写children.sort()就会报错


![img](https://img2018.cnblogs.com/blog/948888/201902/948888-20190213180320059-686584430.png)

 

**Example：**

例如有这样的需求，完成一个操作需要3个步骤，每完成一个步骤，对应的指示灯就会点亮。

index.jsx

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Steps, Step} from './Steps';

function App() {
  return (
    <div>
      <Steps currentStep={1}>  //完成相应的步骤，改变currentStep的值。如，完成第一步currentStep赋值为1，完成第二部赋值为2
        <Step />
        <Step />
        <Step />
      </Steps>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById('root')); 
```

Steps.jsx

```jsx
import * as React from 'react';
import './step.less';

function Steps({currentStep, children}) {
  return (
    <div>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          index: index,
          currentStep: currentStep
        });
      })}
    </div>
  );
}

function Step({index, currentStep}: any) {
  return <div className={`indicator${currentStep >= index + 1 ? ' active' : ''}`} />;
}
export {Steps, Step};
```

steps.less

```less
.indicator {
  display: inline-block;
  width: 100px;
  height: 20px;
  margin-right: 10px;
  margin-top: 200px;
  background: #f3f3f3;
  &.active {
    background: orange;
  }
```
