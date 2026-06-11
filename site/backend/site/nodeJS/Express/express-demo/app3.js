var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
// 支持其他类型的请求（post put delete）

var port = process.env.PORT || 8080;
var router = express.Router();

router.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>");
});

router.get("/:name", function (req, res) {
  res.send("<h1>Hello " + req.params.name + "</h1>");
});

// 处理Post请求（可以增加字段，这里就可以获取解析字段）
router.post("/", function (req, res) {
  var name = req.body.name;
  res.json({ message: "Hello " + name });
});

app.use("/home", router);

app.listen(port);
console.log("Magic happens on port " + port);
