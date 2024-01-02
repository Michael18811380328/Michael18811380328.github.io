# coding=utf-8

# Python 中字符串也是一种简单数据类型。字符串的方法可以灵活使用。
var1 = 'Hello'
var2 = 'Python'

# 字符串的截取（类似于数组下标）

# 获取一个字符串直接使用下标。获取多个字符使用方括号,截取字符串（左闭右开截取），中间使用冒号间隔。
print(var1[2])
print(var1[1:3])
print(var1[0:2] + ' Test')

# 字符串运算

# 连接字符串
print(var1 + var2)

# 重复字符串
print(var2 * 2)

# 字符串包括子字符串
if ("H" in var1):
    print("H 在 字符串中")
else:
    print("H 不在字符串中")

if ("H" not in var2):
    print("hello")
else:
    print("hi")
