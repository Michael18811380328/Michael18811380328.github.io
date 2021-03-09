# 03-nodeJS 中 Restful 架构实现

## 1、什么是 restful

Restful：表述性状态转移（框架的原则和约束条件）主要用于客户端和服务器交互类的软件。基于这个风格设计的软件会更简洁，更有层次，实现缓存机制。这是一种URL的设计风格（路由风格）。

Restful：通俗的说，用什么样的方式写路由。常见的URL风格：静态 news/ids/1 利于SEO优化；动态 news?id=1 不利于SEO（后面的查询参数）原来是通过HTTP请求的内容判断具体的业务逻辑（增删改查）restful通过HTTP请求的类型（get post delete）判断业务逻辑。同一个资源使用同一个URL，具体操作根据请求的方法实现。

传统的URL http://127.0.0.1:user/delete/id 这样的URL中含有增删改查字样描述性的URL，和 HTTP 设计理念不符合。因为 HTTP 请求接口或者地址的时候完全没有必要去描述（HTTP本身没有语义）。

restful：面向资源（user）对于同一个资源，都在一个URL下操作，根据判断HTTP的请求的类型决定做不同的事情。HTTP 不同的请求类型（GET POST PUT DELETE）对应不同的数据库操作（增删改查）。

Node顶层路由：一个路由不一定对应一个界面（一个Html文件）http处理函数（路由风格）架构和业务层已经脱离关系了，架构是通用的解决方案。

## 2、原生实现 Restful

原生NodeJS实现服务

原生实现 Restful

~~~bash
npm install -D mysql body-parser
npm install co-mysql md5-node
~~~

Index.js

~~~js
const http = require('http');
const mysql = require('mysql');
const co = require('co-mysql');
const md5 = require('md5-node');

let db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user',
});
let conn = co(db);

// 同一个URL下实现不同的操作
const app = http.createServer((req, res) => {
  if (req.method === "POST") {
    if (req.url === './user') {
      // res.end(JSON.stringify({
      //   message: 'POST操作',
      //   status: 200
      // }))
      let arr = [];
      req.on('data', (data) => {
        arr.push(data);
      })
      req.on('end', async () => {
        let buffer = Buffer.concat(arr);
        let { username, password } = JSON.parse(buffer.toString());
        let data = await conn.query(`select user from admin where user = '${username}'`);
        console.log(data);
        // 如果从数据库中检索到，返回已经注册
        if (data.length >= 1) {
          res.end(JSON.stringify({
            "statue": 200,
            "message": "用户名已经注册"
          }));
        } else {
          // 如果从数据库中没有检索到，直接写入数据库
          password = md5(password);
          let sql = `insert into admin (user,password) values ('${username}', '${password}')`;
          await conn.query(sql);
          res.end(JSON.stringify({
            'status': 200,
            'message': '注册成功'
          }));
        }
      });
    }
  } else if (req.method === "GET") {
    if (req.url === './user') {
      // res.end(JSON.stringify({
      //   message: 'GET操作',
      //   status: 200
      // }))
      let sql = 'select id, user, password from admin';
      let data = await conn.query(sql);
      res.end(JSON.stringify(data));
    }
  }
}).listen(3000);
~~~

REST client 配置 .http

~~~.http
@url = http://localhost:3000
@type = Content-Type: application/json

GET {{url}}/user HTTP/1.1

POST {{url}}/user HTTP/1.1
{{type}}

{
	"username": "admin",
	"password": 123456
}
~~~



## 3、框架实现 RestFul

express实现服务：改写了异步请求和回调函数，使用 generator 实现异步操作

#### Demo 01 Express 实现

使用 NodeJS 的 express 创建一个案例

~~~bash
npm init
npm install -D express
touch app.js
nodemon app.js
# nodemon 是自动更新的node（类似于热启动）
~~~

app.js

~~~js
const express = require('express');
const app = express();

app.get('/user', (req, res) => {
  res.send('test page');
});

app.listen(3000);
~~~

URL 定位资源，HTTP描述操作

顶层路由设计：不需要有物理文件去映射路由



### Demo02

Express 实现 restful

~~~js
const express = require('express');
const http = require('http');
const mysql = require('mysql');
const co = require('co-mysql');
const md5 = require('md5-node');
const bodyparse = require('body-parser')

const app = express();

let db = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'root',
  database: 'test-user',
});

let conn = co(db);

app.use(bodyparse.urlencoded({
  extended: true
}));

app.use(bodyparse.json());

app.post('/user', async (req, res) => {
  let { user, password } = req.body;
  let data = await conn.query(`select user from admin where user = '${username}'`);
	if (data.length >= 1) {
    res.send(JSON.stringify({
      'status': 200,
      'message': '用户名已经注册'
    }))
  } else {
    password = md5(password);
    let sql = `insert into admin (user,password) values ('${username}','${password}')`;
    await conn.query(sql);
    res.end(JSON.stringify({
      'status': 200,
      'message': '注册成功'
    }));
  }
});

app.get('/user/:id', (req, res) => {
  res.send(req.params.id);
  // 到数据库中查询（sql）
});

app.listen(3000);
~~~

### demo03

koa 实现 restful

koa：async await 

config.js

~~~js
module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'user',
};
~~~

Databases.js

~~~js
const mysql = require('mysql');
const co = require('co-mysql');
const config = require('../config');

const { host, user, password, database } = config;
let db = mysql.createPool({
  host,
  user,
  password,
  database,
});

module.exports = co(db);
~~~

index.js

~~~js
const Router = require('koa-router');
const md5 = require('md5-node');
const router = new Router();

router.get('/user', async ctx => {
  ctx.body = 'main page';
});
~~~

app.js

~~~js
const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
app.context.db = require('./libs/databases');
app.context.config = config;

app.use(body());
router.user('/api', require('./router'));

app.use(router.routes());
app.listen(3000);
~~~
