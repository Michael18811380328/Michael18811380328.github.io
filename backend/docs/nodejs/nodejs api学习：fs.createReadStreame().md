# nodejs api学习：fs.createReadStreame()


作用
这个api的作用是打开一个可读的文件流并且返回一个fs.ReadStream对象

 

参数
/*
createReadStream(path,option):该用来打开一个可读的文件流，它返回一个fs.ReadStream对象
@params:path指定文件的路径
@params:options可选,是一个JS对象，可以指定一些选项如：
let option={
              flags: 'r',//指定用什么模式打开文件，’w’代表写，’r’代表读，类似的还有’r+’、’w+’、’a’等
              encoding: 'utf8',//指定打开文件时使用编码格式，默认就是“utf8”，你还可以为它指定”ascii”或”base64”
              fd: null,//fd属性默认为null，当你指定了这个属性时，createReadableStream会根据传入的fd创建一个流，忽略path。另外你要是想读取一个文件的特定区域，可以配置start、end属性，指定起始和结束（包含在内）的字节偏移
              mode: 0666,
              autoClose: true//autoClose属性为true（默认行为）时，当发生错误或文件读取结束时会自动关闭文件描述符
          }

*/

返回对象
既然它有返回值并且返回一个对象，那我们不妨用个变量来接收这个值，并打印出来看看是个什么东西：



返回对象包含一大堆属性，有兴趣的朋友可以去深究一下

~~~js

ReadStream {
  _readableState:
   ReadableState {
     objectMode: false,
     highWaterMark: 65536,
     buffer: BufferList { head: null, tail: null, length: 0 },
     length: 0,
     pipes: null,
     pipesCount: 0,
     flowing: null,
     ended: false,
     endEmitted: false,
     reading: false,
     sync: true,
     needReadable: false,
     emittedReadable: false,
     readableListening: false,
     resumeScheduled: false,
     destroyed: false,
     defaultEncoding: 'utf8',
     awaitDrain: 0,
     readingMore: false,
     decoder:
      StringDecoder {
        encoding: 'utf8',
        fillLast: [Function: utf8FillLast],
        lastNeed: 0,
        lastTotal: 0,
        lastChar: <Buffer 00 00 00 00> },
     encoding: 'utf8' },
  readable: true,
  domain: null,
  _events: { end: [Function] },
  _eventsCount: 1,
  _maxListeners: undefined,
  path: './test/b.js',
  fd: null,
  flags: 'r',
  mode: 438,
  start: undefined,
  end: undefined,
  autoClose: true,
  pos: undefined,
  bytesRead: 0 }

~~~

常用方法
既然该函数的作用是用来打开一个可读的文件流那么我就通过写个demo来测试一下它的作用，并讲讲该函数的常用方法

~~~js
const fs=require('fs');
const path=require('path');
let readStream=fs.createReadStream('./test/b.js',{encoding:'utf8'});
//console.log(readStream);
 
//读取文件发生错误事件
readStream.on('error', (err) => {
    console.log('发生异常:', err);
});
//已打开要读取的文件事件
readStream.on('open', (fd) => {
    console.log('文件已打开:', fd);
});
//文件已经就位，可用于读取事件
readStream.on('ready', () => {
    console.log('文件已准备好..');
});
 
//文件读取中事件·····
readStream.on('data', (chunk) => {
    console.log('读取文件数据:', chunk);
});
 
//文件读取完成事件
readStream.on('end', () => {
    console.log('读取已完成..');
});
 
//文件已关闭事件
readStream.on('close', () => {
    console.log('文件已关闭！');
});
~~~

效果：



 

接下来我们随便写一个找不到的文件路径用来测试一下error事件：

返回值如下，把error打印出来了：
