import React from 'react';
import { Table } from 'reactstrap';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      historys: this.init(),
    };
  }

  init() {
    // 读取 localStorage 封装到工具函数中
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
  }
  
  // 工具函数 utils
  timestampToTime(timestamp) {
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()); 
    let strDate = Y+M+D+h+m+s;
    return strDate;
  }

  deleteLog = (index) => {
    let historys = this.state.historys.slice(0);
    historys.splice(index, 1);
    this.setState({ historys });
    
    // save to localStorage
    let historyObj = {};
    historys.forEach(item => {
      historyObj[item.name] = item;
    });
    const historyStr = JSON.stringify(historyObj);
    window.localStorage.setItem('blog-history', historyStr);
    
    // 删除成功后，界面提示一个 toast 反馈用户
  }
  
  // 需要测试打包目录 /history/build 目录下
  render () {
    if (this.state.historys.length === 0) {
      return '没有浏览记录';
    }
    // 界面不需要显示真实的 url 链接，直接渲染 a 即可。处理一下文本过长的情况。
    return (
      <div className="App">
        <Table striped>
          <thead>
            <tr>
              <th>日志名称</th>
              <th>日志链接</th>
              <th>最近访问</th>
              <th>删除记录</th>
            </tr>
          </thead>
          <tbody>
            {this.state.historys.map((item, index) => {
              const { name, time, url } = item;
              return (
                <tr key={name}>
                  <td><span>{name}</span></td>
                  <td><a href={url}>{url}</a></td>
                  <td>{this.timestampToTime(time)}</td>
                  <td onClick={() => {this.deleteLog(index)}} style={{cursor: 'pointer'}}>x</td> 
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
