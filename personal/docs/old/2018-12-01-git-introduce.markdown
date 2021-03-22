---
layout:       post
title:        "git安装及使用"
subtitle:     "git instructions"
date:         2018-12-01 22:05:00
author:       "ZeFeng"
header-img:   "img/git_bg.jpg"
header-mask:  0.3
catalog:      true
tags:
    - git搭建及使用
---

## 简介
&nbsp;&nbsp;&nbsp;&nbsp;git是目前最流行的分布式版本控制系统，分布式版本控制系统的安全性相对集中式来说更高，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。<br />

## Linux上安装Git
&nbsp;&nbsp;&nbsp;&nbsp;在安装前，我们可以先敲下命令 git，看下看看系统有没有安装Git。<br />
```
$ git
The program 'git' is currently not installed. You can install it by typing:
sudo apt-get install git
```
安装方式一：<br />
&nbsp;&nbsp;&nbsp;&nbsp;如果你用Debian或Ubuntu Linux，通过一条sudo apt-get install git就可以直接完成Git的安装，非常简单。<br />
安装方式二：<br />
&nbsp;&nbsp;&nbsp;&nbsp;其他Linux版本，可以直接通过源码安装。<br />
先从Git官网下载源码，然后解压，依次输入以下这几个命令安装就好了：<br />
```
./config
make
sudo make install
```

## Windows上安装Git
&nbsp;&nbsp;&nbsp;&nbsp;在Windows上使用Git，可以从Git官网直接[下载安装程序](https://git-scm.com/downloads)，（网速慢的同学请移步[国内镜像](https://pan.baidu.com/s/1kU5OCOB#list/path=%2Fpub%2Fgit)），然后按默认选项安装即可。<br />

安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明Git安装成功！<br />
安装后，还需要输入下面两个命令，完成配置：<br />
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

## 创建版本库
&nbsp;&nbsp;&nbsp;&nbsp;版本库其实就是我们平时说的仓库，也可以理解为目录。<br />
这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。<br />

#### Step1
创建空目录：<br />
```
$ mkdir mygit
$ cd mygit
$ pwd
```
Tip: mygit名字自己定义就可以了。<br />
pwd命令的作用是用于显示当前目录<br />

#### Step2
把这个目录变成Git可以管理的仓库：<br />
```
$ git init
```
仓库搭建好之后，这里我们搭建的是一个空的仓库。<br />
可以看到目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的（一般不要去修改这个目录，很容易把Git仓库给破坏）。<br />
如果没有看到.git目录，那是因为这个目录默认是隐藏的，用ls -ah命令就可以看见。<br />


## 提交文件Demo
&nbsp;&nbsp;&nbsp;&nbsp;完成了上面的搭建，我们这里来写一个使用git的例子。一般项目都有一个readme.txt，所以我们以这个写个Demo。<br />
Step1:<br />
编写一个readme.txt文件,内容如下：<br />
```
Git is a version control system.
Git is free software.
```
Tip: 新建的文件一定要放到mygit的目录下(子目录也行)。

Step2:<br />
把文件添加到仓库:<br />
```
$ git add readme.txt
```
Step3:<br />
把文件提交到仓库:<br />
```
$ git commit -m "wrote a readme file"
[master (root-commit) eaadf4e] wrote a readme file
 1 file changed, 2 insertions(+)
 create mode 100644 readme.txt
```
Tip:<br />
git commit命令，-m后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。<br />

#### 可以多次add不同的文件
commit可以一次提交很多文件，所以你可以多次add不同的文件：<br />
```
$ git add file1.txt
$ git add file2.txt file3.txt
$ git commit -m "add 3 files."
```

## 结语
&nbsp;&nbsp;&nbsp;&nbsp;这篇文章讲解了如何搭建git，创建本地仓库，还有一个提交文件的Demo。






