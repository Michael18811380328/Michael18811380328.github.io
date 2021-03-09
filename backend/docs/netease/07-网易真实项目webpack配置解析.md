# 第七课 网易项目webpack配置解析

webpack版本是4；目标是：自己可以看懂90%的配置文件，并自定义plugin和loader

## 01 环境与目录

环境分类：开发、测试、生产

开发环境中：增加开发服务器操作

测试环境中：测试环境和生产环境很接近

生产环境中：增加 tree-shaking devtool(source-map)操作(压缩操作) 

不同模式下对应不同的文件：开发环境下 npm run dev => dev.config.js；生产环境下面npm run build => prod.config.js。实际操作时，有一个 base.config.js 是基础默认配置，不同环境都会执行，运行时会执行多个脚本。

`npm run build` 实际执行了什么操作？

~~~bash
node build.js
内部脚本：使用 webpack 打包（webpack.pro.js）进行打包
webpack.base.js 与 webpack.pro.js 合并
从 config 中拿出 index.js 和 pro.env 中的环境变量
~~~

package.json

~~~json
{
  "author": "xxx",
 	"scripts": {
    "start": "npm run dev",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js src test/unit test/e2e/specs",
    "build": "node build/build.js",
    "build-online": "node build/build.js online",
    "css": "sass --watch --scss --no-cache --unix-newlines src:src -t compressed",
  }
}
~~~

Build.js （这是网易项目中自定义的build脚本）

~~~js
'use strict';

// 执行检查版本函数
require('./check-versions')();

// 设置node环境是生产环境
process.env.NODE_ENV = 'production';

// 默认的创建环境是空
process.env.BUILD_MODE = '';

// 判断传参：如果传参是在线模式，那么把创建环境设置为在线（把terminal中的参数变成全局变量使用）
if (!!process.argv[2] && process.argv[2] === 'online') {
  process.env.BUILD_MODE = 'online';
}

// 下面是基本的第三方库
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackDllConfig = require('./webpack.dll.config');

// 开始加载 loading 动画
const snipper = ora('building for production...');
snipper.start();

// dll 打包函数
// webpack 本身是一个方法 webpack(config);
function buildDll() {
  return new Promise((resolve, reject) => {
    // 使用webpack开始编译，第一个是配置对象
    webpack(webpackDllConfig, (err, stats) => {
      // 编译结束后，停止loading
      spinner.stop();
      
      // 抛出编译的错误
      if (err) throw err;
      
      // 控制台输出编译的结果（配置）
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // if ts-loader, it is true
        chunk: false,
        chunkModules: false,
      }) + '\n\n');
      
      // 如果编译成功，但是有错误，那么显示错误
      if (stats.hasErrors()) {
        console.log(chalk.red('Build failed with errors.\n'));
        // Promise 抛出拒绝，退出进程
        reject();
        process.exit();
      }
      
      // 如果编译成功，提示成功文本
      console.log(chalk.cyan('Build complete.\n'));
      console.log(chalk.yellow('Tip: build files are meant to be served over an HTTP server.\n Opening index.html over file:// will not work.\n'));
      resolve();
    });
  });
}

function buildProject(config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      spinner.stop();      
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n');
    });
    // 处理异常基本相同
    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed with errors.\n'));
      reject();
      process.exit(1);
    }
    console.log(chalk.cyan('Build complete.\n'));
    resolve();
  });
}

// 删除默认的dist目录
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  // 如果是在线模式
  if (process.env.BUILD_MODE === 'online') {
    // 首先编译DLL
    buildDll().then(() => {
      // 引入生产环境配置
      return require('./webpack.prod.conf');
    })
      .then((config) => {
      // 使用生产环境配置编译项目
      return buildProject(config);
    });
  } else {
    // 测试模式
    buildDll().then(() => {
      return require('./webpack.test.conf');
    })
    .then((config) => {
      return buildProject(config);
    });
  }
});
~~~

使用第三方插件创建的build.js 也差不多，@vue/cli 创建的build脚本。

在命令行中输入 webpack config.js 和执行 node build.js 并在JS文件中使用的效果是一样的。webpack本质上是一个方法。

~~~js
const webpack = require('webpack');
webpack(config);
~~~

打包过程是异步的，所以先进行DLL打包，然后再引入生产环境配置，进行下一步打包。

