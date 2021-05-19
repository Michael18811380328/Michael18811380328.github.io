# Text-Runner 插件说明

主要功能：是一个文档工具，使得文档内容可以执行，使用 JS 将一段HTML标签中的内容进行提取分析，获取内部的节点和类型。类似功能在python可以实现。

TextRunner is an agile documentation tool, in particular a semantic documentation checker. It makes documentation executable. An example is the text you are reading right now, which is verified for correctness by TextRunner.

There are no limitations on the text that TextRunner executes/verifies. It can read and understand (if you tell it how) any form of plain text in any human language as well as complex data in tables, bullet point lists, and embedded images.

#### Use cases 使用案例

evergreen tutorials: your documentation is always correct, whether you change it or the product it describes
semantic versioning: know whether a product change affects documented behavior
readme-driven development: documentation is your product prototype and drives its implementation

#### run 运行记录

~~~bash
# 打开项目文件夹
cd test
npm install --dev text-runner
ls
node_modules      package-lock.json package.json

# 运行帮助
node_modules/.bin/text-run help

TextRunner 3.6.0

USAGE: text-run [<options>] <command>

COMMANDS
  run [<filename>]  tests the entire documentation, or only the given file/folder
  add <filename>    scaffolds a new block type handler
  setup             creates an example configuration file
  version           shows the currently installed version
  help              shows this help screen

OPTIONS
  --config          provide a custom configuration filename
  --offline         don't check external links

# 初始化配置 创建一个 text-run.yml 文件
node_modules/.bin/text-run setup
Created configuration file text-run.yml with default values

# 测试文件
node_modules/.bin/text-run test.md

# 初始化没有 helloworld 的命令，下面是默认的活动类型
test.md:1 -- unknown activity type: helloworld
Available built-in activity types:
* cd
* check-image
* check-link
* create-directory
* create-file
* run-async-javascript
* run-console-command
* run-javascript
* start-process
* stop-process
* validate-javascript
* verify-console-command-output
* verify-npm-global-command
* verify-npm-install
* verify-process-output
* verify-source-file-content
* verify-workspace-contains-directory
* verify-workspace-file-content

No custom actions defined.

# 可以通过创建一个 helloworld 的活动类型
To create a new "helloworld" activity type,
run "text-run add helloworld"

> 1 | <a textrun="helloworld"></a>
  2 | 

1 errors, 1 activities in 1 files, 26ms

# 新建一个JS文件并放入官方文档中的内容。
touch hello-world.js

# 加入自定义的命令
node_modules/.bin/text-run add hello-world

# 运行自定义的命令(获取文档内部的节点)
node_modules/.bin/text-run test.md
This code runs inside the "hello-world" block implementation.
I found these elements in your document:
AstNodeList [
  AstNode {
    type: 'anchor_open',
    tag: 'a',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content: '',
    attributes: { textrun: 'hello-world' } },
  AstNode {
    type: 'anchor_close',
    tag: '/a',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content: '',
    attributes: { textrun: 'hello-world' } } ]
test.md:1 -- Hello world

Success! 1 activities in 1 files, 25ms
# 可以看出，将内部的HTML标签读取，获取一对a标签

# 在a标签内放置一段内容，即可获取内部的内容
node_modules/.bin/text-run test.md
This code runs inside the "hello-world" block implementation.
I found these elements in your document:
AstNodeList [
  AstNode {
    type: 'anchor_open',
    tag: 'a',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content: '',
    attributes: { textrun: 'hello-world' } },
  AstNode {
    type: 'text',
    tag: '',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content:
     'I start to learn front-end development. There are plenty of differences between traditional webpage editing (such as using Adobe Dreamweaver software to design a webpage). The new standards of HTML5 and CSS3 are amazing. To a certain extent, these parts are easy considering I\'m familiar with softwares like photoshop, firework and other Adobe softwares and so on. It is easy to use css, but using it well is a challenge.',
    attributes: {} },
  AstNode {
    type: 'anchor_close',
    tag: '/a',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content: '',
    attributes: { textrun: 'hello-world' } } ]
test.md:1 -- Hello world

Success! 1 activities in 1 files, 24ms

node_modules/.bin/text-run test.md
This code runs inside the "hello-world" block implementation.
I found these elements in your document:
AstNodeList [
  AstNode {
    type: 'anchor_open',
    tag: 'a',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content: '',
    attributes: { textrun: 'hello-world' } },
  AstNode {
    type: 'anchor_close',
    tag: '/a',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content: '',
    attributes: { textrun: 'hello-world' } } ]
test.md:1 -- Hello world

Success! 1 activities in 1 files, 17ms

node_modules/.bin/text-run test.md
This code runs inside the "hello-world" block implementation.
I found these elements in your document:
AstNodeList [
  AstNode {
    type: 'anchor_open',
    tag: 'a',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content: '',
    attributes: { textrun: 'hello-world' } },
  AstNode {
    type: 'text',
    tag: '',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content:
     'I love potato.I start to learn front-end development. There are plenty of differences between traditional webpage editing (such as using Adobe Dreamweaver software to design a webpage).',
    attributes: {} },
  AstNode {
    type: 'anchor_close',
    tag: '/a',
    file: AbsoluteFilePath { value: 'test.md' },
    line: 1,
    content: '',
    attributes: { textrun: 'hello-world' } } ]
test.md:1 -- Hello world

Success! 1 activities in 1 files, 19ms
node_modules/.bin/text-run test.md

# 改变规则，输出文档的全部属性和节点
This code runs inside the "hello-world" block implementation.
I found these elements in your document:
{ configuration:
   { FormatterClass: [Function: DetailedFormatter],
     actions: {},
     classPrefix: 'textrun',
     defaultFile: '',
     exclude: [ 'node_modules' ],
     fileGlob: 'test.md',
     keepTmp: false,
     offline: false,
     publications: Publications [],
     sourceDir: '/Desktop/test',
     useSystemTempDirectory: false,
     workspace: '/Desktop/test/tmp' },
  file: 'test.md',
  formatter:
   DetailedFormatter {
     activity:
      { file: [AbsoluteFilePath],
        line: 1,
        nodes: [AstNodeList],
        type: 'hello-world' },
     statsCounter:
      StatsCounter {
        errorCount: 0,
        skipCount: 0,
        successCount: 0,
        warningCount: 0,
        time: [Time] },
     stdout: { write: [Function: bound log] },
     stderr: { write: [Function: bound log] },
     output: '',
     title: 'Hello world',
     sourceDir: '/Desktop/test',
     skipped: false,
     warned: false,
     console: { log: [Function: log] } },
  line: 1,
  linkTargets: LinkTargetList { targets: { 'test.md': [] } },
  nodes:
   AstNodeList [
     AstNode {
       type: 'anchor_open',
       tag: 'a',
       file: [AbsoluteFilePath],
       line: 1,
       content: '',
       attributes: [Object] },
     AstNode {
       type: 'text',
       tag: '',
       file: [AbsoluteFilePath],
       line: 1,
       content:
        'I love potato.I start to learn front-end development. There are plenty of differences between traditional webpage editing (such as using Adobe Dreamweaver software to design a webpage).',
       attributes: {} },
     AstNode {
       type: 'anchor_close',
       tag: '/a',
       file: [AbsoluteFilePath],
       line: 1,
       content: '',
       attributes: [Object] } ] }
test.md:1 -- Hello world

Success! 1 activities in 1 files, 27ms

~~~

