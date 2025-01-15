# coding=utf-8
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
