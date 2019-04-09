---
layout: post
title:  "Install Ruby"
date:   2019-03-08 17:59:11 +0800
categories: jekyll update
---

~~~bash
brew install ruby
ruby install gem
gem install jekyll

mkdir test
cd test
jelyll new nbolb
~~~

Last login: Mon Apr  8 17:14:08 on ttys003
daniels-mbp:~ seafile$ ls
Applications   Library        PromotionRes   VirtualBox VMs history.plist
Desktop        Movies         Public         ap.plist       node_modules
Documents      Music          SeaDrive       apps.plist
Downloads      Pictures       Seafile        bt.plist
daniels-mbp:~ seafile$ curl -L https://get.rvm.io | bash -s stable
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   194  100   194    0     0    136      0  0:00:01  0:00:01 --:--:--   136
100 24173  100 24173    0     0  12901      0  0:00:01  0:00:01 --:--:-- 12901
Downloading https://github.com/rvm/rvm/archive/1.29.7.tar.gz
Downloading https://github.com/rvm/rvm/releases/download/1.29.7/1.29.7.tar.gz.asc
Found PGP signature at: 'https://github.com/rvm/rvm/releases/download/1.29.7/1.29.7.tar.gz.asc',
but no GPG software exists to validate it, skipping.
Installing RVM to /Users/seafile/.rvm/
    Adding rvm PATH line to /Users/seafile/.profile /Users/seafile/.mkshrc /Users/seafile/.bashrc /Users/seafile/.zshrc.
    Adding rvm loading line to /Users/seafile/.profile /Users/seafile/.bash_profile /Users/seafile/.zlogin.
Installation of RVM in /Users/seafile/.rvm/ is almost complete:

  * To start using RVM you need to run `source /Users/seafile/.rvm/scripts/rvm`
    in all your open shell windows, in rare cases you need to reopen all shell windows.
