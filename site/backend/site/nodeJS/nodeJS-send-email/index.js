//1. 导入nodemailer
const nodemailer = require("nodemailer");

//2. 创建运输对象
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  secure: true,
  auth: {
    user: "马化腾@qq.com", //输入你开启SMTP服务的QQ邮箱
    pass: "xxxxxxxx", //输入我们刚才获得的那串字符
  },
});

//3.配置发送邮件的信息
let mailOptions = {
  from: "马化腾@qq.com", // 发送者,也就是你的QQ邮箱
  to: "雷军@qq.com", // 接受者邮箱,可以同时发送多个,以逗号隔开
  subject: "测试发送邮件", // 邮件标题
  html: `
  <p>这是我的测试邮件</p>
  <p>哈哈哈，收到请回复</p>	
  `,
  //邮件内容，以html的形式输入，在邮件中会自动解析显示
};

//4.发送邮件
transporter.sendMail(mailOptions, function (err, data) {
  //回调函数，用于判断邮件是否发送成功
  console.log(err); // null
  console.log(data);
  // {
  //   accepted: [ '雷军@qq.com' ],
  //   rejected: [],
  //   envelopeTime: 241,
  //   messageTime: 431,
  //   messageSize: 396,
  //   response: '250 OK: queued as.',
  //   envelope: { from: '马化腾@qq.com', to: [ '雷军@qq.com' ] },
  //   messageId: '<f2ed0a44-f4c9-2824-4ae9-1b44b6baa4f0@qq.com>'
  // }
});
