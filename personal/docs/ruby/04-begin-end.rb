#coding=utf-8

puts "This is main function"; # 这是行内注释

END {
  puts "This is end function. It will run after main function.";
}

BEGIN {
  puts "This is begin function. It will run before main function.";
}

# 这是单行注释（和Python一样）

=begin
这里是多行注释
Ruby 是一个解释性语言
end=