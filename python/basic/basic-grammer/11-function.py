# coding=utf-8
import time


def list():
    l1 = [10, 20, 30]
    l1.insert(0, 40)  # 在数组的第0位插入40
    l1[1] = 100  # 设置指定位置的数值 数组的第1位设置位100
    print(l1)  # result [40, 100, 20, 30]
    l2 = l1.pop(2)
    print(l2)  # l2 = 100(数值)


def tiple():
    t = ('a', 2, 3)
    print(t)
    t2 = (1, 2, t)
    print(t2)  # (1, 2, ('a', 2, 3))


def for_loop(list):
    for i in list:
        print(i * 2)


def add_odd_number():
    i = 0
    sum = 0
    while i < 100:
        if i % 2 == 1:
            sum += i
        i += 1
    print(sum)  # 2500


def produce():
    j = 2
    produce_sum = 0
    while True:
        produce_sum += j * 2
        j += 2
        print(produce_sum)
        time.sleep(0.1)
        if j > 100:
            break
    print(produce_sum)


def continue_function():
    sum = 0
    x = 0
    while True:
        x += 1
        if x > 100:
            break
        if x % 2 == 0:
            continue
        sum += x
    print(sum)
    print(x)


def number_special():
    # 打印个位数小于10位数的100以内的正整数
    x = 1
    while x < 10:
        y = x
        while y < 9:
            y += 1
            print(x * 10 + y)
            time.sleep(0.1)
        x += 1

# 字典（json）


def dict():
    data = {
        "Mike": 100,
        "Tom": 98
    }
    for key in data:
        print(key + ':', data[key])
# 注意，key是字符串，data 是int,不能直接拼接输出


def main():
    list()
    tiple()
    for_loop((10, 20, 'a'))
    add_odd_number()
    produce()
    continue_function()
    number_special()
    dict()


main()
