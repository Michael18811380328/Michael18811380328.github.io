# Django 介绍

需要基本的Python知识。Django是一个python框架。Django采用了MVC的软件设计模式，即模型M，视图V和控制器C。不同的python版本对应的不同的Django，目前电脑上安装的是python2.7.10的版本，所以安装的Django需要匹配。

Django是一个开放源代码的Web应用框架，由Python写成。采用了MVT的框架模式，即模型M，视图V和模版T。

参考网站：http://www.runoob.com/django/django-install.html

https://www.jianshu.com/p/faeee7d5ad3b


# ERROR: No matching distribution found for Django 报错解决

今天安装一个 python 依赖时，执行 `pip install -r requirements.txt `后，界面出现`ERROR: No matching distribution found for Django === 3.0.2" `这个报错。我的依赖如下：

~~~txt
Django==3.0.2
django-appconf==1.0.3
django-statici18n==1.9.0
django-webpack-loader==0.6.0
djangorestframework==3.11.0
PyMySQL==0.9.3
~~~

 查找资料后，发现可能是如下问题

## 问题1 pip 版本太老

执行 `easy_install *--upgrade pip*` 

~~~bash
easy_install *--upgrade pip* 
pip --version
# pip 20.2.3 from /Library/Python/2.7/site-packages/pip (python 2.7)
~~~

我的 pip 已经更新，执行 pip install 还是原来的错误

## 问题2 python版本不对应

我这里需要安装 3.0.2 的 Django，默认电脑的python版本是 2.7。我创建的虚拟环境是 2.7 的版本，所以无法安装。

stackoverflow 上的解释是：

> You don't need to update `pip` to find new packages. It looks them up on PyPI.
>
>  [Ubuntu 16.04's `python3` package](https://packages.ubuntu.com/xenial/python3) is for version 3.5., which [is supported by Django 2.2](https://docs.djangoproject.com/en/3.0/releases/2.2/).
>
> Either upgrade your Python (I recommend using something like [`pyenv`](https://github.com/pyenv/pyenv) or [`pythonz`](https://github.com/saghul/pythonz) to easily decouple your Python version from your operating system) or use Django 2.2.

django 3.0.2 需要 python3 的环境，我本地默认是 python2 的虚拟环境，所以无法安装。

解决方案是：新建一个python3的虚拟环境（具体参考另一篇博客）

然后可以顺利安装：


## 参考网址

https://stackoverflow.com/questions/60027430/no-matching-distribution-found-for-django-3-0-on-ubuntu-16-04

https://blog.csdn.net/w417950004/article/details/74171327
