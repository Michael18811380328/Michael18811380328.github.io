# MySQL 数据库入门学习

阿里云大学 链接地址：https://edu.aliyun.com/course/153/lesson/list

mysql 数据库的简单介绍，安装配置MYSQL，基本的SQL命令。

## 01 简介

SQL：一种编程语言，strcutured query language 结构化的查询语言，主要用于数据库中的增删改查

~~~mysql
select * from tb
~~~

MySQL 关系型数据库，是数据库的一种（其他的Oracle）。MYSQL是开源数据库。

## 02 安装

官网：dev.mysql.com/downloads/mysql

### windows 安装

在官网下载安装包后，选择默认的developer安装方式进行安装；

安装过程中如果检测到office中缺少插件，可以不用处理，因为主要在CLI模式下使用MYSQL

安装中需要设置root用户的密码，其他类型的用户（不添加其他用户）

按照安装包的流程安装完成后，可以在任务管理器下面看到服务正在运行，需要在cmd下面确认安装.

~~~bash
mysql -u root -p
# -u 表示用户 -p 表示需要密码
~~~

### linux 安装

~~~bash
sudo yum install mysql mysql-server
sudo apt-get install mysql mysql-server (ubuntu)
mysqladmin -u root -p password 'root'
# 设置新密码是root
~~~

### Mac 安装

安装包的格式是 dmg 安装完毕后需要设置root密码

~~~bash
/usr/local/mysql/bin/mysqladmin -u root -p password root
# 安装测试成功，密码和开机密码一致

/usr/local/mysql/bin/mysql -u root -p
# 打开mysql的密码是 root
~~~

开启或者关闭服务有两种方法

CLI

sudo /Library/StartupItems/MySQLCOM/MYSQLCOM start | stop | restart

GUI

系统配置 - MYSQL - stop |start

==注意==：安装过程中，会选择强密码或者是弱密码。现在本地测试使用弱密码。密码最少是8位，这里设置12345678 作为root的密码。 现在密码是 root 

==注意2==：

如果mysql已经运行，但是输入 mysql 显示命令不存在：遇上-bash: mysql: command not found的情况别着急

这个是因为/usr/local/bin目录下缺失mysql导致，只需要一下方法建立软链接，即可以解决：
把mysql安装目录，比如MYSQLPATH/bin/mysql，映射到/usr/local/bin目录下： 

\# cd /usr/local/bin
\# ln -fs /MYSQLPATH/bin/mysql mysql

还有其它常用命令mysqladmin、mysqldump等不可用时候都可按用此方法解决。
注：其中MYSQLPATH是mysql的实际安装路径（MAC 默认路径 /usr/local/mysql/bin/mysql）

原文链接：https://www.cnblogs.com/yang1314/p/9288767.html



## 03 配置

MYSQL 的配置文件是一个文本文件 my.cof

Mac 的文件路径是 /usr/local/mysql/my.cof 默认的配置文件是空的

可以配置字符集，缓存大小等

~~~txt
[client]
default-character-set=utf8
# 添加字符集，避免乱码

[mysqld]
character-set-server=utf8
default-storage-engine=INNODB
# 默认存储引擎 INNODB
~~~

修改配置后，需要重启 mysql (或者在设置中重启)

~~~bash
sudo /Library/StartupItems/MySQLCOM/MYSQLCOM restart
~~~

自己配置的问题：使用vim编辑器保存的时候，不能保存配置；使用sudo也不行

"/usr/local/mysql-8.0.18-macos10.14-x86_64/my.cof" E212: Can't open file for writing

 Warning: Changing a readonly file



## 04 数据库操作

~~~mysql
show databases;
create database gc;
drop database gc;
~~~

不同数据库的数据是不会干扰的。数据库是数据库软件中基本的单位



## 05 数据类型

database 包括 tables 表中每一行就是一条数据；列就是不同的字段，不同的字段对应不同的数据类型和数据结构（例如ID是自增长的整形，Name是长字符串），是否有默认值等。下面是常见的数据类型。根据实际业务逻辑使用不同的数据类型。

#### 文本类

VARCHAR(size) 长度小于255的可变长度字符串：varchar 长度小于65535字符（通常文本足够使用），长度可以改变（mqsql 5.0.3 之前表示65535字节），查询速度中等

TEXT 长度中等的字符串，text 字符串长度不受限制，查询速度最慢，通常优先使用varchar

LONGTEXT 长度很长的字符串

