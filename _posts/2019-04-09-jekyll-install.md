---
layout: post
title:  "Install Ruby in terminal"
date:   2019-04-08 17:59:11 +0800
categories: jekyll update
---

在Mac终端下安装Ruby过程

~~~bash
Last login: Mon Apr  8 17:43:19 on ttys002
daniels-mbp:~ seafile$ ls
Applications   Library        PromotionRes   VirtualBox VMs history.plist
Desktop        Movies         Public         ap.plist       node_modules
Documents      Music          SeaDrive       apps.plist
Downloads      Pictures       Seafile        bt.plist
daniels-mbp:~ seafile$ ruby --version
ruby 2.0.0p648 (2015-12-16 revision 53162) [x86_64-darwin17.5.0]
daniels-mbp:~ seafile$ jekyll --version
-bash: jekyll: command not found
daniels-mbp:~ seafile$ gem -v
YAML safe loading is not available. Please upgrade psych to a version that supports safe loading (>= 2.0).
2.7.9
daniels-mbp:~ seafile$ jekyll -v
-bash: jekyll: command not found
daniels-mbp:~ seafile$ jekyll -v
-bash: jekyll: command not found
daniels-mbp:~ seafile$ gem uninstall jekyll
YAML safe loading is not available. Please upgrade psych to a version that supports safe loading (>= 2.0).
Gem 'jekyll' is not installed
daniels-mbp:~ seafile$ gem install jekyll
YAML safe loading is not available. Please upgrade psych to a version that supports safe loading (>= 2.0).
ERROR:  While executing gem ... (Gem::Exception)
    Unable to require openssl, install OpenSSL and rebuild Ruby (preferred) or use non-HTTPS sources
daniels-mbp:~ seafile$ gem install cocoapods
YAML safe loading is not available. Please upgrade psych to a version that supports safe loading (>= 2.0).
ERROR:  While executing gem ... (Gem::Exception)
    Unable to require openssl, install OpenSSL and rebuild Ruby (preferred) or use non-HTTPS sources
