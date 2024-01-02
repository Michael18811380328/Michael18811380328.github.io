# coding=utf-8
import urllib
# urllib 是一个重要的内部模块；
# API: urllib.urlopen(url[,data[,proxies]])
# 功能：发送一个请求，返回一个文件对象，对结果的文件对象进行处理。（类似于前端的ajax请求。python直接在运用内发送一个get请求，将获取的文件结果存放在结果对象中）
# urlopen返回对象提供方法：
# read() , readline() ,readlines() , fileno() , close() ：这些方法的使用方式与文件对象完全一样
# info()：返回一个httplib.HTTPMessage对象，表示远程服务器返回的头信息
# getcode()：返回Http状态码。如果是http请求，200请求成功完成;404网址未找到
# geturl()：返回请求的url

import re
# re
# replace 正则表达式。
# re.compile(pattern [, flags])
# 该函数根据包含的正则表达式的字符串创建模式对象。

import time
# time 库函数
# 获取当前的时间，time.time()，从而获取两个操作的时间间隔，获取一段时间。
# 可以获取当前的时间戳，对于创建token等参数

global x
x = 1
# 全局变量的使用是为了使我们在一个类或一个函数中使用由函数返回的变量，并进行复杂的计算过程而使用。


def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()
    return html
# File Object 的 read(number)
# 方法，传参表示获取文件对象的制定的字节数，通常情况不含有任何的字节数。这个函数的主要作用：根据一个url网址，获取当前页面的全部HTML（爬下来）


def getImg(html):
    global x
    reg = r'src=".+?\.jpg" alt = '
    image_url = re.compile(reg)
    imalist = re.findall(image_url, html)
    for imgurl in imglist:
        urllib.urlretrive(imgurl, '%s.jpg' % x)
        x += 1
        return imglist


def delayRun():
    i = 1
    while i < 100:
        time.sleep(0.5)
        url = "http://www.mzitu.com/12306/" + str(i)
        html = getHtml(url)
        getImg(html)
        i += 1


if __name__ == '__main__':
    global x
    delayRun()
