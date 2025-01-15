# coding=utf-8
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
