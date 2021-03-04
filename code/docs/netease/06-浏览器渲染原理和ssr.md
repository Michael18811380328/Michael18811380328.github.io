# 06-点亮全栈技能，轻松掌握SSR

### 渲染原理简介

HTML 代码通过浏览器渲染成 DOM树（DOM tree）根节点是 document 对象，由不同的 tag 组成。

CSS 代码会根据规则，渲染成呈现树（render tree）把不显示节点去掉（display：none）呈现树绘制页面内容。

回流（reflow）和 repaint（重绘）：改动display属性会实现reflow，元素不会保留在原来的位置，改动 visibility， opacity，元素还保留在原来的位置，界面不会reflow）。回流（reflow，尺寸布局隐藏变化，造成界面重新构建）必将引起重绘(repaint，颜色透明度变化)，重绘不一定引起回流。repaint 的性能开支更小。

### 什么是SSR

前后端分离，造成了服务器端渲染（SSR）和浏览器端渲染（CSR），区别是哪一部分完成HTML的完整拼接（早期 JSP PHP ，就是服务器端完成HTML的拼接）。

SSR：server side render: 在服务器端，把组件（JS部分）渲染成HTML字符串，然后发送到浏览器

好处：可以减少客户端ajax的请求；首次渲染速度快（首页白屏）。SSR 一般服务器配置较高，不用担心这部分（首页使用SSR，其他的使用CSR，前后端分离）有利于SEO。不谈业务场景，盲目使用某种技术是不正确的！首先有理论基础+选择合适的技术栈。是否使用SSR根据业务场景。

React 使用 next 库实现 SSR，VUE 使用 NUXT 库实现 SSR。

### 视图和模板（EJS 和 PUG）

我们可以通过模板实现SSR，主要有两种方式EJS 和 PUG（后端Koa服务）

首先写一个客户端渲染的例子（JS+PHP）

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="./jquery.min.js"></script>
</head>
<body>
  <h1></h1>
  <input type="text" name="username"/><br/>
  <input type="password" name="password"/><br/>
  <button>Submit</button>
  <script>
  	$(fucntion() {
    	$('button').click(function() {
      	// 实际上是一个Promise对象，所以可以调用then方法
      	$.ajax({
          type: 'post',
          url: 'http:localhost/login/check.php',
          data: {
            username: $(':text').val(),
            password: $(':password').val()
          },
          dataType: 'json'
        }).then(function(res) {
          // console.log(123);
          // 这部分界面效果是浏览器通过JS产生修改的，所以是CSR模式
          if (res.code === 200) {
            $('h1').html('登录成功')
          } else {
            $('h1').html('用户名或者密码错误')
          }
        }, function(error) {
          // console.log('error')
          $('h1').html('网络错误，请求失败');
        });
      })
    })
  </script>
</body>
</html>
~~~

Check.php 用户登录验证

~~~php
<?php
  require_once 'inc/conn.php';
	$db = new DB();
	$status = array();
	if (empty($_POST['username'])) {
    $status['code'] = 400;
    echo json_encode($status);
    exit;
  }
	$username = $_POST['username'];
	$password = md5($_POST['password']);
	$sql = "SELECT user, password FROM admin WHERE user = '$username' AND password = '$password'";
	$db->query($sql);
	$conn = $db->conn();
	if ($conn->affected_rows >= 1) {
		$status['code'] = 200;
	} else {
		$status['code'] = 404;
	}
	echo json_encode($status);
	$db->close();
?>
~~~

#### PUG

模板和python类似，使用缩进完成HTML渲染，属于侵入式框架

下面是一个浏览器渲染的例子（VUE）

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="./node_modules/vue/dist/vue.js"></script>
</head>
<body>
  <div id="app">{{ str }}</div>
  <script>
  	const vm = new Vue({
      el: '#app',
      data: {
        str: '这是CSR模式，源代码不会显示渲染后的HTML'
      }
    })
  </script>
</body>
</html>
~~~

把这个例子改成SSR

app.js

~~~js
const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');

const app = new Koa();
app.use(views(path.resolve(__dirname, 'template'), {
  extension: 'pug'
}))

const router = new Router();

router.get('/', async ctx => {
  //ctx.body = 'main page';
  await ctx.render('index', {
    title: 'Michael An page',
    list: [
      {name: 'Mike', age: 20}
    ],
  })
});

app.use(router.routes());
app.listen(3000);
~~~

~~~bash
yarn add pug -D
nodemon app.js
~~~

index.pug

~~~pug
doctype
html
	head
		meta(charset='utf-8')
		title=title
		body
			div(class='div1')
				h1 hello world
			ul
				each item in list
					li(class='item')
						span=item.name
						span=item.age
			script alert('#{title}')
~~~

#### EJS

Ejs 是一个中间件 middleware，中间件是介于应用系统和系统软件之间的一类软件，它使用系统软件所提供的基础服务（功能），衔接网络上应用系统的各个部分或不同的应用，能够达到资源共享、功能共享的目的。

模板和HTML类似，类似于 ruby 或者 Django 的模板

首先 npm init 创建项目，并安装相关库（koa等）

~~~bash
yarn init -y
yarn add koa koa-router koa-ejs -S
~~~

app.js

~~~js
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const ejs = require('koa-ejs');

const app = new Koa();
ejs(app, {
  // 把相对路径转换成绝对路径
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false,
});

const router = new Router();
router.get('/', async (ctx) => {
  // ctx.body = '主页';
  await ctx.render('index', {
    title: 'Michael test ejs page',
    list: [
      {name: 'Mike', age: 20},
      {name: 'Judy', age: 30},
    ],
  });
});

app.use(router.routes());
app.listen(3000);
~~~

模板 /template/index.ejs 这个属于非侵入式框架

~~~ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{%=title%}</title>
</head>
<body>
  <ul>
    <%list.forEach((item) => {%>
    	<li>
        <span>{%=item.name%}{%=item.age%}</span>
    	</li>
    <%})%>
  </ul>
  <script>
    // 直接在JS部分使用参数
    window.onload = function() {
      alert('<%=title%>');
    }
  </script>
</body>
</html>
~~~

开启项目后打开浏览器 localhost:3000 即可显示

~~~bash
nodemon app.js
~~~

检查界面源代码，已经是服务器端渲染好的HTML内容

对比一下，如果使用VUE，那么界面的源代码就不是这样的

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="./node_modules/vue/dist/vue.js"></script>
</head>
<body>
  <div id="app">{{ str }}</div>
  <script>
  	const vm = new Vue({
      el: '#app',
      data: {
        str: '这是DSR模式，源代码不会显示渲染后的HTML'
      }
    })
  </script>
</body>
</html>
~~~

界面中直接打开HTML，查看源代码，就是DFS。

