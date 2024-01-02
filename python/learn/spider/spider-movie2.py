import json
from parse import parse_url
import requests
from retrying import retry

# headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"}
headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36"}


@retry(stop_max_attempt_number=3)  # 响应数
def _parse_url(url):  # 可能会报错的函数 对这个做个异常捕获 控制处理
    # print("*"*30)
    r = requests.get(url, headers=headers, timeout=5)  # 可能报错
    assert r.status_code == 200
    return r.content.decode("utf-8")


def parse_url(url):  # 捕获异常
    try:
        html = _parse_url(url)
    except Exception as e:
        print("报错了", e)
        html = None
    return html


if __name__ == '__main__':
    html = parse_url("")
    if html is None:
        print("请求不成功")
        html = parse_url("http://dubai.com/")
        print(html)
    else:
        print("请求成功")


get_video.py


# 获取电视剧指定某集的视频信息

def get_url(p, n=1):
    # p 页数 n 电视剧集数
    url = "http://api.cntv.cn/videoset/getVideoListByAlbumId?id=VIDA1404730290373811&mode=0&p={}&n={}&sort=2&serviceId=tvcctv&cb=".format(
        p, n)
    return url


def get_guid(url):
    json_response = parse_url(url)
    json_loads = json.loads(json_response)
    guid = json_loads['itemList'][0]['guid']
    return guid


def get_video(guid):
    v_url = "http://vdn.apps.cntv.cn/api/getIpadVideoInfo.do?pid={}&vn=2049".format(
        guid)
    v_response = parse_url(v_url)
    # v_loads = json.loads(v_response)
    return v_response


def get_json(str):
    # 返回数据处理为类json字符串
    str_start = len("var html5VideoData = '")
    str_end = len("';getHtml5VideoData(html5VideoData);")
    video_str = str[str_start:-str_end]
    # v_str = json.loads(video_str)
    return video_str


def run():
    # 传递第一集信息
    temp_url = get_url(1)
    # 获取响应guid
    temp_guid = get_guid(temp_url)
    # 获取视频详情请求
    temp_video = get_video(temp_guid)
    # 处理类json结果
    temp_json = get_json(temp_video)
    # 保存数据到txt
    f = open("video_info.txt", "w", encoding="utf-8")
    f.write(temp_json)
    f.close()


if __name__ == '__main__':
    run()
