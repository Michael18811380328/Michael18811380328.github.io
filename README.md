# Michael An 的个人站点

这是 Michael An 的 个人站点，欢迎大家交流。

## 开发说明

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


## todo 

- 不同的子项目内容分类优化

- 不同平台互相引流

- 不同子项目设置不同的样式

- 相关文档整理说明


### 其他说明

执行 pip install mkdocs

报错

command "python setup.py egg_info" failed with error code 1 in /private/tmp/p

注意：不能直接在Mac上面安装，需要设置虚拟环境，然后在虚拟环境中安装比较好，这样不同的项目不会互相影响。




### Mkdocs 配置文件

~~~yml
site_name: Michale An Blog
site_author: Michael An

pages:
- 首页: index.md
- 进程与线程: 1.md
- UUID: 2.md

# 这是一个二级导航
nav:
- Home: 'index.md'
- User Guide:
    - '原地算法': 'in-place.md'
    - '二分算法': 'part-two.md'
- Learn:
    - '双指针': 'double-pointer.md'
    - '分治算法': 'diverce.md'
    - '聚类算法': 'K-means.md'
- About:
    - 'License': 'process-and-thread.md'
    - 'Release Notes': 'uuid.md'

# https://mkdocs.zimoapps.com/user-guide/ 详细资料可以参考这里

docs_dir: ./docs

copyright: Copyright &copy; TEST


# site_url: https://michael18811380328.github.io/blog/
# repo_name: blog
# repo_url: https://github.com/Michael18811380328/blog


theme: material
# readthedocs
# mkdocs
# material

# https://github.com/squidfunk/mkdocs-material
# 这个主题需要自定义 pip 安装
# 其他的主题参考 https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes

# theme:
#   name: material
#   # icon:
#   logo: assets/logo32_32.png
#   # features:
#     # - tabs
#   palette:
#     primary: deep orange
#     accent:


# plugins:
#   - search # necessary for search to work
#   - awesome-pages

# # Customization
# extra:
#   social:
#     - icon: fontawesome/brands/github
#       link: https://github.com/Michael18811380328/blog

# # Extensions
# markdown_extensions:
#   - markdown.extensions.admonition
#   - markdown.extensions.attr_list
#   - markdown.extensions.codehilite:
#       guess_lang: true
#   - markdown.extensions.def_list
#   - markdown.extensions.footnotes
#   - markdown.extensions.meta
#   - markdown.extensions.toc:
#       permalink: true
#       toc_depth: "1-4"

~~~



### 参考文档

https://mkdocs.zimoapps.com/

https://markdown-docs-zh.readthedocs.io/zh_CN/latest/

https://blog.csdn.net/wirelessqa/article/details/78173401

https://www.jianshu.com/p/9f618689954a

https://blog.csdn.net/u011324454/article/details/79076885

https://blog.csdn.net/u011092188/article/details/64123561