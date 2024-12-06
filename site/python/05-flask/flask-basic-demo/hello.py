# coding=utf-8
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World! My Flask'


@app.route('/setting')
def setting():
    return 'This is setting page'

# set parameters in URL(string)


@app.route('/person/<username>')
def show_user(username):
    return 'Hello %s' % username

# set parameters in URL(int number, float, path)


@app.route('/post/<int:id>')
def show_post(id):
    return 'This is %d' % (id * 10)


@app.route('/home')
def home():
    return 'This is home page'


if __name__ == '__main__':
    # set debug = True so that when code is change, server can auto restart
    app.debug = True
    app.run()
