# Flask 课程大纲

知乎项目需求：可以用户注册、用户登录、搜索日志、发布日志（增删改查）、增加评论

## 第0章 安装环境

#### 安装 python

py2.7(mac自带python2.7）直接在控制台输入 python；Windows 需要配置环境变量（python pip easy-install 设置环境变量）这里需要设置 python 的环境变量和 pip 的环境变量

打开计算机-属性-高级属性-设置环境变量-增加环境变量

名称是 PATH 属性是文件路径 C:/Python27;C:/Python27/Scripts

设置环境变量后，在cmd中可以看到python和pip的版本号

#### 安装虚拟环境 virtualenv

所以需要python虚拟环境。不同的虚拟环境中安装不同的falsk的版本和库，两个版本会共存。虚拟环境会避免版本冲突。

安装虚拟环境

~~~bash
sudo pip install virtualenv
mkdir Test cd test
virtualenv flask-env
~~~

Windows激活虚拟环境

~~~bash
cd falsk-dev/scripts
activate
deactivate # 退出
~~~

Mac 激活虚拟环境

~~~bash
source ~/Virtualenv/flask-env/bin/activate
# source path/bin/activate
deactivate # 退出
~~~

#### 安装flask

falsk 版本兼容问题：教程是0.12.2 现在安装的是 1.1.1 版本；可能部分代码不兼容

~~~bash
source ~/Virtualenv/flask-env/bin/activate
pip install flask
python
import flask
print flask.__version__
# 1.1.1
~~~

现在虚拟环境和flask已经配置完毕（windows环境下）

## 第一章 URLs 和视图

### 第一课 hello flask

1. 第一次创建项目的时候，需要添加虚拟环境（在pycharm）选择虚拟环境中的python执行文件
2. flask 代码基本结构解释

~~~python
#coding=utf-8
# python 2需要设置语言utf-8

# 从Flask框架中导入这个类
from flask import Flask

# 初始化对象，需要传参
app = Flask(__name__)

# 装饰器 @开头，位于函数的上面
# 是URL视图函数的映射
# 127.0.0.1:5000 会映射到下面的函数
@app.route('/')
def hello_world():
    return 'Hello Michael An!'

@app.route('/index')
def index_page():
    return 'Hello Index Page'

# 入口程序：启动一个应用程序，接受用户的请求（eventlistener）
if __name__ == '__main__':
    app.run()

~~~

### 第二课 debug 

app.run(debug=True) 可以打开调试模式
可以项目热加载（修改python文件才行，JS文件修改后不会热加载）；可以出现问题后在页面中看到报错详情

### 外部配置文件

新建配置文件 config.py，加入大写的参数
~~~python
DEBUG = True
# SECRET_KEY
~~~
在主文件中引入配置文件，使用配置
main.py
~~~python
import config
app.config.from_object(config)
~~~

### 第3课 URL 传参

可以在URL中传参

~~~python
@app.route('/page/<number>')
def change_page(number):
	return 'change page to %s' % number
~~~
参数需要放在尖括号中，视图函数中参数和原始参数相同。

### 第4课 URL反转

可以在一个视图函数中，传入其他视图函数，返回对应的URL
使用 url_for 内置函数

用途：页面重定向；HTML中A链接

~~~python
from flask import Flask, url_for
import config
app = Flask(__name__)
app.config.from_object(config)

@app.route('/')
def hello_world():
    print url_for('handle_index')
    print url_for('change_page', number = 20)
    return 'Hello World!'

@app.route('/index')
def handle_index():
    return 'index page'

@app.route('/page/<number>')
def change_page(number):
    return 'this is %s' % number

if __name__ == '__main__':
    app.run()

~~~

注意：运行flask后，需要点击左下角的关闭按钮，才能关闭当前的本地服务器。否则关闭软件后，本地服务器还在运行，可能影响其他的本地服务器。


### 第5课 页面重定向和跳转

实际使用:用户未登录时，跳转（重定向）到登录界面

~~~python
#coding=utf-8
from flask import Flask, redirect, url_for
app = Flask(__name__)

@app.route('/')
def hello_world():
    return redirect(url_for('login'))
    # return redirect('/login/')
    # return 'Hello World!'
    # 如果是固定的URL，那么视图函数中的路径更改后，重定向会错误
    # 使用url_for动态获取视图函数的跳转位置

@app.route('/login/')
def login():
    return 'This is login page, please login'

# we can use cookie to check user login state in the future
@app.route('/question/<id>')
def question(id):
    if id == '1':
        return 'Your question is 1, This is question page'
    else:
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)

~~~


## 第二章 Jinja2模板

### 第一课 模板渲染和传参

模板放在 templates 路径下

导入模板：render_template 函数；注意：不需要写templates文件夹的路径，直接写入口文件

模板传参：render_template 函数中第二个参数进行传参；在模板中使用变量需要 {{ 参数 }}

### 第二课 模板中访问属性和字典

访问模型中的属性或者字典。使用点语法或者中括号可以获取值

### 第三课 条件语句

~~~jinja2
{% if user %}
	<p>{{ user.name }}</p>
	<p>注销</p>
{% else %}
	<p>登录</p>
	<p>注册</p>
{% endif %}
~~~

