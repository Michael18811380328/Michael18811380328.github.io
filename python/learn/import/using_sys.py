# coding=utf-8
#!/usr/bin/python3

import sys
# 引入python标准库的模块
# import module1, module2, module3 需要放在文件的顶部

print('parameters are')

for i in sys.argv:
    print(i)
    print('\n')

# 自动查找路径的模块
print(sys.path)
