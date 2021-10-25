(function() {
  // 1、博客界面（每一个）
  // 页面加载后，先获取当前页面的标题
  var h1 = document.getElementsByTagName("h1")[0].innerText;
  // 去掉最后一个点号
  h1 = h1.slice(0, h1.length - 1);

  // 获取已有的数据，并转换成对象
  var historyStr = window.localStorage.getItem('blog-history');
  var historyObj = JSON.parse(historyStr) || {};

  historyObj[h1] = {
    time: new Date().getTime(), //当前时间戳
    url: window.location.href,
  }

  historyStr = JSON.stringify(historyObj);
  window.localStorage.setItem('blog-history', historyStr);
})();
