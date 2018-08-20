import React,{Component} from 'react';
import {connect} from 'react-redux'
import {NavBar, List, InputItem,Grid,Icon} from 'antd-mobile'

import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item


class Chat extends Component{
    state = {
        content: '',
        isShow: false
    }
    send = () => {
        const {content} = this.state
        const from = this.props.user._id
        const to = this.props.match.params.userid
        this.props.sendMsg({content,from,to})
        this.setState({content: ''})
        this.state.isShow = false
    }
    componentWillMount (){
        this.emojis = ['😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤','😍','👍','❤']
        this.emojiIcon=[]
        this.emojis.forEach((item)=>{
            this.emojiIcon.push({text:item})
        })
    }
    showEmojis = ()=>{
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow){
            setTimeout(function () {
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }
    componentDidMount(){
        window.scrollTo(0,document.body.scrollHeight)
    }
    componentDidUpdate(){
        window.scrollTo(0,document.body.scrollHeight)
    }

    componentWillUnmount (){
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from,to)
    }
    render (){
        const {user} = this.props
        const {users,chatMsgs} = this.props.chat
        const myId = user._id
        const targetId = this.props.match.params.userid

        const chatId = [myId,targetId].sort().join('')
        if(!users[targetId]){
            return <div>loading.....</div>
        }
        //过滤与我相关的聊天信息，我发给目标用户的和目标用户发送给我的
        /*1.方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
        2.不会改变原始数组*/
        const myAndTargetMsgs = chatMsgs.filter((item)=>item.chat_id === chatId)

        const targetIcon = require(`../../assets/images/${users[targetId].header}.png`)

        return (
            <div id='chat-page'>
                <NavBar
                    className='fixed-top'
                    icon={<Icon type='left'/>}
                    onLeftClick={()=>this.props.history.goBack()}
                >{users[targetId].username}</NavBar>
                <List className='content-postion'>
                    {
                        myAndTargetMsgs.map((msg,index)=>{
                            if(msg.to===myId){
                                return (
                                    <Item
                                        key={msg._id}
                                        thumb={targetIcon}
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            }else {
                                return (
                                    <Item
                                        key={msg._id}
                                        className='chat-me'
                                        extra='我'
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            }
                        })
                    }

                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        onChange={(val)=>this.setState({content:val})}
                        value={this.state.content}
                        extra={
                            <span>
                                <span onClick={this.showEmojis}>😊</span>&nbsp;&nbsp;
                                <span onClick={this.send}>发送</span>
                            </span>

                        }
                    />
                    {
                        this.state.isShow ? (
                             <Grid
                                 data={this.emojiIcon}
                                 columnNum={6}
                                 carouselMaxRow={4}
                                 isCarousel={true}
                                 onClick={(item)=>this.setState({content:this.state.content+item.text})}
                             />
                         ):null
                    }


                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)