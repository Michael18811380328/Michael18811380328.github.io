# Mac安装MySQLdb（python-mysql）模块

#### 前面

Python写的项目需要连接MySQL数据库，所以本地需要安装MySQLdb模块，但是在安装的过程中也是遇到了一些问题，在这里记录一下，不得不说，简书的Markdown编辑器用着太爽了，用了很久，还是喜欢这种简洁简单的东西，让你更关注内容，而不是其它。

> 操作系统：MacOS 10.12.5
> Python版本：2.7.10
> pip： 9.0.1

#### 开始吧

一般的，如果你使用了连接MySQL的代码，或者依赖于MySQLdb类库的类库，就会看到这个：`ImportError: No module named MySQLdb`，提示找不到模块。

这个时候我们就需要安装对应的`MySQL for Python`了，也就是`MySQL-python`，在终端执行`pip install MySQL-python`，额~前提是你已经安装pip了啊。

#### 遇到错误

当你按下回车键的那一刹那，屏幕上，就出现了错误：`EnvironmentError: mysql_config not found`，嗯，这是咋回事，网上查查去。。。

粗略看了一下，大概意思就是，你还需要安装一个MySQL，What？我就是想连接一下数据库，不至于还要下一个数据库吧。仔细看了看又，原来是需要安装一个mysql开发包（当然你也可以本地安装一个MySQL），好吧，没办法，那再来。

在官网看了下，应该就是这个货

手动下载了dmg版本的，根据提示安装完毕，终端运行`pip install MySQL-python`发下还是原来的错误，又去查了查资料，应该是安装的mysql库没有加入环境变量，现在就是要找到我刚才安装的mysql到哪个目录了。终端窗口执行`find / -name mysql_config`，结果中有一个：/usr/local/mysql-connector-c-6.1.10-macos10.12-x86_64/bin/mysql_config
，应该就是它了，通过：`export PATH=$PATH:/usr/local/mysql-connector-c-6.1.10-macos10.12-x86_64/bin/`加入环境变量。

#### 再次错误

再次执行`pip install MySQL-python`，看到输出的错误，我简直崩溃了。

```ruby
Collecting MySQL-python
  Using cached MySQL-python-1.2.5.zip
    Complete output from command python setup.py egg_info:
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/private/var/folders/d1/1lnf846x6p119488dvhnqj740000gn/T/pip-build-b16vZo/MySQL-python/setup.py", line 17, in <module>
        metadata, options = get_config()
      File "setup_posix.py", line 53, in get_config
        libraries = [ dequote(i[2:]) for i in libs if i.startswith(compiler_flag("l")) ]
      File "setup_posix.py", line 8, in dequote
        if s[0] in "\"'" and s[0] == s[-1]:
    IndexError: string index out of range
    
    ----------------------------------------
```

#### 换一种方式

还能不能愉快的玩耍了~
Google了一下，没有解决，我想我要换一种方式了。
把刚才安装的mysql开发包删掉。
通过brew重新安装试试。



```bash
# install brew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

有兴趣的同学可以去brew官网看看，居然有中文，厚道：[https://brew.sh/index_zh-cn.html](https://link.jianshu.com/?t=https://brew.sh/index_zh-cn.html)

#### 怀疑人生/胜利在望

这一次直接`brew install mysql`，等待安装完毕，再再再执行`pip install MySQL-python`，嗯~果然还是错误，这就是人生啊。



```bash
3 warnings generated.
    cc -bundle -undefined dynamic_lookup -arch x86_64 -arch i386 -Wl,-F. build/temp.macosx-10.12-intel-2.7/_mysql.o -L/usr/local/Cellar/mysql/5.7.18_1/lib -lmysqlclient -lssl -lcrypto -o build/lib.macosx-10.12-intel-2.7/_mysql.so
    ld: library not found for -lssl
    clang: error: linker command failed with exit code 1 (use -v to see invocation)
    error: command 'cc' failed with exit status 1
```

就是上面这个错误，于是乎，我又Google，发现了：[https://stackoverflow.com/questions/22697440/cc-failed-with-exit-status-1-error-when-install-python-library](https://link.jianshu.com/?t=https://stackoverflow.com/questions/22697440/cc-failed-with-exit-status-1-error-when-install-python-library)

就是这个人解答的，和我遇到的问题一样

然后我通过大神的指示：`xcode-select --install`，会弹出xcode的软件安装窗口，等待几分钟，安装完毕，再次执行：`pip install MySQL-python`。

呼~成功了你相信吗？

```bash
Collecting MySQL-python
  Downloading MySQL-python-1.2.5.zip (108kB)
    100% |████████████████████████████████| 112kB 127kB/s 
Installing collected packages: MySQL-python
  Running setup.py install for MySQL-python ... done
Successfully installed MySQL-python-1.2.5
```
