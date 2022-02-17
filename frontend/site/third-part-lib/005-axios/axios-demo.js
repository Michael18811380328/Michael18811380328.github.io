import axios from axios;

axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
}).then(function (res) {
  console.log(res);
}).catch(function (error) {
  console.log(error);
});

// 使用方法一：单一类型请求
// eg1: get
axios.get('/user?ID=12345').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

// eg2 post
axios.post('/user', {
  name: name,
  email: email
}).then((res) => {
  console.lgo(res);
}).catch((err) => {
  console.log(err);
});

// 常见的几种请求方式可以直接调用，或者使用配置方法（4行）进行请求。常见的 get post delete put 对应数据库的操作。

// 使用方法2：some requests 处理多个并发请求
getUserAccount = (userID) => {
  return axios.get(siteRoot + 'user/' + userID + '/');
}

getUserAvatar = (userID) => {
  return axios.get(siteRoot + 'user/avatar/' + userID + '/');
}

axios.all([getUserAccount(10), getUserAvatar(10)]).then(axios.spread(function (acct, perms) {
  console.log(acct, perms);
  // 两个请求都执行完成
}));

// axios.all([]) 处理并发请求，内部是一个请求的数组
// axios.spread(callback) 处理并且噶请求的回调函数

// 使用方法3：创建自定义的请求实例
var instance = axios.create({
  // 内部的配置
  url: '/users', // 用于请求的服务器
  method: 'get', // default method get
  baseURL: 'http://163.com/api2.1/', // 自动加在URL的前面，为这个实例传递相对 URL
  timeout: 1000, // 超时毫秒数，如果请求时间大于1s，那么请求将会中断
  header: {'X-Trquested-With': 'XMLHttpRequest'} ,// 自定义请求头
  data: {name: 'Mike'}, // 只适应于 put post patch 方法
  withCredentials: false, // 跨域请求是否需要凭证
  repsonseType: 'json', // 服务器相应的数据类型（arrayBuffer blob json text等， 默认是json类型）
  xsrfCookieName: 'XSRF-TOKEN', // 作为xsrf token的名称
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mike',
      password: 'test123'
    }
  }
  // 这是代理服务器的信息
});

// axios 的实例具有上面发送的常见的四种方法

// 使用类型4 处理服务器响应
axios.get('/user/12345').then((res) => {
  console.log(res);
  // data 请求数据
  // status HTTP 状态码
  // statusText 状态信息 “OK”
  // headers 服务器响应头
  // config 请求的配置信息
});
