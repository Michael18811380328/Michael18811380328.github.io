# coding=utf-8
from re import compile

# 这部分代码需要在python3命令中执行
try:
    from html.parser import HTMLParser
except ImportError:
    from html import HTMLParser

# 这个库安装一直有问题
from bs4 import BeautifulSoup

# url管理器


class UrlManager(object):
    """
    url管理器主要有三个功能：add_new_url添加新的待爬取的页面；get_new_url删除已爬取的页面；标记待爬取的和已爬取的页面。
    """

    def __init__(self):
        self.new_urls = set()
        self.old_urls = set()

    def add_new_url(self, url):
        if url is None:
            return
        # 如果传入的url既不在待爬取的url里又不在爬过的url里，说明它是待爬取的url
        if url not in self.new_urls and url not in self.old_urls:
            self.new_urls.add(url)

    def add_new_urls(self, urls):
        if urls is None or len(urls) == 0:
            return
        for url in urls:
            self.add_new_url(url)

    def has_new_url(self):
        return len(self.new_urls) != 0

    def get_new_url(self):
        new_url = self.new_urls.pop()  # 从待爬去的url中剔除要爬取的目标
        self.old_urls.add(new_url)     # 添加到
        return new_url

# 简单的下载器


class HtmlDownloader(object):
    def download(self, url):
        if url is None:
            return None
        response = urllib.request.urlopen(url)
        if response.getcode() != 200:
            return None
        return response.read()

# 解析器


class HtmlParser(object):
    def _get_new_urls(self, page_url, soup):
        # 这里要提一下，百度百科python词汇的url是https://baike.baidu.com/item/Python/407313
        # 页面中的a标签的href属性都类似href="/item/%E6%95%99%E5%AD%A6"这种属性
        # 在处理时，需要加上baike.baidu.com保证url资源定位符的完整性。后面只需匹配"/item/"
        new_urls = set()
        links = soup.find_all('a', href=compile(r"/item/\S*"))
        for link in links:
            new_url = link["href"]
            new_full_url = urllib.parse.urljoin(page_url, new_url)
            new_urls.add(new_full_url)
        return new_urls

    def _get_new_data(self, page_url, soup):
        res_data = {}
        res_data["url"] = page_url
        # 爬取标题
        # <dd class="lemmaWgt-lemmaTitle-title"></dd><h1>Python</h1>
        title_node = soup.find(
            "dd", attrs={
                "class": "lemmaWgt-lemmaTitle-title"}).find("h1")
        res_data["title"] = title_node.get_text()
        # 爬取简介内容
        # <div class="lemma-summary" label-module="lemmaSummary"></div>
        # 这个div下的所有div里的text
        summary_node = soup.find(
            'div',
            attrs={
                "class": "lemma-summary",
                "label-module": "lemmaSummary"})
        res_data["summary"] = summary_node.get_text()
        return res_data

    def parse(self, page_url, html_doc):
        if page_url is None or html_doc is None:
            return
        # 解析成了一个整个的DOM对象，也就是纯html格式的文件
        soup = BeautifulSoup(html_doc, "html.parser", from_encoding="utf-8")
        new_urls = self._get_new_urls(page_url, soup)
        new_data = self._get_new_data(page_url, soup)
        # print("page_url: %r, new_urls: %r, new_data: %r" % (page_url, new_urls, new_data))
        return new_urls, new_data

# 输出器


class HtmlOutputer(object):
    def __init__(self):
        self.datas = []

    def collect_data(self, data):
        if data is None:
            return
        self.datas.append(data)

    def output_html(self):
        fout = open("output.html", 'w', encoding="UTF-8")
        fout.write("<html>")
        fout.write(
            "<meta http-equiv='content-type' content='text/html;charset=utf-8'>")
        fout.write("<body>")
        fout.write("<table>")
        for data in self.datas:
            fout.write("<tr>")
            fout.write("<td>%s</td>" % data['url'])
            fout.write("<td>%s</td>" % data['title'])
            fout.write("<td>%s</td>" % data['summary'])
            fout.write("</tr>")
        fout.write("</table>")
        fout.write("</body>")
        fout.write("</html>")


class SpiderMain(object):
    def __init__(self):
        self.urls = UrlManager()
        self.downloader = HtmlDownloader()
        self.parser = HtmlParser()
        self.outputer = HtmlOutputer()

    def craw(self, root_url):
        count = 1
        self.urls.add_new_url(root_url)
        while self.urls.has_new_url():
            try:
                new_url = self.urls.get_new_url()
                html_cont = self.downloader.download(new_url)
                # print("\033[1;36m %r \033[0m" % html_cont.decode("utf-8"))
                new_urls, new_data = self.parser.parse(new_url, html_cont)
                self.urls.add_new_urls(new_urls)
                self.outputer.collect_data(new_data)
                if count == 11:
                    break
                print("\033[1;36m [CRAW]\033[0m :  %d %r" % (count, new_url))
                count += 1
            except Exception as e:
                print("craw failed")
                print(e)
        self.outputer.output_html()
