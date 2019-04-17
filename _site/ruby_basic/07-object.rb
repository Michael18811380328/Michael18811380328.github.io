#coding=utf-8

# 首先了解变量类型：Ruby 中的变量分为四种：
# 全局变量（$）/类变量（@@）/实例变量(@)/
# 局部变量（实例中的方法中的变量，使用小写字母或者下划线定义局部变量）

class Custom

  # 定义一个类变量
  @@number_of_custom = 0;

  # 定义一个方法（函数）
  def init(id, name, add)
    @cust_id = id
    @cust_name = name
    @cust_address = add
  end

  def sayHello
    @hello = "hello"
    puts @hello
  end
end

# 创建实例对象使用关键词 new
custom1 = Custom.new;
custom1.sayHello;

# 实例二

class Student
  @@number = 0;

  def initialize(id, name)
    @stu_id = id
    @stu_name = name
  end

  def display()
    puts "Student ID is #{@stu_id}"
    puts "Student's name is #{@stu_name}"
  end

  def total_of_student()
    @@number += 1;
    print "total number of students is ", @@number, "\n"
  end
end

student1 = Student.new(12, "Mike")
student2 = Student.new(13, "Amy")

student1.display()
student1.total_of_student()

student2.display()
student2.total_of_student()
