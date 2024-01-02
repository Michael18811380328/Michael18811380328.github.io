# coding=utf-8
import requests
from bs4 import BeautifulSoup

"""
功能：使用脚本爬取 runoob 的 100 个 python 练习案例，并写入本地文件
"""
print('spider start')

for page in range(1, 101):
    f = open('./' + str(page) + "" + '.py', "a")
    f.write("")
    r = requests.get(
        "https://www.runoob.com/python/python-exercise-example" +
        str(page) +
        ".html")
    r.encoding = 'utf-8'
    r.encoding = None
    data = BeautifulSoup(
        r.text,
        'html.parser').find_all(
        'div',
        class_='hl-main')
    for j in data:
        f.write("# %d道题目代码 \n" % page)
        f.write(
            "# https://www.runoob.com/python/python-exercise-example%d.html \n" %
            page)
        f.write("%s\n\n" % (j.text))

print('spider end')
