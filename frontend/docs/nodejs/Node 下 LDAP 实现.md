# Node 下 LDAP 实现

LDAP入门


  首先要先理解什么是LDAP，当时我看了很多解释，也是云里雾里，弄不清楚。在这里给大家稍微捋一捋。

  首先LDAP是一种通讯协议，LDAP支持TCP/IP。协议就是标准，并且是抽象的。在这套标准下，AD（Active Directory）是微软出的一套实现。

  那AD是什么呢？暂且把它理解成是个数据库。也有很多人直接把LDAP说成数据库(可以把LDAP理解成存储数据的数据库)。像是其他数据库一样，LDAP也是有client端和server端。server端是用来存放资源，client端用来操作增删改查等操作。 

     而我们通常说的LDAP是指运行这个数据库的服务器。
    
     可以简单理解AD =LDAP服务器＋LDAP应用。

 


     那LDAP这种数据库有什么特殊的呢？

  我们知道，像MySQL数据库，数据都是按记录一条条记录存在表中。而LDAP数据库，是树结构的，数据存储在叶子节点上。看看下面的比喻：

  假设你要树上的一个苹果（一条记录），你怎么告诉园丁它的位置呢？当然首先要说明是哪一棵树（dc，相当于MYSQL的DB），然后是从树根到那个苹果所经过的所有“分叉”（ou），最后就是这个苹果的名字（uid，相当于MySQL表主键id）。好了！这时我们可以清晰的指明这个苹果的位置了，就是那棵“歪脖树”的东边那个分叉上的靠西边那个分叉的再靠北边的分叉上的半红半绿的……，晕了！你直接爬上去吧！

  就这样就可以描述清楚“树结构”上的一条记录了。

  说一下LDAP里如何定义一个记录的位置吧。

    树（dc=ljheee)
    
    分叉（ou=bei,ou=xi,ou= dong）
    
    苹果（cn=redApple），

  好了，redApple的位置出来了：

     dn:cn=honglv,ou=bei,ou=xi,ou=dong,dc=ljheee

  其中dn标识一条记录，描述了一条数据的详细路径。

咦!有人疑问，为什么ou会有多个值？你想想，从树根到达苹果的位置，可能要经过好几个树杈，所有ou可能有多个值。关于dn后面一长串，分别是cn，ou,dc；中间用逗号隔开。

总结一下LDAP树形数据库如下：

dn ：一条记录的详细位置

dc ：一条记录所属区域 (哪一颗树)

ou ：一条记录所属组织 （哪一个分支）

cn/uid：一条记录的名字/ID (哪一个苹果名字)

LDAP目录树的最顶部就是根，也就是所谓的“基准DN"。

 

  为什么要用LDAP目录树来存储数据，用MySQL不行吗，为什么非要搞出一个树形的数据库呢？

  这是因为用树形结构存储数据，查询效率更高（具体为什么，可以看一下关系型数据库索引的实现原理——B树/B+树）。在某些特定的场景下，使用树形数据库更理想。比如：需要储存大量的数据，而且数据不是经常更改，需要很快速的查找。

  把它与传统的关系型数据库相比，LDAP除了快速查找的特点，它还有很多的运用场景，比如域验证等。

 

LDAP编程操作
  我们可以用JDBC操作MySQL数据库，进行对数据的增删改查。同样，LDAP树形数据库，也可以通过JDBC方式；除此之外，还可以用JNDI的方式（更推荐），因为树形可以看做是目录，树结构的枝杈相当于目录的层级。

  还有LDAP数据库展示数据也是树形的，如下图是用ApacheDirectoryStudio连接的公司LDAP服务器：

 

 

  可以把ApacheDirectoryStudio看做是连接数据库服务器的界面化的client，相当于Navicat、WorkBench。新建连接，连接数据库服务器的操作类似。

ApacheDirectoryStudio下载地址

http://download.csdn.net/download/ljheee/10145654

 

JNDI连接LDAP服务器

~~~java
import com.xxx.csb.ldap.config.LdapConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
 
import java.util.Hashtable;
import javax.naming.*;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
 
/**
 * author:lijianhua
 * Date:2017\12\4 0004
 */
public class LdapJNDI {
 
    @Autowired
    LdapConfiguration ldapConfiguration;
 
    public void JNDILookup() {
        String rootFilter = "o=xxx.com,o=isp";
//        String filter = "(&(smart-type=E1)(smart-status=1))";
        String filter = "(&(smart-type=E1)(uid=00012047))";
        String username = "uid=USER_NAME,ou=Authorization,ou=People,o=cc.com,o=isp";//xxx为申请的对接账户
        String password = "PASSW";
 
 
 
        Hashtable env = new Hashtable();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");//设置连接LDAP的实现工厂
        env.put(Context.PROVIDER_URL, "ldap://172.16.32.19:389/" + rootFilter);// 指定LDAP服务器的主机名和端口号
        env.put(Context.SECURITY_AUTHENTICATION, "simple");//给环境提供认证方法,有SIMPLE、SSL/TLS和SASL
        env.put(Context.SECURITY_PRINCIPAL, username);//指定进入的目录识别名DN
        env.put(Context.SECURITY_CREDENTIALS, password); //进入的目录密码
        env.put("filter",filter);
        DirContext ctx = null;
 
        try {
            // 得到初始目录环境的一个引用
            ctx = new InitialDirContext(env);
 
            //The search base entry 'uid=00012047,ou=Internal,ou=People,o=xxx.com,o=isp' does not exist]; remaining name 'uid=00012047,ou=Internal'
//            Attributes attrs = ctx.getAttributes("uid=00012047,ou=Internal,ou=People");//获取到一个人员，
 
 
            NamingEnumeration bindings = ctx.listBindings("ou=Internal,ou=People");//列举 内部人员
 
            while (bindings.hasMore()) {
                Binding bd = (Binding)bindings.next();
                System.out.println(bd.getName() + ": " + bd.getObject());
            }
 
 
             /*根据结点的DN来查找它的所有属性, 然后再从属性中得到所有的值,注意一个属性可以有多个值*/
//            for (NamingEnumeration ae = attrs.getAll(); ae.hasMore(); ) {
//                //获取一个属性
//                Attribute attr = (Attribute) ae.next();
//                for (NamingEnumeration ve = attr.getAll(); ve.hasMore(); ) {
//                    System.out.println(String.format("Attribute=%s,Value=%s",attr.getID(),ve.next()) );
//                }
//            }
 
        } catch (javax.naming.AuthenticationException e) {
            System.out.println("认证失败");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("认证出错：");
            e.printStackTrace();
        }finally {
            if (ctx != null) {
                try {
                    ctx.close();
                } catch (NamingException e) {
                    e.printStackTrace();
                }
            }
        }
 
    }
 
