# Django

### 1 Django 介绍  

参考网站：http://www.runoob.com/django/django-install.html

需要基本的Python知识。Django是一个python框架。Django采用了MVC的软件设计模式，即模型M，视图V和控制器C。不同的python版本对应的不同的Django，目前电脑上安装的是python2.7.10的版本，所以安装的Django需要匹配。

### 2 Django 安装

在mac下面安装：

~~~bash
# 在官网下载gz压缩包，并解压
tar zxvf Django-1.x.y.tar.gz
# 或者直接在github上下载包
git clone https://github.com/django/django.git

# 进入文件夹，进行安装
cd Django-1.x.y
sudo python setup.py install

#界面提示当前版本最新，python早期版本，所以需要执行命令安装早期的Django版本
# 这一步直接按照提示操作

# 进入项目文件路径中，创建基本的框架
django-admin.py startproject testdj

#进入创建的文件夹中，运行服务器，执行测试脚本
cd testdj
$ python manage.py runserver

Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.

在电脑上访问8000端口(这个端口没有被其他程序占用)
如果界面中出现本文件夹中的截图，就说明运行正确。
~~~



### 3 Django 创建项目


教程是python3.6.0 Django 2.1.7 实际上版本是python 2.7.10 

Django 直接可以通过命令创建项目

~~~bash
django-admin
# 获取命令

Available subcommands:

[django]
    check
    compilemessages
    createcachetable
    dbshell
    diffsettings
    dumpdata
    flush
    inspectdb
    loaddata
    makemessages
    makemigrations
    migrate
    runserver
    sendtestemail
    shell
    showmigrations
    sqlflush
    sqlmigrate
    sqlsequencereset
    squashmigrations
    startapp
    startproject
    test
    testserver
~~~

#### 创建项目

对应 01-test 文件夹

~~~bash
django-admin startproject HelloWorld

$ cd HelloWorld/
$ tree
# 首先需要在mac上面安装 tree (显示文件树)
brew install tree

|-- HelloWorld
|   |-- __init__.py
|   |-- settings.py
|   |-- urls.py
|   `-- wsgi.py
`-- manage.py

python manage.py runserver 0.0.0.0:8000

然后再浏览器中输入 127.0.0.1：8000 即可访问
~~~

文件说明：

- **HelloWorld:** 项目的容器。
- **manage.py:** 一个实用的命令行工具，可让你以各种方式与该 Django 项目进行交互（把命令写在这个文件内部，例如运行 python manage.py runserver）。
- **HelloWorld/__init__.py:** 一个空文件，告诉 Python 该目录是一个 Python 包。
- **HelloWorld/settings.py:** 该 Django 项目的设置/配置。
- **HelloWorld/urls.py:** 该 Django 项目的 URL 声明; 一份由 Django 驱动的网站"目录"。
- **HelloWorld/wsgi.py:** 一个 WSGI 兼容的 Web 服务器的入口，以便运行你的项目。

#### 配置 view 和 URL 

简单说，就是把一个视图层绑定到对应的域名上。就是将 view.py 绑定到 urls.py.

~~~python
# view.py
from django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello world ! ")
~~~

~~~python
# urls.py
# 把默认的代码改成下面的代码
from django.conf.urls import url
from . import view
 
urlpatterns = [
    url(r'^$', view.hello),
]
~~~

如果服务器在启动状态，改动代码后，项目会自动编译出来，不需要手动刷新。

配置URL需要使用Path函数

#### path() 函数

Django path() 可以接收四个参数，分别是两个必选参数：route、view 和两个可选参数：kwargs、name。

语法格式：

```python
path(route, view, kwargs=None, name=None)
```

- route: 字符串，表示 URL 规则，与之匹配的 URL 会执行对应的第二个参数 view。
- view: 用于执行与正则表达式匹配的 URL 请求。
- kwargs: 视图使用的字典类型的参数。
- name: 用来反向获取 URL。

Django2. 0中可以使用 re_path() 方法来兼容 1.x 版本中的 **url()** 方法，一些正则表达式的规则也可以通过 re_path() 来实现 。

```python
from django.urls import include, re_path

urlpatterns = [
    re_path(r'^index/$', views.index, name='index'),
    re_path(r'^bio/(?P<username>\w+)/$', views.bio, name='bio'),
    re_path(r'^weblog/', include('blog.urls')),
    ...
]
```

### 4 Django 模板

对应 02-demo 文件夹

#### 预设项目

~~~bash

django-admin startproject HelloWorld

cd HelloWorld

python manage.py runserver 

# 如果正常显示，点击浏览器 127.0.0.1:8000 显示欢迎界面

~~~

#### Django 模板开始

在 02-demo 下新建 Template 文件夹，文件夹下 新建 hello.html 文件。写入一部分HTML代码。

修改 helloworld/setting.py 中 template-dirs

os.path.join(BASE_DIR+"/templates")

测试当前的 BASE_DIR 是否正确（print）此时界面中会出现 hello.html 中的内容。

~~~python

from django.shortcuts import render
 
def hello(request):
  # 创建一个空字典（对象）
  context = {}
  context['hello'] = 'Hello World!' # 设置字典的某一项是字符串
  return render(request, 'hello.html', context) 
  # 使用这个字典去替换html中的参数

~~~

#### 模板标签

~~~html

{% if condition1 %}
    ...
{% elif condition2 %}
    ...
{% else %}
    ...
{% endif %}


<ul>
{% for comment in comments_list %}
    <li>{% comment.content %}</li>
{% endfor %}
</ul>

{% for comment in comments_list %}
    <h1>{{ comment.title }}</h1>
    <ul>
    {% for quota in comment.quotas %}
        <li>{{ quota }}</li>
    {% endfor %}
    </ul>
{% endfor %}

{# 如果变量section等于’demo‘，返回一个大写的’DEMO‘, 否则直接输出这个变量section #}

{% ifequal section 'demo' %}
    <h1>DEMO</h1>
{% else %}
    <h1>section</h1>
{% endifequal %}

{% include 'base.html' %}

模板继承，hello.html 继承于 base.html 模板

~~~

#### 过滤器

{{ name|lower }}
{{ comment|length }}
{{ my_list|first|upper }}

将名字转化成小写，将评论的长度计算出来，将my_list的第一个元素转化成大写。管道符——过滤器。


#### 模板继承

新建 base.html文件；
~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <h1>Test inherit</h1>
  <p>菜鸟教程 Django 测试。</p>
  {# 这部分可以作为模板，其他文件可以替换 block #}
  {% block mainbody %}
    <p>original</p>
  {% endblock %}
</body>
</html>
~~~

在 hello.html 中引入 base 模板

~~~html
{%extends base.html%}
{# 这是继承的父类 #}

{% block mainbody %}
<p>这里是子类向父类传递的值 props 实参</p>
{% endblock %}
~~~

注意：文件夹和文件名大小写名字。（base.html bash.html）


### 5 Django 模型

