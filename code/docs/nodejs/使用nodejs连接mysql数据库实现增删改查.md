# [使用nodejs连接mysql数据库实现增删改查](https://www.cnblogs.com/easth/p/nodejs_mysql.html)

 

首先要有数据库 使用xampp 或者 phpstudy 可以傻瓜式安装

新建一个项目文件夹 之后在这个目录下初始化package.json (npm init)

先在项目中安装mysql 和 express ,这个项目里使用express

因为express实现路由比较方便

cnpm install mysql express --save

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175635143-1172982713.png)

已经安装好mysql和express

接下来创建app.js

在app.js里引入express并实例化express对象

在app.js里引入mysql

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175707707-1046402040.png)

开启一个服务器

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175723687-1840688584.png)

接下来创建连接

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175740515-1966397766.png)

使用db.connect()方法连接 ,这个方法接收一个参数 有错误就报错

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175809604-1998306143.png)

------

创建数据库

在一个路由里写sql语句 使用db.query来执行sql语句 db.query()方法有两个参数 ,第一个参数是要执行的语句 第二个参数是个回调函数 回调函数里可以接收错误信息,也有执行后回来的信息 依然是错误优先

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175843913-1890126805.png)

接下来在浏览器里访问127.0.0.1:3000/createdb

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175910618-114366797.png)

页面上显示创建成功

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175928060-79228954.png)

数据库里已经有nodemysql数据库了

这个时候就可以在配置连接数据库里加上当前的数据库了

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709175945780-1931416376.png)

------

创建表

也是在一个路由里写sql语句

类型是 int 数值 AUTO_INCREMENT 让id 自增, VARCHAR(255) 字符串 长度255,PRIMARY KEY(ID) 把id设为主键

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709180024735-1051017593.png)

使用db.query()方法执行sql语句

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709180043015-1208486028.png)

现在在浏览器里访问127.0.0.1:3000/createpoststable

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709180102809-1215357397.png)

页面上显示创建成功

![img](https://img2018.cnblogs.com/blog/1735056/201907/1735056-20190709180118333-1232194791.png)

数据库里已经有posts的表了

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE3894393aee4ae1b21153e71d95860e03/19695)

接下来往数据库这个表里插入内容

插入内容 还是在一个路由里操作

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCEa0134460c0ee58fb3e8d28ea68ba1826/19701)

写个问号 防止sql注入 会在执行时把post传进sql语句 替换问号

浏览器中访问127.0.0.1:3000/addpost1

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE0241a8354ea3dcabc8a4c1ad8c0232ee/19706)

页面上显示成功

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE53a6754ce0e658db4bb2f1ae66d82f6d/19708)

数据库里也有了这一条数据

查询内容 查询posts表中所有数据

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE757eabdb0e582d6db6bd54910216fd64/19711)

浏览器中访问 127.0.0.1:3000/getposts

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE01cad74b466a749d051378506a6840aa/19715)

页面显示查询成功

打印了查询到的结果

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCEe25bc96e95177cb5ac717e5ccf4a651a/19720)

如果要把查询到的内容返回出去 使用res.json(result)

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE394de901a571d51fe69784261158b31f/19725)

浏览器中效果

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE36ccb01e4e55efc811677e649069e7ee/19723)

 

 

接下来查询单条内容

使用req.params.id接收传来的参数

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE65078aff467bec5e16847618e774026a/19728)

浏览器中访问127.0.0.1:3000/getposts/1

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE45934c529c0846bdedf58816f8e6491c/19733)

页面中显示了查询到的单条数据 

更新内容

更新的是某一条内容 所以还用传参数 需要注意的是 要更新的newTitle是字符串 所以写sql语句的时候需要使用单引号 引起来 ,如果是数值就不用了.

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCEadbd290543881f992d54bb8f278aaf31/19742)

浏览器中访问127.0.0.1:3000/updatepost/1

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE0d433cea9c586a8b3c070509595af6d1/19744)

页面上显示更新成功 访问127.0.0.1:3000/getposts/1 看看数据有没有变化

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE88b74752cbbaa7bf6ad2fa0c46e3cd6f/19748)

有变化了 

删除内容

还是在一个路由里写方法 传来要删除的参数

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCEa2135d5d7e50226ddaac38c08ae64284/19757)

浏览器中访问127.0.0.1:3000/deletepost/1 删除第一条数据

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE7c76ea5c3f5df53992d367be8443fd22/19760)

页面上显示删除成功

![img](https://note.youdao.com/yws/public/resource/b500a3998fa32f6f3fb2e8831e145259/xmlnote/WEBRESOURCE2c651f383dfcf42e3bcf5e731cb905a6/19762)

数据库里只有一条数据了

------

至此 使用nodejs+express 连接mysql数据库 增删改查 已经全部实现

 

对应demo链接:

http://note.youdao.com/noteshare?id=7c4348713a5b07f47d959b4bc32915b9

 