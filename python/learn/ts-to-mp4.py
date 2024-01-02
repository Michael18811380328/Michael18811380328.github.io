import os
# exec_str = r'copy /b  ts/c9645620628078.ts+ts/c9645620628079.ts  ts/1.ts'
# os.system(exec_str)
f = open('index.m3u8', 'r', encoding='utf-8')
text_list = f.readlines()
files = []
for i in text_list:
    if i.find('#EX') == -1:
        files.append(i)

f.close()


tmp = []
for file in files[0:450]:
    tmp.append(file.replace("\n", ""))
    # 合并ts文件
os.chdir("ts/")
shell_str = '+'.join(tmp)
# print(shell_str)
shell_str = 'copy /b ' + shell_str + ' 5.mp4'

os.system(shell_str)
print(shell_str)
