# Mac 搭建 python3 开发环境

## 问题描述

我本地需要运行一个 Django3 的项目，Django3 需要 python3 的开发环境，我的 MAC 上默认安装 python 2.7.10 版本，所以需要新建一个 python3 的开发环境。

因为其他项目会使用 python2 的开发环境。为了避免项目互相干扰，我使用 virtualenv 搭建 python3 开发环境。


## 安装python3

如果电脑上没有 python3 的软件，需要下载安装；如果已经有python3，那么直接跳到下一章：

安装脚本如下：

```bash
wget https://www.python.org/ftp/python/3.4.3/Python-3.4.3.tgz
tar zxvf Python-3.4.3.tgz 
cd Python-3.4.3               
./configure --enable-shared --prefix=/usr/local
make && make altinstall
```

安装其它版本的python可从官网下载： https://www.python.org/

安装完成后，可以在终端输入 python3 验证安装是否成功，图片如下（我本地安装的3.7.0版本）



## 搭建python3开发环境

1、安装virtualenv，可以通过pip进行安装，命令如下：

```bash
pip install virtualenv
```

2、创建虚拟环境：

注意：这里 python3.7 对应你安装的版本（3.4或者3.7）

```bash
virtualenv -p /usr/local/bin/python3.7 你的虚拟环境的名称（例如，py37-michael-blog-env）
```

执行上述命令后，会在当前目录创建虚拟环境文件夹（py37-michael-blog-env）。

3、激活虚拟环境：

```bash
source py37-michael-blog-env/bin/activate
```

进行相关开发（pip install -r requirements）等等

加入图片

4、退出虚拟环境 

```bash
deactivate   　　　　　　
```

再次进入项目时，只需要执行3-4步骤即可（激活-开发-退出虚拟环境）
