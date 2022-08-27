import React from 'react';
import { Table } from 'reactstrap';
import { timestampToTime, getHistorys } from './utils';
import MyToast from './components/MyToast';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      historys: getHistorys(),
      showToast: false,
      toastTitle: '',
      toastBody: '',
    };
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
    this.openToast('温馨提示', '当前浏览记录已删除');
    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  openToast = (title = '', body = '') => {
    this.setState({
      showToast: true,
      toastTitle: title,
      toastBody: body,
    });
  }

  closeToast = () => {
    this.setState({
      showToast: false,
      toastTitle: '',
      toastBody: '',
    });
  }
  
  // 需要测试打包目录 /history/build 目录下
  render () {
    // 这里的样式需要修改一下
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
                  <td>{timestampToTime(time)}</td>
                  <td onClick={() => {this.deleteLog(index)}} style={{cursor: 'pointer'}}>x</td> 
                </tr>
              );
            })}
          </tbody>
        </Table>
        {this.state.showToast &&
          <MyToast title={this.state.toastTitle} body={this.state.toastBody} closeToast={this.closeToast}/>
        }
      </div>
    );
  }
}

export default App;
