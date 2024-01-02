# coding=utf-8

for letter in 'Python':
    if letter == 'P':
        continue
    if letter == 'o':
        break
    if letter == 'h':
        pass
    print('now is %s' % letter)
print('end')

# pass 没有实际的含义，主要表示占位（python缩进很重要）
# 如果没有 pass 程序就不能正确运行：IndentationError: expected an indented block
