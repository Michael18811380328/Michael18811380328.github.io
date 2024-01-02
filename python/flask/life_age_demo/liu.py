from flask import Flask, render_template

tim = Flask(__name__)


@tim.route('/')
def main():
    return render_template('index-welcome.html')


@tim.route('/zn')
def index():
    return render_template('index-zn.html')


@tim.route('/en')
def english():
    return render_template('index-en.html')


@tim.route('/result')
def result():
    return render_template('index-result.html')


tim.run(debug=True, port=8080)
