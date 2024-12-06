# apache 构建镜像
FROM httpd:2.4
COPY ./public-html/ /usr/local/apache2/htdocs/

# 从 Python 3.7 映像开始构建镜像
# 可能报错 FROM python:3.7-alpine 找不到，改成 FROM python:3.7
FROM python:3.7

# 将工作目录设置为 /code
WORKDIR /code

# 设置 flask 命令使用的环境变量
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0

# 安装 gcc，以便诸如 MarkupSafe 和 SQLAlchemy 之类的 Python 包可以编译加速。如果这个执行错误，直接注释也可以继续执行。
# RUN apk add --no-cache gcc musl-dev linux-headers

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

# 容器提供默认的执行命令为：flask run
CMD ["flask", "run"]
