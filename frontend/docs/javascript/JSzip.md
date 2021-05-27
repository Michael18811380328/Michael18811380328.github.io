## JSzip

### 前言

前端在处理文件时，对于大文件或者多个文件上传、下载、编辑，直接使用原文件不方便，最近使用一个可以前端中处理 zip 文件的库，JSzip。主要功能：前端中压缩、解压缩、编辑zip文件。

这个库的官网：https://stuk.github.io/jszip/

### 安装

##### 浏览器环境

代码下载链接 http://github.com/Stuk/jszip/zipball/master

##### node 环境

~~~bash
npm install jszip --save
~~~

~~~js
// 使用ES5引入
var JSZip = require("jszip");
var saveAs = require('file-saver');

// 新建一个zip压缩对象实例
var zip = new JSZip();

// 压缩一个文件
zip.file("Hello.txt", "Hello World\n");

// 压缩一个文件夹，内部包含一个图片
zip.folder("images").file("smile.gif", imgData, {base64: true});

// 异步生成压缩文件
zip.generateAsync({type:"blob"}).then(function(content) {
  // 保存到本地
  saveAs(content, "example.zip");
});
~~~

这样就可以将浏览器中的文本（文件）保存成zip格式存储到本地了。