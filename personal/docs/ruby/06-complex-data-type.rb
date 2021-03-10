# coding=utf-8
# Ruby 的复杂数据类型：Array/Hash(Rush哈希类似于JS对象)/范围
# 这里简单做一个使用，后面说具体的操作

ary = [10, 0.13, "hello"];
ary.each do |i|
  puts i
end

hsh = colors = { "red" => "ff0000", "green" => "00ff00", "blue" => "0000ff" };
hsh.each  do |key, value|
  print key, " is ", value, "\n";
end

# 范围类型
(10..20).each do |n|
  print n, " \n";
end