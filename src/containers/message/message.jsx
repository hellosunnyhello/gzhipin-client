import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

class Message extends Component{

    getLastMsgs = () =>{
        const lastObjMsgs = {}
        const {chatMsgs} = this.props.chat
        // console.log(chatMsgs)
        const myId = this.props.user._id
        chatMsgs.map((msg)=>{
            const chatId = msg.chat_id
            const lastMsg = lastObjMsgs[chatId]
            if(!msg.read && msg.to===myId){
                msg.unReadCount = 1
            }else {
                msg.unReadCount = 0
            }
            if(!lastMsg){
                lastObjMsgs[chatId] = msg
            }else {
                const unReadCount = msg.unReadCount + lastMsg.unReadCount
                if(lastMsg.create_time < msg.create_time){
                    lastObjMsgs[chatId] = msg
                }
                lastObjMsgs[chatId].unReadCount = unReadCount
            }
        })
        const lastMsgs = Object.values(lastObjMsgs)
        return lastMsgs
    }



    render (){
        const lastMsgs = this.getLastMsgs()
        const {users} = this.props.chat
        const myId = this.props.user._id
        return (
            <List style={{marginTop: 50, marginBottom: 50}}>
                {
                    lastMsgs.map(msg=>{
                            if(msg.to === myId){
                                return (
                                    <Item key={msg._id}
                                          extra={<Badge text={msg.unReadCount}/>}
                                          thumb={require(`../../assets/images/${users[msg.from].header}.png`)}
                                          arrow='horizontal'
                                          onClick={()=>this.props.history.push(`/chat/${msg.from}`)}
                                    >
                                        {msg.content}
                                        <Brief>{users[msg.from].username}</Brief>
                                    </Item>
                                )
                            }else {
                                return (
                                    <Item key={msg._id}
                                          extra={<Badge text={msg.unReadCount}/>}
                                          thumb={require(`../../assets/images/${users[msg.to].header}.png`)}
                                          arrow='horizontal'
                                          onClick={()=>this.props.history.push(`/chat/${msg.to}`)}
                                    >
                                        {msg.content}
                                        <Brief>{users[msg.to].username}</Brief>
                                    </Item>
                                )
                            }
                        }



                    )
                }
            </List>
        )
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {}
)(Message)