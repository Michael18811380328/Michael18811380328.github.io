# 25-基于NodeJS打造Web架构中间层

## 中间层与中间件

这两个概念完全不一样

### 中间层

在传统的BS架构中（vrowser+server），中间增加一个层（Middle），来处理信息传递转发（类似于传纸条的例子）。官方解释：Middle Tier 应用程序服务器层或者应用服务层，是用户接口或者Web客户端与数据库之间的逻辑层。

传统的架构是：BS，浏览器和服务器直接通信。加入中间层后，是BMS架构，浏览器和服务器的请求需要经过中间层。

### 中间件

中间层是一个web框架的逻辑层，中间件是一个函数或者插件（业务用途）。官方解释：MiddleWare 是一个对用户请求进行过滤和预处理的函数，一般不会对客户端进行相应，而是把处理后的结果传递下去。

Express是一个自身功能极简，完全由路由和中间件构成的一个web开发框架。express应用就是在调用各种中间件。express = 自身功能极简+路由+中间件。中间件类似于插件，可以扩展功能，是实现某种功能的函数。封装了一些复杂但是通用的功能，可以通过npm-yarn进行安装。

## 中间层的意义

1、大前端：传统的后端提供不同接口，现在后端提供不同服务（商品网站，提供商品服务，购物车服务，支付服务，仓储服务），此时需要中间层将不同的服务转换成前端使用的接口（后端专注于服务器数据库）。Docker 出现使得后端各种服务分离。所以前端变成了大前端。

2、安全方面：避免了服务器直接暴露在用户前（用户不知道真实的IP）在中间层中使用 pm2 + nginx 反向代理进程守护，基本安全。

3、性能问题：传统的单页应用中全部需要在初始化阶段请求JS，网络问题可能造成延迟，加入中间层后，中间层和后端在同一个服务器运行，请求速度加快，避免了首屏白屏和闪动。

4、开发效率问题：中间层可以使用NodeJS或者PHP等实现。如果使用NodeJS实现中间层，那么和前端的很多方法可以共用（避免进行两次表单验证）。NodeJS使用单进程单线程，可以使用其他异步技术模拟多线程提高开发效率问题。

## 中间层的实现

例子使用 Koa 框架

~~~bash
yarn init -y
yarn add -D koa koa-router koa-body-parserer koa-ejs
nodemon app.js
~~~

模拟一个登陆界面，后端使用PHP实现

~~~php
<?php
	require_once 'inc/conn.php';
	$db = new DB();
	$status = array();
	if (empty($_POST['username'])) {
    $status['code'] = 3;
    echo json_encode($status);
    exit;
  }
	$username = $_POST['username'];
	$password = md5($_POST['password']);
	$sql = "SELECT user, password FROM admin WHERE user = '$username' AND password = '$password'";
	$db->query($sql);
	$conn = $db->conn();
	if ($conn->affected_rows >= 1) {
    $status['code'] = 1;
  } else {
    $status['code'] = 0;
  }
	echo json_encode($status);
	$db->close();
?>
~~~

app.js 中间层

~~~js
const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const ejs = require('koa-ejs');
const body = require('koa-bodyparserer');
// 路由+模板引擎+解析数据
// 处理静态资源
const static = require('koa-static');

const app = new Koa();

ejs(app, {
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

const router = new Router();
app.use(body());

router.get("/", ctx => {
  ctx.body = 'main page';
});

router.use('/admin', require('./router/admin'));
app.use(static('./static'));
app.use(router.routes());
app.listen(3000);
~~~

Admin.js

~~~js
const Router = require('koa-router');
const router = new Router();
router.get('/', async ctx => {
  await ctx.render('admin/admin');
});

router.post('/login', ctx => {
  const { username, password } = ctx.request.body;
  // 中间件中，通过axios把数据发给后端服务器
  const { data } = await axios({
    url: 'http://localhost/login/check.php',
    method: 'post',
    data: {
      username,
      password
    },
    // 需要把JSON转换成查询字符串（a=1&b=2）
    transformRequest: [
      data => {
        return querystring.stringify(data)
      }
    ],
  });
  
  if (data.code !== 1) {
    return ctx.body = {
      code: 401,
      message: 'not allowed'
    }
  }
  ctx.body = {
    code: 200,
    message: 'check success'
  };
});

module.exports = router.routes();
~~~

admin.ejs

~~~ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="./js/jquery.min.js"></script>
</head>
<body>
  <p>
    用户名：<input type="text"/>
  </p>
  <p>
    密码：<input type="password" name="password"/>
  </p>
  <button type="submit">提交</button>
  <script>
  	$(function() {
      $('button').click(function() {
        var username = $(':text').val();
        var password = $('password').val();
        $.ajax({
          url: '/admin/login',
          method: 'post',
          data: {
            username,
            password
          },
          success(data) {
            console.log(data);
          }
        });
      });
    });
  </script>
</body>
</html>
~~~

现在 dtable-server 就相当于中间件，基于express框架，把这部分的代码写三次。

Query.js

~~~js
const querystring = require('querystring');
const str = 'username=admin&password=123456';
const obj = {
  'username': 'admin',
  'password': '123456';
}

console.log(quertstring.parse(str));
console.log(querystring.stringify(obj));
~~~
