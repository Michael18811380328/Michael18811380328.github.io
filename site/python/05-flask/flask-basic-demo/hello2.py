from flask import Flask, url_for
app = Flask(__name__)


@app.route('/index')
def index():
    return 'This is index page'


@app.route('/login')
def login():
    return 'This is home page'


if __name__ == '__main__':
    app.debug = True
    app.run()
