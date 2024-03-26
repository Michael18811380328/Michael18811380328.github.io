#!/usr/bin/env python
# _*_coding:utf-8 _*_
# @Time    :2019/9/26 9:13
# @Author  :花神庙
# @email  :m201871632@hust.edu.cn
# @FileName: extract_feature.py
# @Software: PyCharm

import os
import jieba
import pandas as pd
from jieba import analyse
import collections
import io


def tf_idf(text, key_num):
    # 引入TF-IDF关键词抽取接口
    tfidf = analyse.extract_tags
    # 基于TF-IDF算法进行关键词抽取
    keywords = tfidf(text)
    # print('tfidf提取关键词：')
    # 输出抽取出的关键词
    tfidf_keywords = []
    for keyword in keywords[:key_num]:
        tfidf_keywords.append(keyword)
    tfidf_keyword = ' '.join(tfidf_keywords)  # 以空格分隔各关键信息
    # print(tfidf_keyword)
    return tfidf_keywords


def text_rank(text, key_num):
    textrank = analyse.textrank
    keywords = textrank(text)
    # print('textrank提取关键词：')
    # 输出抽取出的关键词
    textrank_keywords = []
    for keyword in keywords[:key_num]:
        textrank_keywords.append(keyword)
    textrank_keyword = ' '.join(textrank_keywords)  # 以空格分隔各关键信息
    # print(textrank_keyword)
    return textrank_keywords


def get_cn_csv(filename):
    """
    获取含中文名称的csv数据
    :return:
    使用 python2 跑，不能直接使用 open 方法，需要使用 io.open 方法
    """
    with io.open(filename, encoding='utf-8') as file:
        data = pd.read_csv(file, error_bad_lines=False)
        data.columns = ['序号', '用户', '评论', '时间']
        data = data.loc[data['评论'] != '此用户没有填写评论!']
        data = data.loc[data['评论'] != '"评价方未及时做出评价,系统默认好评!"']
        # print(filename,len(data['用户']))
        return data


def get_count(cut_words, save_path):
    word_counts = collections.Counter(cut_words)  # 对分词做词频统计
    word_counts_top = word_counts.most_common()  # 获取最高频的词
    # print(word_counts_top)
    word_data = {}
    for index, word in enumerate(word_counts_top):
        word_data[index] = {'word': word[0], 'num': word[1]}
    data = pd.DataFrame(word_data).T
    data.to_excel(save_path, index=None, encoding='utf-8-sig')
    return word_data


def main():
    """主程序"""
    Folder_Path = './data'
    tf_idf_words = []
    text_rank_words = []
    for root, dirs, files in os.walk(Folder_Path):
        # print(files)
        for file in files:
            filename = os.path.join(root, file)
            data = get_cn_csv(filename)
            comments = data['评论']
            for comment in comments:
                try:
                    # print('评论为：{}'.format(comment))
                    num = int(len(comment) / 4)
                    tfidf_keyword = tf_idf(comment, num)
                    textrank_keyword = text_rank(comment, num)
                    tf_idf_words += tfidf_keyword
                    text_rank_words += textrank_keyword
                except Exception as e:
                    pass
    get_count(tf_idf_words, './tfidf_feature.xlsx')
    get_count(text_rank_words, './textrank_feature.xlsx')


if __name__ == '__main__':
    main()  # 程序入口
