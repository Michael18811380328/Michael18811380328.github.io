# coding=utf-8
# 服务器给数据,返回数据给服务器
import re
from urllib.request import unquote  # 解码中文,只用在浏览器自动对中文编码

import DBHelper

# 定义空字典,用来存储路径跟对应的函数引用
url_dict = dict()

# start_response框架给服务器传响应头的数据
# environ获取服务器传过来的文件路径


def application(environ, start_response):
    """返回具体展示的界面给服务器"""
    start_response('200 OK', [('Content-Type', 'text/html;charset=utf-8'),
                              ('Content-Length', '')])  # 返回响应头

    # 根据不同的地址进行判断
    file_name = environ['filename']
    for key, func in url_dict.items():
        match = re.match(key, file_name)  # 地址跟规则一致
        if match:
            # 匹配到了
            return func(match)  # 调用匹配到的函数引用,返回匹配的页面内容
 　　 　　 else:
        　　 　　 # 说明没找到
        　　 　　 return "不好意思，页面走丢了!"


# 装饰器传参,用来完成路由的功能
def route(url_address):  # url_address表示页面的路径
    """目的自动添加路径跟匹配的函数到url字典中"""
    def set_fun(func):
        def call_fun(*args, **kwargs):
            return func(*args, **kwargs)
        # 根据不同的函数名称去添加到字典中
        url_dict[url_address] = call_fun
        return call_fun
    return set_fun
