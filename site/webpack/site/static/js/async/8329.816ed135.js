"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["8329"],{5211:function(e,n,s){s.r(n),s.d(n,{default:function(){return t}});var a=s(6469),i=s(8809);function r(e){let n=Object.assign({h1:"h1",a:"a",p:"p",h2:"h2",ul:"ul",li:"li",strong:"strong",pre:"pre",code:"code",h3:"h3"},(0,i.ah)(),e.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.h1,{id:"webpack-howto",children:["webpack-howto",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#webpack-howto",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"统计信息：字数 9298  阅读19分钟"}),"\n",(0,a.jsxs)(n.h2,{id:"教程目标",children:["教程目标",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#教程目标",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"This is a cookbook of how to get things done with webpack. This includes most things we use at Instagram and nothing we don't use.My advice: start with this as your webpack docs, then look at the official docs for clarification."}),"\n",(0,a.jsx)(n.p,{children:"这是Instagram公司的使用的webpack配置，可以从这个文档看起，然后以官方网站为准。"}),"\n",(0,a.jsxs)(n.h2,{id:"准备",children:["准备",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#准备",children:"#"})]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"You know browserify, RequireJS or something similar"}),"\n",(0,a.jsxs)(n.li,{children:["You see the value in:","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Bundle splitting"}),"\n",(0,a.jsx)(n.li,{children:"Async loading"}),"\n",(0,a.jsx)(n.li,{children:"Packaging static assets like images and CSS"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.h2,{id:"1-为什么选择-webpack",children:["1. 为什么选择 webpack?",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#1-为什么选择-webpack",children:"#"})]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"It's like browserify"})," but can split your app into multiple files. If you have multiple pages in a single-page app, the user only downloads code for just that page. If they go to another page, they don't redownload common code. 类似于 browserify，同时可以分割你的APP成为多个文件，如果一个SPA中有多个页面，用户可以下载当前页面需要的JS；如果跳转到另一个界面，不需要下载相同的代码。"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.strong,{children:"It often replaces grunt or gulp"})," because it can build and bundle CSS, preprocessed CSS, compile-to-JS languages and images, among other things. 可以实现 grunt gulp 类似的功能。"]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"It supports AMD and CommonJS, among other module systems (Angular, ES6). If you don't know what to use, use CommonJS."}),"\n",(0,a.jsxs)(n.h2,{id:"2-webpack-for-browserify-people",children:["2. Webpack for Browserify people",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#2-webpack-for-browserify-people",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"These are equivalent:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"browserify main.js > bundle.js\nwebpack main.js bundle.js\n"})}),"\n",(0,a.jsxs)(n.p,{children:["However, webpack is more powerful than Browserify, so you generally want to make a ",(0,a.jsx)(n.code,{children:"webpack.config.js"})," to keep things organized:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"// webpack.config.js\nmodule.exports = {\n  entry: './main.js',\n  output: {\n    filename: 'bundle.js'       \n  }\n};\n"})}),"\n",(0,a.jsx)(n.p,{children:"This is just JS, so feel free to put Real Code in there."}),"\n",(0,a.jsx)(n.p,{children:"相对于 browserify , webpack 可以设置配置文件"}),"\n",(0,a.jsxs)(n.h2,{id:"3-how-to-invoke-webpack",children:["3. How to invoke webpack",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#3-how-to-invoke-webpack",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"怎样使用 webpack? 在目录中增加配置文件，打包时可以增加参数配置不同的打包环境"}),"\n",(0,a.jsxs)(n.p,{children:["Switch to the directory containing ",(0,a.jsx)(n.code,{children:"webpack.config.js"})," and run:"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"webpack"})," for building once for development"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"webpack -p"})," for building once for production (minification)"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"webpack --watch"})," for continuous incremental build in development (fast!)"]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"webpack -d"})," to include source maps"]}),"\n"]}),"\n",(0,a.jsxs)(n.h2,{id:"4-compile-to-js-languages",children:["4. Compile-to-JS languages",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#4-compile-to-js-languages",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"怎样编译成JS文件（typescript coffeescript ES6 编译成 Js）各种 loader 预处理"}),"\n",(0,a.jsxs)(n.p,{children:["webpack's equivalent of browserify transforms and RequireJS plugins is a ",(0,a.jsx)(n.strong,{children:"loader"}),". Here's how you can teach webpack to load CoffeeScript and Facebook JSX+ES6 support (you must ",(0,a.jsx)(n.code,{children:"npm install babel-loader coffee-loader"}),"):"]}),"\n",(0,a.jsxs)(n.p,{children:["See also the ",(0,a.jsx)(n.a,{href:"https://www.npmjs.com/package/babel-loader",target:"_blank",rel:"noopener noreferrer",children:"babel-loader installation instructions"})," for additional dependencies (tl;dr run ",(0,a.jsx)(n.code,{children:"npm install babel-core babel-preset-es2015 babel-preset-react"}),")."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"// webpack.config.js\nmodule.exports = {\n  entry: './main.js',\n  output: {\n    filename: 'bundle.js'       \n  },\n  module: {\n    loaders: [\n      { test: /\\.coffee$/, loader: 'coffee-loader' },\n      {\n        test: /\\.js$/,\n        loader: 'babel-loader',\n        query: {\n          presets: ['es2015', 'react']\n        }\n      }\n    ]\n  }\n};\n"})}),"\n",(0,a.jsxs)(n.p,{children:["To enable requiring files without specifying the extension, you must add a ",(0,a.jsx)(n.code,{children:"resolve.extensions"})," parameter specifying which files webpack searches for:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"// webpack.config.js\nmodule.exports = {\n  entry: './main.js',\n  output: {\n    filename: 'bundle.js'       \n  },\n  module: {\n    loaders: [\n      { test: /\\.coffee$/, loader: 'coffee-loader' },\n      {\n        test: /\\.js$/,\n        loader: 'babel-loader',\n        query: {\n          presets: ['es2015', 'react']\n        }\n      }\n    ]\n  },\n  resolve: {\n    // you can now require('file') instead of require('file.coffee')\n    extensions: ['', '.js', '.json', '.coffee'] \n  }\n};\n"})}),"\n",(0,a.jsxs)(n.h2,{id:"5-stylesheets-and-images",children:["5. Stylesheets and images",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#5-stylesheets-and-images",children:"#"})]}),"\n",(0,a.jsxs)(n.p,{children:["First update your code to ",(0,a.jsx)(n.code,{children:"require()"})," your static assets (named as they would with node's ",(0,a.jsx)(n.code,{children:"require()"}),"):"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"require('./bootstrap.css');\nrequire('./myapp.less');\n\nvar img = document.createElement('img');\nimg.src = require('./glyph.png');\n"})}),"\n",(0,a.jsxs)(n.p,{children:["When you require CSS (or less, etc), webpack inlines the CSS as a string inside the JS bundle and ",(0,a.jsx)(n.code,{children:"require()"})," will insert a ",(0,a.jsx)(n.code,{children:"<style>"})," tag into the page. When you require images, webpack inlines a URL to the image into the bundle and returns it from ",(0,a.jsx)(n.code,{children:"require()"}),"."]}),"\n",(0,a.jsx)(n.p,{children:"But you need to teach webpack to do this (again, with loaders):"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"// webpack.config.js\nmodule.exports = {\n  entry: './main.js',\n  output: {\n    path: './build', // This is where images AND js will go\n    publicPath: 'http://mycdn.com/', // This is used to generate URLs to e.g. images\n    filename: 'bundle.js'\n  },\n  module: {\n    loaders: [\n      { test: /\\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders\n      { test: /\\.css$/, loader: 'style-loader!css-loader' },\n      { test: /\\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest\n    ]\n  }\n};\n"})}),"\n",(0,a.jsxs)(n.h2,{id:"6-feature-flags",children:["6. Feature flags",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#6-feature-flags",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"We have code we want to gate only to our dev environments (like logging) and our internal dogfooding servers (like unreleased features we're testing with employees). In your code, refer to magic globals:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"if (__DEV__) {\n  console.warn('Extra logging');\n}\n// ...\nif (__PRERELEASE__) {\n  showSecretFeature();\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"Then teach webpack those magic globals:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"// webpack.config.js\n\n// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.\nvar definePlugin = new webpack.DefinePlugin({\n  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),\n  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))\n});\n\nmodule.exports = {\n  entry: './main.js',\n  output: {\n    filename: 'bundle.js'       \n  },\n  plugins: [definePlugin]\n};\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Then you can build with ",(0,a.jsx)(n.code,{children:"BUILD_DEV=1 BUILD_PRERELEASE=1 webpack"})," from the console. Note that since ",(0,a.jsx)(n.code,{children:"webpack -p"})," runs uglify dead-code elimination, anything wrapped in one of these blocks will be stripped out, so you won't leak secret features or strings."]}),"\n",(0,a.jsxs)(n.h2,{id:"7-multiple-entrypoints",children:["7. Multiple entrypoints",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#7-multiple-entrypoints",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"Let's say you have a profile page and a feed page. You don't want to make the user download the code for the feed if they just want the profile. So make multiple bundles: create one \"main module\" (called an entrypoint) per page:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"// webpack.config.js\nmodule.exports = {\n  entry: {\n    Profile: './profile.js',\n    Feed: './feed.js'\n  },\n  output: {\n    path: 'build',\n    filename: '[name].js' // Template based on keys in entry above\n  }\n};\n"})}),"\n",(0,a.jsxs)(n.p,{children:["For profile, insert ",(0,a.jsx)(n.code,{children:'<script src="build/Profile.js"><\/script>'})," into your page. Do a similar thing for feed."]}),"\n",(0,a.jsxs)(n.h2,{id:"8-optimizing-common-code",children:["8. Optimizing common code",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#8-optimizing-common-code",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"Feed and Profile share a lot in common (like React and the common stylesheets and components). webpack can figure out what they have in common and make a shared bundle that can be cached between pages:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"// webpack.config.js\n\nvar webpack = require('webpack');\n\nvar commonsPlugin =\n  new webpack.optimize.CommonsChunkPlugin('common.js');\n\nmodule.exports = {\n  entry: {\n    Profile: './profile.js',\n    Feed: './feed.js'\n  },\n  output: {\n    path: 'build',\n    filename: '[name].js' // Template based on keys in entry above\n  },\n  plugins: [commonsPlugin]\n};\n"})}),"\n",(0,a.jsxs)(n.p,{children:["Add ",(0,a.jsx)(n.code,{children:'<script src="build/common.js"><\/script>'})," before the script tag you added in the previous step and enjoy the free caching."]}),"\n",(0,a.jsxs)(n.h2,{id:"9-async-loading",children:["9. Async loading",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#9-async-loading",children:"#"})]}),"\n",(0,a.jsx)(n.p,{children:"CommonJS is synchronous but webpack provides a way to asynchronously specify dependencies. This is useful for client-side routers, where you want the router on every page, but you don't want to have to download features until you actually need them."}),"\n",(0,a.jsxs)(n.p,{children:["Specify the ",(0,a.jsx)(n.strong,{children:"split point"})," where you want to load asynchronously. For example:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:"if (window.location.pathname === '/feed') {\n  showLoadingState();\n  require.ensure([], function() { // this syntax is weird but it works\n    hideLoadingState();\n    require('./feed').show(); // when this function is called, the module is guaranteed to be synchronously available.\n  });\n} else if (window.location.pathname === '/profile') {\n  showLoadingState();\n  require.ensure([], function() {\n    hideLoadingState();\n    require('./profile').show();\n  });\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["webpack will do the rest and generate extra ",(0,a.jsx)(n.strong,{children:"chunk"})," files and load them for you."]}),"\n",(0,a.jsxs)(n.p,{children:["webpack will assume that those files are in your root directory when you load then into a html script tag for example. You can use ",(0,a.jsx)(n.code,{children:"output.publicPath"})," to configure that."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{children:'// webpack.config.js\noutput: {\n    path: "/home/proj/public/assets", //path to where webpack will build your stuff\n    publicPath: "/assets/" //path that will be considered when requiring your files\n}\n'})}),"\n",(0,a.jsxs)(n.h2,{id:"additional-resources",children:["Additional resources",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#additional-resources",children:"#"})]}),"\n",(0,a.jsxs)(n.p,{children:["Take a look at a real world example on how a successful team is leveraging webpack: ",(0,a.jsx)(n.a,{href:"http://youtu.be/VkTCL6Nqm6Y",target:"_blank",rel:"noopener noreferrer",children:"http://youtu.be/VkTCL6Nqm6Y"})," This is Pete Hunt at OSCon talking about webpack at Instagram.com"]}),"\n",(0,a.jsxs)(n.h2,{id:"faq",children:["FAQ",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#faq",children:"#"})]}),"\n",(0,a.jsxs)(n.h3,{id:"webpack-doesnt-seem-modular",children:["webpack doesn't seem modular",(0,a.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#webpack-doesnt-seem-modular",children:"#"})]}),"\n",(0,a.jsxs)(n.p,{children:["webpack is ",(0,a.jsx)(n.strong,{children:"extremely"})," modular. What makes webpack great is that it lets plugins inject themselves into more places in the build process when compared to alternatives like browserify and requirejs. Many things that may seem built into the core are just plugins that are loaded by default and can be overridden (i.e. the CommonJS require() parser)."]})]})}function o(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(r,{...e})}):r(e)}let t=o;o.__RSPRESS_PAGE_META={},o.__RSPRESS_PAGE_META["webpack%2F%E6%8F%92%E4%BB%B6%20webpack-howto.md"]={toc:[{text:"教程目标",id:"教程目标",depth:2},{text:"准备",id:"准备",depth:2},{text:"1. 为什么选择 webpack?",id:"1-为什么选择-webpack",depth:2},{text:"2. Webpack for Browserify people",id:"2-webpack-for-browserify-people",depth:2},{text:"3. How to invoke webpack",id:"3-how-to-invoke-webpack",depth:2},{text:"4. Compile-to-JS languages",id:"4-compile-to-js-languages",depth:2},{text:"5. Stylesheets and images",id:"5-stylesheets-and-images",depth:2},{text:"6. Feature flags",id:"6-feature-flags",depth:2},{text:"7. Multiple entrypoints",id:"7-multiple-entrypoints",depth:2},{text:"8. Optimizing common code",id:"8-optimizing-common-code",depth:2},{text:"9. Async loading",id:"9-async-loading",depth:2},{text:"Additional resources",id:"additional-resources",depth:2},{text:"FAQ",id:"faq",depth:2},{text:"webpack doesn't seem modular",id:"webpack-doesnt-seem-modular",depth:3}],title:"webpack-howto",frontmatter:{}}}}]);