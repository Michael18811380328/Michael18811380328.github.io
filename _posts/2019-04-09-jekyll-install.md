---
layout: post
title:  "Mac 环境初始化 jekyll"
date:   2019-04-08 17:59:11 +0800
categories: jekyll update
---

在Mac终端下初始化 jekyll 框架过程

~~~bash
# 创建博客目录
daniels-mbp:Michael seafile$ mkdir test-blog
daniels-mbp:Michael seafile$ cd test-blog/

# 使用 jekyll 初始化博客
daniels-mbp:test-blog seafile$ jekyll new blog
Could not load Bundler. Bundle install skipped. 
New jekyll site installed in /Users/seafile/Desktop/code-myrepo/Michael/test-blog/blog. 

# 进入博客目录内部
daniels-mbp:test-blog seafile$ cd blog/

# 运行博客服务，但是报错：cannot load such file -- bundler (LoadError)
daniels-mbp:blog seafile$ jekyll serve --watch
/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require': cannot load such file -- bundler (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.8.5/lib/jekyll/plugin_manager.rb:48:in `require_from_bundler'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.8.5/exe/jekyll:11:in `<top (required)>'
	from /usr/local/bin/jekyll:22:in `load'
	from /usr/local/bin/jekyll:22:in `<main>'
	
# 根据提示，安装 bundler
daniels-mbp:blog seafile$ sudo gem install bundler -r --source http://rubygems.org/
Fetching: bundler-2.0.1.gem (100%)
Successfully installed bundler-2.0.1
Parsing documentation for bundler-2.0.1
Installing ri documentation for bundler-2.0.1
Done installing documentation for bundler after 5 seconds
1 gem installed

# 再次运行博客服务，但是报错：Could not find gem minima
daniels-mbp:blog seafile$ jekyll serve --watch
/Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/resolver.rb:287:in `block in verify_gemfile_dependencies_are_found!': Could not find gem 'minima (~> 2.0)' in any of the gem sources listed in your Gemfile. (Bundler::GemNotFound)
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/resolver.rb:255:in `each'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/resolver.rb:255:in `verify_gemfile_dependencies_are_found!'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/resolver.rb:49:in `start'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/resolver.rb:22:in `resolve'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/definition.rb:258:in `resolve'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/definition.rb:170:in `specs'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/definition.rb:237:in `specs_for'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/definition.rb:226:in `requested_specs'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/runtime.rb:108:in `block in definition_method'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler/runtime.rb:20:in `setup'
	from /Library/Ruby/Gems/2.3.0/gems/bundler-2.0.1/lib/bundler.rb:107:in `setup'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.8.5/lib/jekyll/plugin_manager.rb:50:in `require_from_bundler'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.8.5/exe/jekyll:11:in `<top (required)>'
	from /usr/local/bin/jekyll:22:in `load'
	from /usr/local/bin/jekyll:22:in `<main>'

# 安装 minima
daniels-mbp:blog seafile$ sudo gem install minima
Fetching: jekyll-feed-0.12.1.gem (100%)
Successfully installed jekyll-feed-0.12.1
3 gems installed

# 再次运行服务，基本运行成功
daniels-mbp:blog seafile$ jekyll serve --watch
Configuration file: /Users/seafile/Desktop/code-myrepo/Michael/test-blog/blog/_config.yml
            Source: /Users/seafile/Desktop/code-myrepo/Michael/test-blog/blog
       Destination: /Users/seafile/Desktop/code-myrepo/Michael/test-blog/blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
       Jekyll Feed: Generating feed for posts
                    done in 0.469 seconds.
 Auto-regeneration: enabled for '/Users/seafile/Desktop/code-myrepo/Michael/test-blog/blog'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2019-04-08 18:02:46] ERROR `/favicon.ico' not found.
^Cdaniels-mbp:blog seafile$ 

# 下面可以打开 http://127.0.0.1:4000/ 访问博客界面了
# 警告：`/favicon.ico' not found. 需要在根目录加入界面图标
~~~