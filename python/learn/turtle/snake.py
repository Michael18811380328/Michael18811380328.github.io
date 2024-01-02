# coding=utf-8

# turtle库 与蟒蛇案例
import turtle
# 引入海龟库（绘图）
import os
import time


def drawSnake(rad, angle, len, neckrad):
    for i in range(len):
        turtle.circle(rad, angle)
        turtle.circle(-rad, angle)
        # 沿着海龟的左侧某一点做圆形
    turtle.circle(rad, angle / 2)
    turtle.fd(rad)
    # turtle.fd 沿着海龟前方想运行40
    time.sleep(5)
    # 暂停5秒钟
    turtle.circle(neckrad + 1, 180)
    turtle.fd(rad * 2 / 3)
    time.sleep(10)
    os.system('pause')


def main():
    turtle.setup(1200, 800, 0, 0)
    # turtle.setup(width, height, startx, starty)
    # 设置窗体的位置和大小
    pythonsize = 30
    turtle.pensize(pythonsize)
    # pensize 设置画笔宽度30
    turtle.seth(-40)
    # turtle.seth(angle)
    # 改变画笔的角度，角度按照逆时针，但是不前进
    drawSnake(40, 80, 5, pythonsize / 2)


main()
# 运行函数

# https://www.cnblogs.com/yudanqu/p/8683794.html