    public static void main(String[] args) {
        LdapJNDI ldapJNDI = new LdapJNDI();
        ldapJNDI.JNDILookup();
 
    }
}
~~~

最后总结一下LDAP：

1、LDAP的结构用树来表示，而不是用表格。正因为这样，就不能用SQL语句了。

2、LDAP可以很快地得到查询结果，不过在写方面，就慢得多。

3、LDAP提供了静态数据的快速查询方式。

4、Client/server模型，Server 用于存储数据，Client提供操作目录信息树的工具。

5、LDAP是一种开放Internet标准，LDAP协议是跨平台的Interent协议。

## node-ldap

node ldap client

## github

https://github.com/ymyang/node-ldap

## 安装

npm install node-ldap

## 使用

已通过Windows Server 2008测试



~~~js
var LdapClient = RedisClient('node-ldap');
 
var client = new LdapClient({
    ldapUrl: 'ldap://192.168.1.81:389',
    userDn: 'administrator@yliyun.com',
    password: 'yliyun@123'
});
 
 
 // 用户认证
client.auth('administrator@yliyun.com', 'yliyun@123').then(function() {
    console.log('success');
}).catch(function(err) {
    console.error(err);    
});
 
// 搜索部门
client.searchOU('cn=Users,dc=yliyun,dc=com').then(function(ous) {
    console.log(ous);
}).catch(function(err) {
    console.error(err);    
});
 
// 搜索群组
client.searchGroup('cn=Users,dc=yliyun,dc=com').then(function(groups) {
    console.log(groups);
}).catch(function(err) {
    console.error(err);    
});
 
// 搜索用户
client.searchUser('cn=Users,dc=yliyun,dc=com').then(function(users) {
    console.log(users);
}).catch(function(err) {
    console.error(err);    
});
 
// 搜索
client.search({
    base: 'dc=yliyun,dc=com',
    scope: 'sub', // 默认为'one'
    paged: 'true', // 默认为true
    filter: '(objectclass=organizationalUnit)'
}).then(function(rows) {
    console.log(rows);
}).catch(function(err) {
    console.error(err);    
});
 
// 断开连接
client.disconnect();
~~~



# [node.js下LDAP查询实践](https://www.cnblogs.com/kongxianghai/p/4847265.html)

目标：

从一个LDAP Server获取uid=kxh的用户数据

LDAP地址为：ldap://10.233.21.116:389

 

在工程根目录中，先npm一个LDAP的访问库ldpajs npm install ldapjs

~~~js
var ldap =  require("ldapjs");


//创建LDAP client，把服务器url传入
var client = ldap.createClient({
  url: 'ldap://10.203.24.216:389'
});

//创建LDAP查询选项
//filter的作用就是相当于SQL的条件
var opts = {
  filter: '(uid=kxh)', //查询条件过滤器，查找uid=kxh的用户节点
  scope: 'sub',        //查询范围
  timeLimit: 500       //查询超时
};

//将client绑定LDAP Server
//第一个参数：是用户，必须是从根节点到用户节点的全路径
//第二个参数：用户密码
client.bind('uid=supbind,cn=users,dc=tiger,dc=com', '123456', function (err, res1) {

    //开始查询
    //第一个参数：查询基础路径，代表在查询用户信心将在这个路径下进行，这个路径是由根节开始
    //第二个参数：查询选项
    client.search('DC=tiger,DC=com', opts, function (err, res2) {

        //查询结果事件响应
        res2.on('searchEntry', function (entry) {
            
            //获取查询的对象
            var user = entry.object;
            var userText = JSON.stringify(user,null,2);
            console.log(userText);
            
        });
        
        res2.on('searchReference', function(referral) {
            console.log('referral: ' + referral.uris.join());
        });    
        
        //查询错误事件
        res2.on('error', function(err) {
            console.error('error: ' + err.message);
            //unbind操作，必须要做
            client.unbind();
        });
        
        //查询结束
        res2.on('end', function(result) {
            console.log('search status: ' + result.status);
            //unbind操作，必须要做
            client.unbind();
        });        
        
    });
    
});
~~~



参考资料

filter语法：http://www.ldapexplorer.com/en/manual/109010000-ldap-filter-syntax.htm

ldapjs：https://www.npmjs.com/package/ldapjs

https://blog.csdn.net/ljheee/article/details/78746037?utm_source=copy

https://blog.csdn.net/weixin_34208283/article/details/89375085

https://www.cnblogs.com/kongxianghai/p/4847265.html