build 脚本：导入配置文件，调用webpack打包方法进行打包
其他的脚手架中的build脚本也很简单

build.js

~~~js
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) {
    throw err;
  }
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw err;
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }) + '\n\n');
    if (stats.hasError()) {
      console.log(chalk.red('Build failed with errors'));
      process.exit(1);
    }
    console.log(chalk.cyan('Build complete.'));
  });
});
~~~

prod 脚本中，有一个webpack-merge 方法，可以合并多个脚本 

配置的本质就是一个对象，merge就是合并多个对象

webpack.prod.conf.js

~~~js
const path = require('path');
const utils = require('utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = require('../config/prod.env');
// 如果构建模式不是Online构建，那么设置环境变量的发布环境，为测试环境

const webpackConfig = merge(baseWebpackConfig, {
  // merge 方法用于合成配置文件（基本配置和build配置文件）
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    })
  },
  devtool: false,
  output: {
    path: config.build-assetsRoot,
    filename: utils.aeestsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunk: {
      //
    }
  }
})
~~~

## 02 常用 loader 和插件

常用插件 plugins，下面依次介绍

- webpack.DefinePlugin 再打包阶段定义全局变量
- webpack.HashedModuledsPlugin 保持 module.id 稳定
- webpack.NoEmitOnErrorsPlugin 屏蔽错误
- webpack.providePlugin 提供库
- copy-webpack-plugin 可以帮助拷贝内容

### webpack.DefinePlugin 

指定当前的环境变量（打包阶段定义全局变量）

可以使用 webpack --env production 通过命令行的形式传参，或者使用这个对象指定当前的环境变量是开发环境还是生产环境，在业务代码中获取到当前的环境变量。

~~~js
// --env process.env 无法在业务代码中拿到（所以要初始化定义环境，把用户输入的环境放在node中）
plugins: [
  new webpack.DefinePlugin({
    'process.env': env,
  }),
  // 定义环境（测试环境还是生产环境，不需要每次指定，--env 比较麻烦）
  new webpack.DllReferencePlugin({
    context: path.join(__dirname, '..'),
    manifest: require('./vendor-manifest.json')
  }),
  // extract css into its own file
  new MiniCssExtractPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css')
  }),
  // keep module.id stable when vender modules does not change
  new webpack.HashedModuleIdsPlugin(),
  // webpack 只会把处理的模块进入打包结果。
  // enable scope hoisting
  new webpack.optimize.ModuleConcatenationPlugin(),
]
~~~

prod.env.js 简化版

~~~js
'use strict';
module.exports = {
  NODE_ENV: '"production"',
  publish_env: '"online"'
};
~~~

### webpack.HashedModuleIdsPlugin

保持模块的 module.id 稳定

如何判断一个文件是新的还是旧的（浏览器读取新文件，还是读取缓存文件），就根据文件后面的hash值判断。所以webpack打包输出的文件中就增加了哈希值。

~~~js
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    })
  },
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
  },
  plugins: [
    // keep module.id stable when vender modules does not change
    // 如果static路径下面的第三方库文件没有改变，那么不需要重新打包这部分代码
    new webpack.HashedModuleIdsPlugin(),
    
    // webpack.NoEmitOnErrorsPlugin 屏蔽错误
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
~~~

### webpack.NoEmitOnErrorsPlugin

这个插件在上面已经使用了。如果代码出现问题，webpack 默认不会继续编译，显示错误。这个插件可以继续编译并让浏览器显示（操作更友好）。

### webpack.providePlugin 提供库

如果我们在全局中使用某些库，例如jquery，可以使用这个插件

base.conf.js

对于 axios jquery 等通用组件，每个组件都需要import，可以只用这个插件。直接在这里定义，不需要在不同组件中全局定义，定以后可以打包到环境中（React等是否可以这样使用？）

~~~js
plugins: [
  new webpack.ProvidePlugin({
    Regular: 'Regular',
    $: 'jquery',
    axios: 'axios',
  }),
  ...utils.htmlPlugin(),
  new HappyPack({
    id: 'happybabel',
    loader: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  }),
]
~~~

### copy-webpack-plugin 可以帮助拷贝内容

这个插件不是自带的，需要安装

~~~js
const CopyWebpackPlugin = require('copy-webpack-plugin');

plugins: [
  // copy-webpack-plugin 可以帮助拷贝内容
  // 直接把一部分 static 的代码拷贝到打包后的目录中（不需要手动mv命令）
  // webpack 只会处理打包的模块，例如static中有100张图片，可以使用这个插件
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: config.dev.assetsSubDirectory,
      ignore: ['.*'],
    }
  ])
],
~~~

