//ES6的方式引入socketio的客户端模块的io对象,这个io就是我服务器端创建的管理socket的对象
import io from 'socket.io-client'

// 创建一个socket会话对象，io（服务器地址），ws代表websocket
const socket = io('ws://localhost:4000')

// socket对象绑定接收监听（监听名，监听函数），接收的是服务器的响应事件
    socket.on('responseMsg',function (data) {
        //打印接收到的数据
        console.log('接收到服务器的数据了',data)
    })

// 向服务器发送消息，socket通信，主动发消息都用emit方法，emit（名称，数据）
socket.emit('sendMsg',{username:'chen'})
//打印浏览器向服务器发送数据了，发送的内容
console.log('浏览器向服务器发送数据了',{username:'chen'})