#!/bin/bash

# cat ./book/docs/res.md | while read line

# do
#     echo "- '$line': '$line'"
#     # 根据实际子目录确定这里的格式
# done

# cat ./personal/docs/res.md | while read line

# do
#     echo "- '$line': '$line'"
#     # 根据实际子目录确定这里的格式
# done

cat ./frontend/docs/res.md | while read line

do
    echo "- '$line': '$line'"
    # 根据实际子目录确定这里的格式
done

# cat ./backend/docs/res.md | while read line

# do
#     echo "- '$line': '$line'"
#     # 根据实际子目录确定这里的格式
# done