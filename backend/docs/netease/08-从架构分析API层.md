# 08-从架构分析API层

## Axios 学习介绍

axios 如何实现多种请求方式（get-post）axios 如何请求拦截

## Axios 源码分析

我们通常的思路是给axios的原型上绑定很多方法，绑定方法很多不好维护

~~~js
function axios() {
  //
}
axios.prototype.post = function() {
  // 
}
axios.prototype.get = function() {
  //
}
~~~

官方的源码如下：

首先加入两个辅助函数

~~~js
function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

extend(
	{a: 1, fn: function(){}},
  {b: 2},
  this
);

// 初始化方式：最终暴露的是一个非常简单的类(类似于VUE)
// 然后模块合并（不同人负责不同的部分）

function axios(instanceofConfig) {
  this.default = instanceofConfig;
}

axios.prototype.request = function() {

}

function createInstance(defaultConfig) {
  let context = new axios(defaultConfig);
  let instance = bind(Axios.prototype.request, context);
  extend(instance, Axios.prototype, context);
  extend(instance, context);
  return instance;
}

utils.forEach(['get', 'post', 'delete', 'head', 'options'], function(methods) {
  Axios.prototype[methods] = function(url, config) {
    return this.request(utils.merge());
  }
})
~~~

VUE对外也是暴露一个非常简单的类
~~~js
function Vue(options) {
  if (!(this instanceof Vue)) {
    warn('error');
  }
  this._init();
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifestyleMixin(Vue);
renderMixin(Vue);
~~~

## 二次封装axios实例

myaxios.js

~~~js
// 最终暴露出去的是一个很简单的类，其他功能通过模块合并方式处理
function axios(instanceofConfig) {
  this.default = instanceofConfig;
  this.interceptors = {
    request: new interceptorsManner(),
    response: new interceptorsManner(),
  };
}
axios.prototype.request = function() {
  //
}
function createInstance(defaultConfig) {
  var context = new axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);
  // Axios.prototype.request.bind(context);
  extend(instance, Axios.prototype, context);
  extend(instance, context);
  return instance;
}
axios.get(url);
axios.post(url, {
  data: 123
});

// Axios 中如何实现多种请求？
// 根据传入的参数判断。如果是get只有一个参数，如果是post后面就有具体的数据
utils.forEach(['get', 'post', 'delete', 'options'], function(methods) {
  Axios.prototype[methods] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: methods,
      url: url
    }));
  }
});

function interceptorsManner() {
  this.handler = []; // 存放use加入的方法
}
interceptorsManner.prototype.use = function(fulfilled, rejected) {
  this.handler.push({
    fulfilled: fulfilled,
    rejected: rejected,
  });
}

// axios 如何实现请求拦截
axios.interceptors.request.use(config => {
  // return config;
  // dispatchRequest 是默认的发送请求，因为需要双数，后面加入undefined
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  // 把请求和相应分别加入到数组序列（chain）的前后，依次执行
  this.interceptors.request.handler.forEach((interceptor) => {
    chain.unshift(interceptor.fulfilled, interceptor.injected);
  });
  this.interceptors.response.handler.forEach((interceptor) => {
    chain.push(interceptor.fulfilled, interceptor.injected);
  });
  // 把数组变成promise和then回调函数形式
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  return promise;
});

//就是下面的链式Promise形式
new Promise(function() {
  resolve();
  return 1;
}).then(function(res) {
  resolve();
  return 2
}).then(function(res) {
  resolve();
  return 3
});

axios.interceptors.response.use(config => {
  return config;
});

拦截的步骤：
1、初始化 axios
2、调用 request 方法
3、请求拦截器
4、实际发出请求，返回响应
5、响应拦截器
~~~

这个课程需要很好的基础JS，看起来有点吃力（这才是提升）

## 大型项目api层

大型项目 API 复杂，专门设置一个api层（seafile-js）

可以管理前后拦截，统一封装API

实现：接口API化，请求自动绑定，放置重复提交

login.js

~~~js
export default {
  loginIn: '/api/loginIn',
  loginOut: '/api/loginOut',
};
~~~

server.js

~~~js
import axios from 'axios';
const server = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
});
// 设置拦截器
export default server;

axios.get('login/liginIn').then(function(res) {
  this.data.xxx = res.data;
});
qa.login.loginIn();
~~~

getrequest.js

~~~js
import server from './server.js';
import qs from 'qs';
// qs({a: 1, b:2}) => "?a=1&b=2"

function myserver() {
  this.server = server;
}

myserver.prototype.parseRouter = function(name, urlOb) {
  var ob = this[name] = {};
  // var ob = {}, this[name] = {};
  Object.keys(urlOb).forEach((item) => {
    ob[item] = this.sendMes.bind(this, name, item, urlOb[item]);
  });
}

myserver.prototype.sendMes = function(moduleName, name, url, config) {
  var config = config || {};
  var type = config.type || 'get';
  var data = config.data || {};
  var self = this;
  
  var before = function(mes) {
    cover();
    send();
    return mes;
  };
  var defaultFn = function(mes) {
    self.nowhandle[bindName] = mes.data;
  }
  var success = config.success || defaultFn;
  var callback = function(res) {
    success(res, defaultFn);
  };
  
  var state = {
    get: function() {
      var urlqs = url + '?' + qs.stringify(data);
      server.get(urlqs).then(before).then(callback);
    },
    post: function() {
      server.post(url, data).then(before).then(callback);
    },
  };
  // 处理同一个接口的多个请求（只有状态是ready才能发出下一个相同的请求）
  // 这个很重要，避免用户频繁点击发送请求，或者恶意点击增加服务器负载
  if (self[moduleName][name].state == 'ready') {
    self[moduleName][name].state = 'pending';
    state[type]();
  }
}

export default new myserver;
~~~

main.js

~~~js
import Vue from 'vue';
import App from './App';
import router from './router';
import qa from './api';
Vue.prototype.qa = qa;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
~~~
