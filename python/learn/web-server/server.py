# coding=utf-8
import logging
import socket
import select
import re

# from wsgi_web import make_server
# 界面报错没有这个库
# 这个界面运行有些错误
from wsgiref.simple_server import make_server


logging.basicConfig(level=logging.WARNING,
                    filename='./web框架日志.txt',
                    filemode='w',
                    format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')


class WebServer:
    """创建一个Web服务器"""

    def __init__(self):
        # 1.创建tcp socket
        self.tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # 2.设置地址可重用
        self.tcp_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        # 3.绑定到某个端口
        self.tcp_socket.bind(('', 6060))
        # 4.设置监听队列
        self.tcp_socket.listen(128)

    def run(self):
        """运行服务器"""
        # 1.设置tcp_socket为非阻塞状态
        self.tcp_socket.setblocking(False)
        # 2.创建epoll对象，并注册服务器的监听事件
        epoll = select.epoll()
        epoll.register(self.tcp_socket.fileno(), select.EPOLLIN)
        client_dict = dict()
        # 3.不断遍历epoll列表，检查fd上有无事件发生
        while True:
            epoll_list = epoll.poll()
            for fd, event in epoll_list:
                if fd == self.tcp_socket.fileno():
                    # 有客户端来连接服务器
                    client_socket, client_addr = self.tcp_socket.accept()
                    # 注册客户端的事件
                    epoll.register(client_socket.fileno(), select.EPOLLIN)
                    # 客户端与其fd要建立关联
                    client_dict[client_socket.fileno()] = client_socket
                else:
                    # 说明客户端发送数据过来
                    # 通过fd来处理客户端的请求
                    self.response_client(fd, client_dict, epoll)

    def response_client(self, client_fd, client_dict, epoll):
        """处理客户端的请求"""
        try:
            req_heads = client_dict[client_fd].recv(1024).decode('utf-8')
        except Exception as e:
            logging.warning(e)
            if not req_heads:
                # 1.关闭客户端
                client_dict[client_fd].close()
                # 2.从监听队列中移除该客户端
                client_dict.popitem()
                # 3.取消该客户端的注册事件
                epoll.unregister(client_fd)

        try:
            # print(req_heads.splitlines()[0])
            # 1.解析客户端的请求url
            match = re.match(r'[^/]+(/[^ ]*)', req_heads.splitlines()[0])
            if match:
                # 匹配成功
                filename = match.group(1)
                if filename == '/':
                    filename = '/index.html'
        except Exception as e:
            logging.warning(e)
            # print('匹配数据出现了错误:{}'.format(e))
        # 2.根据文件名去动态加载，然后伪装成静态页面发送
        if filename.endswith('.html'):
            url_params = dict()
            # 1.使用WSGI接口
            # 通过不同文件构造一个字典
            url_params['filename'] = filename
            # print(url_params)
            # 定义一个函数传给框架
            body = wsgi_web.application(url_params, self.resp_heads)
            # 2.拼接数据然后发送给浏览器
            # 构造响应头信息
            # 空行
            # 响应体
            resp_head = 'HTTP/1.1 %s\r\n' % self.status_code
            for field in self.resp_fields:
                # 设置Content-Length的长度
                resp_head += '%s:%s\r\n' % (field[0], field[1] if field[0]
                                            != 'Content-Length' else len(body.encode('utf-8')))
            content = resp_head + '\r\n' + body
            client_dict[client_fd].send(content.encode('utf-8'))
        else:
            # 返回静态数据
            try:
                f = open('./static%s' % filename, 'rb')
            except Exception as e:
                # 读取失败
                body = 'Sorry! File not found!'
                resp_head = 'HTTP/1.1 404 Not Found\r\n'
                resp_head += 'Content-Length:%d\r\n' % len(body)
                resp_head += '\r\n'
                content = resp_head + body
                client_dict[client_fd].send(content.encode('utf-8'))
                # print('读取文件失败！')
                logging.warning(e)
            else:
                # 读取成功
                body = f.read()
                resp_head = 'HTTP/1.1 200 OK\r\n'
                resp_head += 'Content-Length:%d\r\n' % len(body)
                resp_head += '\r\n'
                try:
                    client_dict[client_fd].send(resp_head.encode('utf-8'))
                    client_dict[client_fd].send(body)
                except Exception as e:
                    logging.warning(e)

    def resp_heads(self, status_code, fields):
        """在框架中使用的函数，框架用来返回响应头信息"""
        self.status_code = status_code
        self.resp_fields = fields


def main():
    """程序入口"""
    # 1.初始化服务器
    server = WebServer()
    # 2.运行服务器
    server.run()


if __name__ == '__main__':
    main()
