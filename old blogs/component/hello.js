class App extends React.Component {  
  render() {
    return (
      <div className={this.props.className}>
        <Title/>
        <Body/>
        <Footer/>
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <div className="title">
        <h1>这是测试标题</h1>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <h3>这是测试结尾</h3>
      </div>
    );
  }
}

class Body extends React.Component {
  render() {
    return (
      <div className="body">
        <h3>这是测试中部</h3>
        <h3>这是测试中部</h3>
        <h3>这是测试中部</h3>
      </div>
    );
  }
}