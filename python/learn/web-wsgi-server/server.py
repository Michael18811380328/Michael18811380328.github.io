# coding=utf-8
# server.py
# 从wsgiref模块导入:
from wsgiref.simple_server import make_server
# 导入我们自己编写的application函数:
from hello import application

# 创建一个服务器，IP地址为空，端口是8000，处理函数是application:
httpd = make_server('', 8080, application)
print "Serving HTTP on port 8080..."
# 开始监听HTTP请求:
httpd.serve_forever()

# 参考网站
# https://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000/001386832689740b04430a98f614b6da89da2157ea3efe2000


# 使用流程：将这个文件和 hello.py 文件放在同一个路径下，运行 python server.py，
# 如果提示端口冲突就换一个端口。然后再浏览器中打开 localhost:8080 即可看到前端的界面和最简单的服务器配置。
