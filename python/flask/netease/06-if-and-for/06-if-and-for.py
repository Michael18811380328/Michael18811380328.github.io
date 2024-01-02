# coding=utf-8
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    comments = [
        'this is comment1',
        'this is comment2',
        'this is comment3'
    ]
    user = {
        'name': 'Mike',
        'age': 20,
        'comments': comments
    }
    return render_template('index.html', **user)


if __name__ == '__main__':
    app.run(debug=True)
