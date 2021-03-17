# JS缓存数据

## 前言

一个页面的http请求次数能少点就少，这样大大提高用户体验。所以再一个页面发起一个请求，把所有数据都拿到后储存在缓存里面，你想用的时候再调用出来，这个是非常好的一个做法。

## 正文
这个技术主要使用到localStorage
一个页面的http请求次数能少点就少，这样大大提高用户体验。所以在一个页面发起一个请求，把所有数据都拿到后储存在缓存里面，你想用的时候再调用出来，这个是非常好的一个做法。
步骤如下：

这里考虑了 value 是字符串还是对象的情况

```js
//定义全局变量函数
var uzStorage = function () {
  var ls = window.localStorage;
  return ls;
};

//定义全局变量u
var u = {};

//设置缓存
u.setStorage = function (key, value) {
  var v = value;
  if (typeof v == 'object') {
    v = JSON.stringify(v);
    v = 'obj-' + v;
  } else {
    v = 'str-' + v;
  }
  var ls = uzStorage();
  if (ls) {
  ls.setItem(key, v);
  }
};

//获取缓存
u.getStorage = function (key) {
  var ls = uzStorage();
  if (ls) {
    var v = ls.getItem(key);
    if (!v) {
      return;
    }
    if (v.indexOf('obj-') === 0) {
      v = v.slice(4);
      return JSON.parse(v);
    } else if (v.indexOf('str-') === 0) {
      return v.slice(4);
    }
  }
};
```
