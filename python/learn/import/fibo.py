# coding=utf-8
# 斐波那契(fibonacci)数列模块

# 定义到 n 的斐波那契数列
def fib1(n):
    a, b = 0, 1
    while b < n:
        print(b, end=' ')
        a, b = b, a + b
        print()

# 返回到 n 的斐波那契数列


def fib2(n):
    result = []
    a, b = 0, 1
    while b < n:
        result.append(b)
        a, b = b, a + b
    return result

# import fibo
# fibo.fib1(1000)
# fibo.fib2(100)
# fibo.__name__

# from fib import fib1, fib2
# we can import several functions
# then use fib1, fib2
# from fib import *
# 这提供了一个简单的方法来导入一个模块中的所有项目。然而这种声明不该被过多地使用。

# dir(fib)
# ['__name__', 'fib', 'fib2']
# 返回当前的模块名，和内部的全部函数名（字符串列表形式返回）
