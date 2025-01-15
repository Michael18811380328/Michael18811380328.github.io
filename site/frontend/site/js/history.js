(function() {
  var h1 = document.getElementsByTagName("h1")[0].innerText;
  var historyStr = window.localStorage.getItem('blog-history');
  var historyObj = JSON.parse(historyStr) || {};
  historyObj[h1] = {
    time: new Date().getTime(),
    url: window.location.href,
  }
  historyStr = JSON.stringify(historyObj);
  window.localStorage.setItem('blog-history', historyStr);
})();
