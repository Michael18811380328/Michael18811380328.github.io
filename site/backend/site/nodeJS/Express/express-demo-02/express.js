const express = require("express");
const http = require("http");
const mysql = require("mysql");
const co = require("co-mysql");
const md5 = require("md5-node");
const bodyparse = require("body-parser");

let db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

let conn = co(db);

const app = express();

app.use(
  bodyparse.urlencoded({
    extended: true,
  }),
);

app.use(bodyparse.json());

// 测试登录界面
app.get("/", (req, res) => {
  res.send("这是测试界面");
});

// 根据ID查询用户的姓名
app.get("/user/:id", async (req, res) => {
  var id = req.params.id;
  var data = await conn.query(
    `select name, phone from account where id = '${id}'`,
  );
  if (data.length >= 1) {
    res.send(
      JSON.stringify({
        status: 200,
        message: data,
      }),
    );
  } else {
    res.send(
      JSON.stringify({
        status: 200,
        message: "no user",
      }),
    );
  }
});

// 测试用户登录
app.post("/user", async (req, res) => {
  let { user, password } = req.body;
  let data = await conn.query(
    `select user from admin where user = '${username}'`,
  );
  if (data.length >= 1) {
    res.send(
      JSON.stringify({
        status: 200,
        message: "用户名已经注册",
      }),
    );
  } else {
    password = md5(password);
    let sql = `insert into admin (user, password) values ('${username}', '${password}')`;
    await conn.query(sql);
    res.end(
      JSON.stringify({
        status: 200,
        message: "注册成功",
      }),
    );
  }
});

app.listen(3000);
