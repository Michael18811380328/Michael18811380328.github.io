# install ruby env

run this in terminal, then create new blogs.

~~~bash
brew install ruby
ruby install gem
gem install jekyll

mkdir test
jelyll new bolb
~~~


~~~bash
# install rvm toolc(Ruby version management tool)
curl -L https://get.rvm.io | bash -s stable
Installation of RVM in /.rvm/ is almost complete:

# start use RVM: To start using RVM you need to run `source /.rvm/scripts/rvm`
source ~/.rvm/scripts/rvm

# view Ruby version and make sure install successfully
rvm -v
rvm 1.29.7 

# list all Ruby versions
rvm list known

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

# use RVM to install Ruby (version 2.3 upper) 
# you can also use brew install Ruby in Mac 
rvm install 2.0.0

Searching for binary rubies, this might take some time.
Checking requirements for osx.
ruby-2.0.0-p648 - @configuring.................................................
ruby-2.0.0-p648 - @post-configuration.
ruby-2.0.0-p648 - @compiling...................................................|
ruby-2.0.0-p648 - @installing..............
ruby-2.0.0-p648 - @making binaries executable..
ruby-2.0.0-p648 - @downloading rubygems-2.7.9

# view ruby version，make sure install successfully
ruby --version
ruby 2.0.0p648 (2015-12-16 revision 53162) [x86_64-darwin17.5.0]

# install version 2.6.0
rvm install 2.6.0

Searching for binary rubies, this might take some time.
ruby-2.6.0 - @making binaries executable..
ruby-2.6.0 - @gemset created /.rvm/gems/ruby-2.6.0@global
ruby-2.6.0 - @importing gemset /.rvm/gemsets/global.gems.........-
ruby-2.6.0 - @generating global wrappers.......
ruby-2.6.0 - @gemset created /.rvm/gems/ruby-2.6.0
ruby-2.6.0 - @generating default wrappers.......
ruby-2.6.0 - @adjusting @shebangs for (gem irb erb ri rdoc testrb rake).
Install of ruby-2.6.0 - @complete 

# view ruby version，make sure version 2.6 install successfully
ruby --version
ruby 2.6.0p0 (2018-12-25 revision 66547) [x86_64-darwin17]

# download ruby-gem and install
cd desktop/rubygems-3.0.3/
ruby setup.rb

Bundler 1.17.3 installed
RubyGems 3.0.3 installed
Regenerating binstubs
Parsing documentation for rubygems-3.0.3
Installing ri documentation for rubygems-3.0.3

# view ruby-gem version，make sure install successfully
gem --version
3.0.3

# use gem to install jekyll
gem install jekyll

Fetching rouge-3.3.0.gem
Fetching rouge-3.3.0.gem
...
25 gems installed

# view jekyll version，make sure install successfully
jekyll --version
jekyll 3.8.5

# During install jekyll, we should install cocoapods
gem install cocoapods
YAML safe loading is not available. Please upgrade psych to a version that supports safe loading (>= 2.0).

# suger：we can use brew to install ruby rather than rvm
brew install ruby
==> Installing dependencies for ruby: openssl
==> Installing ruby dependency: openssl
...
~~~
More Info：

https://www.cnblogs.com/daguo/p/4097263.html

https://www.jianshu.com/p/c073e6fc01f5