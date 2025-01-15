# coding=utf-8
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    # 实际上需要从数据库中查询获取信息，并传递到界面上面
    name = u'Mike'
    hobby = u'soccer'
    paras = {
        'name': name,
        'hobby': hobby
    }
    # 这里使用**进行解构赋值
    return render_template("index.html", **paras)


if __name__ == '__main__':
    app.run(debug=True)