## 03 优化的内容

### DLL优化

~~~js
plugins: [
  new webpack.DllReferencePlugin({
    manifest: require("./dll/vender-manifest.json")
  })
]
~~~

什么是DLL优化？我们需要用第三方库，不会修改第三方库的内容，每次webpack打包会处理第三方库代码。既然第三方库代码不变，我们可以先把第三方库代码处理了，放在一边，然后下一次打包不需要再次处理这部分代码，直接使用。

~~~js
import $ from 'jquery';
import _ from 'lodash';
~~~

Webpack.dll.js

~~~js
const webpack = require('webpack');
module.exports = {
  entry: {
    vender:['jquery', 'lodash']
  },
  output: {
    path: __dirname + '/dll',
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: __dirname + '/dll/[name]-manifest.json',
      name: '[name]_library'
    })
  ]
};
~~~

bash 打包第三方库

~~~bash
webpack --config webpack.dll.js
~~~

输出 vender.dll.js

然后在webpack配置文件中增加这个文件

~~~js
plugins: [
  new webpack.DllReferencePlugin({
    manifest: require("./dll/vender-manifest.js")
  })
]
~~~

webpack 继续打包

### HappyPack

~~~js
const happyPack = require('happypack');
// 配置连接池，容量等于CPU的个数（适合多核CPU并行打包）
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        {
          loader: 'happypack/loader?id=happybabel'
        }
      ]
    }
  ]
},
plugins: [
  new HappyPack({
    // 这里的ID和上面的ID必须相同，否则报错
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  }),
  // 支持其他类型文件的编译
  new HappyPack({
    // 这里的ID和上面的ID必须相同，否则报错
    id: 'happybabel',
    loaders: ['scss-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  })
]
~~~

如果项目较小，打包编译的时间反而更多

因为这里使用多进程，调用进程也消耗时间；
所以文件组件较少时，使用Happypack 可能增加打包时间。
如果使用几百个组件，那么使用这个可以节省很多事件
这是一个第三方库，需要单独安装到dev中

可以使用dtable这样的大项目测试一下编译的时间

## 03 webpack 中常见的问题解决方法

如果对模块内容进行处理：loader 是首选方案；

如果要加入特殊的功能：可以自定义增加插件 plugin；

项目中打包简化：可变性配置：通过编写响应的操作函数；

Myloader.js 自定义增加插件（使用正则替换代码中的字符，类似于AST，抽象语法树）开发的时候，我们使用static中的图片，生产环境中需要使用 www.baidu.com 中的图片，所以可以自定义一个插件替换开发环境中的变量。

~~~js
module.exports = function(context) {
  context.replace('bind', 'on');
  return context;
}
~~~

使用

~~~js
const require('./myplugin');

module: {
  rules: [
    {
      test: /\.js$/,
      // loader: 'babel-loader'
      use: [
        { loader: 'babel-loader' },
        { loader: './myloader.js' },
      ]
    }
  ]
}
~~~

index.js 插件就是监听webpack的生命周期函数，并在合适的时候处理代码

~~~js
const fs = require('fs');
const path = require('path');
module.exports = a;
function a () {
  
}
a.prototype.apply = function(compiler) {
  compiler.hooks.done.tap('changeStitic', function(compilation) {
    let context = compiler.options.context;
    let publickPath = path.resolve(context, 'dist');
    compilation.toJson().assets.forEach((ast) => {
      const filePath = path.resolve(publickPath, ast.name);
      fs.readFile(filepath, function(err, file) {
        var newcontext = file.toString().replace('./static', 'www.baidu.com');
        fs.writeFile(filePath, newcontext, function() {})
      });
    })
  })
}
~~~

make 周期需要处理很多编译的配置，新手不好做，done 周期直接操作编译后的文件，相对简单

loader 是对某一类文件进行处理（css-loader sass-loader）

plugin 是监听到 webpack 的某个过程（make）执行的一个操作（webpack插件系统的生命周期）
