# coding=utf-8
import requests
from bs4 import BeautifulSoup
import io
import sys
import time
import re
reload(sys)
sys.setdefaultencoding('utf8')

print('start')

# filename = 'test_text.txt'

# with open(filename, 'w') as file_object:

# 先爬取列表（全部的小说名）
r = requests.get("http://17short.com/")
r.encoding = 'utf-8'
r.encoding = None
data = BeautifulSoup(r.text, 'html.parser').find_all('a')
articles = []
# 过滤不合适的链接
for a in data:
    href = a.get('href')
    if re.search('%e', href):
        print(href)
        articles.append(href)
# 这是过滤后的结果
# print(articles)
# 循环爬取文本并写入不同的文件

for i in range(0, len(articles)):
    href = articles[i]
    print(href)
    filename = '' + str(i) + '.txt'
    # filename = href + '.txt'
    with open(filename, 'w') as file_object:
        try:
            file_object.write("%s\n\n\n\n" % ('test'))
            r = requests.get(href)
            r.encoding = 'utf-8'
            r.encoding = None
            data = BeautifulSoup(r.text, 'html.parser').find_all('p')
            for j in data:
                file_object.write("%s\n\n\n\n" % (j.text))
                # print(j.text)
        except Exception as identifier:
            print(identifier)

    # 能否写成独立的文件
    # for href in articles:
    #   print(href)
    #   r = requests.get(href)
    #   r.encoding='utf-8'
    #   r.encoding=None
    #   data = BeautifulSoup(r.text,'html.parser').find_all('p')
    #   for j in data:
    #     file_object.write("%s\n\n\n\n" % (j.text))
    #     print(j.text)

print('end')
