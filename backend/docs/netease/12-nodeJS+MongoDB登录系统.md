# 第12课 nodeJS+MongoDB登录系统

【课程主题】打通全栈，轻松实现NodeJS+MongoDB的登录系统

【课程大纲】
1、MongoDB的基本使用
2、NodeJS如何操作MongoDB
3、基于NodeJS与MongoDB的登录系统的实现

## NodeJS 基础

传统的前端：界面交互、JS 性能、用户体验

nodeJS 基本介绍：运行在后台（服务器）

三大框架：express、koa(async await) 解决异步的方式不同 egg 是企业级开发框架

## 数据库基础

数据库：数据持久化保存

数据库分类：关系型数据库和非关系型数据库

关系型数据库（关系模型，很多二维表格之间相互关联，主键外键）数据库-数据表-记录-字段，可以使用SQL语句操作（MYSQL）

~~~sql
select username, password from account where id = 1
~~~

非关系型数据库：Redis（存在内存中） MongoDB（存在硬盘中，映射到内存中） nosql（不仅仅是sql）基于键值对（key-value）不适合大型数据，数据库-数据表-文档

## MongoDB 基本操作

#### 下载安装

MongoDB 安装地址（windows）安装完成后，需要加入环境变量。在客户端中可以使用命令，即可操作数据库。MAC需要自己下载

https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2012plus-4.2.0-signed.msi

#### MongoDB 基本操作

详细参考下面的这个帖子 https://mp.weixin.qq.com/s/qN0eM8bZ_X-xX_g8Qhxbvw

就是当前路径下面的 12-辅助文档-nodejs-mongodb-mongoose.md

MongoDB 适合前端（对标阿里P6，适合2-3年的研发人员）

~~~mysql
# 传统的SQL语句
select username, password from account where id = 10;

# 进入
mongo

show dbs;

# 如果没有这个表，就新建这个表
use account;

db.account.insert({name: 'Mike'});
db.account.insert({name: 'Amy'});
db.account.insertOne({name: 'John', password: 666666});
db.account.insertMany([
  {name: 'Tom', age: 20},
  {name: 'Julia', age: 20},
]);

db.account.find();
# 如果find参数缺省，那么查询全部的数据
db.account.find({age: 20});
db.account.find({age: 30, name: "Tony"});
db.account.find({age: {$lt: 20}});
# 常用的比较符号
$lt === less than
$lte === less than and equal
$gt === greater than
$gte === greater than and equal
$ne === not equal

db.account.find({age: {$lt: 20}});

db.account.drop();
~~~

## 例子：登录系统

案例使用 nodeJS 的 KOA 框架

新建一个项目 package.json （npm init）

需要安装的依赖有：koa koa-router

~~~bash
npm init
# 核心框架
npm install koa -D
# koa路由服务
npm install koa-router -D
# Koa-bodyparser处理解析post请求
npm install koa-bodyparser -D
~~~

本地安装 nodemon 热启动、测试接口工具（postman）或者Visual Studio Code 的 REST Client 插件

package.json

~~~json
{
  "name": "demo-koa",
  "version": "1.0.0",
  "description": "This is koa demo",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Michael An",
  "license": "ISC",
  "devDependencies": {
    "koa": "",
    "koa-bodyparser": "",
    "koa-router": "",
    "mongoose": "",
  }
}
~~~



#### 文件夹路径

app.js 建立http服务

Models 操作数据库

routers 路由

Libs db.js 专门连接数据库moongoose 中间件 用于JS链接数据库

Middleware 中间件（如果出错了，服务器不能挂掉，所以使用中间件try-catch）koa 洋葱模型捕获错误（一层一层捕获）

#### 高级使用

bcrypt 密码密文传递（crypto）或者 Node-md5 加密 

JWT 单点登录

#### 项目代码

/app.js

~~~js
const Koa = require('koa');
const Router = require('koa-router');
const users = require('./routers/user');
// 处理POST请求
const body = require('koa-bodyparser');
// 处理请求错误
const error = require('./middleware/error');
const app = new Koa();
app.use(error);
app.use(body());

const router = new Router();

router.get('/', ctx => {
  ctx.body = '主页'
});

// 官方推荐这样写，丰富响应头
app.use(router.routes());
app.use(users.routes(), user.allowedMethods());
app.listen(3000, () => {
  console.log('listen http://localhost:3000');
});
~~~

/routers/user.js

~~~js
const Router = require('koa-router');
const router = new Router();
const { User } = require('../models/user');

router.prefix('/api/user');

router.get('/', ctx => {
  ctx.body = '用户主页'
});

// 查询用户
router.get('/index', async ctx => {
  ctx.body = await User.find();
});

// 注册
router.post('./register', async ctx => {
  const { username, password } = ctx.request.body;
  const user = await User.create({
    username,
    password
  });
});

// 登录
router.post('./login', async ctx => {
  // ctx.body = 'login page';
  const { username, password } = ctx.request.body;
  const user = await User.findOne({
    username,
    password
  });
  if (!user) {
    return ctx.body = {
      status: 400,
      message: 'User is not valid'
    }
  }
  if (user) {
    return ctx.body = {
      status: 200,
      message: 'login success'
    };
  }
})

module.exports = router;
~~~

/models/users

~~~js
const mongoose = require('../libs/db');
// 可选：加密
const md5 = require('node-md5');

// 指定默认规则
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    // set(val) {
    //  return md5(val);
    // }
  }
});

// 使用规则
const User = mongoose.model('User', UserSchema);

module.exports = { User };
~~~

/libs/db.js

~~~js
const mongoose = require('mongoose');

// 27017 是默认的端口号;下面是配置
mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5
});

module.exports = mongoose;
~~~

/middleware/error.js

~~~js
const error = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      message: 'server is error',
      error: error.message
    };
  }
}
~~~

运行 http 服务

~~~bash
nodemon app.js 
~~~

REST Client 

配置 .http

~~~
@url = http://localhost:3000/api
@type:Content-Type: application/json

POST {{url}}/user/register HTTP/1.1
{{type}}
{
	"username": "admin",
	"password": "654321"
}
~~~

