---
layout: post
title:  "React-Router"
date:   2019-04-08 17:59:11 +0800
categories: jekyll update
---

## React-Router

React-router 解决问题：UI与URL解耦

问题：原始同一个界面内部使用 a 进行跳转，不同界面中使用 # hash 跳转。如果在React框架下，对于SPA，需要获取界面的 hash 再判断界面中加载什么部分（setState），这样效率低下，UI 与 URL 不分离。

解决：首先使用 `<Link to={path}>` 作为超链接，点击后界面URL改变。React-touter 根据URL变化，不需要判断，直接根据 `<Router><Component to={path}>` 渲染部分内容，整体界面不会重新加载。

### Link

原始HTML界面中，不同界面间进行切换，界面需要重载。

使用Link组件后，URL会更新，界面不需要重载，React组件会被重新渲染。

Link 组件通过 to 属性设置界面的切换。实际上，Link渲染成 A 标签，to属性可以作为href。Link 组件最终会渲染为 HTML 标签 <a>，它的 to、query、hash 属性会被组合在一起并渲染为 href 属性。虽然 Link 被渲染为超链接，但在内部实现上使用脚本拦截了浏览器的默认行为，然后调用了history.pushState 方法。

To 通常可以使字符串或者对象
