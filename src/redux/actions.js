import io from 'socket.io-client'
import {
    AUTH_DATA,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_CHAT_LIST,
    RECEIVE_CHAT_MSG,
    READ_COUNT_GET
} from './action-types'

import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadChatMsg
} from '../Api'

const authData = (user) => ({type: AUTH_DATA, data: user})
const errMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receiveUserList = (users) => ({type: RECEIVE_USER_LIST, data: users})
const receiveChatList = ({users,chatMsgs,myId}) => ({type: RECEIVE_CHAT_LIST, data: {users,chatMsgs,myId}})
const receiveChatMsg = ({chatMsg,myId}) => ({type: RECEIVE_CHAT_MSG, data: {chatMsg,myId}})
const readCountGet = ({sourceId,targetId,count}) => ({type: READ_COUNT_GET,data: {sourceId,targetId,count}})

//注册
export const register = (user) =>{
    const {username, password, password2, type} = user;
    if(!username){
        return errMsg('用户名不能为空')
    }else if(!password){
        return errMsg('密码不能为空')
    }else if(password !== password2){
        return errMsg('两次输入密码不一致')
    }else if(!type){
        return errMsg('请选择用户类型')
    }
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqRegister({username, password, type})
        const result = response.data //{code: 0, data: {}}
        //分发同步action
        if(result.code===0){
            getChatList(dispatch,result.data._id)
            dispatch(authData(result.data))
        }else {
            //分发同步action
            dispatch(errMsg(result.msg))
        }
    }
};

//登录
export const login = (user) =>{
    const {username, password} = user;
    if(!username){
        return errMsg('用户名不能为空')
    }else if(!password){
        return errMsg('密码不能为空')
    }
    return async dispatch => {
        //发送注册的异步请求
        const response = await reqLogin(user)
        const result = response.data //{code: 0, data: {}}
        //分发同步action
        if(result.code===0){
            getChatList(dispatch,result.data._id)
            dispatch(authData(result.data))
        }else {
            //分发同步action
            dispatch(errMsg(result.msg))
        }

    }
}

//更新用戶信息
export const update = (user) => {
    if(!user.header){
        return errMsg('请选择头像')
    }
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code === 0){
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}

//获取用户信息
export const getUserInfo = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0){
            getChatList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}

//获取对应类型的用户列表

export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if(result.code===0){
            dispatch(receiveUserList(result.data))
        }
    }
}


function initSocketIO(dispatch,myId) {
    io.myId = myId
    if(!io.socket){
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg',function (chatMsg) {//只有消息是发给我的或者是我发的才会派发action去改变state
            if(chatMsg.from===io.myId  || chatMsg.to===io.myId ){
                console.log(chatMsg)
                dispatch(receiveChatMsg({chatMsg,myId}))
            }
        })
    }
}


export const sendMsg = ({content,from,to})=>{
    return async dispatch =>{
        io.socket.emit('sendMsg',{content,from,to})
    }
}
async function getChatList(dispatch,myId) {
    initSocketIO(dispatch,myId)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code===0){
        const {users,chatMsgs} = result.data
        dispatch(receiveChatList({users,chatMsgs,myId}))
    }

}

export const readMsg = (sourceId,targetId) => {
    return async dispatch => {
        console.log('sourceId',sourceId)
        const response = await reqReadChatMsg(sourceId)
        const result = response.data
        if(result.code === 0){
            const count = result.data
            dispatch(readCountGet({sourceId,targetId,count}))
        }
    }
}