# coding=utf-8
import json
# from urllib.parse import urlencode
# from urlparse import urlencode

try:
    from urllib import urlencode
except ImportError:
    from urllib.parse import urlencode

# import pymongo
import requests
from requests.exceptions import ConnectionError
import re
import sys


def get_page_index(keyword, pagesize):
    data = {
        'callback': 'jQuery112408098406646795082_1546606289402',
        'keyword': keyword,
        'page': 1,
        'pagesize': pagesize,
        'userid': -1,
        'clientver': '',
        'platform': 'WebFilter',
        'tag': 'em',
        'filter': 2,
        'iscorrection': 1,
        'privilege_filter': 0
    }
    url = "https://songsearch.kugou.com/song_search_v2?" + urlencode(data)

    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.text
        return None
    except ConnectionError:
        print('Error occurred')
        return None


def parse_page_index(html, pagesize):
    temp = re.match('^jQuery.*?\\((.*?)\\)$', html)
    data = json.loads(temp.group(1))

    # print(data)
    lists = data.get('data').get('lists')
    print lists

    if len(lists) < pagesize:
        pagesize = len(lists)
    for i in range(pagesize):
        print i
        # print(str(i+1)+". "+str(lists[i]['FileName']).replace('<em>','').replace('</em>',''))

    print('\n[如果需要下载多首,请用空格隔开] (输入0退出)')
    numbers = list(map(int, input("请输入需要下载的歌曲序号:").split(' ')))

    if numbers[0] == 0:
        return None
    for number in numbers:
        name = str(lists[number - 1]['FileName']).replace('<em>',
                                                          '').replace('</em>', '').replace(' ', '')
        print(name)
        hash_url = 'http://www.kugou.com/yy/index.php?r=play/getdata&hash=' + \
            lists[number - 1].get('FileHash')
        hash_content = requests.get(hash_url)
        play_url = ''.join(re.findall('"play_url":"(.*?)"', hash_content.text))
        real_download_url = play_url.replace("\\", "")
        print('downloading...')
        with open("./music/" + name + ".mp3", "wb") as fp:
            fp.write(requests.get(real_download_url).content)
        print("Download successfully!\n")


def main():
    keyword = raw_input("please input song names")
    pagesize = 20
    if len(sys.argv) > 1:
        pagesize = int(sys.argv[1])
    html = get_page_index(keyword, pagesize)
    parse_page_index(html, pagesize)


if __name__ == '__main__':
    main()