CHAR：char 表示传统的字符串，字符串的长度小于255字符，长度固定，适用于较短固定长度的数据（身份证号和电话号），查询表速度最快

Foreign key 外键

primary key 主键

在mysql中，如果把表的主键设为auto_increment类型，数据库就会自动为主键赋值。

#### 日期类

DATETIME 年月日时分秒

#### 数值类

TINYINT -128~127 或者存储布尔值

INT 小数字

BIGINT 大数字（ID，自增长）

DOUBLE 浮点型（不使用FLOAT）

## 06 数据表操作（table）

~~~mysql
CREATE TABLE account(
  id bigint(20),
  createTime datetime,
  ip varchar(255),
  mobile varchar(255),
  name varchar(255),
  brief text,
  comments text,
  location varchar(255),
  qq varchar(255),
  gender int(11),
  city varchar(255),
  province varchar(255)
);

drop table account;

describe account;
# 查看当前的表的内部结构

create database Michael;
use Michael;
show tables;
CREATE TABLE gc(...);
describe gc;
drop table gc;
~~~

表重命名

~~~mysql
alter table 表名 rename 新表名
~~~

## 07 列操作


增加删除表的列
~~~mysql
alter table 表名 add 新列名 列数据类型 not null default 1;
# 后面的 not null default 1 是可选参数
alter table 表名 drop 已有列名;
~~~

修改列名或者数据类型: 可以单独修改列名后者数据类型，可以一起修改列名和数据类型

~~~mysql
alter table 表名 change 旧列名 新列名 新的数据类型
~~~

## 08 表数据操作

#### insert 插入

增加（插入）表数据

~~~mysql
insert into 表名 values(key1, key2, key3...)
insert into tableName (column1, column2) values(key1, key2)
~~~

#### select 查询

查询表数据

~~~mysql
select * from 表名
select 列名1, 列名2 from 表名
~~~

#### where 筛选

~~~mysql
select * from tableName where title = 't';
# 查询条件可以是大于小于等于不等于，或者between范围
# 可以通过 and or 进行多元选择，括号增加优先级
# 注意：判断相等是 = 不是两个等号
select * from gc where name = 'Michael' and (id = 20 or id = 22);
~~~

判断 null 是特殊的，需要通过 is  is not 判断，不能通过 = != 判断

~~~mysql
select * from gc where email is null and name is not null;
~~~

#### distinct 去重

如果筛选过程中有重复的数据，那么可以加上关键字 distinct 去除重复的行。下面的查询结果中，如果name和age相同的数据有多行，那么结果中只显示一行

~~~mysql
select distinct name,age from gc;
~~~

#### order by 排序

升序或者降序

~~~mysql
# 查询结果排序(升序或者降序) order by columnName desc/asc
select * from gc order by id asc;
# 将查询的结果按照ID升序的情况进行排序
select * from gc order by age asc, name desc;
~~~

#### limit 限制

使用 limit 截取查询结果（类似于splice函数）limit 第一个参数是开始的位置（默认是0，可以不选），第二个参数是截取的数量。

~~~mysql
select * from gc [where name is not null] [order by id asc] limit 5;
select * from gc [where name is not null] [order by id asc] limit 3, 5;
# 中括号内部是可选参数（order必须在where后面）
# 第一句：在获取的结果中，截取前五条记录（index = 0 到 index = 4）
# 第二句：limit 从index=3 开始截取，截取5条记录
~~~

#### 组合使用 insert select

可以在一个表中查询数据，select * from table， 然后把查询的结果插入到另一个表中（数据迁移会用到）

~~~mysql
insert into account values(10);
insert into account select name, age from oldAccount;
~~~

#### update 更新

update tableName set columnName = newValue where XXX

如果使用where添加，那么修改满足条件的部分；否则修改整列的数据；

~~~mysql
update account set name = 'Tom', email = '123@qq.com' where id = 1;
~~~

#### where 高级用法

in 字符串范围（离散值）

~~~mysql
select * from account where id in (value1, value2...);
select * from account where id in (select id from oldAccount where id  < 10);
~~~

从一个集合中选择另一个集合（选择的可以使字符串范围，是数值范围的扩大）

between 数值范围（连续）

~~~mysql
select * from account where id between 5 and 10;
# 这里的选择是[5, 10]
select * from account where id not between 5 and 10;

# Like 字符串的模糊匹配
select * from account where name like '%ab%';
~~~