# coding=utf-8
# from django.http import HttpResponse

# def hello(request):
#     return HttpResponse("Hello world ! ")
import os
from django.shortcuts import render

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

print BASE_DIR


def hello(request):
    # 创建一个空字典（对象）
    context = {}
    context['hello'] = 'Hello World!'  # 设置字典的某一项是字符串
    context['MEDIA_URL'] = BASE_DIR  # 需要获取文件的根目录
    return render(request, 'hello-zn.html', context)  # 使用这个字典去替换html中的参数

# 这样让视图和数据分离。数据存放在 view.py 中，视图使用 html 处理。
