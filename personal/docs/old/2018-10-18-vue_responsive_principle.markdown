---
layout:       post
title:        "Vue响应式原理"
subtitle:     "vue responsive principle"
date:         2018-10-18 22:05:00
author:       "ZeFeng"
header-img:   "img/vue-responsive-principle-logo.jpg"
header-mask:  0.3
catalog:      true
tags:
    - VUE响应式原理
---

## 前言
Vue最独特的，个人认为非侵入性的响应式系统莫属了。<br />
数据模型仅仅是普通的 JavaScript 对象，修改它们时，视图会进行更新，这样就使得状态管理非常简单直接。

## 正文

<b>追踪变化</b><br />
当我们把一个普通的 JavaScript 对象传给 Vue 实例的 data 选项的时候，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。<br />

| 方法 | 说明 | 备注 |
|-----|-----|------|
| Object.defineProperty | 允许精确添加或修改对象的属性  | nice |
| getter/setter | 对象的属性是由名字、值和一组特性（可写、可枚举、可配置等）构成的，属性值可以用一个或两个方法代替，这两个方法就是getter和setter | 默认情况下，使用 Object.defineProperty() 添加的属性值是不可修改的 |

这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。<br />
Tip: 浏览器控制台在打印数据对象时 getter/setter 的格式化并不同,需要安装 vue-devtools 来获取更加友好的检查接口。<br />

每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。<br />
<img src="https://00feng00.github.io/img/vue-responsive-principle.png">

<b>检测变化的注意事项</b><br />
受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 不能检测到对象属性的添加或删除。<br />
由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。<br />
例如：
```
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应的

vm.b = 2
// `vm.b` 是非响应的
```

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 (root-level reactive property)。<br />
但可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
```
Vue.set(vm.someObject, 'b', 2)
```
还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：
```
this.$set(this.someObject,'b',2)
```
向一个已有对象添加多个属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。<br />

但是，这样添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：<br />
```
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })

```
<b>声明响应式属性</b><br />
Vue 不允许动态添加根级响应式属性，所以必须在初始化实例前声明根级响应式属性，哪怕只是一个空值：

```
var vm = new Vue({
  data: {
    // 声明 message 为一个空值字符串
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// 之后设置 `message`
vm.message = 'Hello!'
```
如果未在 data 选项中声明 message，Vue 将警告你渲染函数正在试图访问的属性不存在。<br />

这样的限制在背后是有其技术原因的，它消除了在依赖项跟踪系统中的一类边界情况，也使 Vue 实例在类型检查系统的帮助下运行的更高效。<br />
而且在代码可维护性方面也有一点重要的考虑：<br />
data 对象就像组件状态的概要，提前声明所有的响应式属性，可以让组件代码在以后重新阅读或其他开发人员阅读时更易于被理解。<br />

<b>异步更新队列</b><br />
Vue 异步执行 DOM 更新,只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。<br />
如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。<br />
然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。<br />
Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。<br />

例如，当设置 vm.someData = 'new value' ，该组件不会立即重新渲染。<br />
当刷新队列时，组件会在事件循环队列清空时的下一个“tick”更新。多数情况我们不需要关心这个过程，但是如果想在 DOM 状态更新后做点什么，这就可能会有些棘手。虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。<br />
例如：<br />
```
<div id="example">{{message}}</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

在组件内使用 vm.$nextTick() 实例方法特别方便，因为它不需要全局 Vue ，并且回调函数中的 this 将自动绑定到当前的 Vue 实例上：<br />
```
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '没有更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '更新完成'
      console.log(this.$el.textContent) // => '没有更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '更新完成'
      })
    }
  }
})
```

因为 $nextTick() 返回一个 Promise 对象，所以可以使用新的 ES2016 async/await 语法完成相同的事情：
```
methods: {
  async updateMessage: function () {
    this.message = 'updated'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```
## 结语
非侵入性的响应式系统，响应式原理就介绍到这里。它是Vue最独特的特性之一。











