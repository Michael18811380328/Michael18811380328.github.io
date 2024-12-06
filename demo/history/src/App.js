import React from 'react';
import { Button, Table } from 'reactstrap';
import { timestampToTime, getHistorys } from './utils';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      historys: getHistorys(),
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
  }

  deleteAllLog = () => {
    if (window.confirm('你确定要删除全部的浏览记录吗?')) {
      let historys = [];
      this.setState({ historys });
      const historyStr = JSON.stringify({});
      window.localStorage.setItem('blog-history', historyStr);
    }
  }

  renderHeader = () => {
    return (
      <div className="history-header">
        <h2>访问记录</h2>
        <Button onClick={this.deleteAllLog} color="warning">删除全部</Button>
      </div>
    );
  }
  
  render () {
    if (this.state.historys.length === 0) {
      return (
        <div className="history">
          {this.renderHeader()}
          <div className="history-body">
            没有浏览记录
          </div>
        </div>
      );
    }
    return (
      <div className="history">
        {this.renderHeader()}
        <div className="history-body">
          <Table striped bordered>
            <thead>
              <tr>
                <th>文章名称</th>
                <th>访问时间</th>
                <th>删除记录</th>
              </tr>
            </thead>
            <tbody>
              {this.state.historys.map((item, index) => {
                const { name, time, url } = item;
                return (
                  <tr key={name}>
                    <td><a href={url}><span>{name.replace('¶', '')}</span></a></td>
                    <td>{timestampToTime(time)}</td>
                    <td onClick={() => {this.deleteLog(index)}} style={{cursor: 'pointer'}}>x</td> 
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;
