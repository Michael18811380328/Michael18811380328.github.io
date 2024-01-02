# coding=utf-8
from wordcloud import WordCloud  # word cloud
import matplotlib.pyplot as plt  # paint
import jieba
import pandas as pd
import matplotlib.image as mpimg
import numpy as np
from PIL import Image

text = pd.read_excel('C:/Users/Michael/Desktop/test.xlsx', header=0)

cnt = ''
for rows in text[1]:
    cnt = cnt + rows

cnt.replace(' ', '')
wordlist = jieba.cut(cnt, cut_all=False)
wl = '/'.join(wordlist)
imreceive = np.array(Image.open('C:/Users/Michael/Desktop/code.png'))

wc = WordCloud(
    background_color="white",
    max_words=3000,
    font_path='C:\\Windows\\Fonts\\STHUPO.TTF',  # font in PC
    #   height= 1200,
    #   width= 1600,
    max_font_size=200,
    random_state=40,  # set random state
    mask=imreceive  # if you set mask, height and width in invalid
)
myword = wc.generate(wl)  # generate word cloud

plt.imshow(myword)
plt.axis("off")
plt.show()
wc.to_file('C:/Users/Michael/Desktop/Michael-words-cloud.png')
