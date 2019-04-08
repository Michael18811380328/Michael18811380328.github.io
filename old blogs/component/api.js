// http://news-at.zhihu.com/api/2/news/latest 



// https://news-at.zhihu.com/api/4/news/latest
// 
//  {
//       date: "20140523",
//       stories: [
//           {
//               title: "中国古代家具发展到今天有两个高峰，一个两宋一个明末（多图）",
//               ga_prefix: "052321",
//               images: [
//                   "http://p1.zhimg.com/45/b9/45b9f057fc1957ed2c946814342c0f02.jpg"
//               ],
//               type: 0,
//               id: 3930445
//           },
//       ...
//       ],
//       top_stories: [
//           {
//               title: "商场和很多人家里，竹制家具越来越多（多图）",
//               image: "http://p2.zhimg.com/9a/15/9a1570bb9e5fa53ae9fb9269a56ee019.jpg",
//               ga_prefix: "052315",
//               type: 0,
//               id: 3930883
//           },
//       ...
//       ]
//   }
//   

// id = response.stories.id;
// URL: https://news-at.zhihu.com/api/4/news/3892357
// 
// res:
// {
  //     body: "<div class="main-wrap content-wrap">...</div>",
  //     image_source: "Yestone.com 版权图片库",
  //     title: "深夜惊奇 · 朋友圈错觉",
  //     image: "http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg",
  //     share_url: "http://daily.zhihu.com/story/4772126",
  //     js: [ ],
  //     recommenders": [
  //         { "avatar": "http://pic2.zhimg.com/fcb7039c1_m.jpg" },
  //         { "avatar": "http://pic1.zhimg.com/29191527c_m.jpg" },
  //         { "avatar": "http://pic4.zhimg.com/e6637a38d22475432c76e6c9e46336fb_m.jpg" },
  //         { "avatar": "http://pic1.zhimg.com/bd751e76463e94aa10c7ed2529738314_m.jpg" },
  //         { "avatar": "http://pic1.zhimg.com/4766e0648_m.jpg" }
  //     ],
  //     ga_prefix: "050615",
  //     section": {
  //         "thumbnail": "http://pic4.zhimg.com/6a1ddebda9e8899811c4c169b92c35b3.jpg",
  //         "id": 1,
  //         "name": "深夜惊奇"
  //     },
  //     type: 0,
  //     id: 4772126,
  //     css: [
  //         "http://news.at.zhihu.com/css/news_qa.auto.css?v=1edab"
  //     ]
  // }
// body : HTML 格式的新闻
// image-source : 图片的内容提供方。为了避免被起诉非法使用图片，在显示图片时最好附上其版权信息。
// title : 新闻标题
// image : 获得的图片同 最新消息 获得的图片分辨率不同。这里获得的是在文章浏览界面中使用的大图。
// share_url : 供在线查看内容与分享至 SNS 用的 URL
// js : 供手机端的 WebView(UIWebView) 使用
// recommenders : 这篇文章的推荐者
// ga_prefix : 供 Google Analytics 使用
// section : 栏目的信息
// thumbnail : 栏目的缩略图
// id : 该栏目的 id
// name : 该栏目的名称
// type : 新闻的类型
// id : 新闻的 id
// css : 供手机端的 WebView(UIWebView) 使用
// 可知，知乎日报的文章浏览界面利用 WebView(UIWebView) 实现
// 
// 
// 
// 新闻对应长评论查看
// URL: https://news-at.zhihu.com/api/4/story/8997528/long-comments

// 使用在 最新消息 中获得的 id，在 https://news-at.zhihu.com/api/4/story/#{id}/long-comments 中将 id 替换为对应的 id，得到长评论 JSON 格式的内容

// 响应实例：

//   {
//       "comments": [
//           {
//                "author":"巨型黑娃儿",
//                "content":"也不算逻辑问题。其实小时候刚刚听说这个玩意的时候我也奇...",
//                "avatar":"http://pic3.zhimg.com/4131a3385c748c9e2d02ab80e29a0c52_im.jpg",
//                "time":1479706360,
//                "reply_to":{
//                            "content":"第二个机灵抖的还是有逻辑问题，不该说忘了，应该说没喝过啊我也不知道",
//                            "status":0,
//                            "id":27275308,
//                            "author":"2233155495"
//                            },
//                "id":27276057,
//                "likes":2
//           },
//           ...
//       ]
//   }
// 分析：

// comments : 长评论列表，形式为数组（请注意，其长度可能为 0）
// author : 评论作者
// content : 评论的内容
// avatar : 用户头像图片的地址
// id : 评论者的唯一标识符
// likes : 评论所获『赞』的数量
// time : 评论时间
// reply_to : 所回复的消息
// content : 原消息的内容
// status : 消息状态，0为正常，非0为已被删除
// id : 被回复者的唯一标识符
// author : 被回复者
// err_msg: 错误消息，仅当status非0时出现