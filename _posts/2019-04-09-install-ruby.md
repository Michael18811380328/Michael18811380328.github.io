---
layout: post
title:  "Mac 安装 Ruby 和 jekyll"
date:   2019-01-02 17:59:11 +0800
categories: jekyll update
---

按照下面的流程安装框架，创建新的博客
~~~bash
# 这是主要流程
brew install ruby
ruby install gem
gem install jekyll

mkdir test
jelyll new bolb
~~~


~~~bash
# 安装 rvm 工具(Ruby版本管理工具)
daniels-mbp:~ seafile$ curl -L https://get.rvm.io | bash -s stable
Installation of RVM in /Users/seafile/.rvm/ is almost complete:

# 开始使用 RVM To start using RVM you need to run `source /Users/seafile/.rvm/scripts/rvm`
daniels-mbp:~ seafile$ source ~/.rvm/scripts/rvm

# 查看版本号，确定正确安装 RVM
daniels-mbp:~ seafile$ rvm -v
rvm 1.29.7 

# 查看已有Ruby版本号
daniels-mbp:~ seafile$ rvm list known
@ MRI Rubies
[ruby-]1.8.6[-p420]
[ruby-]1.8.7[-head] @ security released on head
[ruby-]1.9.1[-p431]
[ruby-]1.9.2[-p330]
[ruby-]1.9.3[-p551]
[ruby-]2.0.0[-p648]
[ruby-]2.1[.10]
[ruby-]2.2[.10]
[ruby-]2.3[.8]
[ruby-]2.4[.5]
[ruby-]2.5[.3]
[ruby-]2.6[.0]
ruby-head

# 使用 RVM 安装Ruby(教训：实际需要安装高级版本，2.3以上版本) MAC直接使用 brew 安装 Ruby 也可以
daniels-mbp:~ seafile$ rvm install 2.0.0

Searching for binary rubies, this might take some time.
Checking requirements for osx.
ruby-2.0.0-p648 - @configuring.................................................
ruby-2.0.0-p648 - @post-configuration.
ruby-2.0.0-p648 - @compiling...................................................|
ruby-2.0.0-p648 - @installing..............
ruby-2.0.0-p648 - @making binaries executable..
ruby-2.0.0-p648 - @downloading rubygems-2.7.9

# 查看 ruby 版本，确认安装成功
daniels-mbp:~ seafile$ ruby --version
ruby 2.0.0p648 (2015-12-16 revision 53162) [x86_64-darwin17.5.0]

# 安装高级版本 2.6.0
daniels-mbp:~ seafile$ rvm install 2.6.0

Searching for binary rubies, this might take some time.
ruby-2.6.0 - @making binaries executable..
ruby-2.6.0 - @gemset created /Users/seafile/.rvm/gems/ruby-2.6.0@global
ruby-2.6.0 - @importing gemset /Users/seafile/.rvm/gemsets/global.gems.........-
ruby-2.6.0 - @generating global wrappers.......
ruby-2.6.0 - @gemset created /Users/seafile/.rvm/gems/ruby-2.6.0
ruby-2.6.0 - @generating default wrappers.......
ruby-2.6.0 - @adjusting @shebangs for (gem irb erb ri rdoc testrb rake).
Install of ruby-2.6.0 - @complete 

# 再次检查版本，安装 2.6 成功
daniels-mbp:~ seafile$ ruby --version
ruby 2.6.0p0 (2018-12-25 revision 66547) [x86_64-darwin17]

# 下载 ruby-gem 并安装
daniels-mbp:~ seafile$ cd desktop/rubygems-3.0.3/
daniels-mbp:rubygems-3.0.3 seafile$ ruby setup.rb

Bundler 1.17.3 installed
RubyGems 3.0.3 installed
Regenerating binstubs
Parsing documentation for rubygems-3.0.3
Installing ri documentation for rubygems-3.0.3

# 监测 gem 版本，确认安装成功
daniels-mbp:rubygems-3.0.3 seafile$ gem --version
3.0.3

# 使用 gem 安装 jekyll
daniels-mbp:rubygems-3.0.3 seafile$ gem install jekyll
Fetching rouge-3.3.0.gem
# ......
25 gems installed

# 监测 jekyll 版本号，安装成功
daniels-mbp:rubygems-3.0.3 seafile$ jekyll --version
jekyll 3.8.5

# 安装过程出现的问题，根据界面信息，需要安装 cocoapods
daniels-mbp:~ seafile$ gem install cocoapods
YAML safe loading is not available. Please upgrade psych to a version that supports safe loading (>= 2.0).

# 备注：同样可以使用 brew 安装 ruby(不需要安装RVM)
daniels-mbp:desktop seafile$ brew install ruby
==> Installing dependencies for ruby: openssl
==> Installing ruby dependency: openssl
~~~
参考网址：

https://www.cnblogs.com/daguo/p/4097263.html

https://www.jianshu.com/p/c073e6fc01f5