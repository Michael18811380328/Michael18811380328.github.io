### 报错 Auto packing the repository in background for optimum performance-ok

git 报错 Auto packing the repository in background for optimum performance

本地 “悬空对象”太多(git删除分支或者清空stash的时候，这些其实还没有真正删除，成为悬空对象，我们可以使用merge命令可以从中恢复一些文件)

解决：删除悬挂的分支

~~~bash
git fsck --lost-found # 可以看到好多“dangling commit” 
git gc --prune=now #完成
~~~

