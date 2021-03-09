# React 避免重新渲染 性能优化

React框架运行的原理：界面受到数据驱动，state 和 props 的改动会造成界面的改动。其中，state 是自身的属性，props 是父组件提供的参数。如果界面内容很多，很小的数据变化会造成界面的重绘，那么造成性能的浪费。下面从几个方面总结一下如何避免重新渲染。

#### State

state是一个组件内部的属性。如果state变化，那么组件必然会 render。如果一个组件是静态单项组件（不涉及用户输入操作），避免 state 使用。如果界面中需要使用变量进行计算，可以使用属性（this.name）来代替state等。如果不使用 state 可以计算得出，直接计算，尽量减少 state 的数量。只有涉及用户交互的地方或者上下组件传值的地方才使用 state。

总之，state 越少越好。

#### Props

props 是父组件向子组件传值的方式。如果父组件传递的 props 发生变化，那么子组件会重新渲染。所以，父组件传递的props可以优化，子组件需要什么，父组件再传递什么props。

#### Component

组件化是react的重要思想。组件化不仅可以使得代码复用，同时可以优化性能。将界面上的功能区分成不同的组件。当某个数据发生变化，只更新一部分组件，其他组件不受影响，这样可以优化性能。

尽量使用无状态组件（数据由外部提供，内部没有用户数据交互行为等）。这部分组件就是单独的一部分，不受到外界的数据改变的影响。

#### 生命周期函数

在 componentWillUpdate 和 componentDidUpdate 阶段，界面数据的处理可能会造成界面再次渲染。如果涉及递归等代码会造成很大的性能浪费。

在componentDidMount 阶段可以处理很多数据（界面首次加载后，向服务器发出请求等）。

通过 shouldComponentUpdate 中判断，如果组件传来的props相同，那么返回 false 不需要进行界面重新渲染。前后不改变state值的setState（理论上）和无数据交换的父组件的重渲染都会导致组件的重渲染，但你可以在shouldComponentUpdate这道两者必经的关口阻止这种浪费性能的行为。

#### PureComponent

React.PureComponent 的基础类可以对比props的差异。

#### immutable.js

使用immutable.js 的不可变数据

或者使用 ES6 中的 Map 或者 Set 代替 Array 和 Object（表示无实际意义的对象或者数组）。