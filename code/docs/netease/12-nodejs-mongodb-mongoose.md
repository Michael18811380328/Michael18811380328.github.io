# nodejs如何用mongodb？mongoose就对了

## 一，安装

windows平台下官网直接下载安装就好了，centos下安装步骤：
配置MongoDB的yum源

~~~bash
[mongodb-org]
name=MongoDB Repository
baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/4.0/x86_64/
gpgcheck=0
enabled=1
~~~

安装MongoDB


安装之前先更新所有包 ：yum update

安装命令：yum -y install mongodb-org

查看mongo安装位置 whereis mongod

查看修改配置文件 ：vi /etc/mongod.conf   如数据库路径dbpath,bindIp: 172.0.0.1  改为 bindIp: 0.0.0.0

启动停止MongoDB

~~~bash
启动mongodb ：systemctl start mongod.service
停止mongodb ：systemctl stop mongod.service
查到mongodb的状态：systemctl status mongod.service
设置开机启动：systemctl enable mongod.service
重启mongodb：systemctl restart mongod.service
启动Mongo shell：mongo
~~~

## 二，nodejs库选择

下面三个都不错，我是选择了mongoose主要是github star多,便于使用，而且有中文文档，也一直有更新。

mongodb（也叫 node-mongodb-native）mongodb

官方库，包含了所有且最新的 api，其他大部分的库都是在这个库的基础上改造的。但是呢不支持文档校验，mongodb 是 no schema 的，Mongoose 通过 Schema 支持文档校验，可以防止非正常情况下写入错误的数据到数据库。

Mongoose

封装了数据库的操作，给人的感觉是同步的，其实内部是异步的。功能强大，官方文档详细http://www.mongoosejs.net/

Mongolass

保持mongodb 一样的 api，借鉴了 Mongoose 的优点，同时又保持了精简。

## 三，数据库链接

新建db.js

~~~js
'use strict';
var mongoose =require('mongoose');
const dburl='mongodb://localhost/test';
mongoose.connect(dburl);
const db = mongoose.connection;

db.once('open' ,() => {
  console.log('连接数据库成功');
})

db.on('error', function(error) {
  console.error(
    'Error in MongoDb connection: ' + error
  );
  mongoose.disconnect();
});

db.on('close', function() {
  console.log('数据库断开，重新连接数据库');
  mongoose.connect(dburl, {server:{auto_reconnect:true}});
});

module.exports = db;
~~~

## 四，数据库操作

Schema,model的使用

Schema定义。新建user.js

~~~js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 声明一个数据集 对象
var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});
// 将数据模型暴露出去
module.exports = mongoose.model('users', userSchema);
~~~


timestamps会自动增加创建时间createdAt，更新时间updatedAt

很多教程是这样的写的

updatedAt: { type: Date, default: Date.now }

这个写法每次更新并不能更新updatedAt这个字段，还是要写代码去处理。

另外注意不能写成default: Date.now()

model的使用

~~~js
// 查找
User.findOne({
  username: 'abc',
  password: 'abc'
}, function (err, data) {
  if(err) throw err;
  console.log(dat)
})
// 保存
const saveData = {
  username: 'abc',
  password: 'abc',
};
User.create(saveData, function (err, data) {
  if (err) throw err;
  console.log(data);
})
~~~

更多详细操作见mongoose官方文档http://www.mongoosejs.net/