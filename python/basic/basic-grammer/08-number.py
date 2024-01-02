# coding=utf-8

# 1、python 数据类型不会改变；如果改变数据类型的值，那么会重新分配内存

# 可以使用 del 语句删除单个或者多个对象及引用
# 删除变量
a = 10
del a
# print(a) NameError: name 'a' is not defined

# 2、python 数据类型

# int 整数
a = 10
print(a)

# float 浮点型 整数部分+小数部分 可以使用科学计数法表示
b = 0.1
c = 3.673e2
print(c)

# 复数 a + bj
d = 3.14j + 3.14
print(d)

# 3、number 的数据转换

# int(a, [,base])
# float(a)
# complex(real, [,imag])
