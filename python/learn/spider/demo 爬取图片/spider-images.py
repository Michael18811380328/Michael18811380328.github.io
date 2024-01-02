# 请求网页
import time
import requests
import re
import os

# 问题：已知很多服务器端图片，不需要token就可以下载的图片

# 这里设置虚拟的请求头，避免服务器反向拦截
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36'}
# response=requests.get('https://www.vmgirls.com/9384.html', headers=headers)

# print(response.request.headers)
# print(response.text)
# html=response.text

# 解析网页
# 目录名字
# dir_name=re.findall('<img alt="(.*?)" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width=".*?" height=".*?" class="alignnone size-full" data-src=".*?" data-nclazyload="true">',html)[-1]

# 设置爬取结果的名称，如果没有就创建目录
dir_name = 'result-images'

if not os.path.exists(dir_name):
    os.mkdir(dir_name)

# urls=re.findall('<img alt=".*?" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width=".*?" height=".*?" class="alignnone size-full" data-src="(.*?)" data-nclazyload="true">',html)

# 将图片地址循环写入到列表中
urls = []
for num in range(1, 100):
    url = 'http://www.ruanyifeng.com/images_pub/pub_' + str(num) + '.jpg'
    urls.append(url)

# 遍历列表，获取图片地址
for url in urls:
    # 加个延时,避免给服务器造成压力
    time.sleep(1)
    # 设置图片的名字
    file_name = url.split('/')[-1]
    response = requests.get(url, headers=headers)
    # 将请求内容保存到本地
    with open(dir_name + '/' + file_name, 'wb') as f:
        f.write(response.content)
