# browser-sync使用教程

## 前言
为什么要使用Browsersync呢，因为Browsersync有以下的特点：
1、Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。
2、Browsersync可以同时在PC、平板、手机等设备下进项调试。
3、pc、ipad、iphone、android等设备可以同时打开你需要调试的页面，
4、使用browsersync后，任何一次代码保存，PC、平板、手机都会同时显示你的改动。
所以说无论是前端还是后端工程师，使用它将提高30%的工作效率。(多少都会有提高)

## 正文
下面开始讲如何使用browser-sync。

## 安装
安装方式分为两种，一种是全局安装，一种是本地安装。个人建议使用本地安装。（试了两种安装模式，本地安装更加适合团队）
一、Global Install（全局安装）
```
npm install -g browser-sync
```
ps：当你试过这种后，发现还是选择本地安装好，那么你就需要使用下面这个命令来删除这个全局安装了。
```
npm uninstall -g browser-sync
```
二、Local Install（本地安装）
```
npm install browser-sync --save-dev
```
Tip:
文档提示我们：
不要使用sudo！ 如果在 Mac OSX 下安装Browsersync并遇到问题时 - 无论是在(Global)全局还是在(Local)本地，它几乎总是因为NPM权限所引起的问题。
我使用的是window，所以没有遇到这个问题。

## 运行
安装完成后，我们就可以开始运行我们需要运行的项目了。我们想测试一下打包后生成的dist文件，我们可以使用Browsersync来运行，运行后，如果没有问题了，我们再把这个
包放到服务器，这样就可以省了很多成本了。
首先我们进入dist这个文件夹，输入以下命令：
```
cd dist
```
然后运行这个命令：
如果你没有修改文件热更新的话，直接运行下面这个命令就可以了  
```
browser-sync start --server
```
如果你有修改的话，运行这个命令就可以了：
```
browser-sync start --server --files "css/*.css, *.html"
```
## 注意
当你完成以上的步骤后。你在浏览器输入'http: //localhost:3000'(这里加了个空格是为了避免格式化，你不需要加空格的)会看到一直在加载状态的，这个为什么呢？
这是因为你的vue.config.js里面baseUrl（基础路径）没有设置好，在打包之前，我们先要确定baseUrl是哪个才可以打包。
如果只是测试，baseUrl设置为空，或者'/'就可以了。

[API](https://www.browsersync.cn/docs/api/)

