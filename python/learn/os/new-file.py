# coding-utf-8
from __future__ import unicode_literals
import os

# 批量创建目录或者文件
def main():
    cmd = 'mkdir hello'
    a = 1
    while a <= 10:
        os.system(cmd + str(a))
        a += 1

if __name__ == "__main__":
    main()
