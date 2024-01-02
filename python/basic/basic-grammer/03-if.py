# coding=utf-8

# 1、if 语句嵌套
month = int(input("please enter a month: "))
if 1 <= month <= 12:
    print("input month correctly")
    if month <= 3:
        print("spring")
    elif month <= 6:
        print("summer")
    elif month <= 9:
        print("autumn")
    else:
        print("winter")
else:
    print("input error")
# 如果输入字符串等非数字就会报错

# 2 if-else
# 表达式1 if 判断 else 表达式2
money = int(input("please input price"))
pay = money - 20 if money >= 100 else money
print(pay)
# 如果价格超过100元，那么总价减20元。

# 3 输入
money = input("please input money")
moneyNew = int(money)
print(moneyNew)

# pass 空语句
pass
