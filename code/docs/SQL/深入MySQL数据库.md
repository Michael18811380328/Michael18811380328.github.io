# 如何自学MySQL数据库

## MySQL知识体系

基础：

- sql语句
- 表结构设计

调优：

- 索引、慢查询优化
- 配置参数调优

核心原理：

- InnoDb存储引擎 （包括隔离级别、事务、锁、缓存池、回滚日志等等）
- Mysqld  (包括连接管理、进程管理、查询缓存、查询优化、日志等等)

架构与运维：

- 用户与权限、安全
- 备份与恢复
- 日志
- 分布式与高可用

## MySQL零基础图解

首先，学习基本的SQL语法。你就可以编写SQL语句了。推荐：W3Schools的 [SQL 教程](https://link.zhihu.com/?target=http%3A//www.w3school.com.cn/sql/)。

其次，学习数据库的主要功能和使用方法，比如用户相关或者权限相关等等。

我推荐两本书：

一、《MySQL必知必会》 这本书讲的非常全，从基本概念，到查询到插入新建表，用户的管理，都有具体的例子，非常适合没有任何基础的同学来学习Mysql，总之这本书学习的方法就是：1、十分钟了解下数据库的基本概念 2、找到练手的数据库 3、对照着上面的内容去敲。本书里也有大量的内容是讲sql的，可以结合w3c的sql教程一起，有取舍地看。

二、《数据库系统概念》这本书是dba必看的。

看完这些并且实践+思考之后，可以算入门了。

## MySQL深入学习

我推荐几本书（很多大神都这么推荐），《高性能MySQL(第3版)》、 《MySQL技术内幕(第4版)》，《MySQL技术内幕 InnoDB存储引擎》，《深入理解MySQL》还有Mysql的官网。读完这些东西，再加些丰富的经验，理论上来讲就具备DBA的水平了。

十分推荐阅读[Planet MySQL](https://link.zhihu.com/?target=http%3A//planet.mysql.com/)上汇总的博客，特别是[Percona's MySQL & InnoDB performance and scalability blog](https://link.zhihu.com/?target=http%3A//www.percona.com/blog/).

我问你，面对一个并发量比较高的场景，如何配置mysql的连接数？

你可能会回答：“哦，就是调高max_connection的数值吧。”

那，你有没有思考过调到多少是最合适的呢？为什么这样设置就最合适呢？

也许你会回答：“恩我知道，可以看系统之前的max_*used*_connection的数值，然后来设置。也可以调高back_log的值。”

那你有没有思考过，max_connection连接数太高会有什么不好的影响呢？back_log设置的太高有什么不好的地方呢？max_connect的上限其实是取决于mysql能获得的文件描述符的数量，也就是说你就算设置成10000，最后也是没用的，系统会根据机器的情况自动调低。

也许你会回答：“恩我知道，设置太高，会有系统开销...”

那你有没有思考过，这些开销具体是什么呢？是什么工作导致了需要这些内存开销？

也许你还会回答，在连接创建的时候，会立刻为它分配连接缓冲区以及查询缓冲区，这些都会吃内存。

那你有没有思考过，占据的资源具体是多少呢？取决于哪些因素呢？



如何自学mysql? 你必须不断思考，才能在工作中面对具体场景的时候，非常淡定地推断：“哦，一定是这里出了问题。应该怎么怎么做。”

面对问题，拿出打破砂锅问到底的精神，先思考一番，给出自己的假设，不要着急地去找度娘，谷歌。思考过后，带着你的推断或者答案，大胆地去搜索吧！去看看别人的见解，去看看官方的描述！

这才是一个工程师应有的态度。

**最后我想给出一些有价值的学习资料。可以省去一些时间。**

## 学习资料

### 电子书

我认为多看书还是有好处的。有些书值得反复看许多遍，有时候只看一遍无法深刻理解吸收，思考也不够充分。

**[电子书下载传送门](https://link.zhihu.com/?target=http%3A//www.notedeep.com/note/38/page/282)**

- 《mysql必知必会》
- 《高性能mysql第三版》
- 《数据库系统概念》
- 《深入理解MySQL》
- 《MySQL性能调优与架构设计--全册》《SQL Antipatterns》
- 《MySQL技术内幕  InnoDB存储引擎》

### 学习网站

[MySQL Tutorial - Learn MySQL Fast, Easy and Fun.](https://link.zhihu.com/?target=http%3A//www.mysqltutorial.org/)

可以快速，简单和有趣的学习MySQL。以简单易懂的方式为您提供完整的MySQL教程。每个教程都有SQL脚本和可用屏幕截图的实际示例。

[mysql学习资料 | mysql深入学习笔记 深度笔记](https://link.zhihu.com/?target=http%3A//www.notedeep.com/note/38/page/282)

有很多mysql的资料可以看，还可以看网友做的学习笔记。

W3Schools [SQL 教程](https://link.zhihu.com/?target=http%3A//www.w3school.com.cn/sql/)

可以学习基础的sql语句

### 官方手册

无论英文好不好，看英文手册的能力是一定要有，也一定要培养的。

[mysql官方手册：14 The InnoDB Storage Engine](https://link.zhihu.com/?target=https%3A//dev.mysql.com/doc/refman/5.6/en/innodb-storage-engine.html)

### 大牛博客

领域专家的博客是十分具有学习价值的，下面列举几个比较好的：

何登成的技术博客 [何登成的技术博客](https://link.zhihu.com/?target=http%3A//hedengcheng.com/)

淘宝丁奇 [追风刀·丁奇 - ITeye技术网站](https://link.zhihu.com/?target=http%3A//dinglin.iteye.com/)

周振兴@淘宝 花名：苏普 [一个故事@MySQL DBA](https://link.zhihu.com/?target=http%3A//www.orczhou.com/)

阿里云数据库高级专家彭立勋为 MariaDB Foundation 正式成员，负责全球Replication模块相关补丁的Review。彭立勋也成为首位被MariaDB基金会引入的中国程序员。[P.Linux Laboratory](https://link.zhihu.com/?target=http%3A//www.penglixun.com/)

[Planet MySQL](https://link.zhihu.com/?target=https%3A//planet.mysql.com/)



# 转行自学MySQL数据库

本人是个活生生的例子，大学学的仪器仪表专业，毕业前第一份实习工作是电路板测试。0基础自学mysql和linux，现任国内某公有云mysql &&mongodb  dba。

对于非计算机出身的我，大学只会hello word和跑马灯，期间过程确实非常曲折，分享下我的自学过程：

1、 自己在windows和linux上安装了mysql，自学linux的基础知识，学习mysql的最基础的知识，即**怎么写sql，存储过程，表的设计**等，从0到熟悉大概花了3个月 ，推荐**《mysql入门很简单》**。

2、系统地较为深入地学习**mysql的sql优化，备份和恢复，参数优化，架构优化，硬件层面的优化，高可用方案，复制技术**等等，这段时间你不一定能实际接触到这些，就像我当初那样，肯定没什么公司招一个小白。
我选择自己看书，推荐**《高性能mysql》**，里面所有的章节都需要看一遍，以现在的水平肯定看不懂，但需要知道大概怎么回事，为后续的找mysql初级dba的工作打一个铺垫，这个过程大概也需要3个月。

3、 纸上得来终觉浅，完成以上两步，我开始准备**找一份mysql相关的工作**，而不是天天用着excel表格做着select * from table_sb这样的工作。
当然我这么猥琐的人肯定不会裸辞，该画的电路板也一样画，业余时间开始投初级mysql dba的工作，并且不间断地学习，网上各种找mysql面试的相关题目（实际上我当时完全没有任何实战经验），陆续收到一些面试，凭借之前自学的mysql知识，开始胡乱吹牛逼，先混进去再说。
你不做mysql实际相关的工作，永远也不知道自己之前认知的db知识有多幼稚。
友情提示一点，一般公司都没有专职dba的，所以面试的时候一定要自信，其实你学了这么多，虽然毫无实战经验，理论知识很大概率比面试你的人牛逼，所以各种吹，我就这样真正进入初级dba的圈子（由于这时对linux还处于cd ls的水平，所以之前也根本没做过运维），这个边工作边找工作的过程又持续了2个月。

4、真正进入互联网，接触生产环境后，这是我进步最大的时候。
第一步需要**将之前所学真正地应用起来**，并且应用的过程中，再回头看之前的书籍，这时候需要真正去理解，而不是似是而非，一知半解。
这时再推荐**《高性能mysql 第三版》**，全本再看一遍，这时需要全部看懂，另外还有**《mysql技术内幕：innodb存储引擎》**等等。
总之这段时间就需要**开始关注mysql一些细节**了，比如**db故障处理，高可用，负载均衡**等等的具体实现了。
另外，**linux的知识同步也要深入去学习**，至少会写shell脚本，常见的linux知识等，我在这花了1年多；
5、  dba的工作一般是非常轻闲的，毕竟不是大公司，技术能力有限，该学的也学得差不多了，接触不到**海量数据，高并发**等比较锻炼人的场合，于是我又准备跳了。
于是来了公有云，现在每天运维万多个db实例，平均每天处理5+个紧急db故障，几乎mysql会遇到的问题，感觉都遇到了，能感觉到技术实力和经验也在每天都在积累，在进步。
但是感觉还是欠缺了很多，**下一步就看你选择**了，是再去研究源代码，底层原理的东西多点，还是数据库运维和应用多一点，就比如业界姜承尧，何登成与叶金荣的区别。
由于我的历史原因，对c++等几乎不懂，平时也用不到，所以看代码等事实际太累，于是我再去学mongodb，接了公司mongodb运维的活，算是在广度上的一个扩展，万一哪天mysql不行了呢

6、 总之，对于db小白来说，最重要的一点就是，**学习的过程不能断**。