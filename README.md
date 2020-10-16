# 使用说明

1、首先 cd 到虚拟环境目录下面并开启虚拟环境

```bash
cd ~/workroom/VirtualEnv/mkdocs-env
cd bin
source activate
```

2、在虚拟环境内部，切换到当前文件夹下面（mkdocs.yml）

~~~bash
cd ***
~~~

3、编辑

编辑博客配置文件YML

编辑博客的文档 DOCS

4、开启本地服务器

~~~bash
mkdocs serve
~~~

5、编译HTML界面

~~~bash
mkdocs build
~~~

编译后的文件放在 site 目录下面

可以使用 http-server 本地再次测试一下编译后界面效果

6、拷贝 site 下面的目录到外部根目录下面，然后push到github上面，即可显示编译后的界面





### 其他说明

执行 pip install mkdocs

报错

command "python setup.py egg_info" failed with error code 1 in /private/tmp/p

注意：不能直接在Mac上面安装，需要设置虚拟环境，然后在虚拟环境中安装比较好，这样不同的项目不会互相影响。



### 参考文档

https://mkdocs.zimoapps.com/

https://markdown-docs-zh.readthedocs.io/zh_CN/latest/

https://blog.csdn.net/wirelessqa/article/details/78173401

https://www.jianshu.com/p/9f618689954a

（https://blog.csdn.net/u011324454/article/details/79076885）

https://blog.csdn.net/u011092188/article/details/64123561