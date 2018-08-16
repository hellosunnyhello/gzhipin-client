import {
    AUTH_DATA,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST} from './action-types'
import {reqRegister,reqLogin,reqUpdateUser,reqUser,reqUserList} from '../Api'

import io from 'socket.io-client'


const authData = (user) => ({type: AUTH_DATA, data: user})
const errMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receiveUserList = (users) => ({type: RECEIVE_USER_LIST, data: users})

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
            /*dispatch(authData(result.data))*/
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
            console.log(result.data)
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

//发送聊天消息的异步action
const socket = io('ws://localhost:4000')
socket.on('receiveMsg',function (charMsg) {
    console.log('接收服务器返回的消息',charMsg)
})
export const sendMsg = ({content, from, to}) => {
    return dispatch => {
        //浏览器向服务器发送消息，消息名，消息内容
        socket.emit('sendMsg',{content, from, to})
        console.log('浏览器向服务器发送消息',{content, from, to})
    }
}