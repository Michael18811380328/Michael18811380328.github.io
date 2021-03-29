---
layout:       post
title:        "webSocket实时通信"
subtitle:     "Websocket real-time communication"
date:         2018-10-14 22:05:00
author:       "ZeFeng"
header-img:   "img/websocket_logo.jpg"
header-mask:  0.3
catalog:      true
tags:
    - VUE
    - webSocket
---
## 实时通信
> 实时通信的实现方式有很多种，比如：短轮询、长轮询、长连接，本质都是单向通信，客户端主动发起请求，服务端被动响应请求。而WebSocket则是全双工通讯了，也就是说无论是客户端还是服务端都能主动向对方发起响应，这样服务器具备推送能力。

## 前言
SockJS实现webSocket通信有很多例子，比如用jq实现的，也有用vue实现的。这里我们主要讲vue的例子。我们先用一个图简单了解一下轮询跟WebSocket。
<img src="https://00feng00.github.io/img/ws.png">
## 简介
<b>WebSocket:</b>
WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。<br />
WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。<br />
在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。<br />
<b>SockJS:</b><br />
SockJS是一个浏览器JavaScript库，它提供了一个类似于网络的对象。SockJS提供了一个连贯的、跨浏览器的Javascript API，它在浏览器和web服务器之间创建了一个低延迟、全双工、跨域通信通道。
## 使用SockJS的原因
一些浏览器中缺少对WebSocket的支持,因此，回退选项是必要的，而Spring框架提供了基于SockJS协议的透明的回退选项。<br />
SockJS的一大好处在于提供了浏览器兼容性。优先使用原生WebSocket，如果在不支持websocket的浏览器中，会自动降为轮询的方式。 <br />
除此之外，spring也对socketJS提供了支持。<br />
如果代码中添加了withSockJS()如下，服务器也会自动降级为轮询。
```
registry.addEndpoint("/coordination").withSockJS();
```
## 代码实现
<b>服务端：</b><br />
可以到github看代码 [SockJS-node-server](https://github.com/sockjs/sockjs-node) <br />
<b>客户端：</b><br />
1、安装stompjs<br />
```
npm install stompjs
npm install --save net
```
2、安装sockjs<br />
```
npm install sockjs
```
3、代码实现<br />
```
// 引入模块
import SockJS from  'sockjs-client'
import  Stomp from 'stompjs'
export default {
    data() {
      return {
        dataList: []
      };
    },
    mounted:function(){
      this.initWebSocket()
    },
    beforeDestroy: function () {
      // 页面离开时断开连接
      this.disconnect()
     // 清除定时器
      clearInterval(this.timer)
    },
    methods: {
      initWebSocket() {
        this.connection()
        let self = this // 作用域，this的指向
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        this.timer = setInterval(() => {
          try {
            self.stompClient.send('test')
          } catch (err) {
            console.log('断线了: ' + err)
            self.connection()
          }
        }, 5000);
      },
      connection() {
      // 建立连接对象，连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
        this.socket = new SockJS('你的服务请求地址，例如：https://mydomain.com/my_prefix')
        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(this.socket)
        // 定义客户端的认证信息,按需求配置
        var headers = {
          'login': , // 按需求配置
          'passcode': , // 按需求配置
          'client-id': util.uuid() // 可以理解为一个需要认证的参数
          // additional header
        };
        // 向服务器发起websocket连接
        this.stompClient.connect(headers,(frame) => {
       // 服务端提供的某个topic,按服务端提供的进行修改
          this.stompClient.subscribe('/topic/chat_demo', (res) => { 
           consolel.log(res.data.info)  // res.data.info存放的是服务端发送给我们的信息
          });
        }, (err) => {
            // 连接发生错误时的处理函数
            console.log(err)
        });

      },
      // 断开连接
      disconnect() {
        if (this.stompClient !== null) {
          this.stompClient.disconnect()
          console.log('Disconnected')
        }
      }
    }
}
```
## 结语
这只是一个简单的例子，需要深入学习的同学可以看下：
[sockjs-client](https://github.com/sockjs/sockjs-client)