daniels-mbp:~ seafile$ ruby --version
ruby 2.0.0p648 (2015-12-16 revision 53162) [x86_64-darwin17.5.0]
daniels-mbp:~ seafile$ ruby uninstall
ruby: No such file or directory -- uninstall (LoadError)
daniels-mbp:~ seafile$ rvm --version
rvm 1.29.7 (latest) by Michal Papis, Piotr Kuczynski, Wayne E. Seguin [https://rvm.io]
daniels-mbp:~ seafile$ 
daniels-mbp:~ seafile$ rvm uninstall ruby 2.0.0
Please note that `rvm ruby ...` was removed, try `ruby 2.0.0 ` or `rvm all do ruby 2.0.0 ` instead.
Run `rvm help` to see usage information
daniels-mbp:~ seafile$ rvm uninstall ruby
Please note that `rvm ruby ...` was removed, try `ruby  ` or `rvm all do ruby  ` instead.
Run `rvm help` to see usage information
daniels-mbp:~ seafile$ rvm help
Ruby enVironment Manager 1.29.7 (latest) (c) 2009-2017 Michal Papis, Piotr Kuczynski, Wayne E. Seguin

Usage:

    rvm [--debug][--trace][--nice] <command> <options>

  for example:

    rvm list                # list installed interpreters 
    rvm list known          # list available interpreters
    rvm install <version>   # install ruby interpreter
    rvm use <version>       # switch to specified ruby interpreter
    rvm remove <version>    # remove ruby interpreter
    rvm get <version>       # upgrade rvm: stable, master

Available commands:

  rvm has a number of common commands, listed below. Additional information about any command
  can be found by executing `rvm help <command>`. 

  ruby installation
      fetch                   # download binary or sources for selected ruby version
      install                 # install ruby interpreter
      list                    # show currently installed ruby interpreters
      list known              # list available interpreters
      mount                   # install ruby from external locations
      patchset                # tools related to managing ruby patchsets
      pkg                     # install a dependency package
      reinstall               # reinstall ruby and run gem pristine on all gems
      remove                  # remove ruby and downloaded sources
      requirements            # installs dependencies for building ruby
      uninstall               # uninstall ruby, keeping it's sources
      upgrade                 # upgrade to another ruby version, migrating gems

  running different ruby versions
      current                 # print current ruby version and name of used gemsets
      do                      # runs a command against specified and/or all rubies
      gemdir                  # display path to current gem directory ($GEM_HOME)
      use <version>           # switch to given (and already installed) ruby version
      use default             # switch to default ruby, or system if none is set
      use system              # switch to system ruby
      wrapper                 # creates wrapper executables for a given ruby & gemset

  managing gemsets
      gemset                  # manage gemsets 
      migrate                 # migrate all gemsets from one ruby to another

  rvm configuration
      alias                   # define aliases for `rvm use`
      autolibs                # tweak settings for installing dependencies automatically 
      group                   # tools for managing groups in multiuser installations
      rvmrc                   # tools related to managing .rvmrc trust & loading gemsets

  rvm maintenance
      implode                 # removes the rvm installation completely
      cleanup                 # remove stale source files & data associated with rvm
      cron                    # manage setup for using ruby in cron
      docs                    # tools to make installing ri and rdoc docs easier
      get                     # upgrades RVM to latest head, stable or branched version
      osx-ssl-certs           # helps update OpenSSL certs installed by rvm on OS X
      reload                  # reload rvm source itself
      reset                   # remove all default and system settings
      snapshot                # backup/restore rvm installation

  troubleshooting
      config-get              # display values for RbConfig::CONFIG variables
      debug                   # additional information helping to discover issues
      export                  # set temporary env variable in the current shell
      fix-permissions         # repairs broken permissions
      repair                  # lets you repair parts of your environment, such as
                              # wrappers, env files and similar (general maintenance)
      rubygems                # switches version of rubygems for the current ruby
      tools                   # general information about the ruby env
      unexport                # undo changes made to the environment by `rvm export`
      user                    # tools for managing RVM mixed mode in multiuser installs

   information and documentation
      info                    # show the environment information for current ruby
      disk-usage              # display disk space occupied by rvm
      notes                   # display notes with operating system specifics
      version                 # display rvm version (equal to `rvm -v`)

   additional global options
      --debug                 # toggle debug mode on for very verbose output
      --trace                 # toggle trace mode on to see EVERYTHING rvm is doing
      --nice                  # process niceness (increase the value on slow computers, default 0)

For additional documentation please visit https://rvm.io

daniels-mbp:~ seafile$ rvm remove 2.0.0
ruby-2.0.0-p648 - #removing src/ruby-2.0.0-p648..
ruby-2.0.0-p648 - #removing rubies/ruby-2.0.0-p648..
ruby-2.0.0-p648 - #removing gems....
ruby-2.0.0-p648 - #removing aliases
ruby-2.0.0-p648 - #removing wrappers....
ruby-2.0.0-p648 - #removing environments....
Now using system ruby.
daniels-mbp:~ seafile$ ruby --version
ruby 2.3.3p222 (2016-11-21 revision 56859) [universal.x86_64-darwin17]
daniels-mbp:~ seafile$ gem --version
2.5.2
daniels-mbp:~ seafile$ gem install jekyll
Fetching: safe_yaml-1.0.5.gem (100%)
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.3.0 directory.
daniels-mbp:~ seafile$ sudo gem install jekyll
Password:
Fetching: safe_yaml-1.0.5.gem (100%)
Successfully installed safe_yaml-1.0.5
Fetching: rouge-3.3.0.gem (100%)
Successfully installed rouge-3.3.0
Fetching: forwardable-extended-2.6.0.gem (100%)
Successfully installed forwardable-extended-2.6.0
Fetching: pathutil-0.16.2.gem (100%)
Successfully installed pathutil-0.16.2
Fetching: mercenary-0.3.6.gem (100%)
Successfully installed mercenary-0.3.6
Fetching: liquid-4.0.3.gem (100%)
Successfully installed liquid-4.0.3
Fetching: kramdown-1.17.0.gem (100%)
Successfully installed kramdown-1.17.0
Fetching: ruby_dep-1.5.0.gem (100%)
Successfully installed ruby_dep-1.5.0
Fetching: ffi-1.10.0.gem (100%)
Building native extensions.  This could take a while...
Successfully installed ffi-1.10.0
Fetching: rb-inotify-0.10.0.gem (100%)
Successfully installed rb-inotify-0.10.0
Fetching: rb-fsevent-0.10.3.gem (100%)
Successfully installed rb-fsevent-0.10.3
Fetching: listen-3.1.5.gem (100%)
Successfully installed listen-3.1.5
Fetching: jekyll-watch-2.2.1.gem (100%)
Successfully installed jekyll-watch-2.2.1
Fetching: sass-listen-4.0.0.gem (100%)
Successfully installed sass-listen-4.0.0
Fetching: sass-3.7.4.gem (100%)

Ruby Sass has reached end-of-life and should no longer be used.

* If you use Sass as a command-line tool, we recommend using Dart Sass, the new
  primary implementation: https://sass-lang.com/install

* If you use Sass as a plug-in for a Ruby web framework, we recommend using the
  sassc gem: https://github.com/sass/sassc-ruby#readme

* For more details, please refer to the Sass blog:
  https://sass-lang.com/blog/posts/7828841

Successfully installed sass-3.7.4
Fetching: jekyll-sass-converter-1.5.2.gem (100%)
Successfully installed jekyll-sass-converter-1.5.2
Fetching: concurrent-ruby-1.1.5.gem (100%)
Successfully installed concurrent-ruby-1.1.5
Fetching: i18n-0.9.5.gem (100%)
Successfully installed i18n-0.9.5
Fetching: http_parser.rb-0.6.0.gem (100%)
Building native extensions.  This could take a while...
Successfully installed http_parser.rb-0.6.0
Fetching: eventmachine-1.2.7.gem (100%)
Building native extensions.  This could take a while...
Successfully installed eventmachine-1.2.7
Fetching: em-websocket-0.5.1.gem (100%)
Successfully installed em-websocket-0.5.1
Fetching: colorator-1.1.0.gem (100%)
Successfully installed colorator-1.1.0
Fetching: public_suffix-3.0.3.gem (100%)
Successfully installed public_suffix-3.0.3
Fetching: addressable-2.6.0.gem (100%)
Successfully installed addressable-2.6.0
Fetching: jekyll-3.8.5.gem (100%)
Successfully installed jekyll-3.8.5
Parsing documentation for safe_yaml-1.0.5
Installing ri documentation for safe_yaml-1.0.5
Parsing documentation for rouge-3.3.0
Installing ri documentation for rouge-3.3.0
Parsing documentation for forwardable-extended-2.6.0
Installing ri documentation for forwardable-extended-2.6.0
Parsing documentation for pathutil-0.16.2
Installing ri documentation for pathutil-0.16.2
Parsing documentation for mercenary-0.3.6
Installing ri documentation for mercenary-0.3.6
Parsing documentation for liquid-4.0.3
Installing ri documentation for liquid-4.0.3
Parsing documentation for kramdown-1.17.0
Installing ri documentation for kramdown-1.17.0
Parsing documentation for ruby_dep-1.5.0
Installing ri documentation for ruby_dep-1.5.0
Parsing documentation for ffi-1.10.0
Installing ri documentation for ffi-1.10.0
Parsing documentation for rb-inotify-0.10.0
Installing ri documentation for rb-inotify-0.10.0
Parsing documentation for rb-fsevent-0.10.3
Installing ri documentation for rb-fsevent-0.10.3
Parsing documentation for listen-3.1.5
Installing ri documentation for listen-3.1.5
Parsing documentation for jekyll-watch-2.2.1
Installing ri documentation for jekyll-watch-2.2.1
Parsing documentation for sass-listen-4.0.0
Installing ri documentation for sass-listen-4.0.0
Parsing documentation for sass-3.7.4
Installing ri documentation for sass-3.7.4
Parsing documentation for jekyll-sass-converter-1.5.2
Installing ri documentation for jekyll-sass-converter-1.5.2
Parsing documentation for concurrent-ruby-1.1.5
Installing ri documentation for concurrent-ruby-1.1.5
Parsing documentation for i18n-0.9.5
Installing ri documentation for i18n-0.9.5
Parsing documentation for http_parser.rb-0.6.0
Installing ri documentation for http_parser.rb-0.6.0
Parsing documentation for eventmachine-1.2.7
Installing ri documentation for eventmachine-1.2.7
Parsing documentation for em-websocket-0.5.1
Installing ri documentation for em-websocket-0.5.1
Parsing documentation for colorator-1.1.0
Installing ri documentation for colorator-1.1.0
Parsing documentation for public_suffix-3.0.3
Installing ri documentation for public_suffix-3.0.3
Parsing documentation for addressable-2.6.0
Installing ri documentation for addressable-2.6.0
Parsing documentation for jekyll-3.8.5
Installing ri documentation for jekyll-3.8.5
Done installing documentation for safe_yaml, rouge, forwardable-extended, pathutil, mercenary, liquid, kramdown, ruby_dep, ffi, rb-inotify, rb-fsevent, listen, jekyll-watch, sass-listen, sass, jekyll-sass-converter, concurrent-ruby, i18n, http_parser.rb, eventmachine, em-websocket, colorator, public_suffix, addressable, jekyll after 62 seconds
25 gems installed
daniels-mbp:~ seafile$ jekyll --version
jekyll 3.8.5
daniels-mbp:~ seafile$ ls
Applications   Downloads      Music          Public         VirtualBox VMs bt.plist
Desktop        Library        Pictures       SeaDrive       ap.plist       history.plist
Documents      Movies         PromotionRes   Seafile        apps.plist     node_modules
daniels-mbp:~ seafile$ cd desktop
daniels-mbp:desktop seafile$ ls
4-8 bugs               code-myrepo            install ruby.md        seafile-editor         删除的资料库.png
4月.md                 code-seafile-js        log                    work-log
Ruby in mac.md         delete-repo-bug.png    package                未解决
SF-editor-文档         docker                 personal-files         工作任务.md
daniels-mbp:desktop seafile$ ruby --version
ruby 2.3.3p222 (2016-11-21 revision 56859) [universal.x86_64-darwin17]
daniels-mbp:desktop seafile$ brew install ruby
==> Installing dependencies for ruby: openssl
==> Installing ruby dependency: openssl
==> Downloading https://homebrew.bintray.com/bottles/openssl-1.0.2r.high_sierra.bottle.tar.gz
==> Downloading from https://akamai.bintray.com/2b/2b68bd92c0c2faea5a1e70cc57a2403482ab2d83d0201bb42016c57c754427a5?
######################################################################## 100.0%
==> Pouring openssl-1.0.2r.high_sierra.bottle.tar.gz
==> Caveats
A CA file has been bootstrapped using certificates from the SystemRoots
keychain. To add additional certificates (e.g. the certificates added in
the System keychain), place .pem files in
  /usr/local/etc/openssl/certs

and run
  /usr/local/opt/openssl/bin/c_rehash

openssl is keg-only, which means it was not symlinked into /usr/local,
because Apple has deprecated use of OpenSSL in favor of its own TLS and crypto libraries.

If you need to have openssl first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bash_profile

For compilers to find openssl you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl/include"

For pkg-config to find openssl you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/openssl/lib/pkgconfig"

==> Summary
🍺  /usr/local/Cellar/openssl/1.0.2r: 1,795 files, 12.1MB
==> Installing ruby
==> Downloading https://homebrew.bintray.com/bottles/ruby-2.6.2.high_sierra.bottle.tar.gz
==> Downloading from https://akamai.bintray.com/1f/1fb93f70c550192484dcd1b41926903c5b087dfae5002f375e8e9e10cc89037d?
######################################################################## 100.0%
==> Pouring ruby-2.6.2.high_sierra.bottle.tar.gz
==> Caveats
By default, binaries installed by gem will be placed into:
  /usr/local/lib/ruby/gems/2.6.0/bin

You may want to add this to your PATH.

ruby is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have ruby first in your PATH run:
  echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile

For compilers to find ruby you may need to set:
  export LDFLAGS="-L/usr/local/opt/ruby/lib"
  export CPPFLAGS="-I/usr/local/opt/ruby/include"

For pkg-config to find ruby you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/ruby/lib/pkgconfig"

==> Summary
🍺  /usr/local/Cellar/ruby/2.6.2: 19,342 files, 32.3MB
==> Caveats
==> openssl
A CA file has been bootstrapped using certificates from the SystemRoots
keychain. To add additional certificates (e.g. the certificates added in
the System keychain), place .pem files in
  /usr/local/etc/openssl/certs

and run
  /usr/local/opt/openssl/bin/c_rehash

openssl is keg-only, which means it was not symlinked into /usr/local,
because Apple has deprecated use of OpenSSL in favor of its own TLS and crypto libraries.

If you need to have openssl first in your PATH run:
  echo 'export PATH="/usr/local/opt/openssl/bin:$PATH"' >> ~/.bash_profile

For compilers to find openssl you may need to set:
  export LDFLAGS="-L/usr/local/opt/openssl/lib"
  export CPPFLAGS="-I/usr/local/opt/openssl/include"

For pkg-config to find openssl you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/openssl/lib/pkgconfig"

==> ruby
By default, binaries installed by gem will be placed into:
  /usr/local/lib/ruby/gems/2.6.0/bin

You may want to add this to your PATH.

ruby is keg-only, which means it was not symlinked into /usr/local,
because macOS already provides this software and installing another version in
parallel can cause all kinds of trouble.

If you need to have ruby first in your PATH run:
  echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile

For compilers to find ruby you may need to set:
  export LDFLAGS="-L/usr/local/opt/ruby/lib"
  export CPPFLAGS="-I/usr/local/opt/ruby/include"

For pkg-config to find ruby you may need to set:
  export PKG_CONFIG_PATH="/usr/local/opt/ruby/lib/pkgconfig"

daniels-mbp:desktop seafile$ ruby --version
ruby 2.3.3p222 (2016-11-21 revision 56859) [universal.x86_64-darwin17]
daniels-mbp:desktop seafile$ ls
4-8 bugs               code-myrepo            install ruby.md        seafile-editor         删除的资料库.png
4月.md                 code-seafile-js        log                    work-log
Ruby in mac.md         delete-repo-bug.png    package                未解决
SF-editor-文档         docker                 personal-files         工作任务.md
daniels-mbp:desktop seafile$ pwd
/Users/seafile/desktop
daniels-mbp:desktop seafile$ cd code-myrepo/Michael/
daniels-mbp:Michael seafile$ ls
CodingPractice          HelloWorld              Leisure                 xiaoliang8006.github.io
HelloPython             ImagesMichael           Work-log
daniels-mbp:Michael seafile$ mkdir test-blog
daniels-mbp:Michael seafile$ cd test-blog/
daniels-mbp:test-blog seafile$ ls
daniels-mbp:test-blog seafile$ jekyll new blog
Could not load Bundler. Bundle install skipped. 
New jekyll site installed in /Users/seafile/Desktop/code-myrepo/Michael/test-blog/blog. 
daniels-mbp:test-blog seafile$ ls
blog
daniels-mbp:test-blog seafile$ cd blog/
daniels-mbp:blog seafile$ ls
404.html    Gemfile     _config.yml _posts      about.md    index.md
daniels-mbp:blog seafile$ jekyll serve --watch
/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require': cannot load such file -- bundler (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.8.5/lib/jekyll/plugin_manager.rb:48:in `require_from_bundler'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.8.5/exe/jekyll:11:in `<top (required)>'
	from /usr/local/bin/jekyll:22:in `load'
	from /usr/local/bin/jekyll:22:in `<main>'
daniels-mbp:blog seafile$ jekyll serve --watch
/System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require': cannot load such file -- bundler (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.8.5/lib/jekyll/plugin_manager.rb:48:in `require_from_bundler'
	from /Library/Ruby/Gems/2.3.0/gems/jekyll-3.8.5/exe/jekyll:11:in `<top (required)>'
	from /usr/local/bin/jekyll:22:in `load'
	from /usr/local/bin/jekyll:22:in `<main>'
daniels-mbp:blog seafile$ gem install bundler -r --source http://rubygems.org/
Fetching: bundler-2.0.1.gem (100%)
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.3.0 directory.
daniels-mbp:blog seafile$ sudo gem install bundler -r --source http://rubygems.org/
Password:
Fetching: bundler-2.0.1.gem (100%)
Successfully installed bundler-2.0.1
Parsing documentation for bundler-2.0.1
Installing ri documentation for bundler-2.0.1
Done installing documentation for bundler after 5 seconds
1 gem installed
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
daniels-mbp:blog seafile$ sudo gem install minima
Fetching: jekyll-feed-0.12.1.gem (100%)
Successfully installed jekyll-feed-0.12.1
Fetching: jekyll-seo-tag-2.6.0.gem (100%)
Successfully installed jekyll-seo-tag-2.6.0
Fetching: minima-2.5.0.gem (100%)
Successfully installed minima-2.5.0
Parsing documentation for jekyll-feed-0.12.1
Installing ri documentation for jekyll-feed-0.12.1
Parsing documentation for jekyll-seo-tag-2.6.0
Installing ri documentation for jekyll-seo-tag-2.6.0
Parsing documentation for minima-2.5.0
Installing ri documentation for minima-2.5.0
Done installing documentation for jekyll-feed, jekyll-seo-tag, minima after 0 seconds
3 gems installed
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
daniels-mbp:blog seafile$ 
~~~

