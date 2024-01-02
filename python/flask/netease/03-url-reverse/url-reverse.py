from flask import Flask, url_for
import config
app = Flask(__name__)
app.config.from_object(config)


@app.route('/')
def hello_world():
    print url_for('handle_index')
    print url_for('change_page', number=20)
    return 'Hello World!'


@app.route('/index')
def handle_index():
    return 'index page'


@app.route('/page/<number>')
def change_page(number):
    return 'this is %s' % number


if __name__ == '__main__':
    app.run()
