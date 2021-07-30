const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  // port: '3306',
  database: 'test1',
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('connect success');
});

app.listen(3000, () => {
  console.log('server port is at 3000');
});

// 报错：node连接Mysql报错ER_NOT_SUPPORTED_AUTH_MODE
// 因为 mysql 本地版本较高，不支持直接js输入密码
// 需要改一下配置，详情参考
// https://www.cnblogs.com/jing-tian/p/11688073.html

// create database
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE test1";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.send("Database create success!");
    }
  });
});

app.get("/createTable", (req, res) => {
  let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(ID))";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.send('Table create success');
    }
  })
});

app.get('/add-comment1', (req, res) => {
  // 实际上这部分从post请求参数中获取
  let post = {
    title: 'have a nice day',
    body: 'today we have a nice day. xxx.'
  };
  // 这里的问号会把post传进SQL语句中，放置SQL注入
  let sql = "INSERT INTO posts SET ?"
  db.query(sql, post, (req, res) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(res);
      res.send('post comment success');
    }
  });
});


app.get("/getposts", (req, res) => {
  // 实际中使用where，不会直接用通配符查询
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.json(result);
      res.send('query success');
    }
  });
});

// 查询指定ID的信息
app.get("/getposts/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.paras.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.json(result);
    }
  });
});

// 更新内容(应该使用put请求)
app.get("updatecomment/:id", (req, res) => {
  let title = req.paras.title;
  let id = req.paras.id;
  let sql = `UPDATE posts SET title = '${title}' WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.send(`update ${id} success`);
    }
  });
})

// 删除数据
app.get("deletepost/:id", (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.paras.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      res.send(`删除成功`);
    }
  })
})
