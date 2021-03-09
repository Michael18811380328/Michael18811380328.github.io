# nodeJS+mysql+连接池

# [nodejs的mysql模块学习(六)连接池的创建和使用](https://www.cnblogs.com/shenlonghun/p/6133963.html)

# 介绍

> 在 软件工程 ， 连接池 是一个 高速缓存 的 数据库连接 维持，使得连接可以当需要将来向数据库请求重复使用。 [ 来源请求 ] 连接池用于提高数据库上执行命令的性能。 打开并保持每个用户的数据库连接，特别请求到动态数据库驱动的制成 网站 应用，是昂贵的和浪费资源。 在连接池中，在创建连接之后，它被放置在池中，并且它被再次使用，使得不必建立新的连接。 如果正在使用所有连接，则会创建一个新连接并将其添加到池中。 连接池也减少了用户必须等待建立到数据库的连接的时间量。

[来源维基百科](https://translate.googleusercontent.com/translate_c?depth=1&hl=zh-CN&ie=UTF8&prev=_t&rurl=translate.google.com.hk&sl=auto&tl=zh-CN&u=https://en.wikipedia.org/wiki/Connection_pool&usg=ALkJrhiVC-B9bhMtjYnRxxPqT7fMsGonSw)

# 该组件也提供了创建连接池的方法

## 创建连接池

> 创建连接池的配置方式和创建连接的方式相同
> 但是也有几个 独有的配置
> [其他配置](http://www.cnblogs.com/shenlonghun/p/6122034.html)

```
acquireTimeout : 获取连接时的超时配置 默认10000
waitForConnection : 在连接池的所有连接没有可用的时候，如果 是true 就让申请连接的排队等待 ，
如果false 则返回一个错误，默认 true
connectionLimit : 一次性建立的最大连接数目  默认为 10
queueLimit: 连接池的最大排队数目 超出报错 如果为0，则没有限制数目，默认为0 
```

### 创建连接池代码

```JavaScript
var mysql = require('mysql');
var pool = mysql = createPool({//创建连接池
    host : 'localhost',
    user : 'we',
    password : 'pass',
    database : 'db'
})
```

## 获取连接

```JavaScript
pool.getConnection(function(err,connection){
    connection.query(sql,function(err,rows){//执行sql语句
        connection.release();//将连接返回连接池

        //做些什么
    })
})
```

## 将连接释放会连接池

```
connection.release();
```

## 彻底从连接池里删除一个连接

```
connection.destroy();
```





## [node+mysql 数据库连接池](https://www.cnblogs.com/tugenhua0707/p/10776725.html)

2019-04-26 21:27 [龙恩0707](https://www.cnblogs.com/tugenhua0707/) 阅读(762) 评论(0) [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=10776725) [收藏](javascript:void(0))

**1. 什么是数据库连接池？**

数据库连接池是程序启动时建立足够的数据库连接，并将这些连接组成一个池，由程序动态地对池中的连接进行申请，使用和释放。

**2. 使用数据库连接池原理及优点是什么？**

数据库连接池在初始化时将会创建一定数量的数据库连接放到连接池中，连接池都将一直保证至少拥有这么多的连接数量，当有数据库需要被连接的时候，它会向数据库连接池申请资源和使用，使用完成后会释放到数据库连接池中。当然数据库连接池中拥有最小连接数量和最大连接数量，当数据库的连接超过连接池中最大的数量的时候，这些请求将被加入到等待队列中。

其实他们的原理就好比我们公司的招聘前端开发一样，当有A项目的时候，我们公司需要招聘一个前端开发去做项目，但是当公司有B、C、D、等项目的时候，或者很多项目的时候需要不断的招聘前端开发，那么这样会给公司带来很多人力成本的。因此我们需要一个前端主管来管理这些前端资源。前端主管手下假如有5个前端开发，那么当A、B、C、D、E、项目来的时候，前端主管会依次把这些项目分配给对应的开发人员去跟进。但是当还有F等项目的时候，因为F项目已经超过前端人员的时候，没有人再去支持这些个项目，因此这些项目需要排期，等A、B、C、D、E 其中任何一个开发完成后，上线了，然后这些开发人员就和数据库一样释放资源，返回到前端组来，然后前端主管再把F项目分配到对应的开发人员。这个比方就好比可以理解为一个数据库连接池了。而不是有n个项目需要招聘n个前端开发来做项目，那这样的缺点是公司的人力成本会大大的增加。所以数据库的链接池也是这个意思，当网站某一天有很大的流量的时候，数据库服务器需要为每次链接创建一次数据库链接。这样就很浪费数据库的资源，并且频繁的创建和关闭数据库的链接，很容易导致服务器内存溢出等情况发生。

**连接池的作用是：数据库的连接池负责分配，管理和释放数据库链接的。它允许应用程序重复使用一个现有的数据库的链接。而不是重新创建一个。**

**3. 传统的数据库链接和数据库连接池的运行机制有啥区别？**

传统的我们一般来java来说：java访问数据库的过程一般是如下：

\1. 装载数据库驱动程序。
\2. 通过JDBC建立数据库的链接。
\3. 访问数据库，执行一些sql语句。
\4. 断开及关闭数据库的链接。

如上是一般的java访问数据库链接的过程。

下面我们使用数据库的连接池的操作过程如下：

\1. 程序初始化时创建连接池。
\2. 使用时向连接池申请可用的资源。
\3. 使用完毕后，将数据库链接返回给连接池。
\4. 程序退出时，断开所有的链接，并释放数据库的链接。

这就是传统和连接池的区别。

**node + mysql 实现数据库连接池**

在mysql模块中，我们可以使用 createPool方法来创建连接池，使用方法如下所示：

```
var pool = mysql.createPool(options);
```

options 参数是一个对象，该对象中有很多属性配置，该对象的作用是用于指定该连接池中链接的统一使用的各种选项。
常见的选项如下：

**connectionLimit:** 用于指定连接池中最大的链接数，默认属性值为10.

**queueLimit:** 用于指定允许挂起的最大连接数，如果挂起的连接数超过该数值，就会立即抛出一个错误，默认属性值为0.代表不允许被挂起的最大连接数。

在如上建立连接后，我们可以使用 getConnection 方法从连接池中获取一个连接。该方法使用如下所示：

```
pool.getConnection(callback);
```

getConnection 方法调用后，它有一个参数callback回调函数，该回调函数也有二个参数，如下所示：

```
function(err, connection) {
  
}
```

err： 该参数是指操作失败时的错误对象。
connection: 该值为一个对象，代表获取到的连接对象。当连接失败时，该值为undefined。

当连接不需要使用的时候，我们可以使用该连接对象的 release 方法来归还到连接池中。该方法使用如下：

```
connection.release();
```

当连接不需要使用且需要从连接池中移除的时候，我们可以使用destory方法，该方法使用如下所示：

```
connection.destory();
```

当连接不需要使用的时候，我们可以关闭该连接，使用方法如下：

```
pool.end();
```

下面我们来做一个使用数据库连接池做一个demo如下所示：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
const mysql = require('mysql');
// 创建一个数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'my_db',
  user: 'root',
  password: '123456'
});
// 从连接池中获取一个连接
pool.getConnection((err, conn) => {
  if (err) {
    console.log('和mysql数据库建立连接失败');
  } else {
    console.log('和mysql数据库连接成功');
    conn.query('select * from user', (err2, res) => {
      if (err2) {
        console.log('查询数据库失败');
      } else {
        console.log(res);
        pool.end();
      }
    })
  }
});
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

如下图所示：

![img](https://img2018.cnblogs.com/blog/561794/201904/561794-20190426212659280-1867061286.png)

