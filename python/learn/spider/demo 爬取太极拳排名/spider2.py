# coding=utf-8
import requests
from bs4 import BeautifulSoup
import io
import sys
import time
reload(sys)
sys.setdefaultencoding('utf8')

print("开始爬取数据")
r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/1.html")
r.encoding = 'utf-8'
r.encoding = None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data1 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/2.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data2 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/3.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data3 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/4.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data4 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/5.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data5 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/6.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data6 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/7.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data7 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/8.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data8 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/9.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data9 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/10.html")
# r.encoding='utf-8'
# r.encoding=None
result = r.text
bs = BeautifulSoup(result, 'html.parser')
data10 = bs.find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/11.html")
data11 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/12.html")
data12 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/13.html")
data13 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/14.html")
data14 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/15.html")
data15 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/16.html")
data16 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/17.html")
data17 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/18.html")
data18 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/19.html")
data19 = BeautifulSoup(r.text, 'html.parser').find_all('li')

r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/20.html")
data20 = BeautifulSoup(r.text, 'html.parser').find_all('li')


# 380 页，可以写一个数组循环构建字符串并批量处理
# 然后一次写入文件

print("开始解析数据")

filename = 'test_text.txt'
with open(filename, 'w') as file_object:
    for j in data1:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data2:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data3:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data4:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data5:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data6:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data7:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data8:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data9:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data10:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data11:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data12:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data13:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data14:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data15:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data16:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data17:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data18:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data19:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)
    for j in data20:
        file_object.write("%s\n" % (j.text))
        print(j.text)
        time.sleep(0.02)

print("前240名获取结束")