daniels-mbp:~ seafile$ source ~/.rvm/scripts/rvm
daniels-mbp:~ seafile$ rvm -v
rvm 1.29.7 (latest) by Michal Papis, Piotr Kuczynski, Wayne E. Seguin [https://rvm.io]
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

@ for forks use: rvm install ruby-head-<name> --url https://github.com/github/ruby.git --branch 2.2

@ JRuby
jruby-1.6[.8]
jruby-1.7[.27]
jruby-9.1[.17.0]
jruby[-9.2.5.0]
jruby-head

@ Rubinius
rbx-1[.4.3]
rbx-2.3[.0]
rbx-2.4[.1]
rbx-2[.5.8]
rbx-3[.100]
rbx-head

@ TruffleRuby
truffleruby[-1.0.0-rc10]

@ Opal
opal

@ Minimalistic ruby implementation - ISO 30170:2012
mruby-1.0.0
mruby-1.1.0
mruby-1.2.0
mruby-1.3.0
mruby-1[.4.1]
mruby-2[.0.0]
mruby[-head]

@ Ruby Enterprise Edition
ree-1.8.6
ree[-1.8.7][-2012.02]

@ Topaz
topaz

@ MagLev
maglev-1.0.0
maglev-1.1[RC1]
maglev[-1.2Alpha4]
maglev-head

@ Mac OS X Snow Leopard Or Newer
macruby-0.10
macruby-0.11
macruby[-0.12]
macruby-nightly
macruby-head

@ IronRuby
ironruby[-1.1.3]
ironruby-head
daniels-mbp:~ seafile$ rvm install 2.0.0
Searching for binary rubies, this might take some time.
No binary rubies available for: osx/10.13/x86_64/ruby-2.0.0-p648.
Continuing with compilation. Please read 'rvm help mount' to get more information on binary rubies.
Checking requirements for osx.
Installing requirements for osx.
Updating system................................................................|
Installing required packages: autoconf, automake, libtool, pkg-config, coreutils, libyaml, readline, libksba, openssl@1.1..............
Certificates bundle '/usr/local/etc/openssl@1.1/cert.pem' is already up to date.
Requirements installation successful.
Installing Ruby from source to: /Users/seafile/.rvm/rubies/ruby-2.0.0-p648, this may take a while depending on your cpu(s)...
ruby-2.0.0-p648 - @downloading ruby-2.0.0-p648, this may take a while depending on your connection...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 10.2M  100 10.2M    0     0  2172k      0  0:00:04  0:00:04 --:--:-- 2434k
ruby-2.0.0-p648 - @extracting ruby-2.0.0-p648 to /Users/seafile/.rvm/src/ruby-2.0.0-p648.....
ruby-2.0.0-p648 - @applying patch /Users/seafile/.rvm/patches/ruby/2.0.0/openssl3.patch.
ruby-2.0.0-p648 - @applying patch /Users/seafile/.rvm/patches/ruby/2.0.0/update-autoconf.patch.
ruby-2.0.0-p648 - @configuring.................................................
ruby-2.0.0-p648 - @post-configuration.
ruby-2.0.0-p648 - @compiling...................................................|
ruby-2.0.0-p648 - @installing..............
ruby-2.0.0-p648 - @making binaries executable..
ruby-2.0.0-p648 - @downloading rubygems-2.7.9
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  842k  100  842k    0     0   631k      0  0:00:01  0:00:01 --:--:--  631k
No checksum for downloaded archive, recording checksum in user configuration.
ruby-2.0.0-p648 - @extracting rubygems-2.7.9.....
ruby-2.0.0-p648 - @removing old rubygems........
ruby-2.0.0-p648 - @installing rubygems-2.7.9...................................-
ruby-2.0.0-p648 - @gemset created /Users/seafile/.rvm/gems/ruby-2.0.0-p648@global
ruby-2.0.0-p648 - @importing gemset /Users/seafile/.rvm/gemsets/global.gems...there was an error installing gem rubygems-bundler
...............................
ruby-2.0.0-p648 - @generating global wrappers.......
ruby-2.0.0-p648 - @gemset created /Users/seafile/.rvm/gems/ruby-2.0.0-p648
ruby-2.0.0-p648 - @importing gemsetfile /Users/seafile/.rvm/gemsets/default.gems evaluated to empty gem list
ruby-2.0.0-p648 - @generating default wrappers.......
ruby-2.0.0-p648 - @adjusting @shebangs for (gem irb erb ri rdoc testrb rake).
Install of ruby-2.0.0-p648 - @complete 
WARNING: Please be aware that you just installed a ruby that is no longer maintained (2017-04-01), for a list of maintained rubies visit:

    http://bugs.ruby-lang.org/projects/ruby/wiki/ReleaseEngineering

Please consider upgrading to ruby-2.6.0 which will have all of the latest security patches.
Ruby was built without documentation, to build it run: rvm docs generate-ri
daniels-mbp:~ seafile$ ruby --version
ruby 2.0.0p648 (2015-12-16 revision 53162) [x86_64-darwin17.5.0]
daniels-mbp:~ seafile$ rvm install 2.6.0
Searching for binary rubies, this might take some time.
^C
daniels-mbp:~ seafile$ ruby -v
ruby 2.0.0p648 (2015-12-16 revision 53162) [x86_64-darwin17.5.0]
daniels-mbp:~ seafile$ rnm list unknown
-bash: rnm: command not found
daniels-mbp:~ seafile$ rvm list unknown
Unknown action 'unknown' for 'rvm list'.
Ruby enVironment Manager 1.29.7 (latest) (c) 2009-2017 Michal Papis, Piotr Kuczynski, Wayne E. Seguin

Show list of available rubies,

@@ Usage:

    rvm list [help,known,remote [|rbx|jruby|all],gemsets,default [string],rubies,strings,known_strings,ruby_svn_tags]

@@ Actions:

- `help`    - show this help
- `known`   - list known rubies, that can be installed
- `gemsets` - list all rubies with their gemsets
- `rubies`  - list installed rubies, it is the default action when none given
- `strings` - list installed rubies, machine passable form
- `known_strings`    - list known rubies, that can be installed, machine passable form
- `ruby_svn_tags`    - list ruby tags available at http://svn.ruby-lang.org/repos/ruby/tags/
- `default [string]` - show the default ruby, passable form with strings
- `remote [|rbx|jruby|all]` - list binary build rubies (also for all/rbx/jruby), they do not need compilation,
                              when parameter omitted then only rvm build binaries are listed.

For additional documentation please visit https://rvm.io

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

@ for forks use: rvm install ruby-head-<name> --url https://github.com/github/ruby.git --branch 2.2

@ JRuby
jruby-1.6[.8]
jruby-1.7[.27]
jruby-9.1[.17.0]
jruby[-9.2.5.0]
jruby-head

@ Rubinius
rbx-1[.4.3]
rbx-2.3[.0]
rbx-2.4[.1]
rbx-2[.5.8]
rbx-3[.100]
rbx-head

@ TruffleRuby
truffleruby[-1.0.0-rc10]

@ Opal
opal

@ Minimalistic ruby implementation - ISO 30170:2012
mruby-1.0.0
mruby-1.1.0
mruby-1.2.0
mruby-1.3.0
mruby-1[.4.1]
mruby-2[.0.0]
mruby[-head]

@ Ruby Enterprise Edition
ree-1.8.6
ree[-1.8.7][-2012.02]

@ Topaz
topaz

@ MagLev
maglev-1.0.0
maglev-1.1[RC1]
maglev[-1.2Alpha4]
maglev-head

@ Mac OS X Snow Leopard Or Newer
macruby-0.10
macruby-0.11
macruby[-0.12]
macruby-nightly
macruby-head

@ IronRuby
ironruby[-1.1.3]
ironruby-head
daniels-mbp:~ seafile$ ruby install 2.6.0 
ruby: No such file or directory -- install (LoadError)
daniels-mbp:~ seafile$ rvm install 2.6.0
Searching for binary rubies, this might take some time.
No binary rubies available for: osx/10.13/x86_64/ruby-2.6.0.
Continuing with compilation. Please read 'rvm help mount' to get more information on binary rubies.
Checking requirements for osx.
Certificates bundle '/usr/local/etc/openssl@1.1/cert.pem' is already up to date.
Requirements installation successful.
Installing Ruby from source to: /Users/seafile/.rvm/rubies/ruby-2.6.0, this may take a while depending on your cpu(s)...
ruby-2.6.0 - @downloading ruby-2.6.0, this may take a while depending on your connection...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 13.9M  100 13.9M    0     0  1833k      0  0:00:07  0:00:07 --:--:-- 2012k
ruby-2.6.0 - @extracting ruby-2.6.0 to /Users/seafile/.rvm/src/ruby-2.6.0.....
ruby-2.6.0 - @configuring......................................................|
ruby-2.6.0 - @post-configuration.
ruby-2.6.0 - @compiling........................................................|
ruby-2.6.0 - @installing...........
ruby-2.6.0 - @making binaries executable..
Installed rubygems 3.0.1 is newer than 2.7.9 provided with installed ruby, skipping installation, use --force to force installation.
ruby-2.6.0 - @gemset created /Users/seafile/.rvm/gems/ruby-2.6.0@global
ruby-2.6.0 - @importing gemset /Users/seafile/.rvm/gemsets/global.gems.........-
ruby-2.6.0 - @generating global wrappers.......
ruby-2.6.0 - @gemset created /Users/seafile/.rvm/gems/ruby-2.6.0
ruby-2.6.0 - @importing gemsetfile /Users/seafile/.rvm/gemsets/default.gems evaluated to empty gem list
ruby-2.6.0 - @generating default wrappers.......
ruby-2.6.0 - @adjusting @shebangs for (gem irb erb ri rdoc testrb rake).
Install of ruby-2.6.0 - @complete 
Ruby was built without documentation, to build it run: rvm docs generate-ri
daniels-mbp:~ seafile$ ruby --version
ruby 2.6.0p0 (2018-12-25 revision 66547) [x86_64-darwin17]
daniels-mbp:~ seafile$ pwd
/Users/seafile
daniels-mbp:~ seafile$ ls
Applications   Library        PromotionRes   VirtualBox VMs history.plist
Desktop        Movies         Public         ap.plist       node_modules
Documents      Music          SeaDrive       apps.plist
Downloads      Pictures       Seafile        bt.plist
daniels-mbp:~ seafile$ cd desktop/rubygems-3.0.3/
daniels-mbp:rubygems-3.0.3 seafile$ ls
CODE_OF_CONDUCT.md      POLICIES.md             hide_lib_for_update
CONTRIBUTING.md         README.md               lib
History.txt             Rakefile                rubygems-update.gemspec
LICENSE.txt             UPGRADING.md            setup.rb
MAINTAINERS.txt         appveyor.yml            test
MIT.txt                 bin                     util
Manifest.txt            bundler
daniels-mbp:rubygems-3.0.3 seafile$ ls
CODE_OF_CONDUCT.md      POLICIES.md             hide_lib_for_update
CONTRIBUTING.md         README.md               lib
History.txt             Rakefile                rubygems-update.gemspec
LICENSE.txt             UPGRADING.md            setup.rb
MAINTAINERS.txt         appveyor.yml            test
MIT.txt                 bin                     util
Manifest.txt            bundler
daniels-mbp:rubygems-3.0.3 seafile$ ruby setup.rb 
Bundler 1.17.3 installed
RubyGems 3.0.3 installed
Regenerating binstubs
Parsing documentation for rubygems-3.0.3
Installing ri documentation for rubygems-3.0.3

=== 3.0.2 / 2019-01-01

Minor enhancements:

* Use Bundler-1.17.3. Pull request @2556 by SHIBATA Hiroshi.
* Fix document flag description. Pull request @2555 by Luis Sagastume.

Bug fixes:

* Fix tests when ruby --program-suffix is used without rubygems
  --format-executable. Pull request @2549 by Jeremy Evans.
* Fix Gem::Requirement equality comparison when ~> operator is used. Pull
  request @2554 by Grey Baker.
* Unset SOURCE_DATE_EPOCH in the test cases. Pull request @2558 by Sorah
  Fukumori.
* Restore SOURCE_DATE_EPOCH. Pull request @2560 by SHIBATA Hiroshi.

=== 3.0.1 / 2018-12-23

Bug fixes:

* Ensure globbed files paths are expanded. Pull request @2536 by Tony Ta.
* Dup the Dir.home string before passing it on. Pull request @2545 by
  Charles Oliver Nutter.
* Added permissions to installed files for non-owners. Pull request @2546
  by SHIBATA Hiroshi.
* Restore release task without hoe. Pull request @2547 by SHIBATA Hiroshi.

=== 3.0.0 / 2018-12-19

Major enhancements:

* S3 source. Pull request @1690 by Aditya Prakash.
* Download gems with threads. Pull request @1898 by André Arko.
* Update to SPDX license list 3.0. Pull request @2152 by Mike Linksvayer.
* [GSoC] Multi-factor feature for RubyGems. Pull request @2369 by Qiu
  Chaofan.
* Use bundler 1.17.2. Pull request @2521 by SHIBATA Hiroshi.

Minor enhancements:

* Don't treat inaccessible working directories as build failures. Pull
  request @1135 by Pete.
* Remove useless directory parameter from builders .build methods.
  [rebased]. Pull request @1433 by Kurtis Rainbolt-Greene.
* Skipping more than one gem in pristine. Pull request @1592 by Henne
  Vogelsang.
* Add info command to print information about an installed gem. Pull
  request @2023 by Colby Swandale.
* Add --[no-]check-development option to cleanup command. Pull request
  @2061 by Lin Jen-Shin (godfat).
* Show which gem referenced a missing gem. Pull request @2067 by Artem
  Khramov.
* Prevent to delete to "bundler-" prefix gem like bundler-audit. Pull
  request @2086 by SHIBATA Hiroshi.
* Fix rake install_test_deps once the rake clean_env does not exist. Pull
  request @2090 by Lucas Arantes.
* Workaround common options mutation in Gem::Command test. Pull request
  @2098 by Thibault Jouan.
* Extract a SpecificationPolicy validation class. Pull request @2101 by
  Olle Jonsson.
* Handle environment that does not have `flock` system call. Pull request
  @2107 by SHIBATA Hiroshi.
* Handle the explain option in gem update. Pull request @2110 by Colby
  Swandale.
* Add Gem.operating_system_defaults to allow packagers to override
  defaults. Pull request @2116 by Vít Ondruch.
* Update for compatibilty with new minitest. Pull request @2118 by
  MSP-Greg.
* Make Windows bin stubs portable. Pull request @2119 by MSP-Greg.
* Avoid to warnings about gemspec loadings in rubygems tests. Pull request
  @2125 by SHIBATA Hiroshi.
* Set whether bundler is used for gemdeps with an environmental variable.
  Pull request @2126 by SHIBATA Hiroshi.
* Titleize "GETTING HELP" in readme. Pull request @2136 by Colby Swandale.
* Improve the error message given when using --version with multiple gems
  in the install command. Pull request @2137 by Colby Swandale.
* Use `File.open` instead of `open`. Pull request @2142 by SHIBATA
  Hiroshi.
* Gem::Util.traverse_parents should not crash on permissions error. Pull
  request @2147 by Robert Ulejczyk.
* [Installer] Avoid a @mkdir race condition. Pull request @2148 by Samuel
  Giddins.
* Allow writing gemspecs from gem unpack to location specified by target
  option. Pull request @2150 by Colby Swandale.
* Raise errors in `gem uninstall` when a file in a gem could not be
  removed . Pull request @2154 by Colby Swandale.
* Remove PID from gem index directory. Pull request @2155 by SHIBATA
  Hiroshi.
* Nil guard on `Gem::Specification`. Pull request @2164 by SHIBATA
  Hiroshi.
* Skip broken test with macOS platform. Pull request @2167 by SHIBATA
  Hiroshi.
* Support option for `--destdir` with upgrade installer. Pull request
  @2169 by SHIBATA Hiroshi.
* To use constant instead of hard-coded version. Pull request @2171 by
  SHIBATA Hiroshi.
* Add Rake task to install dev dependencies. Pull request @2173 by Ellen
  Marie Dash.
* Add new sections to the README and explaination of what RubyGems is.
  Pull request @2174 by Colby Swandale.
* Prefer to use `Numeric@zero?` instead of `== 0`. Pull request @2176 by
  SHIBATA Hiroshi.
* Ignore perfomance test of version regexp pattern. Pull request @2179 by
  SHIBATA Hiroshi.
* Ignore .DS_Store files in the update_manifest task. Pull request @2199
  by Colby Swandale.
* Allow building gems without having to be in the gem folder . Pull
  request @2204 by Colby Swandale.
* Added coverage ability used by simplecov. Pull request @2207 by SHIBATA
  Hiroshi.
* Improve invalid proxy error message. Pull request @2217 by Luis
  Sagastume.
* Simplify home directory detection and platform condition. Pull request
  @2218 by SHIBATA Hiroshi.
* Permission options. Pull request @2219 by Nobuyoshi Nakada.
* Improve gemspec and package task. Pull request @2220 by SHIBATA Hiroshi.
* Prefer to use util_spec in `Gem::TestCase`. Pull request @2227 by
  SHIBATA Hiroshi.
*  [Requirement] Treat requirements with == versions as equal. Pull
    request @2230 by Samuel Giddins.
* Add a note for the non-semantically versioned case. Pull request @2242
  by David Rodríguez.
* Keep feature names loaded in the block. Pull request @2261 by Nobuyoshi
  Nakada.
* Tweak warning recommendation. Pull request @2266 by David Rodríguez.
* Show git path in gem env. Pull request @2268 by Luis Sagastume.
* Add `--env-shebang` flag to setup command. Pull request @2271 by James
  Myers.
* Support SOURCE_DATE_EPOCH to make gem spec reproducible. Pull request
  @2278 by Levente Polyak.
* Chdir back to original directory when building an extension fails. Pull
  request @2282 by Samuel Giddins.
* [Rakefile] Add a default task that runs the tests. Pull request @2283 by
  Samuel Giddins.
* Support SOURCE_DATE_EPOCH to make gem tar reproducible. Pull request
  @2289 by Levente Polyak.
* Reset hooks in test cases. Pull request @2297 by Samuel Giddins.
* Minor typo: nokogiri. Pull request @2298 by Darshan Baid.
* Ignore vendored molinillo from code coverage. Pull request @2302 by
  SHIBATA Hiroshi.
* Support IO.copy_stream. Pull request @2303 by okkez.
* Prepare beta release. Pull request @2304 by SHIBATA Hiroshi.
* Add error message when trying to open a default gem. Pull request @2307
  by Luis Sagastume.
* Add alias command 'i' for 'install' command. Pull request @2308 by
  ota42y.
* Cleanup rdoc task in Rakefile. Pull request @2318 by SHIBATA Hiroshi.
* Add testcase to test_gem_text.rb. Pull request @2329 by Oliver.
* Gem build strict option. Pull request @2332 by David Rodríguez.
* Make spec reset more informative. Pull request @2333 by Luis Sagastume.
* [Rakefile] Set bundler build metadata when doing a release. Pull request
  @2335 by Samuel Giddins.
* Speed up globbing relative to given directories. Pull request @2336 by
  Samuel Giddins.
* Remove semver gem build warning. Pull request @2351 by David Rodríguez.
* Expand symlinks in gem path. Pull request @2352 by Benoit Daloze.
* Normalize comment indentations. Pull request @2353 by David Rodríguez.
* Add bindir flag to pristine. Pull request @2361 by Luis Sagastume.
* Add --user-install behaviour to cleanup command. Pull request @2362 by
  Luis Sagastume.
* Allow build options to be passed to Rake. Pull request @2382 by Alyssa
  Ross.
* Add --re-sign flag to cert command. Pull request @2391 by Luis
  Sagastume.
* Fix "interpreted as grouped expression" warning. Pull request @2399 by
  Colby Swandale.
* [Gem::Ext::Builder] Comments to aid future refactoring. Pull request
  @2405 by Ellen Marie Dash.
* Move CONTRIBUTING.rdoc and POLICIES.rdoc documents to markdown. Pull
  request @2412 by Colby Swandale.
* Improve certificate expiration defaults. Pull request @2420 by Luis
  Sagastume.
* Freeze all possible constants. Pull request @2422 by Colby Swandale.
* Fix bundler rubygems binstub not properly looking for bundler. Pull
  request @2426 by David Rodríguez.
* Make sure rubygems never leaks to another installation. Pull request
  @2427 by David Rodríguez.
* Update README.md. Pull request @2428 by Marc-André Lafortune.
* Restrict special chars from prefixing new gem names. Pull request @2432
  by Luis Sagastume.
* This removes support for dynamic API backend lookup via DNS SRV records.
  Pull request @2433 by Arlandis Word.
* Fix link to CONTRIBUTING.md doc. Pull request @2434 by Arlandis Word.
* Support Keyword args with Pysch. Pull request @2439 by SHIBATA Hiroshi.
* Bug/kernel@warn uplevel. Pull request @2442 by Nobuyoshi Nakada.
* Improve certificate error message. Pull request @2454 by Luis Sagastume.
* Update gem open command help text. Pull request @2458 by Aditya Prakash.
* Uninstall with versions. Pull request @2466 by David Rodríguez.
* Add output option to build command. Pull request @2501 by Colby
  Swandale.
* Move rubocop into a separate stage in travis ci. Pull request @2510 by
  Colby Swandale.
* Ignore warnings with test_gem_specification.rb. Pull request @2523 by
  SHIBATA Hiroshi.
* Support the environment without OpenSSL. Pull request @2528 by SHIBATA
  Hiroshi.

Bug fixes:

* Fix undefined method error when printing alert. Pull request @1884 by
  Robert Ross.
* Frozen string fix - lib/rubygems/bundler_version_finder.rb. Pull request
  @2115 by MSP-Greg.
* Fixed typos. Pull request @2143 by SHIBATA Hiroshi.
* Fix regression of destdir on Windows platform. Pull request @2178 by
  SHIBATA Hiroshi.
* Fixed no assignment variables about default gems installation. Pull
  request @2181 by SHIBATA Hiroshi.
* Fix spelling errors in the README. Pull request @2187 by Colby Swandale.
* Missing comma creates ambiguous meaning. Pull request @2190 by Clifford
  Heath.
* Fix getting started instructions. Pull request @2198 by Luis Sagastume.
* Fix rubygems dev env. Pull request @2201 by Luis Sagastume.
* Fix @1470: generate documentation when --install-dir is present. Pull
  request @2229 by Elias Hernandis.
* Fix activation when multiple platforms installed. Pull request @2339 by
  MSP-Greg.
* Fix required_ruby_version with prereleases and improve error message.
  Pull request @2344 by David Rodríguez.
* Update tests for 'newer' Windows builds. Pull request @2348 by MSP-Greg.
* Fix broken rubocop task by upgrading to 0.58.1. Pull request @2356 by
  David Rodríguez.
* Gem::Version should handle nil like it used to before. Pull request
  @2363 by Luis Sagastume.
* Avoid need of C++ compiler to pass the test suite. Pull request @2367 by
  Vít Ondruch.
* Fix auto resign expired certificate. Pull request @2380 by Luis
  Sagastume.
* Skip permissions-dependent test when root. Pull request @2386 by Alyssa
  Ross.
* Fix test that depended on /usr/bin being in PATH. Pull request @2387 by
  Alyssa Ross.
* Fixed test fail with mswin environment. Pull request @2390 by SHIBATA
  Hiroshi.
* Fix broken builds using the correct rubocop version. Pull request @2396
  by Luis Sagastume.
* Fix extension builder failure when verbose. Pull request @2457 by Sorah
  Fukumori.
* Fix test warnings. Pull request @2472 by MSP-Greg.
* The test suite of bundler is not present ruby description. Pull request
  @2484 by SHIBATA Hiroshi.
* Fix crash on certain gemspecs. Pull request @2506 by David Rodríguez.
* Fixed test fails with the newer version of OpenSSL. Pull request @2507
  by SHIBATA Hiroshi.
* Fix broken symlink that points to ../*. Pull request @2516 by Akira
  Matsuda.
* Fix remote fetcher tests. Pull request @2520 by Luis Sagastume.
* Fix tests when --program-suffix and similar ruby configure options are
  used. Pull request @2529 by Jeremy Evans.

Compatibility changes:

* IO.binread is not provided at Ruby 1.8. Pull request @2093 by SHIBATA
  Hiroshi.
* Ignored to publish rdoc documentation of rubygems for
  docs.seattlerb.org. Pull request @2105 by SHIBATA Hiroshi.
* Support pre-release RubyGems. Pull request @2128 by SHIBATA Hiroshi.
* Relax minitest version for 5. Pull request @2131 by SHIBATA Hiroshi.
* Remove zentest from dev dependency. Pull request @2132 by SHIBATA
  Hiroshi.
* Remove hoe for test suite. Pull request @2160 by SHIBATA Hiroshi.
* Cleanup deprecated tasks. Pull request @2162 by SHIBATA Hiroshi.
* Drop to support Ruby < 2.2. Pull request @2182 by SHIBATA Hiroshi.
* Cleanup deprecated style. Pull request @2193 by SHIBATA Hiroshi.
* Remove CVEs from the rubygems repo. Pull request @2195 by Colby
  Swandale.
* Removed needless condition for old version of ruby. Pull request @2206
  by SHIBATA Hiroshi.
* Removed deprecated methods over the limit day. Pull request @2216 by
  SHIBATA Hiroshi.
* Remove syck support. Pull request @2222 by SHIBATA Hiroshi.
* Removed needless condition for Encoding. Pull request @2223 by SHIBATA
  Hiroshi.
* Removed needless condition for String@force_encoding. Pull request @2225
  by SHIBATA Hiroshi.
* Removed needless OpenSSL patch for Ruby 1.8. Pull request @2243 by
  SHIBATA Hiroshi.
* Removed compatibility code for Ruby 1.9.2. Pull request @2244 by SHIBATA
  Hiroshi.
* Removed needless version condition for the old ruby. Pull request @2252
  by SHIBATA Hiroshi.
* Remove needless define/respond_to condition. Pull request @2255 by
  SHIBATA Hiroshi.
* Use File.realpath directlry in Gem::Package. Pull request @2284 by
  SHIBATA Hiroshi.
* Removed needless condition for old versions of Ruby. Pull request @2286
  by SHIBATA Hiroshi.
* Remove the --rdoc and --ri options from install/update. Pull request
  @2354 by Colby Swandale.
* Move authors assigner to required attributes section of
  Gem::Specification. Pull request @2406 by Grey Baker.
* Remove rubyforge_page functionality. Pull request @2436 by Nick
  Schwaderer.
* Drop ruby 1.8 support and use IO.popen. Pull request @2441 by Nobuyoshi
  Nakada.
* Drop ruby 2.2 support. Pull request @2487 by David Rodríguez.
* Remove some old compatibility code. Pull request @2488 by David
  Rodríguez.
* Remove .document from src. Pull request @2489 by Colby Swandale.
* Remove old version support. Pull request @2493 by Nobuyoshi Nakada.
* [BudlerVersionFinder] set .filter! and .compatible? to match only on
  major versions. Pull request @2515 by Colby Swandale.

Style changes:

* Add Rubocop. Pull request @2250 by Colby Swandale.
* Removed explicitly declaration of thread library. Pull request @2324 by
  SHIBATA Hiroshi.
* Remove Trailing whitespace with rubocop. Pull request @2394 by SHIBATA
  Hiroshi.
* Update rubocop and also use correct pessimistic version. Pull request
  @2404 by Colby Swandale.
* Enable more rubocop rules. Pull request @2435 by Ellen Marie Dash.
* Fix and lock rubocop. Pull request @2465 by David Rodríguez.
* Add a rubocop binstub. Pull request @2468 by David Rodríguez.
* Restore the `rubocop` task. Pull request @2470 by David Rodríguez.
* Remove trailing blank lines. Pull request @2471 by David Rodríguez.
* Remove empty lines around method bodies. Pull request @2473 by David
  Rodríguez.
* Enable Style/MethodDefParentheses in Rubocop. Pull request @2478 by
  Colby Swandale.
* Enable Style/MultilineIfThen in Rubocop. Pull request @2479 by Luis
  Sagastume.
* Remove trailing 'then' from generated code. Pull request @2480 by Luis
  Sagastume.

------------------------------------------------------------------------------

RubyGems installed the following executables:
	/Users/seafile/.rvm/rubies/ruby-2.6.0/bin/gem
	/Users/seafile/.rvm/rubies/ruby-2.6.0/bin/bundle

Ruby Interactive (ri) documentation was installed. ri is kind of like man 
pages for Ruby libraries. You may access it like this:
  ri Classname
  ri Classname.class_method
  ri Classname@instance_method
If you do not wish to install this documentation in the future, use the
--no-document flag, or set it as the default in your ~/.gemrc file. See
'gem help env' for details.

daniels-mbp:rubygems-3.0.3 seafile$ gem --version
3.0.3
daniels-mbp:rubygems-3.0.3 seafile$ gem --version
3.0.3
daniels-mbp:rubygems-3.0.3 seafile$ gem install jekyll
Fetching rouge-3.3.0.gem
Fetching forwardable-extended-2.6.0.gem
Fetching pathutil-0.16.2.gem
Fetching safe_yaml-1.0.5.gem
Fetching mercenary-0.3.6.gem
Fetching liquid-4.0.3.gem
Fetching kramdown-1.17.0.gem
Fetching ruby_dep-1.5.0.gem
Fetching ffi-1.10.0.gem
Fetching rb-inotify-0.10.0.gem
Fetching rb-fsevent-0.10.3.gem
Fetching listen-3.1.5.gem
Fetching jekyll-watch-2.2.1.gem
Fetching sass-listen-4.0.0.gem
Fetching sass-3.7.4.gem
Fetching jekyll-sass-converter-1.5.2.gem
Fetching concurrent-ruby-1.1.5.gem
Fetching i18n-0.9.5.gem
Fetching http_parser.rb-0.6.0.gem
Fetching eventmachine-1.2.7.gem
Fetching em-websocket-0.5.1.gem
Fetching colorator-1.1.0.gem
Fetching public_suffix-3.0.3.gem
Fetching addressable-2.6.0.gem
Fetching jekyll-3.8.5.gem
Successfully installed safe_yaml-1.0.5
Successfully installed rouge-3.3.0
Successfully installed forwardable-extended-2.6.0
Successfully installed pathutil-0.16.2
Successfully installed mercenary-0.3.6
Successfully installed liquid-4.0.3
Successfully installed kramdown-1.17.0
Successfully installed ruby_dep-1.5.0
Building native extensions. This could take a while...
Successfully installed ffi-1.10.0
Successfully installed rb-inotify-0.10.0
Successfully installed rb-fsevent-0.10.3
Successfully installed listen-3.1.5
Successfully installed jekyll-watch-2.2.1
Successfully installed sass-listen-4.0.0

Ruby Sass has reached end-of-life and should no longer be used.

* If you use Sass as a command-line tool, we recommend using Dart Sass, the new
  primary implementation: https://sass-lang.com/install

* If you use Sass as a plug-in for a Ruby web framework, we recommend using the
  sassc gem: https://github.com/sass/sassc-ruby@readme

* For more details, please refer to the Sass blog:
  https://sass-lang.com/blog/posts/7828841

Successfully installed sass-3.7.4
Successfully installed jekyll-sass-converter-1.5.2
Successfully installed concurrent-ruby-1.1.5
Successfully installed i18n-0.9.5
Building native extensions. This could take a while...
Successfully installed http_parser.rb-0.6.0
Building native extensions. This could take a while...
Successfully installed eventmachine-1.2.7
Successfully installed em-websocket-0.5.1
Successfully installed colorator-1.1.0
Successfully installed public_suffix-3.0.3
Successfully installed addressable-2.6.0
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
unknown encoding name "chunked\r\n\r\n25" for ext/ruby_http_parser/vendor/http-parser-java/tools/parse_tests.rb, skipping
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
Done installing documentation for safe_yaml, rouge, forwardable-extended, pathutil, mercenary, liquid, kramdown, ruby_dep, ffi, rb-inotify, rb-fsevent, listen, jekyll-watch, sass-listen, sass, jekyll-sass-converter, concurrent-ruby, i18n, http_parser.rb, eventmachine, em-websocket, colorator, public_suffix, addressable, jekyll after 40 seconds
25 gems installed
daniels-mbp:rubygems-3.0.3 seafile$ jekyll --version
jekyll 3.8.5
daniels-mbp:rubygems-3.0.3 seafile$ 
