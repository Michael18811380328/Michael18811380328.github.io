# coding=utf-8
# 请求库
import requests
# 解析库
from bs4 import BeautifulSoup
# 用于解决爬取的数据格式化
import io
import sys
reload(sys)
sys.setdefaultencoding('utf8')

# sys.stdout = io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8')
# 爬取的网页链接
r = requests.get(
    "http://jsqg.sports.cn/index.php?s=/home/index/index/p/1.html")
# 类型
# print(type(r))
# print(r.status_code)
# 中文显示
r.encoding = 'utf-8'

r.encoding = None
# print(r.encoding)
# print(r.text)
result = r.text
# 再次封装，获取具体标签内的内容
bs = BeautifulSoup(result, 'html.parser')
# 具体标签
print("解析后的数据")
# print(bs.span)
a = {}
# 获取已爬取内容中的script标签内容
data = bs.find_all('script')
# 获取已爬取内容中的td标签内容
data1 = bs.find_all('li')

# for j in data1:
#     print(j.text)


filename = 'test_text.txt'
with open(filename, 'w') as file_object:
    #     file_object.write("Add a word\n")
    #     file_object.write("Add two words\n")
    for j in data1:
        #       print(j.text)
        file_object.write("%s\n" % (j.text))


# # 循环打印输出
# for i in data:
#     a=i.text
# #     print(i.text,end='')
#     for j in data1:
#         print(j.text)
