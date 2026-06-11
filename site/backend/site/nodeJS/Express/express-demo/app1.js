// var express    = require('express');
// var app        = express();

// var port = process.env.PORT || 8080;
// var router = express.Router();

// router.get('/', function(req, res) {
//   res.send('<h1>Hello World</h1>');
// });

// app.use('/home', router);

// app.listen(port);
// console.log('Magic happens on port ' + port);

var express = require("express");
var app = express();

var router = express.Router();
router.get("/", function (request, response) {
  response.send("<h2>Hello Express and NodeJS</h2>");
  console.log(request);
  console.log(resquest);
});
app.use("/home", router);
app.use("/index", router);

// 如果环境变量没有配置，默认的端口是8080
var port = process.env.PORT || 8080;
// 启动应用
app.listen(port);

// 使用 node app1.js 即可在终端运行JS文件

console.log("open port " + port);
