var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function (req, res, next) {
  console.log("There is a requesting.");
  next();
});

router.use(function (req, res, next) {
  console.log("-----------------------------------");
  console.log("This is next interval to get Timer");
  let time = new Date();
  console.log("发出请求的时间是" + time);
  console.log("-----------------------------------");
  next();
});

// req.query可以获取查询中的参数（实际不能明文传递密码）
router.get("/", function (req, res) {
  console.log("用户名：" + req.query.name + "  密码：" + req.query.pwd);
  // console.log(req.query);
  res.send("<h1>Hello World</h1>");
});

// req.params 可以获取请求路径中的参数
router.get("/:name", function (req, res) {
  res.send("<h1>Hello " + req.params.name + "</h1>");
});

router.post("/", function (req, res) {
  var name = req.body.name;
  res.json({ message: "Hello " + name });
});

app.use("/home", router);

app.listen(port);
console.log("Magic happens on port " + port);