and or not 逻辑操作

### 第四课 循环语句

#### 遍历字典

python 中遍历字典和 JS 不同

~~~python
user = {
    'name': 'Mike',
    'age': 18
}
for k, v in user.items():
    print k
    print v
~~~

Jinja2 模板中的使用

其他的遍历和python一样， 使用 items() keys() values() iteritems() itrtkeys() itervalues() 迭代器遍历

~~~jinja2
<dl>
<% for key, value, in my_dict.iteritems() %>
<dt>{{ key|e }}</dt>
<dd>{{ value|e }}</dd>
<% endfor %>
</dl>
~~~

#### 遍历列表

没有值的情况

~~~jinja2
<ul>
{% for user in users %}
<li>{{ user.name }}</li>
{% else %}
<li>no users found</li>
{% endfor %}
</ul>
~~~

小案例：四大名著的渲染

### 第五课 过滤器

过滤器介绍和语法：过滤器处理原始变量。

default 过滤器：如果第一个参数不传参，那么通过管道符判断，使用默认的值。作用的对象是变量。

~~~jinja2
{{ avatar|default(默认的参数) }}
~~~

length过滤器：获取当前的列表的长度并显示（字符串的长度，元组字典的键的长度）

~~~jinja2
{{ comments|length }}
~~~

其他遍历器： abs default escape format 

length 获取参数的长度

last first 获取列表中的第一个值或者最后一个值

join(value, d) 将一个序列使用分隔符拼接成字符串

safe 如果开启全局转义字符，safe 会关闭转义

int float 将值转换成整形或者浮点型数据

lower upper 字符串大小写转换

replace(value, old, new)字符串替代

truncate(value, length, killwords=False)截取某个长度的字符串 

striptags(value)删除字符串中的全部HTML标签，如果有多个连续空格，使用一个空格取代

trim 删除字符串前后的空白字符串 

string 将变量转换成字符串

wordcount(string) 计算一个长字符串中单词的个数

### 第六课 模板继承和block实现

python 的继承：

~~~python
class Person(object):
    name = ''
    age = 0

class Student(Person):
    pass
  
class Teacher(Person):
  def hello():
    print "hello"
~~~

jinja2 继承，自模板继承父模板
~~~jinja2
{% extends 'base.html' %}

{% block title %}
这个是界面标题
{% endblock %}

{% block main %}
<h1>这是子界面</h1>
{% endblock %}

{% block header-style %}
<style></style>
这里是子模板中使用的样式
{% endblock %}
~~~

### 第七课 URL链接和加载静态文件

~~~jinja2
<a href="{{ url_for('login') }}"></a>
~~~

使用URL_for 获取对应视图函数的URL，A标签可以直接跳转到对应页面

加载静态文件 Url_for('static', 'filepath')

## 第三章 SQLAlchemy 数据库

### 第一节 安装MYSQL

Mac 安装 MYSQL 数据库：下载后并安装，需要在控制台初始化并输入密码： ` mysqladmin -uroot password [password] `

Windows 安装时，需要根据提示安装 MicroSoft C++, .net Framework 开发库，在安装对话框中输入初始密码。

详细安装情况参考 database-mysql 安装文件

### 第二节 安装 mysql-python 中间件

MAC 安装： 现在无法安装，始终无法安装（尝试使用python3内置的sqlite数据库）现在解析器是2.7.10，python3 可以直接使用，所以现在尝试使用内置sqlite

参考链接

https://blog.csdn.net/eri_feng/article/details/81224106

https://www.jianshu.com/p/da9dd5dd4bd2

~~~bash
source ~/Virtualenv/flask-env/bin/activate
pip install mysql-python
~~~

Windows 需要注意：直接安装 pip install mysql-python 不成功，需要下载对应的 whl 文件，本地安装 pip install ...

### 第三节 flask-sqlalchemy 第三方库

Flask-sqlalchemy 是一个ORM的框架（模型关系映射，Object  relationship mapping）把数据库中的一个表当做python中的一个类，增加记录就是新建一个类的实例，删除更新数据也可以完成。

假设我们的表结构：

| id(int) | name(string) | comment(text) |
| ------- | ------------ | ------------- |
| 001     | Mike         | This is text. |

我们可以创建对应的类，表示这个表。

~~~python
class Comment(Modal):
  id = Int()
  name = String()
  comment = Text()

comment1 = Comment(id = '001', name = 'Mike', comment = 'This is text')

# 完成数据库的增删改查
add(comment1)
delete(comment1)
comment1.name = 'John'
update(comment1)
~~~

我们操作数据库就类似操作对象，很方便；这是一个数据库的映射

在虚拟环境中安装这个库即可使用：pip install falsk-sqlachemy

### 第四节 flask-sqlalchemy 连接数据库

首先需要配置文件（连接数据库）

~~~python
# dialect+driver://username:password@host:port/database
# dialect 表示数据库 mysql
# driver 表示数据库驱动（中间件）
# host:port 表示数据库的地址（本地就是host）
# database 表示数据库的名称
~~~



## 第四章 session 和 cookie 操作







## 第五章 网络知识点补充







## 第六章 项目实战





