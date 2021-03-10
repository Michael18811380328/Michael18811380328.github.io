# coding=utf-8
# https://www.runoob.com/ruby/ruby-datatypes.html
# 数据类型概述

# Ruby 的简单数据类型：Number/String/Ranges/Symbols/boolean/nil

# 1 Number = 整形（长整型、短整形） + 浮点型

# 整形支持常见的进制
# 1_234_000 # 带有下划线的十进制
# 0377 # 八进制
# 0xff # 十六进制
# 0b1000 # 二进制
# 12345678900987654321 # 大数（绝对值大于2的32次方）

f3 = 1000.1
puts f3;

# 基本计算：加减乘除 指数是**
puts 2**(4 - 1); # 8

# 2 字符串类型数据：字符串可以进行加操作，特殊符号使用转义符号处理，支持模板字符串（字符串内部加入变量）
puts "test a + b = #{10 * 10 - 1}";

name = "Mike";
puts name;
puts "My name is #{name}";
