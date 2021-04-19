# 02-Node.js 安装配置（ok）

本章节我们将向大家介绍在 Windows 和 Linux 上安装 Node.js 的方法。

本安装教程以 Node.js v4.4.3 LTS(长期支持版本)版本为例。

Node.js 安装包及源码下载地址为：https://nodejs.org/en/download/。

![nodejs_download](https://www.runoob.com/wp-content/uploads/2014/03/download-page.jpg)

你可以根据不同平台系统选择你需要的 Node.js 安装包。

**注意：**Linux 上安装 Node.js 需要安装 Python 2.6 或 2.7 ，不建议安装 Python 3.0 以上版本。

------

## Linux 上安装 Node.js

### 直接使用已编译好的包

Node 官网已经把 linux 下载版本更改为已编译好的版本了，我们可以直接下载解压后使用：

```
# wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz    // 下载
# tar xf  node-v10.9.0-linux-x64.tar.xz       // 解压
# cd node-v10.9.0-linux-x64/                  // 进入解压目录
# ./bin/node -v                               // 执行node命令 查看版本
v10.9.0
```

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：

```
ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/ 
ln -s /usr/software/nodejs/bin/node   /usr/local/bin/
```

### Ubuntu 源码安装 Node.js

以下部分我们将介绍在 Ubuntu Linux 下使用源码安装 Node.js 。 其他的 Linux 系统，如 Centos 等类似如下安装步骤。

在 Github 上获取 Node.js 源码：



```
$ sudo git clone https://github.com/nodejs/node.git
Cloning into 'node'...
```

修改目录权限：

```
$ sudo chmod -R 755 node
```

使用 **./configure** 创建编译文件，并按照：

```
$ cd node
$ sudo ./configure
$ sudo make
$ sudo make install
```

查看 node 版本：

```
$ node --version
v0.10.25
```

### Ubuntu apt-get命令安装

命令格式如下：

```
sudo apt-get install nodejs
sudo apt-get install npm
```

### CentOS 下源码安装 Node.js

1、下载源码，你需要在https://nodejs.org/en/download/下载最新的Nodejs版本，本文以v0.10.24为例:

```
cd /usr/local/src/
wget http://nodejs.org/dist/v0.10.24/node-v0.10.24.tar.gz
```

2、解压源码

```
tar zxvf node-v0.10.24.tar.gz
```

3、 编译安装

```
cd node-v0.10.24
./configure --prefix=/usr/local/node/0.10.24
make
make install
```

4、 配置NODE_HOME，进入profile编辑环境变量

```
vim /etc/profile
```

设置 nodejs 环境变量，在 ***export PATH USER LOGNAME MAIL HOSTNAME HISTSIZE HISTCONTROL*** 一行的上面添加如下内容:

```
#set for nodejs
export NODE_HOME=/usr/local/node/0.10.24
export PATH=$NODE_HOME/bin:$PATH
```

:wq保存并退出，编译/etc/profile 使配置生效

```
source /etc/profile
```

验证是否安装配置成功

```
node -v
```

输出 v0.10.24 表示配置成功

npm模块安装路径

```
/usr/local/node/0.10.24/lib/node_modules/
```

**注：**Nodejs 官网提供了编译好的 Linux 二进制包，你也可以下载下来直接应用。

------

## Mac OS 上安装

你可以通过以下两种方式在 Mac OS 上来安装 node：

- 1、在官方下载网站下载 pkg 安装包，直接点击安装即可。

- 2、使用 brew 命令来安装：

  ```
  brew install node
  ```

### 版本管理工具 nvm 

  强烈建议使用nvm(Node Version Manager) ，nvm是 Nodejs 版本管理器，它让我们方便的对切换Nodejs 版本。

  nvm 介绍：[使用 nvm 管理不同版本的 node 与 npm](https://www.runoob.com/w3cnote/nvm-manager-node-versions.html)

  关于nvm的详细安装以及使用可以访问以下链接：

  -  **Linux**: https://github.com/creationix/nvm
  -  **Windows**: https://github.com/coreybutler/nvm-windows

  在 MAC 上安装使用 **brew install nvm**, 其中 brew 是 Homebrew。

  安装 nvm 后可能会出现 **zsh: command not found: nvm**，我们可以使用以下命令来安装：

  ```bash
  curl -o- [https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh](https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh) | bash [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh
  ```

  使用

  ```bash
  nvm ls-remote 查看有哪些node版本可以安装
  nvm 用于管理node 版本
  nvm list 查看当前所有的node 版本
  nvm install v10.13.0 安装指定的版本，安装多版本
  nvm use —delete-prefix 10.13.0 使用nvm use切换到指定的版本
  nvm current 查看当前node版本
  nvm alias default <version> 命令来指定一个默认的node版本
  ```

### 版本管理工具 n

~~~bash
n
# 现在本机安装三个版本，通过键盘选择使用的版本
node/8.16.0
node/12.18.4
node/15.9.0
~~~
