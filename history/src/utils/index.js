export function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()); 
  let strDate = Y+M+D+h+m+s;
  return strDate;
};

export function getHistorys() {
  var historyStr = window.localStorage.getItem('blog-history') || '';
  if (!historyStr || typeof historyStr !== 'string') {
    historyStr = '{}';
  }
  var historyObj = {};
  try {
    historyObj = JSON.parse(historyStr);
  } catch (e) {
    console.log(e);
  }
  var historyArr = [];
  for (let key in historyObj) {
    let value = historyObj[key];
    let item = {
      name: key,
      time: value.time,
      url: value.url,
    };
    historyArr.push(item);
    // 可以获取全部的历史记录，放在 state 中。界面先渲染 30 条记录，滚动到底部后，加载更多记录即可（如果是异步网络请求，也类似这样渲染）。
    if (historyArr.length >= 30) break;
  }
  historyArr.sort((a, b) => (a.time < b.time ? 1 : -1));
  return historyArr;
};
