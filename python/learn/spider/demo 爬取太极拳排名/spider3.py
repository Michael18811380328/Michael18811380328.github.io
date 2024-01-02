# coding=utf-8
import requests
from bs4 import BeautifulSoup
import io
import sys
import time
reload(sys)
sys.setdefaultencoding('utf8')

print('start')

filename = 'test_text.txt'
with open(filename, 'w') as file_object:
    for page in range(1, 360):
        print(
            "http://jsqg.sports.cn/index.php?s=/home/index/index/p/" +
            str(page) +
            ".html")
        r = requests.get(
            "http://jsqg.sports.cn/index.php?s=/home/index/index/p/" +
            str(page) +
            ".html")
        r.encoding = 'utf-8'
        r.encoding = None
        data = BeautifulSoup(r.text, 'html.parser').find_all('li')
        for j in data:
            file_object.write("%s\n" % (j.text))
            # print(j.text)

print('end')
