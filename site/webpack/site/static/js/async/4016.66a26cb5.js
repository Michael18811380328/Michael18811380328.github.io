"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["4016"],{1765:function(n,e,s){s.r(e),s.d(e,{default:function(){return l}});var r=s(6469),i=s(8809);function a(n){let e=Object.assign({h1:"h1",a:"a",p:"p",h2:"h2",ul:"ul",li:"li",code:"code",pre:"pre",h3:"h3"},(0,i.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(e.h1,{id:"网易项目webpack配置解析",children:["网易项目webpack配置解析",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#网易项目webpack配置解析",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"统计信息：字数 16390  阅读33分钟"}),"\n",(0,r.jsx)(e.p,{children:"create time 2020-01-01"}),"\n",(0,r.jsx)(e.p,{children:"last modify time 2024-04-12"}),"\n",(0,r.jsx)(e.p,{children:"课程 webpack 版本是4"}),"\n",(0,r.jsx)(e.p,{children:"学习目标：自己可以看懂90%的配置文件，并自定义plugin和loader"}),"\n",(0,r.jsxs)(e.h2,{id:"01-环境与目录",children:["01 环境与目录",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#01-环境与目录",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"环境分类：开发、测试、生产"}),"\n",(0,r.jsx)(e.p,{children:"开发环境：增加开发服务器操作"}),"\n",(0,r.jsx)(e.p,{children:"测试环境：测试环境和生产环境很接近"}),"\n",(0,r.jsx)(e.p,{children:"生产环境：增加 tree-shaking devtool(source-map)操作(压缩操作)"}),"\n",(0,r.jsx)(e.p,{children:"不同模式下对应不同的文件："}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"开发环境下 npm run dev => dev.config.js；"}),"\n",(0,r.jsx)(e.li,{children:"生产环境下 npm run build => prod.config.js。"}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"实际操作时，有一个 base.config.js 是基础默认配置，不同环境都会执行，运行时会执行多个脚本。"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"npm run build"})," 实际执行了什么操作？"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"node build.js\n\n# 内部脚本：使用 webpack 打包（webpack.pro.js）进行打包\n# webpack.base.js 与 webpack.pro.js 合并\n# 从 config 中拿出 index.js 和 pro.env 中的环境变量\n"})}),"\n",(0,r.jsx)(e.p,{children:"package.json"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-json",children:'{\n 	"scripts": {\n    "start": "npm run dev",\n    "test": "npm run unit && npm run e2e",\n    "lint": "eslint --ext .js src test/unit test/e2e/specs",\n    "build": "node build/build.js",\n    "build-online": "node build/build.js online",\n    "css": "sass --watch --scss --no-cache --unix-newlines src:src -t compressed",\n  }\n}\n'})}),"\n",(0,r.jsx)(e.p,{children:"Build.js （这是网易项目中自定义的build脚本）"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"'use strict';\n\n// 执行检查版本函数\nrequire('./check-versions')();\n\n// 设置node环境是生产环境\nprocess.env.NODE_ENV = 'production';\n\n// 默认的创建环境是空\nprocess.env.BUILD_MODE = '';\n\n// 判断传参：如果传参是在线模式，那么把创建环境设置为在线（把terminal中的参数变成全局变量使用）\nif (!!process.argv[2] && process.argv[2] === 'online') {\n  process.env.BUILD_MODE = 'online';\n}\n\n// 下面是基本的第三方库\nconst ora = require('ora');\nconst rm = require('rimraf');\nconst path = require('path');\nconst chalk = require('chalk');\nconst webpack = require('webpack');\nconst config = require('../config');\nconst webpackDllConfig = require('./webpack.dll.config');\n\n// 开始加载 loading 动画\nconst snipper = ora('building for production...');\nsnipper.start();\n\n// dll 打包函数\nfunction buildDll() {\n  return new Promise((resolve, reject) => {\n\n    // 使用webpack开始编译webpack 本身是一个方法 webpack(config);\n    // 第一个参数是配置对象，第二个参数是回调函数\n    webpack(webpackDllConfig, (err, stats) => {\n      // 编译结束后，停止loading\n      spinner.stop();\n      \n      // 抛出编译的错误\n      if (err) throw err;\n      \n      // 控制台输出编译的结果（配置）\n      process.stdout.write(stats.toString({\n        colors: true,\n        modules: false,\n        children: false, // if ts-loader, it is true\n        chunk: false,\n        chunkModules: false,\n      }) + '\\n\\n');\n      \n      // 如果编译成功，但是有错误，那么显示错误\n      if (stats.hasErrors()) {\n        console.log(chalk.red('Build failed with errors.\\n'));\n        // Promise 抛出拒绝\n        reject();\n        // 退出进程\n        process.exit();\n      }\n      \n      // 如果编译成功，提示成功文本\n      console.log(chalk.cyan('Build complete.\\n'));\n      console.log(chalk.yellow('Tip: build files are meant to be served over an HTTP server.\\n Opening index.html over file:// will not work.\\n'));\n      resolve();\n    });\n  });\n}\n\n// build 打包函数\n// 不同的 build 使用不同配置文件，其他配置类似（打印日志）\nfunction buildProject(config) {\n  return new Promise((resolve, reject) => {\n    webpack(config, (err, stats) => {\n      spinner.stop();      \n      if (err) throw err;\n      process.stdout.write(stats.toString({\n        colors: true,\n        modules: false,\n        children: false,\n        chunks: false,\n        chunkModules: false,\n      }) + '\\n\\n');\n    });\n    // 处理异常基本相同\n    if (stats.hasErrors()) {\n      console.log(chalk.red('Build failed with errors.\\n'));\n      reject();\n      process.exit(1);\n    }\n    console.log(chalk.cyan('Build complete.\\n'));\n    resolve();\n  });\n}\n\n// 脚本开始运行\n// 01 删除默认的dist目录（清空打包环境）\nrm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {\n  if (err) throw err;\n\n  // 02 判断模式，开始编译\n  // 在线模式\n  if (process.env.BUILD_MODE === 'online') {\n    // 首先编译DLL，执行上面的函数\n    buildDll().then(() => {\n      // 引入生产环境配置\n      return require('./webpack.prod.conf');\n    }).then((config) => {\n      // 使用生产环境配置编译项目\n      return buildProject(config);\n    });\n  }\n  // 测试模式（测试环境配置）\n  else {\n    buildDll().then(() => {\n      return require('./webpack.test.conf');\n    }).then((config) => {\n      return buildProject(config);\n    });\n  }\n});\n"})}),"\n",(0,r.jsx)(e.p,{children:"使用第三方插件创建的build.js 也差不多，@vue/cli 创建的build脚本。"}),"\n",(0,r.jsx)(e.p,{children:"在命令行中输入 webpack config.js 和执行 node build.js 并在JS文件中使用的效果是一样的。"}),"\n",(0,r.jsx)(e.p,{children:"代码中，webpack 本质上是一个方法。"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const webpack = require('webpack');\n\nwebpack(config);\n"})}),"\n",(0,r.jsx)(e.p,{children:"打包过程是异步的，所以先进行DLL打包，然后再引入生产环境配置，进行下一步打包。"}),"\n",(0,r.jsx)(e.p,{children:"build 脚本：导入配置文件，调用webpack打包方法进行打包"}),"\n",(0,r.jsx)(e.p,{children:"build.js"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {\n  if (err) {\n    throw err;\n  }\n  webpack(webpackConfig, (err, stats) => {\n    if (err) {\n      throw err;\n    }\n    process.stdout.write(stats.toString({\n      colors: true,\n      modules: false,\n      children: false,\n      chunks: false,\n      chunkModules: false,\n    }) + '\\n\\n');\n    if (stats.hasError()) {\n      console.log(chalk.red('Build failed with errors'));\n      process.exit(1);\n    }\n    console.log(chalk.cyan('Build complete.'));\n  });\n});\n"})}),"\n",(0,r.jsx)(e.p,{children:"prod 脚本中，有一个webpack-merge 方法，可以合并多个脚本"}),"\n",(0,r.jsx)(e.p,{children:"配置的本质就是一个对象，merge就是合并多个对象"}),"\n",(0,r.jsx)(e.p,{children:"webpack.prod.conf.js"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const path = require('path');\nconst utils = require('utils');\nconst webpack = require('webpack');\nconst CopyWebpackPlugin = require('copy-webpack-plugin');\nconst MiniCssExtractPlugin = require('mini-css-extract-plugin');\n\nconst merge = require('webpack-merge');\n\nconst config = require('../config');\nconst baseWebpackConfig = require('./webpack.base.conf');\n\nconst env = require('../config/prod.env');\n\n// 如果构建模式不是Online构建，那么设置环境变量的发布环境，为测试环境\n\n// merge 方法用于合成配置文件（基本配置和build配置文件）\nconst webpackConfig = merge(baseWebpackConfig, {\n  mode: 'production',\n  module: {\n    rules: utils.styleLoaders({\n      sourceMap: config.build.productionSourceMap,\n      extract: true,\n      usePostCSS: true,\n    })\n  },\n  devtool: false,\n  output: {\n    path: config.build-assetsRoot,\n    filename: utils.aeestsPath('js/[name].[chunkhash].js'),\n    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')\n  },\n  optimization: {\n    runtimeChunk: {\n      name: 'manifest'\n    },\n    splitChunk: {\n      //\n    }\n  }\n})\n"})}),"\n",(0,r.jsxs)(e.h2,{id:"02-常用-loader-和插件",children:["02 常用 loader 和插件",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#02-常用-loader-和插件",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"常用插件 plugins，下面依次介绍"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"webpack.DefinePlugin 在打包阶段定义全局变量"}),"\n",(0,r.jsx)(e.li,{children:"webpack.HashedModuledsPlugin 保持 module.id 稳定"}),"\n",(0,r.jsx)(e.li,{children:"webpack.NoEmitOnErrorsPlugin 屏蔽错误"}),"\n",(0,r.jsx)(e.li,{children:"webpack.providePlugin 提供插件库"}),"\n",(0,r.jsx)(e.li,{children:"copy-webpack-plugin 可以帮助拷贝内容"}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:["全部的插件官方文档：",(0,r.jsx)(e.a,{href:"https://v4.webpack.docschina.org/plugins/",target:"_blank",rel:"noopener noreferrer",children:"https://v4.webpack.docschina.org/plugins/"})]}),"\n",(0,r.jsxs)(e.h3,{id:"webpackdefineplugin",children:["webpack.DefinePlugin",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#webpackdefineplugin",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"指定当前的环境变量（打包阶段定义全局变量）"}),"\n",(0,r.jsx)(e.p,{children:"可以使用 webpack --env production 通过命令行的形式传参，或者使用这个对象指定当前的环境变量是开发环境还是生产环境，在业务代码中获取到当前的环境变量。"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"// --env process.env 无法在业务代码中拿到（所以要初始化定义环境，把用户输入的环境放在node中）\nplugins: [\n  // 定义环境（测试环境还是生产环境，不需要每次指定，--env 比较麻烦）\n  new webpack.DefinePlugin({\n    'process.env': env,\n  }),\n]\n"})}),"\n",(0,r.jsx)(e.p,{children:"prod.env.js 简化版"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"'use strict';\nmodule.exports = {\n  NODE_ENV: '\"production\"',\n  publish_env: '\"online\"'\n};\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"webpackdllreferenceplugin",children:["webpack.DllReferencePlugin",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#webpackdllreferenceplugin",children:"#"})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"plugins: [\n  // DllReferencePlugin 将打包输出的内容 映射关系放置到项目中，在打包的时候，忽略这些文件\n  new webpack.DllReferencePlugin({\n    context: path.join(__dirname, '..'),\n    manifest: require('./vendor-manifest.json')\n  }),\n]\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"minicssextractplugin",children:["MiniCssExtractPlugin",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#minicssextractplugin",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"官方推荐使用mini-css-extract-plugin插件来打包css文件（从css文件中提取css代码到单独的文件中，对css代码进行代码压缩等）。"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"plugins: [\n  // extract css into its own file\n  new MiniCssExtractPlugin({\n    filename: utils.assetsPath('css/[name].[contenthash].css')\n  }),\n]\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"moduleconcatenationplugin",children:["ModuleConcatenationPlugin",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#moduleconcatenationplugin",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"过去 webpack 打包时的一个取舍是将 bundle 中各个模块单独打包成闭包。这些打包函数使你的 JavaScript 在浏览器中处理的更慢。相比之下，一些工具像 Closure Compiler 和 RollupJS 可以提升(hoist)或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"plugins: [\n  // enable scope hoisting\n  new webpack.optimize.ModuleConcatenationPlugin(),\n]\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"webpackhashedmoduleidsplugin",children:["webpack.HashedModuleIdsPlugin",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#webpackhashedmoduleidsplugin",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"保持模块的 module.id 稳定"}),"\n",(0,r.jsx)(e.p,{children:"该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境。"}),"\n",(0,r.jsx)(e.p,{children:"如何判断一个文件是新的还是旧的（浏览器读取新文件，还是读取缓存文件），就根据文件后面的hash值判断。所以webpack打包输出的文件中就增加了哈希值。"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const webpackConfig = merge(baseWebpackConfig, {\n  mode: 'production',\n  module: {\n    rules: utils.styleLoaders({\n      sourceMap: config.build.productionSourceMap,\n      extract: true,\n      usePostCSS: true,\n    })\n  },\n  devtool: false,\n  output: {\n    path: config.build.assetsRoot,\n    filename: utils.assetsPath('js/[name].[chunkhash].js'),\n    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),\n  },\n  plugins: [\n    // keep module.id stable when vender modules does not change\n    // 如果 static 路径下面的第三方库文件没有改变，那么不需要重新打包这部分代码\n    new webpack.HashedModuleIdsPlugin(),\n  ],\n});\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"webpacknoemitonerrorsplugin",children:["webpack.NoEmitOnErrorsPlugin",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#webpacknoemitonerrorsplugin",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"如果代码出现问题，webpack 默认不会继续编译，显示错误。"}),"\n",(0,r.jsx)(e.p,{children:"这个插件可以继续编译并让浏览器显示（操作更友好）。"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"  plugins: [    \n    // webpack.NoEmitOnErrorsPlugin 屏蔽错误\n    new webpack.NoEmitOnErrorsPlugin(),\n  ],\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"webpackprovideplugin-提供第三方库",children:["webpack.providePlugin 提供第三方库",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#webpackprovideplugin-提供第三方库",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"如果我们在全局中使用某些库，例如jquery，可以使用这个插件"}),"\n",(0,r.jsx)(e.p,{children:"base.conf.js"}),"\n",(0,r.jsx)(e.p,{children:"对于 axios jquery 等通用组件，每个组件都需要 import，可以只用这个插件。直接在这里定义，不需要在不同组件中全局定义，定以后可以打包到环境中。"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"plugins: [\n  new webpack.ProvidePlugin({\n    Regular: 'Regular',\n    $: 'jquery',\n    axios: 'axios',\n  }),\n  ...utils.htmlPlugin(),\n  new HappyPack({\n    id: 'happybabel',\n    loader: ['babel-loader?cacheDirectory=true'],\n    threadPool: happyThreadPool,\n  }),\n]\n"})}),"\n",(0,r.jsxs)(e.h3,{id:"copy-webpack-plugin-可以帮助拷贝内容",children:["copy-webpack-plugin 可以帮助拷贝内容",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#copy-webpack-plugin-可以帮助拷贝内容",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"这个插件不是自带的，需要安装"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const CopyWebpackPlugin = require('copy-webpack-plugin');\n\nplugins: [\n  // copy-webpack-plugin 可以帮助拷贝内容\n  // 直接把一部分 static 的代码拷贝到打包后的目录中（不需要手动 mv 命令）\n  // webpack 只会处理打包的模块，例如static中有100张图片，可以使用这个插件\n  new CopyWebpackPlugin([\n    {\n      from: path.resolve(__dirname, '../static'),\n      to: config.dev.assetsSubDirectory,\n      ignore: ['.*'],\n    }\n  ])\n],\n"})}),"\n",(0,r.jsxs)(e.h2,{id:"03-优化打包的内容",children:["03 优化打包的内容",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#03-优化打包的内容",children:"#"})]}),"\n",(0,r.jsxs)(e.h3,{id:"dll优化",children:["DLL优化",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#dll优化",children:"#"})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:'plugins: [\n  new webpack.DllReferencePlugin({\n    manifest: require("./dll/vender-manifest.json")\n  })\n]\n'})}),"\n",(0,r.jsx)(e.p,{children:"什么是DLL优化？我们需要用第三方库，不会修改第三方库的内容，每次webpack打包会处理第三方库代码。既然第三方库代码不变，我们可以先把第三方库代码处理了，放在一边，然后下一次打包不需要再次处理这部分代码，直接使用。"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"import $ from 'jquery';\nimport _ from 'lodash';\n"})}),"\n",(0,r.jsx)(e.p,{children:"webpack.dll.js"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const webpack = require('webpack');\n\nmodule.exports = {\n  entry: {\n    vender:['jquery', 'lodash']\n  },\n  output: {\n    path: __dirname + '/dll',\n    filename: '[name].dll.js',\n    library: '[name]_library'\n  },\n  plugins: [\n    new webpack.DllPlugin({\n      path: __dirname + '/dll/[name]-manifest.json',\n      name: '[name]_library'\n    })\n  ]\n};\n"})}),"\n",(0,r.jsx)(e.p,{children:"bash 打包第三方库"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"webpack --config webpack.dll.js\n"})}),"\n",(0,r.jsx)(e.p,{children:"输出 vender.dll.js"}),"\n",(0,r.jsx)(e.p,{children:"然后在webpack配置文件中增加这个文件"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:'plugins: [\n  new webpack.DllReferencePlugin({\n    manifest: require("./dll/vender-manifest.js")\n  })\n]\n'})}),"\n",(0,r.jsx)(e.p,{children:"使用 webpack 继续打包项目代码"}),"\n",(0,r.jsxs)(e.h3,{id:"happypack",children:["HappyPack",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#happypack",children:"#"})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const happyPack = require('happypack');\n\n// 配置连接池，容量等于CPU的个数（适合多核CPU并行打包）\nconst happyThreadPool = HappyPack.ThreadPool({\n  size: os.cpus().length\n});\n\nmodule: {\n  rules: [\n    {\n      test: /\\.js$/,\n      use: [\n        {\n          loader: 'happypack/loader?id=happybabel'\n        }\n      ]\n    }\n  ]\n},\nplugins: [\n  new HappyPack({\n    // 这里的ID和上面的ID必须相同，否则报错\n    id: 'happybabel',\n    loaders: ['babel-loader?cacheDirectory=true'],\n    threadPool: happyThreadPool,\n  }),\n  // 支持其他类型文件的编译\n  new HappyPack({\n    // 这里的ID和上面的ID必须相同，否则报错\n    id: 'happybabel',\n    loaders: ['scss-loader?cacheDirectory=true'],\n    threadPool: happyThreadPool,\n  })\n]\n"})}),"\n",(0,r.jsx)(e.p,{children:"如果项目较小，打包编译的时间反而更多"}),"\n",(0,r.jsx)(e.p,{children:"因为这里使用多进程，调用进程也消耗时间"}),"\n",(0,r.jsx)(e.p,{children:"所以文件组件较少时，使用 Happypack 可能增加打包时间。"}),"\n",(0,r.jsx)(e.p,{children:"如果大型项目，那么使用这个可以节省很多时间。"}),"\n",(0,r.jsx)(e.p,{children:"这是一个第三方库，需要单独安装到dev中"}),"\n",(0,r.jsxs)(e.h2,{id:"04-webpack-自定义插件",children:["04 webpack 自定义插件",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#04-webpack-自定义插件",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"项目中打包简化：可变性配置：通过编写响应的操作函数；"}),"\n",(0,r.jsxs)(e.p,{children:["Myloader.js 自定义增加插件（使用正则替换代码中的字符，类似于AST，抽象语法树，类似中间件的语法）开发的时候，我们使用 static 中的图片，生产环境中需要使用 ",(0,r.jsx)(e.a,{href:"http://www.baidu.com",target:"_blank",rel:"noopener noreferrer",children:"www.baidu.com"})," 中的图片，所以可以自定义一个插件替换开发环境中的变量。"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"module.exports = function(context) {\n  context.replace('bind', 'on');\n  return context;\n}\n"})}),"\n",(0,r.jsx)(e.p,{children:"使用"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const require('./myplugin');\n\nmodule: {\n  rules: [\n    {\n      test: /\\.js$/,\n      // loader: 'babel-loader'\n      use: [\n        { loader: 'babel-loader' },\n        { loader: './myloader.js' },\n      ]\n    }\n  ]\n}\n"})}),"\n",(0,r.jsx)(e.p,{children:"index.js 插件就是监听 webpack 的生命周期函数，并在合适的时候处理代码"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"const fs = require('fs');\nconst path = require('path');\n\nmodule.exports = a;\n\nfunction a () {\n  \n}\n\na.prototype.apply = function(compiler) {\n  compiler.hooks.done.tap('changeStitic', function(compilation) {\n    let context = compiler.options.context;\n    let publickPath = path.resolve(context, 'dist');\n    compilation.toJson().assets.forEach((ast) => {\n      const filePath = path.resolve(publickPath, ast.name);\n      fs.readFile(filepath, function(err, file) {\n        var newcontext = file.toString().replace('./static', 'www.baidu.com');\n        fs.writeFile(filePath, newcontext, function() {})\n      });\n    })\n  })\n}\n"})}),"\n",(0,r.jsx)(e.p,{children:"make 周期需要处理很多编译的配置，新手不好做，done 周期直接操作编译后的文件，相对简单"}),"\n",(0,r.jsxs)(e.h2,{id:"总结",children:["总结",(0,r.jsx)(e.a,{className:"header-anchor","aria-hidden":"true",href:"#总结",children:"#"})]}),"\n",(0,r.jsx)(e.p,{children:"如果对模块内容批量进行处理：loader 是首选方案；"}),"\n",(0,r.jsx)(e.p,{children:"如果要加入特殊的功能：可以自定义增加插件 plugin；"}),"\n",(0,r.jsx)(e.p,{children:"loader 是对某一类文件进行处理（css-loader sass-loader）"}),"\n",(0,r.jsx)(e.p,{children:"plugin 是监听到 webpack 的某个过程（make）执行的一个操作（webpack插件系统的生命周期）"})]})}function c(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(a,{...n})}):a(n)}let l=c;c.__RSPRESS_PAGE_META={},c.__RSPRESS_PAGE_META["webpack%2F03-%E7%BD%91%E6%98%93webpack%E9%85%8D%E7%BD%AE%E8%A7%A3%E6%9E%90.md"]={toc:[{text:"01 环境与目录",id:"01-环境与目录",depth:2},{text:"02 常用 loader 和插件",id:"02-常用-loader-和插件",depth:2},{text:"webpack.DefinePlugin",id:"webpackdefineplugin",depth:3},{text:"webpack.DllReferencePlugin",id:"webpackdllreferenceplugin",depth:3},{text:"MiniCssExtractPlugin",id:"minicssextractplugin",depth:3},{text:"ModuleConcatenationPlugin",id:"moduleconcatenationplugin",depth:3},{text:"webpack.HashedModuleIdsPlugin",id:"webpackhashedmoduleidsplugin",depth:3},{text:"webpack.NoEmitOnErrorsPlugin",id:"webpacknoemitonerrorsplugin",depth:3},{text:"webpack.providePlugin 提供第三方库",id:"webpackprovideplugin-提供第三方库",depth:3},{text:"copy-webpack-plugin 可以帮助拷贝内容",id:"copy-webpack-plugin-可以帮助拷贝内容",depth:3},{text:"03 优化打包的内容",id:"03-优化打包的内容",depth:2},{text:"DLL优化",id:"dll优化",depth:3},{text:"HappyPack",id:"happypack",depth:3},{text:"04 webpack 自定义插件",id:"04-webpack-自定义插件",depth:2},{text:"总结",id:"总结",depth:2}],title:"网易项目webpack配置解析",frontmatter:{}}}}]);