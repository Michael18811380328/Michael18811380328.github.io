#coding=utf-8

# variable 5个常见变量
# 普通变量 小写字母或者下划线开头
# 常量 大写字母开头
# 全局变量 $ 开头
# 实例变量 @ 开头
# 类变量 @@ 开头

# example global variable: avoid use global svariable

$global_variable = 10

class Class
  def print_global
    puts "global variabel #{$global_variable}"
  end
end

class1 = Class.new()
class1.print_global()

# example Instance Variable

class Custom

  @@number_of_custom = 0
  # 这里是类变量，必须初始化后才能在方法中使用这个变量
  
  VAR1 = 3.1415
  # 这是常量

  # 初始函数名必须是initialize
  def initialize(id, name, addr)
    @cust_id = id
    @cust_name = name
    @cust_addr = addr
  end

  def display()
    puts "#{@cust_addr}, #{@cust_name}, #{@cust_id}"
  end

  def total()
    @@number_of_custom +=1
    puts "total is #@@number_of_custom"
    puts "#{VAR1}"
  end

end

cust1 = Custom.new("123", "michale", "7th rd")
cust1.display()
cust1.total()

# 伪变量：特殊的变量，不能赋值
# self 当前方法的接收器对象
# true
# false
# nil 表示 undefined
# _FILE_ 当前原文件的名称
# _LINE_ 当前行在原文件的行号
