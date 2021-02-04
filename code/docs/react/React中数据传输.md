## React中数据传输

### 父组件传递给子组件

概述：React中主要使用组件进行数据传输，组件的数据存储在props和state中，进行**自上而下**单向数据传递。

#### props

React核心思想：组件化，页面被切成一个个可以复用的独立的组件。每个组件是一个内部封闭的环境，类似于一个函数，props就是传入的参数。

1.用法

在父组件中，render<Example> 中就是调用子函数的过程，并把实际参数传入。在子组件中，需要使用props作为形式参数，传递父组件传入的参数。

~~~jsx
//父组件
import Item from "./item";
export default class ItemList extends 		React.Component{
  const itemList = data.map(item => <Item item=item />);
  render(){
    return (
      { itemList }
    );
  }
}
//map 函数返回每一项都是<Item item="数据">的数组

// 子组件
export default class Item extends React.Component{
  render{
    return (
      <li>{this.props.item}</li>
    )
  }
}
// this.props获取到组件的所有数据(是一个对象，包括这个组件的配置)根据父组件，现在只有item = item 属性，所有直接获取this.props.item即可获得全部数据。
~~~

2.只读性不变性

props用于**初始化状态和渲染组件**两个功能。所以当组件实例化以后，props是不能改变的。只有通过父组件重新渲染的方式才能将新的props传入子组件中。（子组件中无法对this.props进行修改）。props类似于从上面传来的常量。

3.默认参数和数据类型

~~~js
Item.defaultProps = {
    item: "React Seafile"
}
// 默认参数
Item.propTypes = {
    item: PropTypes.string
}
// 默认数据类型：字符串(或者其他数据类型)
~~~

#### State

state: state is similar to props, but it is private and fully controlled by the component.

State是与props相同点都是数据（参数），但是state是子组件私有的变量，而且由子组件完全控制。

1.用法

~~~js
export default class ItemList extends React.Component{
  constructor(){
    super();
    this.state = {
      itemList:true
    }
  }
  //我们会通过异步操作获取数据，需要在didMount阶段执行异步操作
  componentDidMount(){
    fetch("url").then((response) => response.json()).then((data) => {
      this.setState({
        itemList:item
      });
    })
  }
  render{
    return (
      { this.state.itemList }
    )
  }
}

重要提示：当我们调用this.setState的方法时，React会更新组件的数据状态state，并且会重新调用render方法，会对组件进行重新渲染。

constructor是唯一初始化state的地方，this.state来初始化state，this.setState一种方法修改state参数。

总结：state用于组件存储自己的属性和状态，不能通过父组件访问，可以传给子组件，只能通过this.setState来修改。~~修改state属性会导致组件重新渲染。~~

  没有state叫做无状态组件，有state叫做有状态组件。
多用props，少用state，props可以逐层向下传递。

React中的同一个组件内部标签条件渲染：不需要设置某个标签的show-hide属性，直接使用JSX中的三目计算进行渲染
{条件（属性==true）？<Form1/>:null} 

//fetch 新的请求方法(兼容性)——附加
fetch(url, options).then(function(response){
  //handle http response
},function(error){
  //handle network error
})

options 可选参数(是一个对象)包括对于请求的设置
{
  method:"POST",
    body:JSON.stringity(data)
}
包括：
请求方法：POST-GET
请求头信息：header对象
请求体信息：body：Blob、FormData等

相应response是一个Promise对象

Promise对象属性：
status：请求参数结果200
statustext:服务器返回的状态报文
headers:返回的头部信息
url请求的地址

Promise对象方法：
text：以string形式生成请求text
json() 生成JOSN.parse(responseText)的结果
blob() 生成一个Blob
arrayBuffer() 生成一个ArrayBuffer
formData() 生成格式化的数据 可用于其他的请求

参考文件：JavaScript利用fetch实现异步请求的方法案例
~~~

### 子组件传递给父组件

#### 回调函数

当子组件的状态发生变化时，可以用户触发或者JS触发回调函数，把子组件的信息通过回调函数返回父组件，之后父组件处理并setState。这是常用的方法。

#### 事件监听

如果子组件很多或者层级很深，那么底层子组件的回调函数会依次上传，或者需要处理多个事件，那么回调函数不适合处理。所以使用事件监听（eg eventbus）任何位置的子组件触发事件，在顶级组件或者指定组件监听事件，统一处理，然后统一设置状态，这样更好管理组件。大型项目中更合适。

#### Ref

上面两种方式适应于子组件发出信号，然后父组件被动接收。如果父组件向主动获取子组件的信息，需要通过 ref 访问子组件的 DOM 属性状态。子组件中设置 `ref={(node) => {this.ref = node}}` 把子组件通过ref传出去。父组件中使用 ref 属性可以获取子组件（高阶组件中不能直接获取ref，需要转换）。