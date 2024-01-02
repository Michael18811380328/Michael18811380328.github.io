# coding=utf-8
import requests
from bs4 import BeautifulSoup
import io

print('spider start')
filename = 'result.txt'
with open(filename, 'w') as file_object:
    articles = [
        'https://www.runoob.com/linux/linux-shell.html',
    ]
    for page in range(1, 12):
        str = articles[page]
        print(str)
        r = requests.get(str)
        r.encoding = 'utf-8'
        r.encoding = None
        data = BeautifulSoup(
            r.text, 'html.parser').find_all(
            'div', class_='article-body')
        for j in data:
            file_object.write("%s\n\n" % (j.text))
print('spider end')
