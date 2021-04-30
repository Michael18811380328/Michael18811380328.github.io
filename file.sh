#!/bin/bash

# cat ./book/docs/res.md | while read line
# do
#     echo "- '$line': '$line'"
#     # 根据实际子目录确定这里的格式
# done


# dir: book
echo "book start------"
ls ./book/docs | while read line
do
  echo "- '$line': '$line'"
done
echo "book end------"
echo -e "\n\n"
sleep 2

# dir personal
echo "personal start------"
ls ./personal/docs/old | while read line
do
  echo "- '$line': 'old/$line'"
done
ls ./personal/docs/ruby | while read line
do
  echo "- '$line': 'ruby/$line'"
done
ls ./personal/docs | while read line
do
  echo "- '$line': '$line'"
done
echo "personal end------"
echo -e "\n\n"
sleep 2

# dir backend
echo "backend start------"
ls ./backend/docs/nodejs | while read line
do
  echo "- '$line': 'nodejs/$line'"
done
ls ./backend/docs/python | while read line
do
  echo "- '$line': 'python/$line'"
done
ls ./backend/docs/backend-sql | while read line
do
  echo "- '$line': 'backend-sql/$line'"
done
ls ./backend | while read line
do
  echo "- '$line': '$line'"
done
echo "backend end------"
echo -e "\n\n"
sleep 2


# frontend array and loop
echo "frontend start------"
my_array=('' 'about' 'algre' 'git' 'interview' 'javascript' 'netease' 'project' 'react' 'typescript')
# len=${#my_array[*]} 
for i in {0..9}
do
  str="${my_array[i]}"
  ls "./frontend/docs/${str}" | while read line
  do
    echo "- '$line': '${str}/$line'"
  done
  echo -e "\n"
done
echo "frontend end------"
echo -e "\n\n"
