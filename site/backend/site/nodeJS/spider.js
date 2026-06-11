// This is a spider based on nodeJS
const request = require("request");
const cheerio = require("cheerio");

// npm init -y
// npm install (nothing)
// npm install request -g (I have installed)
// npm install nodemon -g (the mode can run js in terminal)
request("https://www.smzdm.com/youhui/", (err, req) => {
  // send a get request
  if (!err) {
    var body = req.body;
    // console.log(body)
    // cheerio 将内存中的html模拟浏览器的方式来渲染网页
    var $ = cheerio.load(body, {
      // 是否将html中实体转换为字符
      decodeEntities: false,
    });
    $(".list.list_preferential").each((i, item) => {
      // 通过$ 类似jQuery的dom操作爬取节点信息
      var $title = $(".itemName a", item);
      var url = $title.attr("href");
      var title = $title.html();
      // console.log(url, title)

      var h1 = $title.children().text().trim();
      var img = $("img", item).attr("src");
      var desc = $(".lrInfo", item).html().trim();
      var mall = $(".botPart a.mall", item).html().trim();
      // console.log(title, h1, url, img, desc, mall)
    });
  } else {
    console.log(err);
  }
});

// run nodemon spider.js in terminal, then info show in terminal.
