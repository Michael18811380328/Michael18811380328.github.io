# django入门基础教程

https://www.jianshu.com/p/faeee7d5ad3b

Django是一个开放源代码的Web应用框架，由Python写成。采用了MVT的框架模式，即模型M，视图V和模版T。它最初是被开发来用于管理劳伦斯出版集团旗下的一些以新闻内容为主的网站的，即是CMS（内容管理系统）软件。并于2005年7月在BSD许可证下发布。这套框架是以比利时的吉普赛爵士吉他手Django Reinhardt来命名的。

# 框架介绍

Django 项目是一个Python定制框架，它源自一个在线新闻 Web 站点，于 2005 年以开源的形式被释放出来。Django 框架的核心组件有：

1. 用于创建模型的[对象关系映射](https://links.jianshu.com/go?to=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%E5%AF%B9%E8%B1%A1%E5%85%B3%E7%B3%BB%E6%98%A0%E5%B0%84)
2. 为最终用户设计的完美管理界面
3. 一流的 URL 设计
4. 设计者友好的模板语言
5. 缓存系统。

## 架构设计

Django是一个基于[MVC](https://links.jianshu.com/go?to=https%3A%2F%2Fbaike.baidu.com%2Fitem%2FMVC)构造的框架。但是在Django中，控制器接受用户输入的部分由框架自行处理，所以 Django 里更关注的是模型（Model）、模板(Template)和视图（Views），称为 MTV模式。它们各自的职责如下：

![img](https:////upload-images.jianshu.io/upload_images/12747273-30afb6956c6d4c5e.png?imageMogr2/auto-orient/strip|imageView2/2/w/594/format/webp)

image.png

从以上表述可以看出Django 视图不处理用户输入，而仅仅决定要展现哪些数据给用户，而Django 模板 仅仅决定如何展现Django视图指定的数据。或者说, Django将MVC中的视图进一步分解为 Django视图 和 Django模板两个部分，分别决定 “展现哪些数据” 和 “如何展现”，使得Django的模板可以根据需要随时替换，而不仅仅限制于内置的模板。
 至于MVC控制器部分，由Django框架的URLconf来实现。URLconf机制是使用正则表达式匹配URL，然后调用合适的Python函数。URLconf对于URL的规则没有任何限制，你完全可以设计成任意的URL风格，不管是传统的，RESTful的，或者是另类的。框架把控制层给封装了，无非与数据交互这层都是数据库表的读,写,删除,更新的操作。在写程序的时候，只要调用相应的方法就行了，感觉很方便。程序员把控制层东西交给Django自动完成了。 只需要编写非常少的代码完成很多的事情。所以，它比MVC框架考虑的问题要深一步，因为我们程序员大都在写控制层的程序。现在这个工作交给了框架，仅需写很少的调用代码，大大提高了工作效率

# 快速安装：

1. 安装Python

   作为一个 Python Web 框架，Django 需要 Python， Python 包含了一个名为 [SQLite](https://links.jianshu.com/go?to=https%3A%2F%2Fsqlite.org%2F) 的轻量级数据库，所以你暂时不必自行设置一个数据库。

   最新版本的 Python 可以通过访问 [https://www.python.org/downloads/](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.python.org%2Fdownloads%2F) 或者操作系统的包管理工具获取

\2.     设置数据库

此步骤仅在你打算使用诸如 PostgreSQL, MySQL, 或者 Oracle 这些大型数据库引擎时需要。要安装这种数据库, 请参考 [database installation information](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Finstall%2F%23database-installation)。

\3.     安装 Django



```undefined
pip install Django
```

或者



```php
git clone https://github.com/django/django.git
```

1. 验证



```python
>>> import django
>>> print(django.get_version())
2.2
```

# 编写你的第一个 Django 应用

## 需求：

它将由两部分组成：

- 一个让人们查看和投票的公共站点。
- 一个让你能添加、修改和删除投票的管理站点。

### 创建项目

打开命令行，cd 到一个你想放置你代码的目录，然后运行以下命令：



```undefined
django-admin startproject mysite
```

让我们看看 [`startproject`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fdjango-admin%2F%23django-admin-startproject) 创建了些什么:

![img](https:////upload-images.jianshu.io/upload_images/12747273-4c96bd2a7d1c76cf.png?imageMogr2/auto-orient/strip|imageView2/2/w/201/format/webp)

image.png



这些目录和文件的用处是：

- 最外层的:file: <cite>mysite/</cite> 根目录只是你项目的容器，** Django 不关心它的名字**，你可以将它重命名为任何你喜欢的名字。
- `manage.py`: 一个让你用各种方式管理 Django 项目的**命令行工具**。你可以阅读 [django-admin and manage.py](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fdjango-admin%2F) 获取所有 `manage.py` 的细节。
- 里面一层的 `mysite/` 目录包含你的项目**，它是一个纯 Python 包**。它的名字就是当你引用它内部任何东西时需要用到的 Python 包名。 (比如 `mysite.urls`).
- `mysite/__init__.py`：一个空文件，告诉 Python 这个目录应该被认为是一个 Python 包。如果你是 Python 初学者，阅读官方文档中的 [更多关于包的知识](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.python.org%2F3%2Ftutorial%2Fmodules.html%23tut-packages)。
- `mysite/settings.py`：**Django 项目的配置文件**。如果你想知道这个文件是如何工作的，请查看 [Django settings](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Fsettings%2F) 了解细节。
- `mysite/urls.py`：Django 项目的** URL 声明，就像你网站的“目录”**。阅读 [URL调度器](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Fhttp%2Furls%2F) 文档来获取更多关于 URL 的内容。
- `mysite/wsgi.py`：作为你的项目的运行在 WSGI 兼容的Web服务器上的入口。阅读 [如何使用 WSGI 进行部署](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fhowto%2Fdeployment%2Fwsgi%2F) 了解更多细节。

## 用于开发的简易服务器



```css
 python manage.py runserver
```

![img](https:////upload-images.jianshu.io/upload_images/12747273-449306291207e899.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

[图片上传中...(image.png-3ac1a5-1559911924187-0)]

更换端口：
 `python manage.py runserver 8080`

## 创建投票应用



```css
python manage.py startapp polls
```

这将会创建一个 polls 目录，它的目录结构大致如下：



![img](https:////upload-images.jianshu.io/upload_images/12747273-ba16b6c78ff19df8.png?imageMogr2/auto-orient/strip|imageView2/2/w/361/format/webp)

image.png

### 编写第一个视图

让我们开始编写第一个视图吧。打开 polls/views.py，把下面这些 Python 代码输入进去：

polls/views.py



```python
def  index(request):
    return  HttpResponse("Hello, world. You're at the polls index.")
```

这是 Django 中最简单的视图。如果想看见效果，我们需要将一个 URL 映射到它——这就是我们需要 URLconf 的原因了。
 为了创建 URLconf，请在 polls 目录里新建一个 urls.py 文件。你的应用目录现在看起来应该是这样

在 polls/urls.py 中，输入如下代码：



```python
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

下一步是要在根 URLconf 文件中指定我们创建的 polls.urls 模块。在 mysite/urls.py 文件的 urlpatterns 列表里插入一个 include()， 如下：
 mysite/urls.py



```jsx
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
]
```

### 启动服务

python manage.py runserver 8012

![img](https:////upload-images.jianshu.io/upload_images/12747273-5ea39bfe06e557f1.png?imageMogr2/auto-orient/strip|imageView2/2/w/445/format/webp)

image.png

# 编写你的第一个 Django 应用，第 2 部分

## 数据库配置

默认开启的某些应用需要至少一个数据表，所以，在使用他们之前需要在数据库中创建一些表。请执行以下命令：



```css
python manage.py migrate
```

这个**[`migrate`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fdjango-admin%2F%23django-admin-migrate) 命令检查 [`INSTALLED_APPS`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-INSTALLED_APPS)\**\**设置，为其中的每个应用创建需要的数据表**，至于具体会创建什么，这取决于你的 `mysite/settings.py` 设置文件和每个应用的数据库迁移文件。这个命令所执行的每个迁移操作都会在终端中显示出来



```css
E:\codeDev\djangoDemo\mysite>python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying sessions.0001_initial... OK
```

## 创建模型

在 Django 里写一个数据库驱动的 Web 应用的第一步是定义模型 - 也就是数据库结构设计和附加的其它元数据
 在这个简单的投票应用中，需要创建两个模型：

问题 Question 和选项 Choice。

Question 模型包括问题描述和发布时间。
 Choice 模型有两个字段，选项描述和当前得票数。每个选项属于一个问题。
 这些概念可以通过一个简单的 Python 类来描述。按照下面的例子来编辑 polls/models.py 文件：

polls/models.py



```python
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
```

## 激活模型

上面的一小段用于创建模型的代码给了 Django 很多信息，通过这些信息，Django 可以：

- 为这个应用创建数据库 schema（生成 CREATE TABLE 语句）。
- 创建可以与 Question 和 Choice 对象进行交互的 Python 数据库 API。
   但是首先得把 polls 应用安装到我们的项目里
   mysite/settings.py



```bash
INSTALLED_APPS = [
    'polls.apps.PollsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

- 现在你的 Django 项目会包含 polls 应用。接着运行下面的命令：



```bash
E:\codeDev\djangoDemo\mysite>python manage.py makemigrations polls
Migrations for 'polls':
  polls\migrations\0001_initial.py
    - Create model Question
    - Create model Choice
```

通过运行 makemigrations 命令，Django 会检测你对模型文件的修改（在这种情况下，你已经取得了新的），并且把修改的部分储存为一次 迁移。

迁移是 Django 对于模型定义（也就是你的数据库结构）的变化的储存形式 - 没那么玄乎，它们其实也只是一些你磁盘上的文件。如果你想的话，你可以阅读一下你模型的迁移数据，它被储存在 polls/migrations/0001_initial.py 里。别担心，你不需要每次都阅读迁移文件，但是它们被设计成人类可读的形式，这是为了便于你手动修改它们。

Django 有一个自动执行数据库迁移并同步管理你的数据库结构的命令 - 这个命令是 [`migrate`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fdjango-admin%2F%23django-admin-migrate)，我们马上就会接触它 - 但是首先，让我们看看迁移命令会执行哪些 SQL 语句

- [`sqlmigrate`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fdjango-admin%2F%23django-admin-sqlmigrate) 命令接收一个迁移的名称，然后返回对应的 SQL：(非必须)



```css
python manage.py sqlmigrate polls 0001
```

你将会看到类似下面这样的输出（我把输出重组成了人类可读的格式）：



```cpp
E:\codeDev\djangoDemo\mysite>python manage.py sqlmigrate polls 0001
BEGIN;
--
-- Create model Question
--
CREATE TABLE "polls_question" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "question_text" varchar(200) NOT NULL, "pub_date" datetime NOT NULL);
--
-- Create model Choice
--
CREATE TABLE "polls_choice" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "choice_text" varchar(200) NOT NULL, "votes" integer NOT NULL, "question_id" integer NOT NULL REFERENCES "polls_question" ("id") DEFERRABLE INITIAL
LY DEFERRED);
CREATE INDEX "polls_choice_question_id_c5b4b260" ON "polls_choice" ("question_id");
COMMIT;
```

- 现在，再次运行 [`migrate`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fdjango-admin%2F%23django-admin-migrate) 命令，在数据库里创建新定义的模型的数据表：



```css
python manage.py migrate
```

结果如下：



```css
E:\codeDev\djangoDemo\mysite>python manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, polls, sessions
Running migrations:
  Applying polls.0001_initial... OK
```

迁移是非常强大的功能，它能让你在开发过程中持续的改变数据库结构而不需要重新删除和创建表 - 它专注于使数据库平滑升级而不会丢失数据。我们会在后面的教程中更加深入的学习这部分内容，现在，你只需要记住，改变模型需要这三步：

- 编辑 `models.py` 文件，改变模型。
- 运行 [`python manage.py makemigrations`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fdjango-admin%2F%23django-admin-makemigrations) 为模型的改变生成迁移文件。
- 运行 [`python manage.py migrate`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fdjango-admin%2F%23django-admin-migrate) 来应用数据库迁移。

数据库迁移被分解成生成和应用两个命令是为了让你能够在代码控制系统上提交迁移数据并使其能在多个应用里使用；这不仅仅会让开发更加简单，也给别的开发者和生产环境中的使用带来方便。

## 初试 API

现在让我们进入交互式 Python 命令行，尝试一下 Django 为你创建的各种 API。通过以下命令打开 Python 命令行：

python manage.py shell



```dart
E:\codeDev\djangoDemo\mysite>python manage.py shell
Python 3.7.1 (v3.7.1:260ec2c36a, Oct 20 2018, 14:57:15) [MSC v.1915 64 bit (AMD64)]
Type 'copyright', 'credits' or 'license' for more information
IPython 7.2.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: from polls.models import Choice, Question

In [2]:  Question.objects.all()
Out[2]: <QuerySet []>

In [3]: from django.utils import timezone

In [4]: q = Question(question_text="What's new?", pub_date=timezone.now())

In [5]:  q.save()

In [6]: q.id
Out[6]: 1

In [7]: q.question_text
Out[7]: "What's new?"

In [8]: q.pub_date
Out[8]: datetime.datetime(2019, 5, 30, 4, 11, 17, 277390, tzinfo=<UTC>)

In [9]:  q.question_text = "What's up?"

In [10]: 

In [10]: q.save()

In [11]: Question.objects.all()
Out[11]: <QuerySet [<Question: Question object (1)>]>

In [12]: 
```

等等。`` 对于我们了解这个对象的细节没什么帮助。让我们通过编辑 `Question` 模型的代码（位于 `polls/models.py` 中）来修复这个问题。给 `Question` 和 `Choice` 增加[`**__str__()**`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fmodels%2Finstances%2F%23django.db.models.Model.__str__)方法。

**polls/models.py**

![img](https:////upload-images.jianshu.io/upload_images/12747273-6381326084803efb.png?imageMogr2/auto-orient/strip|imageView2/2/w/819/format/webp)

image.png

给模型增加 [`__str__()`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fmodels%2Finstances%2F%23django.db.models.Model.__str__) 方法是很重要的，这不仅仅能给你在命令行里使用带来方便，Django 自动生成的 admin 里也使用这个方法来表示对象。

注意：这些都是常规的 Python方法。让我们添加一个自定义的方法，这只是为了演示

polls/models.py



```python
import datetime

from django.db import models
from django.utils import timezone


class Question(models.Model):
    # ...
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
```



```ruby
E:\codeDev\djangoDemo\mysite>python manage.py shell
Python 3.7.1 (v3.7.1:260ec2c36a, Oct 20 2018, 14:57:15) [MSC v.1915 64 bit (AMD64)]
Type 'copyright', 'credits' or 'license' for more information
IPython 7.2.0 -- An enhanced Interactive Python. Type '?' for help.

In [1]: from polls.models import Choice, Question

In [2]: Question.objects.all()
Out[2]: <QuerySet [<Question: What's up?>]>

In [3]: Question.objects.filter(id=1)
Out[3]: <QuerySet [<Question: What's up?>]>

In [4]: Question.objects.filter(question_text__startswith='What')
Out[4]: <QuerySet [<Question: What's up?>]>

In [5]: from django.utils import timezone

In [6]:  current_year = timezone.now().year

In [7]: Question.objects.get(pub_date__year=current_year)
Out[7]: <Question: What's up?>

In [8]: 

In [8]: Question.objects.get(id=2)
---------------------------------------------------------------------------
DoesNotExist                              Traceback (most recent call last)
<ipython-input-8-75091ca84516> in <module>
----> 1 Question.objects.get(id=2)

D:\Programs\Python\Python37\lib\site-packages\django\db\models\manager.py in manager_method(self, *args, **kwargs)
     80         def create_method(name, method):
     81             def manager_method(self, *args, **kwargs):
---> 82                 return getattr(self.get_queryset(), name)(*args, **kwargs)
     83             manager_method.__name__ = method.__name__
     84             manager_method.__doc__ = method.__doc__

D:\Programs\Python\Python37\lib\site-packages\django\db\models\query.py in get(self, *args, **kwargs)
    406             raise self.model.DoesNotExist(
    407                 "%s matching query does not exist." %
--> 408                 self.model._meta.object_name
    409             )
    410         raise self.model.MultipleObjectsReturned(

DoesNotExist: Question matching query does not exist.

In [9]: Question.objects.get(pk=1)
Out[9]: <Question: What's up?>

In [10]: q = Question.objects.get(pk=1)

In [11]:  q.was_published_recently()
Out[11]: True

In [12]: 

In [12]: q = Question.objects.get(pk=1)

In [13]: q.choice_set.all()
Out[13]: <QuerySet []>

In [14]: q.choice_set.create(choice_text='Not much', votes=0)
Out[14]: <Choice: Not much>

In [15]: q.choice_set.create(choice_text='The sky', votes=0)
Out[15]: <Choice: The sky>

In [16]: c = q.choice_set.create(choice_text='Just hacking again', votes=0)

In [17]:  c.question
Out[17]: <Question: What's up?>

In [18]: q.choice_set.all()
Out[18]: <QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>

In [19]:  q.choice_set.count()
Out[19]: 3

In [20]: Choice.objects.filter(question__pub_date__year=current_year)
Out[20]: <QuerySet [<Choice: Not much>, <Choice: The sky>, <Choice: Just hacking again>]>

In [21]:  c = q.choice_set.filter(choice_text__startswith='Just hacking')

In [22]: 

In [22]: c.delete()
Out[22]: (1, {'polls.Choice': 1})

In [23]: 
```

## 介绍 Django 管理页面

### 创建一个管理员账号

首先，我们得创建一个能登录管理页面的用户。请运行下面的命令：

python manage.py createsuperuser
 键入你想要使用的用户名，然后按下回车键：

Username: admin
 然后提示你输入想要使用的邮件地址：

Email address: [admin@example.com](https://links.jianshu.com/go?to=mailto%3Aadmin%40example.com)
 最后一步是输入密码。你会被要求输入两次密码，第二次的目的是为了确认第一次输入的确实是你想要的密码。

Password: **********
 Password (again): *********
 Superuser created successfully.



```csharp
E:\codeDev\djangoDemo\mysite>python manage.py createsuperuser
Username (leave blank to use 'm709767v'): admin
Email address: admin@transsnet.com
Password:
Password (again):
This password is too short. It must contain at least 8 characters.
This password is too common.
This password is entirely numeric.
Bypass password validation and create user anyway? [y/N]: y
Superuser created successfully.
```

### 启动开发服务器

Django 的管理界面默认就是启用的。让我们启动开发服务器，看看它到底是什么样的。

如果开发服务器未启动，用以下命令启动它：

python manage.py runserver

现在，打开浏览器，转到你本地域名的 "/admin/" 目录， -- 比如 "[http://127.0.0.1:8000/admin/](https://links.jianshu.com/go?to=http%3A%2F%2F127.0.0.1%3A8000%2Fadmin%2F)" 。你应该会看见管理员登录界面：

![img](https:////upload-images.jianshu.io/upload_images/12747273-66707da3af7e1778.png?imageMogr2/auto-orient/strip|imageView2/2/w/500/format/webp)

image.png



### 进入管理站点页面

现在，试着使用你在上一步中创建的超级用户来登录。然后你将会看到 Django 管理页面的索引页

![img](https:////upload-images.jianshu.io/upload_images/12747273-320ad5684b374126.png?imageMogr2/auto-orient/strip|imageView2/2/w/937/format/webp)

image.png

你将会看到几种可编辑的内容：组和用户。它们是由 [`django.contrib.auth`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Fauth%2F%23module-django.contrib.auth) 提供的，这是 Django 开发的认证框架。

## 向管理页面中加入投票应用

但是我们的投票应用在哪呢？它没在索引页面里显示。

只需要做一件事：我们得告诉管理页面，问题 Question 对象需要被管理。打开 polls/admin.py 文件，把它编辑成下面这样：

polls/admin.py



```css
from django.contrib import admin

from .models import Question
admin.site.register(Question)
```

## 体验便捷的管理功能

现在我们向管理页面注册了问题 Question 类。Django 知道它应该被显示在索引页里：



![img](https:////upload-images.jianshu.io/upload_images/12747273-5ad1bf413552fed0.png?imageMogr2/auto-orient/strip|imageView2/2/w/1014/format/webp)

image.png



点击 "Questions" 。现在看到是问题 "Questions" 对象的列表 "change list" 。这个界面会显示所有数据库里的问题 Question 对象，你可以选择一个来修改。这里现在有我们在上一部分中创建的 “What's up?” 问题。



![img](https:////upload-images.jianshu.io/upload_images/12747273-098490efa9e40f05.png?imageMogr2/auto-orient/strip|imageView2/2/w/930/format/webp)

image.png

点击 “What's up?” 来编辑这个问题（Question）对象：



![img](https:////upload-images.jianshu.io/upload_images/12747273-396080bcbd55b2bb.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

注意事项：

- 这个表单是从问题 `Question` 模型中自动生成的
- 不同的字段类型（日期时间字段 [`DateTimeField`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fmodels%2Ffields%2F%23django.db.models.DateTimeField) 、字符字段 [`CharField`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fmodels%2Ffields%2F%23django.db.models.CharField)）**会生成对应的 HTML 输入控件**。每个类型的字段都知道它们该如何在管理页面里显示自己。
- 每个日期时间字段 [`DateTimeField`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fmodels%2Ffields%2F%23django.db.models.DateTimeField) 都有 JavaScript 写的快捷按钮。日期有转到今天（Today）的快捷按钮和一个弹出式日历界面。时间有设为现在（Now）的快捷按钮和一个列出常用时间的方便的弹出式列表。

页面的底部提供了几个选项：

- 保存（Save） - 保存改变，然后返回对象列表。
- 保存并继续编辑（Save and continue editing） - 保存改变，然后重新载入当前对象的修改界面。
- 保存并新增（Save and add another） - 保存改变，然后添加一个新的空对象并载入修改界面。
- 删除（Delete） - 显示一个确认删除页面。

# 编写你的第一个 Django 应用，第 3 部分

如何创建公用界面——也被称为“视图”

## 概况

Django 中的**视图的概念是「一类具有相同功能和模板的网页的集合」**。比如，在一个博客应用中，你可能会创建如下几个视图：

- 博客首页——展示最近的几项内容。
- 内容“详情”页——详细展示某项内容。
- 以年为单位的归档页——展示选中的年份里各个月份创建的内容。
- 以月为单位的归档页——展示选中的月份里各天创建的内容。
- 以天为单位的归档页——展示选中天里创建的所有内容。
- 评论处理器——用于响应为一项内容添加评论的操作。

而在我们的投票应用中，我们需要下列几个视图：

- 问题索引页——展示最近的几个投票问题。
- 问题详情页——展示某个投票的问题和不带结果的选项列表。
- 问题结果页——展示某个投票的结果。
- 投票处理器——用于响应用户为某个问题的特定选项投票的操作。

在 Django 中，网页和其他内容都是从视图派生而来。每一个视图表现为一个简单的 Python 函数（或者说方法，如果是在基于类的视图里的话）。Django 将会根据用户请求的 URL 来选择使用哪个视图（更准确的说，是根据 URL 中域名之后的部分）。

在你上网的过程中，很可能看见过像这样美丽的 URL： "ME2/Sites/dirmod.asp?sid=&type=gen&mod=Core+Pages&gid=A6CD4967199A42D9B65B1B" 。别担心，Django 里的 *URL 规则* 要比这优雅的多！

一个 URL 模式定义了某种 URL 的基本格式——举个例子：`/newsarchive///`。

为了将 URL 和视图关联起来，Django 使用了 'URLconfs' 来配置。URLconf 将 URL 模式映射到视图。

本教程只会介绍 URLconf 的基础内容，你可以看看 [URL调度器](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Fhttp%2Furls%2F) 以获取更多内容。

## 编写更多视图

现在让我们向 polls/views.py 里添加更多视图。这些视图有一些不同，因为他们接收参数：
 polls/views.py



```python
from django.http import HttpResponse
# 问题索引页——展示最近的几个投票问题
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

# 问题详情页——展示某个投票的问题和不带结果的选项列表
def detail(request, question_id):
    return HttpResponse("You're looking at question %s." % question_id)

# 问题结果页——展示某个投票的结果
def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

# 投票处理器——用于响应用户为某个问题的特定选项投票的操作。
def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)
```

把这些新视图添加进 `polls.urls` 模块里，只要添加几个 [`url()`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Furls%2F%23django.conf.urls.url) 函数调用就行：

polls/urls.py



```python
from django.urls import path

from . import views

urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    # ex: /polls/5/
    path('<int:question_id>/', views.detail, name='detail'),
    # ex: /polls/5/results/
    path('<int:question_id>/results/', views.results, name='results'),
    # ex: /polls/5/vote/
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

![img](https:////upload-images.jianshu.io/upload_images/12747273-bf2392bd565b8538.png?imageMogr2/auto-orient/strip|imageView2/2/w/748/format/webp)

image.png

当某人请求你网站的某一页面时——比如说， "/polls/34/" ，Django 将会载入 `mysite.urls` 模块，因为这在配置项 [`**ROOT_URLCONF**`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-ROOT_URLCONF)中设置了。然后 Django 寻找名为 `urlpatterns` 变量并且按序匹配正则表达式。在找到匹配项 `'polls/'`，它切掉了匹配的文本（`"polls/"`），将剩余文本——`"34/"`，发送至 'polls.urls' URLconf 做进一步处理。在这里剩余文本匹配了 `'/'`，使得我们 Django 以如下形式调用 `detail()`:



```csharp
detail(request=<HttpRequest object>, question_id=34)
```

question_id=34 由 <int:question_id> 匹配生成。使用尖括号“捕获”这部分 URL，且以关键字参数的形式发送给视图函数。上述字符串的 :question_id> 部分定义了将被用于区分匹配模式的变量名，而 int: 则是一个转换器决定了应该以什么变量类型匹配这部分的 URL 路径。

为每个 URL 加上不必要的东西，例如 .html ，是没有必要的。不过如果你非要加的话，也是可以的



```bash
path('polls/latest.html', views.index),
```

但是，别这样做，这太傻了。



![img](https:////upload-images.jianshu.io/upload_images/12747273-d8b2bf0112997270.png?imageMogr2/auto-orient/strip|imageView2/2/w/776/format/webp)

image.png

![img](https:////upload-images.jianshu.io/upload_images/12747273-9f7b23e82696c880.png?imageMogr2/auto-orient/strip|imageView2/2/w/894/format/webp)

image.png

## 写一个真正有用的视图

每个视图必须要做的只有两件事：返回一个包含被请求页面内容的 [`HttpResponse`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpResponse) 对象，或者抛出一个异常，比如 [`Http404`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Fhttp%2Fviews%2F%23django.http.Http404) 。至于你还想干些什么，随便你。

你的视图可以从数据库里读取记录，可以使用一个模板引擎（比如 Django 自带的，或者其他第三方的），可以生成一个 PDF 文件，可以输出一个 XML，创建一个 ZIP 文件，你可以做任何你想做的事，使用任何你想用的 Python 库。

Django 只要求返回的是一个 [`HttpResponse`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpResponse) ，或者抛出一个异常。

因为 Django 自带的数据库 API 很方便，我们曾在 [教程第 2 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial02%2F) 中学过，所以我们试试在视图里使用它。**我们在 `index()` 函数里插入了一些新内容，让它能展示数据库里以发布日期排序的最近 5 个投票问题，以空格分割**

polls/views.py



```python
from django.http import HttpResponse

from .models import Question
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([q.question_text for q in latest_question_list])
    return HttpResponse(output)
```

![img](https:////upload-images.jianshu.io/upload_images/12747273-c7f557b7495963ee.png?imageMogr2/auto-orient/strip|imageView2/2/w/892/format/webp)

image.png

这里有个**问题**：页面的设计写死在视图函数的代码里的。如果你想改变页面的样子，你需要编辑 Python 代码。所以让我们使用 Django 的模板系统，只要创建一个视图，就可以将页面的设计从代码中分离出来。

首先，在你的** `polls` **目录里创建一个** `templates` **目录。Django 将会在这个目录里查找模板文件。

你项目的 **[`TEMPLATES`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-TEMPLATES) 配置项描述了 Django 如何载入和渲染模板**。默认的设置文件设置了 `DjangoTemplates` 后端，并将 **[`APP_DIRS`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-TEMPLATES-APP_DIRS) **设置成了 **True**。这一选项将会让 `DjangoTemplates` 在每个 [`INSTALLED_APPS`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-INSTALLED_APPS) 文件夹中寻找 "templates" 子目录。这就是为什么尽管我们没有像在第二部分中那样修改 DIRS 设置，Django 也能正确找到 polls 的模板位置的原因。

![img](https:////upload-images.jianshu.io/upload_images/12747273-876b6c9ba97654f6.png?imageMogr2/auto-orient/strip|imageView2/2/w/750/format/webp)

image.png

在你刚刚创建的 templates 目录里，再创建一个目录 polls，然后在其中新建一个文件 index.html 。换句话说，你的模板文件的路径应该是 polls/templates/polls/index.html 。因为 Django 会寻找到对应的 app_directories ，所以你只需要使用 polls/index.html 就可以引用到这一模板了

将下面的代码输入到刚刚创建的模板文件中：

以列表方式展示前5个投票详情

polls/templates/polls/index.html



```xml
{% if latest_question_list %}
    <ul>
    {% for question in latest_question_list %}
        <li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
    {% endfor %}
    </ul>
{% else %}
    <p>No polls are available.</p>
{% endif %}
```

然后，让我们更新一下 polls/views.py 里的 index 视图来使用模板：

polls/views.py



```python
from django.http import HttpResponse
from django.template import loader

from .models import Question


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('index.html')
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
```

上述代码的作用是，**载入 `polls/index.html` 模板文件，并且向它传递一个上下文(context)**。这个上下文是一个字典，它将模板内的变量映射为 Python 对象。

用你的浏览器访问 "/polls/" ，你将会看见一个无序列表，列出了我们在 [教程第 2 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial02%2F) 中添加的 “What's up” 投票问题，链接指向这个投票的详情页。

![img](https:////upload-images.jianshu.io/upload_images/12747273-d9e0f4a7917d6a69.png?imageMogr2/auto-orient/strip|imageView2/2/w/715/format/webp)

image.png

### 一个快捷函数： `[render()](https://docs.djangoproject.com/zh-hans/2.1/topics/http/shortcuts/#django.shortcuts.render "django.shortcuts.render")`

「**载入模板，填充上下文，再返回由它生成的 [`HttpResponse`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpResponse) 对象**」是一个非常常用的操作流程。于是 Django 提供了一个快捷函数，我们用它来重写 `index()` 视图：

polls/views.py



```python
from django.shortcuts import render

from .models import Question
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context= {'lon_list': latest_question_list}
    return render(request, 'index.html', context)
```

## 抛出 404 错误

现在，我们来处理投票详情视图——它会显示指定投票的问题标题。下面是这个视图的代码：
 polls/views.py



```python
from django.http import Http404
from django.shortcuts import render

from .models import Question
# ...
def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'detail.html', {'question': question})
```

这里有个新原则。如果指定问题 ID 所对应的问题不存在，这个视图就会抛出一个 [`Http404`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Fhttp%2Fviews%2F%23django.http.Http404) 异常。

我们稍后再讨论你需要在 `polls/detail.html` 里输入什么，但是如果你想试试上面这段代码是否正常工作的话，你可以暂时把下面这段输进去：

polls/templates/polls/detail.html



```undefined
{{ question }}
```

这样你就能测试了



![img](https:////upload-images.jianshu.io/upload_images/12747273-c6c912bdd8fdb2cb.png?imageMogr2/auto-orient/strip|imageView2/2/w/777/format/webp)

image.png

### 一个快捷函数： [`get_object_or_404()`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Fhttp%2Fshortcuts%2F%23django.shortcuts.get_object_or_404)

尝试用 [`get()`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fmodels%2Fquerysets%2F%23django.db.models.query.QuerySet.get) 函数获取一个对象，如果不存在就抛出 [`Http404`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Ftopics%2Fhttp%2Fviews%2F%23django.http.Http404) 错误也是一个普遍的流程。Django 也提供了一个快捷函数，下面是修改后的详情 `detail()` 视图代码：
 polls/views.py



```python
from django.shortcuts import get_object_or_404, render

from .models import Question
# ...
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'detail.html', {'question': question})
```

![img](https:////upload-images.jianshu.io/upload_images/12747273-bf2baeb5049b28f4.png?imageMogr2/auto-orient/strip|imageView2/2/w/609/format/webp)

image.png

## 使用模板系统

回过头去看看我们的 detail() 视图。它向模板传递了上下文变量 question 。下面是 polls/detail.html 模板里正式的代码：

polls/templates/polls/detail.html



```xml
<h1>{{ question.question_text }}</h1>
<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }}</li>
{% endfor %}
</ul>
```

模板系统统一使用点符号来访问变量的属性。在示例 `{{ question.question_text }}` 中，首先 Django 尝试对 `question` 对象使用字典查找（也就是使用 obj.get(str) 操作），如果失败了就尝试属性查找（也就是 obj.str 操作），结果是成功了。如果这一操作也失败的话，将会尝试列表查找（也就是 obj[int] 操作）。

在 [`{% for %}`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Ftemplates%2Fbuiltins%2F%23std%3Atemplatetag-for) 循环中发生的函数调用：`question.choice_set.all` 被解释为 Python 代码 `question.choice_set.all()` ，将会返回一个可迭代的 `Choice` 对象，这一对象可以在 [`{% for %}`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Ftemplates%2Fbuiltins%2F%23std%3Atemplatetag-for) 标签内部使用。

## 去除模板中的硬编码 URL

还记得吗，我们在 `polls/index.html` 里编写投票链接时，链接是硬编码的：

<pre style="margin: 8px 0px; font-family: 'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier, monospace; font-size: 1rem; color: rgb(12, 75, 51);"><li><a  href="/polls/{{  question.id  }}/">{{  question.question_text  }}</a></li>  </pre>

问题在于，硬编码和强耦合的链接，对于一个包含很多应用的项目来说，修改起来是十分困难的。然而，因为你在 `polls.urls` 的 [`url()`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Furls%2F%23django.conf.urls.url) 函数中**通过 name 参数为 URL 定义了名字**，你可以使用 **`{% url %}` **标签代替它：

<pre style="margin: 8px 0px; font-family: 'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier, monospace; font-size: 1rem; color: rgb(12, 75, 51);"><li><a  href="{%  url  'detail'  question.id  %}">{{  question.question_text  }}</a></li>  </pre>

这个标签的工作方式是在 `polls.urls` 模块的 URL 定义中寻具有指定名字的条目。你可以回忆一下，具有名字 'detail' 的 URL 是在如下语句中定义的：



```bash
...
# the 'name' value as called by the {% url %} template tag
path('<int:question_id>/', views.detail, name='detail'),
...
```

如果你想改变投票详情视图的 URL，比如想改成 polls/specifics/12/ ，你不用在模板里修改任何东西（包括其它模板），只要在 polls/urls.py 里稍微修改一下就行：



```bash
...
# added the word 'specifics'
path('specifics/<int:question_id>/', views.detail, name='detail'),
...
```

访问index:  127.0.0.1:8000/polls/



![img](https:////upload-images.jianshu.io/upload_images/12747273-2d08a1a11a13670d.png?imageMogr2/auto-orient/strip|imageView2/2/w/724/format/webp)

image.png

## 为 URL 名称添加命名空间

教程项目只有一个应用，polls 。在一个真实的 Django 项目中，可能会有五个，十个，二十个，甚至更多应用。Django 如何分辨重名的 URL 呢？举个例子，polls 应用有 detail 视图，可能另一个博客应用也有同名的视图。Django 如何知道 {% url %} 标签到底对应哪一个应用的 URL 呢？

答案是：在根 URLconf 中添加命名空间。在 polls/urls.py 文件中稍作修改，加上 app_name 设置命名空间：

polls/urls.py



```go
from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

现在，编辑 polls/index.html 文件，从：
 polls/templates/polls/index.html



```xml
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>
```

修改为指向具有命名空间的详细视图：
 polls/templates/polls/index.html



```xml
<li><a href="{% url 'polls:detail' question.id %}">{{ question.question_text }}</a></li>
```

# 编写你的第一个 Django 应用，第 4 部分

## 编写一个简单的表单

让我们更新一下在上一个教程中编写的投票详细页面的模板 ("polls/detail.html") ，让它包含一个 HTML <form> 元素：

polls/templates/polls/detail.html



```xml
<h1>{{ question.question_text }}</h1>

{% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}

<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
{% for choice in question.choice_set.all %}
    <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
    <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
{% endfor %}
<input type="submit" value="Vote">
</form>
```

简要说明：

- 上面的模板在 Question 的每个 Choice 前添加一个单选按钮。 每个单选按钮的** `value` **属性是对应的各个 Choice 的 ID。每个单选按钮的 `name` 是 `"choice"` 。这意味着，当有人选择一个单选按钮并提交表单提交时，它将发送一个 POST 数据 `choice=#` ，其中# 为选择的 Choice 的 ID。这是 HTML 表单的基本概念。
- **我们设置表单的 `action` 为 `{% url 'polls:vote' question.id %}` ，并设置 `method="post"` 。使用 `method="post"``（与其相对的是 ``method="get"`）是非常重要的，因为这个提交表单的行为会改变服务器端的数据。 无论何时，当你需要创建一个改变服务器端数据的表单时，请使用 ``method="post"` 。这不是 Django 的特定技巧；这是优秀的网站开发技巧**。
- `forloop.counter` 指示 [`for`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Ftemplates%2Fbuiltins%2F%23std%3Atemplatetag-for) 标签已经循环多少次。
- 由于我们创建一个 POST 表单（它具有修改数据的作用），所以我们需要小心**跨站点请求伪造**。 谢天谢地，你不必太过担心，因为 Django 已经拥有一个用来防御它的非常容易使用的系统。 简而言之，所有针对内部 URL 的 POST 表单都应该使用 [`**{% csrf_token %}**`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Ftemplates%2Fbuiltins%2F%23std%3Atemplatetag-csrf_token)模板标签。

现在，让我们来创建一个 Django 视图来处理提交的数据。记住，在 [教程第 3 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial03%2F) 中，我们为投票应用创建了一个 URLconf ，包含这一行：

polls/urls.py

path('<int:question_id>/vote/', views.vote, name='vote'),
 我们还创建了一个 vote() 函数的虚拟实现。让我们来创建一个真实的版本。 将下面的代码添加到 polls/views.py ：

polls/views.py



```python
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from .models import Choice, Question
# ...
def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))
```

以上代码中有些内容还未在本教程中提到过：

- [`request.POST`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpRequest.POST) 是一个类字典对象，让你可以通过关键字的名字获取提交的数据。 这个例子中， `request.POST['choice']` 以字符串形式返回选择的 Choice 的 ID。 [`request.POST`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpRequest.POST) 的值永远是字符串。

  注意，Django 还以同样的方式提供 [`request.GET`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpRequest.GET) 用于访问 GET 数据 —— 但我们在代码中显式地使用 [`request.POST`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpRequest.POST) ，以保证数据只能通过 POST 调用改动。

- 如果在 `request.POST['choice']` 数据中没有提供 `choice` ， POST 将引发一个 [`KeyError`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.python.org%2F3%2Flibrary%2Fexceptions.html%23KeyError) 。上面的代码检查 [`KeyError`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.python.org%2F3%2Flibrary%2Fexceptions.html%23KeyError) ，如果没有给出 `choice` 将重新显示 Question 表单和一个错误信息。

- 在增加 Choice 的得票数之后，代码返回一个 [`HttpResponseRedirect`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpResponseRedirect) 而不是常用的 [`HttpResponse`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpResponse) 、 **[`HttpResponseRedirect`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpResponseRedirect) 只接收一个参数**：**用户将要被重定向的 URL**（请继续看下去，我们将会解释如何构造这个例子中的 URL）。

  **正如上面的Python注释所指出的，在成功处理POST数据之后，应该始终返回HttpResponseRedirect。这个技巧不是Django特有的;这只是很好的Web开发实践。**

- 在这个例子中，我们在 [`HttpResponseRedirect`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Frequest-response%2F%23django.http.HttpResponseRedirect) 的构造函数中使用 `reverse()` 函数。这个函数避免了我们在视图函数中硬编码 URL。它需要我们给出我们想要跳转的视图的名字和该视图所对应的 URL 模式中需要给该视图提供的参数。 在本例中，使用在 [教程第 3 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial03%2F) 中设定的 URLconf， `reverse()` 调用将返回一个这样的字符串：



```bash
'/polls/3/results/'
```

其中 3 是 question.id 的值。重定向的 URL 将调用 'results' 视图来显示最终的页面



![img](https:////upload-images.jianshu.io/upload_images/12747273-cd0378b8ccbf36b9.png?imageMogr2/auto-orient/strip|imageView2/2/w/1062/format/webp)

image.png



![img](https:////upload-images.jianshu.io/upload_images/12747273-d03e765f80b7e733.png?imageMogr2/auto-orient/strip|imageView2/2/w/1051/format/webp)

image.png

当有人对 Question 进行投票后， vote() 视图将请求重定向到 Question 的结果界面。让我们来编写这个视图

polls/views.py



```python
from django.shortcuts import get_object_or_404, render


def results(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'results.html', {'question': question})
```

这和 [教程第 3 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial03%2F) 中的 `detail()` 视图几乎一模一样。唯一的不同是模板的名字。 我们将在稍后解决这个冗余问题。

现在，创建一个 `polls/results.html` 模板：

polls/templates/polls/results.html



```xml
<h1>{{ question.question_text }}</h1>

<ul>
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }} -- {{ choice.votes }} vote{{ choice.votes|pluralize }}</li>
{% endfor %}
</ul>

<a href="{% url 'polls:detail' question.id %}">Vote again?</a>
```

![img](https:////upload-images.jianshu.io/upload_images/12747273-9105c29f2db3f244.png?imageMogr2/auto-orient/strip|imageView2/2/w/796/format/webp)

image.png

### 使用通用视图：代码还是少点好

`detail()` （在 [教程第3部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial03%2F) 中）和 `results()` 视图都很简单 —— 并且，像上面提到的那样，存在冗余问题。用来显示一个投票列表的 `index()` 视图（也在 [教程第 3 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial03%2F) 中）和它们类似。

![img](https:////upload-images.jianshu.io/upload_images/12747273-39b60def883fc5bf.png?imageMogr2/auto-orient/strip|imageView2/2/w/535/format/webp)

image.png



![img](https:////upload-images.jianshu.io/upload_images/12747273-a30d54be6de81947.png?imageMogr2/auto-orient/strip|imageView2/2/w/658/format/webp)

image.png

这些视图反映基本的 Web 开发中的一个常见情况：根据 URL 中的参数从数据库中获取数据、载入模板文件然后返回渲染后的模板。 由于这种情况特别常见，Django 提供一种快捷方式，叫做“通用视图”系统。

通用视图将常见的模式抽象化，可以使你在编写应用时甚至不需要编写Python代码。

让我们将我们的投票应用转换成使用通用视图系统，这样我们可以删除许多我们的代码。我们仅仅需要做以下几步来完成转换，我们将：

转换 URLconf。
 删除一些旧的、不再需要的视图。
 基于 Django 的通用视图引入新的视图。
 请继续阅读来了解详细信息

### 改良 URLconf[¶](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial04%2F%23amend-urlconf)

首先，打开 polls/urls.py 这个 URLconf 并将它修改成：
 polls/urls.py



```go
from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
```

注意，第二个和第三个匹配准则中，路径字符串中匹配模式的名称已经由 <question_id> 改为 <pk>。

### 改良视图

下一步，我们将删除旧的 index, detail, 和 results 视图，并用 Django 的通用视图代替。打开 polls/views.py 文件，并将它修改成：

polls/views.py



```python
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Choice, Question


class IndexView(generic.ListView):
    template_name = 'index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = 'detail.html'


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'results.html'


def vote(request, question_id):
    ... # same as above, no changes needed.
```

我们在这里使用两个通用视图： [`ListView`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fclass-based-views%2Fgeneric-display%2F%23django.views.generic.list.ListView) 和 [`DetailView`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fclass-based-views%2Fgeneric-display%2F%23django.views.generic.detail.DetailView) 。这两个视图分别抽象“显示一个对象列表”和“显示一个特定类型对象的详细信息页面”这两种概念。

- 每个通用视图需要知道它将作用于哪个模型。 这由 `model` 属性提供。
- [`DetailView`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fclass-based-views%2Fgeneric-display%2F%23django.views.generic.detail.DetailView) 期望从 URL 中捕获名为 `"pk"` 的主键值，所以我们为通用视图把 `question_id` 改成 `pk` 。

默认情况下，通用视图 [`DetailView`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fclass-based-views%2Fgeneric-display%2F%23django.views.generic.detail.DetailView) 使用一个叫做 `/_detail.html` 的模板。在我们的例子中，它将使用 `"polls/question_detail.html"` 模板。`template_name` 属性是用来告诉 Django 使用一个指定的模板名字，而不是自动生成的默认名字。 我们也为 `results` 列表视图指定了 `template_name` —— 这确保 results 视图和 detail 视图在渲染时具有不同的外观，即使它们在后台都是同一个 [`DetailView`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fclass-based-views%2Fgeneric-display%2F%23django.views.generic.detail.DetailView) 。

类似地，[`ListView`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fclass-based-views%2Fgeneric-display%2F%23django.views.generic.list.ListView) 使用一个叫做 `/_list.html` 的默认模板；我们使用 `template_name` 来告诉 [`ListView`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fclass-based-views%2Fgeneric-display%2F%23django.views.generic.list.ListView)使用我们创建的已经存在的 `"polls/index.html"` 模板。

在之前的教程中，提供模板文件时都带有一个包含 `question` 和 `latest_question_list` 变量的 context。对于 `DetailView` ， `question` 变量会自动提供—— 因为我们使用 Django 的模型 (Question)， Django 能够为 context 变量决定一个合适的名字。然而对于 ListView， 自动生成的 context 变量是 `question_list`。为了覆盖这个行为，我们提供 `context_object_name` 属性，表示我们想使用 `latest_question_list`。作为一种替换方案，你可以改变你的模板来匹配新的 context 变量 —— 这是一种更便捷的方法，告诉 Django 使用你想使用的变量名。

启动服务器，使用一下基于通用视图的新投票应用。

# 编写你的第一个 Django 应用，第 6 部分

除了服务端生成的 HTML 以外，网络应用通常需要一些额外的文件——比如图片，脚本和样式表——来帮助渲染网络页面。在 Django 中，我们把这些文件统称为“静态文件”。

对于小项目来说，这个问题没什么大不了的，因为你可以把这些静态文件随便放在哪，只要服务程序能够找到它们就行。然而在大项目——特别是由好几个应用组成的大项目——中，处理不同应用所需要的静态文件的工作就显得有点麻烦了。

这就是 django.contrib.staticfiles 存在的意义：它将各个应用的静态文件（和一些你指明的目录里的文件）统一收集起来，这样一来，在生产环境中，这些文件就会集中在一个便于分发的地方。



![img](https:////upload-images.jianshu.io/upload_images/12747273-a436f319e7b8d81a.png?imageMogr2/auto-orient/strip|imageView2/2/w/355/format/webp)

image.png

自定义 应用 的界面和风格

首先，在你的 `polls` 目录下创建一个名为 `static` 的目录。Django 将在该目录下查找静态文件，这种方式和 Diango 在 `polls/templates/` 目录下查找 template 的方式类似。

Django 的 [`STATICFILES_FINDERS`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.2%2Fref%2Fsettings%2F%23std%3Asetting-STATICFILES_FINDERS) 设置包含了一系列的查找器，它们知道去哪里找到 static 文件。`AppDirectoriesFinder` 是默认查找器中的一个，它会在每个 [`INSTALLED_APPS`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.2%2Fref%2Fsettings%2F%23std%3Asetting-INSTALLED_APPS) 中指定的应用的子文件中寻找名称为 `static` 的特定文件夹，就像我们在 `polls` 中刚创建的那个一样。管理后台采用相同的目录结构管理它的静态文件。

在你刚创建的 `static` 文件夹中创建一个名为 `polls` 的文件夹，再在 `polls` 文件夹中创建一个名为 `style.css` 的文件。换句话说，你的样式表路径应是 `polls/static/polls/style.css`。因为 `AppDirectoriesFinder` 的存在，你可以在 Django 中简单地使用以 `polls/style.css` 的形式引用此文件，类似你引用模板路径的方式。

将以下代码放入样式表(polls/static/polls/style.css)：

polls/static/polls/style.css



```css
li a {
    color: green;
}
```

下一步，在 polls/templates/polls/index.html 的文件头添加以下内容：
 polls/templates/polls/index.html



```tsx
{% load static %}
<link rel="stylesheet" type="text/css" href="{% static 'polls/style.css' %}">
```

{% static %} 模板标签会生成静态文件的绝对路径。
 这就是你开发所需要做的所有事情了。
 启动服务器(如果它正在运行中，重新启动一次):

python manage.py runserver

重新载入`http://localhost:8000/polls/` ，你会发现有问题的链接是绿色的 (这是Django自己的问题标注方式) ，这意味着你追加的样式表起作用了。

![img](https:////upload-images.jianshu.io/upload_images/12747273-13f9e91e994b377f.png?imageMogr2/auto-orient/strip|imageView2/2/w/746/format/webp)

image.png



## 添加一个背景图

接着，我们会创建一个用于存在图像的目录。在 polls/static/polls 目录下创建一个名为 images 的子目录。在这个目录中，放一张名为 background.gif 的图片。换言之，在目录 polls/static/polls/images/background.gif 中放一张图片。

随后，在你的样式表（polls/static/polls/style.css）中添加：

polls/static/polls/style.css



```css
body {
    background: white url("images/background.gif") no-repeat;
}
```

浏览器重载 [http://localhost:8000/polls/](https://links.jianshu.com/go?to=http%3A%2F%2Flocalhost%3A8000%2Fpolls%2F)，你将在屏幕的左上角见到这张背景图。

![img](https:////upload-images.jianshu.io/upload_images/12747273-fed91d1df20a656e.png?imageMogr2/auto-orient/strip|imageView2/2/w/812/format/webp)

image.png



# 编写你的第一个 Django 应用，第 7 部分

## 自定义后台表单

通过 admin.site.register(Question) 注册 Question 模型，Django 能够构建一个默认的表单用于展示。通常来说，你期望能自定义表单的外观和工作方式。你可以在注册模型时将这些设置告诉 Django。

让我们通过重排列表单上的字段来看看它是怎么工作的。用以下内容替换 admin.site.register(Question)：

polls/admin.py



```python
from django.contrib import admin
from .models import Question
class QuestionAdmin(admin.ModelAdmin):
    fields = ['pub_date', 'question_text']

admin.site.register(Question, QuestionAdmin)
```

你需要遵循以下流程——创建一个模型后台类，接着将其作为第二个参数传给 admin.site.register() ——在你需要修改模型的后台管理选项时这么做。

以上修改使得 "Publication date" 字段显示在 "Question" 字段之前：



![img](https:////upload-images.jianshu.io/upload_images/12747273-df072326db45552b.png?imageMogr2/auto-orient/strip|imageView2/2/w/633/format/webp)

image.png

这在只有两个字段时显得没啥卵用，但对于拥有数十个字段的表单来说，为表单选择一个直观的排序方法就显得你的针很细了。

说到拥有数十个字段的表单，你可能更期望将表单分为几个字段集：
 polls/admin.py



```python
from django.contrib import admin

from .models import Question
class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date']}),
    ]

admin.site.register(Question, QuestionAdmin)
```

![img](https:////upload-images.jianshu.io/upload_images/12747273-9c100d52057f8dda.png?imageMogr2/auto-orient/strip|imageView2/2/w/855/format/webp)

image.png

## 添加关联的对象

好了，现在我们有了投票的后台页。不过，一个 Question 有多个 Choice，但后台页却没有显示多个选项。

好了。

有两个方法可以解决这个问题。第一个就是仿照我们向后台注册 Question 一样注册 Choice 。这很简单：

polls/admin.py



```python
from django.contrib import admin

from .models import Choice, Question
# ...
admin.site.register(Choice)
```



![img](https:////upload-images.jianshu.io/upload_images/12747273-b96ae4ada166136b.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png


 在这个表单中，"Question" 字段是一个包含数据库中所有投票的选择框。Django 知道要将 [`ForeignKey`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fmodels%2Ffields%2F%23django.db.models.ForeignKey) 在后台中以选择框 `` 的形式展示。此时，我们只有一个投票。



同时也注意下 "Question" 旁边的“添加”按钮。每个使用 `ForeignKey` 关联到另一个对象的对象会自动获得这个功能。当你点击“添加”按钮时，你会见到一个包含“添加投票”的表单。如果你在这个弹出框中添加了一个投票，并点击了“保存”，Django 会将其保存至数据库，并动态地在你正在查看的“添加选项”表单中选中它。

不过，这是一种很低效地添加“选项”的方法。更好的办法是在你创建“投票”对象时直接添加好几个选项。让我们实现它。

移除调用 `register()` 注册 `Choice` 模型的代码。随后，像这样修改 `Question` 的注册代码：
 polls/admin.py



```python
from django.contrib import admin

from .models import Choice, Question


class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]

admin.site.register(Question, QuestionAdmin)
```

这会告诉 Django：“Choice 对象要在 Question 后台页面编辑。默认提供 3 个足够的选项字段。”

加载“添加投票”页面来看看它长啥样：



![img](https:////upload-images.jianshu.io/upload_images/12747273-0a31836dd18f64af.png?imageMogr2/auto-orient/strip|imageView2/2/w/689/format/webp)

image.png



不过，仍然有点小问题。它占据了大量的屏幕区域来显示所有关联的 Choice 对象的字段。对于这个问题，Django 提供了一种表格式的单行显示关联对象的方法。你只需按如下形式修改 ChoiceInline 申明：

polls/admin.py



```python
class ChoiceInline(admin.TabularInline):
    #...
```

通过 TabularInline`（替代`StackedInline ），关联对象以一种表格式的方式展示，显得更加紧凑：

![img](https:////upload-images.jianshu.io/upload_images/12747273-4c1025228803a204.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

## 自定义后台更改列表

现在投票的后台页看起来很不错，让我们对“更改列表”页面进行一些调整——改成一个能展示系统中所有投票的页面。

以下是它此时的外



![img](https:////upload-images.jianshu.io/upload_images/12747273-3e461824c76c0824.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

默认情况下，Django 显示每个对象的 `str()` 返回的值。但有时如果我们能够显示单个字段，它会更有帮助。为此，使用 [`list_display`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.ModelAdmin.list_display) 后台选项，它是一个包含要显示的字段名的元组，在更改列表页中以列的形式展示这个对象：

polls/admin.py



```python
class QuestionAdmin(admin.ModelAdmin):
    # ...
    list_display = ('question_text', 'pub_date')
```

为了更好用，让我们也包含 [教程第 2 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial02%2F) 中的 `was_published_recently()` 方法：

polls/admin.py



```python
class QuestionAdmin(admin.ModelAdmin):
    # ...
    list_display = ('question_text', 'pub_date', 'was_published_recently')
```

现在修改投票的列表页看起来像这样：

![img](https:////upload-images.jianshu.io/upload_images/12747273-11d01003e2ea358a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

你可以点击列标题来对这些行进行排序——除了 was_published_recently 这个列，因为没有实现排序方法。顺便看下这个列的标题 was_published_recently，默认就是方法名（用空格替换下划线），该列的每行都以字符串形式展示出处。

你可以通过给这个方法（在 polls/models.py 中）一些属性来达到优化的目的，像这样：
 polls/models.py



```python
class Question(models.Model):
    # ...
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'
```

![img](https:////upload-images.jianshu.io/upload_images/12747273-a7d5f4b1e9f1e6da.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

更多关于这些方法属性的信息，参见 [`list_display`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.ModelAdmin.list_display)。

再次编辑文件 `polls/admin.py`，优化 `Question` 变更页：过滤器，使用 [`list_filter`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.ModelAdmin.list_filter)。将以下代码添加至 `QuestionAdmin`：

<pre style="margin: 8px 0px; font-family: 'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier, monospace; font-size: 1rem; color: rgb(12, 75, 51);">list_filter  =  ['pub_date']  </pre>

这样做添加了一个“过滤器”侧边栏，允许人们以 `pub_date` 字段来过滤列表：

![img](https:////upload-images.jianshu.io/upload_images/12747273-caf52ce4b578e85a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png


 展示的过滤器类型取决你你要过滤的字段的类型。因为 `pub_date` 是类 [`DateTimeField`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fmodels%2Ffields%2F%23django.db.models.DateTimeField)，Django 知道要提供哪个过滤器：“任意时间”，“今天”，“过去7天”，“这个月”和“今年”。



这已经弄的很好了。让我们再扩充些功能:

<pre style="margin: 8px 0px; font-family: 'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier, monospace; font-size: 1rem; color: rgb(12, 75, 51);">search_fields  =  ['question_text']  </pre>

在列表的顶部增加一个搜索框。当输入待搜项时，Django 将搜索 `question_text` 字段。你可以使用任意多的字段——由于后台使用 `LIKE`来查询数据，将待搜索的字段数限制为一个不会出问题大小，会便于数据库进行查询操作。

现在是给你的修改列表页增加分页功能的好时机。默认每页显示 100 项。[`变更页分页`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.ModelAdmin.list_per_page), [`搜索框`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.ModelAdmin.search_fields), [`过滤器`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.ModelAdmin.list_filter), [`日期层次结构`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.ModelAdmin.date_hierarchy), 和 [`列标题排序`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.ModelAdmin.list_display) 均以你期望的方式合作运行。

![img](https:////upload-images.jianshu.io/upload_images/12747273-f7bfff843646e13e.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

image.png

## 自定义后台界面和风格

在每个后台页顶部显示“Django 管理员”显得很滑稽。这只是一串占位文本。

不过，这可以通过 Django 的模板系统很方便的修改。Django 的后台由自己驱动，且它的交互接口采用 Django 自己的模板系统。

### 自定义你的 工程的 模板

在你的工程目录（指包含 `manage.py` 的那个文件夹）内创建一个名为 `templates` 的目录。模板可放在你系统中任何 Django 能找到的位置。（谁启动了 Django，Django 就以他的用户身份运行。）不过，把你的模板放在工程内会带来很大便利，推荐你这样做。

打开你的设置文件（`mysite/settings.py`，牢记），在 [`TEMPLATES`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-TEMPLATES) 设置中添加 [`DIRS`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-TEMPLATES-DIRS) 选项：

mysite/settings.py



```csharp
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

[`DIRS`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-TEMPLATES-DIRS) 是一个包含多个系统目录的文件列表，用于在载入 Django 模板时使用，是一个待搜索路径。

现在，在 templates 目录内创建名为 admin 的目录，随后，将存放 Django 默认模板的目录（django/contrib/admin/templates）内的模板文件 admin/base_site.html 复制到这个目录内。
 Django 的源文件在哪里？

如果你不知道 Django 源码在你系统的哪个位置，运行以下命令：



```swift
python -c "import django; print(django.__path__)"
```

![img](https:////upload-images.jianshu.io/upload_images/12747273-f57be6293f710bbb.png?imageMogr2/auto-orient/strip|imageView2/2/w/848/format/webp)

image.png

![img](https:////upload-images.jianshu.io/upload_images/12747273-07fece08cbbd8f65.png?imageMogr2/auto-orient/strip|imageView2/2/w/454/format/webp)

image.png

接着，用你站点的名字替换文件内的 [`](https://docs.djangoproject.com/zh-hans/2.1/intro/tutorial07/#id1){{ site_header|default:_('Django administration') }}`（包含大括号）。完成后，你应该看到如下代码：



```xml
{% block branding %}
<h1 id="site-name"><a href="{% url 'admin:index' %}">Polls Administration</a></h1>
{% endblock %}
```

我们会用这个方法来教你复写模板。在一个实际工程中，你可能更期望使用 [`django.contrib.admin.AdminSite.site_header`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fcontrib%2Fadmin%2F%23django.contrib.admin.AdminSite.site_header) 来进行简单的定制。

这个模板文件包含很多类似 `{% block branding %}` 和 `{{ title }}` 的文本。 `{%` 和 `{{` 标签是 Django 模板语言的一部分。当 Django 渲染 `admin/base_site.html` 时，这个模板语言会被求值，生成最终的网页，就像我们在 [教程第 3 部分](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fintro%2Ftutorial03%2F) 所学的一样。

注意，所有的 Django 默认后台模板均可被复写。若要复写模板，像你修改 `base_site.html` 一样修改其它文件——先将其从默认目录中拷贝到你的自定义目录，再做修改。

![img](https:////upload-images.jianshu.io/upload_images/12747273-6a11eb911d4355e5.png?imageMogr2/auto-orient/strip|imageView2/2/w/1093/format/webp)

image.png

### 自定义后台主页

在类似的说明中，你可能想要自定义 Django 后台索引页的外观。

默认情况下，它展示了所有配置在 [`INSTALLED_APPS`](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.djangoproject.com%2Fzh-hans%2F2.1%2Fref%2Fsettings%2F%23std%3Asetting-INSTALLED_APPS) 中，已通过后台应用注册，按拼音排序的应用。你可能想对这个页面的布局做重大的修改。毕竟，索引页是后台的重要页面，它应该便于使用。

需要自定义的模板是 `admin/index.html`。（像上一节修改 `admin/base_site.html` 那样修改此文件——从默认目录中拷贝此文件至自定义模板目录）。打开此文件，你将看到它使用了一个叫做 `app_list` 的模板变量。这个变量包含了每个安装的 Django 应用。你可以用任何你期望的硬编码链接（链接至特定对象的管理页）替代使用这个变量