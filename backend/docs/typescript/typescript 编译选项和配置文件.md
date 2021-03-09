# typescript 编译选项和配置文件

使用 TS 完成前端项目时，通常需要把 TS 编译成不同版本的 JS，然后和其他文件进行共同使用。

## 配置文件说明

配置项放在 tsconfig.json 中，主要包含下面的配置

~~~json
* 有 tsconfig.json 文件的目录是一个 Typescript 项目
* tsc 没有输入文件
：从当前位置往上找 tsconfig.json
：--project 目录（包含 tsconfig.json） | .json 文件
* 有输入文件则忽略 tsconfig.json
* 属性 files：要编译的文件
* 属性 include：包含的文件
* 属性 exclude：排除的文件
* 属性 compilerOptions：编译选项
* glob-like file patterns，水滴模式
  ：* = 零个或多个字符（不包括目录分隔符）
  ：? = 一个字符
  ：**/ = 递归匹配子目录
  ：（* or .*）匹配 .ts, .tsx, .d.ts 和 .jsx（allowJs = true）
* 没有指定 files 和 include：当前目录和子目录中的 typescript 文件
* 同时指定 files 和 include：取并集
* 没有指定 exclude，默认排除 outDir
* exclude 可以排除 include，不能排除 files
* exclude 默认 node_modules, bower_components, jspm_packages and <outDir>
* 引用的文件也会被包括
* 有可能的输入文件不会被包括，不建议使用同名文件（不同扩展名）
* tsconfig.json 空的也可以
* 命令行选项优先
* node_modules/@types 会被包括，一直往上类推
* typeRoots 限制了根目录
* types 在的话，只有指定的才会被包括 ./node_modules/@types/node ...、
* type package：1）有 index.d.ts 的文件夹；2）package.json that has a types field
* 自动包含只有在 全局声明 才重要，使用 import 不需要
* 属性 extends 可以继承配置
* extends 是顶级属性，值为 另一个配置文件的路径
* 本地配置覆盖继承配置，互相继承会报错
* 路径相对于各个配置文件
* compileOnSave：顶级属性，目前只对 VS2015以上有效
~~~

## 编译选项说明

编译选项，指的是编译过程中，需要怎么操作

~~~json
typescript 编译选项
-- allowJs = false：js文件也编译
-- allowUnreachableCode = false：不可能执行的代码要不要报错
-- allowUnusedLabels = false：没有用到的 label 要不要报错
-- alwaysStrict = false：按严格模式解析和输出
-- build = false：生产当前项目和依赖项目
-- charset = "utf-8"：输入文件的字符集
-- checkJs = false：js文件的错误要不要报
-- declaration = false：生成对应的 .d.ts 文件
-- declarationDir = null：声明文件放在哪里
-- declarationMap = false：生产声明文件 sourcemap
-- diagnostics = false：显示诊断信息
-- disableSizeLimit = false：取消项目大小限制
-- downlevelIteration = false：面向 ES5 和 ES3 时，将 for..of, spread and destructuring  降级
-- emitBOM = false：输入文件编码为带BOM
-- emitDeclarationOnly = false：仅输出声明文件
-- forceConsistentCasingInFileNames = false：强制文件名大小写一致
-- help：帮助
-- inlineSources = false：内联 sourcemap
-- inlineSources = false：内联源码，需要同时设置 inlineSources 和 sourcemap
-- init：初始化一个项目
-- isolatedModules = false：每个文件都是一个独立的模块
-- jsx = "Preserve"：jsx处理方式
-- jsxFactory = "React.createElement"：jsx 的工厂方法
-- keyofStringsOnly = false：keyof 只使用字符串键解析
-- lib：编译时要使用的库
：ES5: DOM,ES5,ScriptHost
：ES6: DOM,ES6,DOM.Iterable,ScriptHost
-- listEmittedFiles = false：列出生成的文件名
-- listFiles = false：列出生成的文件名
-- locale：错误信息语言
-- module：模块代码怎么生成
		："None", "CommonJS", "AMD", "System", "UMD", "ES6", "ES2015" or "ESNext".
-- watch：盯住输入文件
-- target = "ES3"：目标标准
		："ES3" (default), "ES5", "ES6"/"ES2015", "ES2016", "ES2017" or "ESNext". 
-- showConfig = false：只显示配置
-- removeComments = fasle：移除注释
-- project：指定配置文件
-- pretty = true：美化输出
--preserveConstEnums = false：保留常量和枚举声明
--noEmit：别输出
--noEmitOnError：出错时别输出
~~~

