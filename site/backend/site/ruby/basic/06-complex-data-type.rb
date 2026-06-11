# coding=utf-8
# Ruby 的复杂数据类型：Array/Hash(Rush哈希类似于JS对象)/范围

# array
arr = [10, 0.13, "hello"];
arr.each do |i|
  puts i
end

# hash
hsh = colors = {
    "red" => "ff0000",
    "green" => "00ff00",
    "blue" => "0000ff",
};

hsh.each do |key, value|
  print key, " is ", value, "\n";
end

# range
(10..20).each do |n|
  print n, " \n";
end
