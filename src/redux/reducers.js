import {combineReducers} from 'redux'

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
import userTargetPath from '../utils'
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirect: ''
}
function user(state = initUser,action) {
    switch (action.type){
        case AUTH_DATA:
            const redirect = userTargetPath(action.data.type,action.data.header)
            return {...action.data, redirect}
        case ERROR_MSG:
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

const initUserList = []
function userList(state=initUserList,action) {
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}
const initChat={
    users: {},
    chatMsgs: [],
    unReadCount: 0
}
function chat(state=initChat,action) {
    switch (action.type){
        case RECEIVE_CHAT_MSG:
            var {chatMsg,myId} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs,chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read &&chatMsg.to===myId ? 1:0)
            }
        case RECEIVE_CHAT_LIST:
            var {users,chatMsgs,myId} = action.data
            return {
                users: users,
                chatMsgs: chatMsgs,
                unReadCount: state.unReadCount+chatMsgs.reduce((pre,curr)=>pre + (!curr.read&&curr.to===myId) ? 1:0 ,0)
            }
        case READ_COUNT_GET:
            var {sourceId,targetId,count} = action.data
            /*const read = state.chatMsgs.map((chatMsg)=>(!chatMsg.read &&chatMsg.to===targetId&&chatMsg.from===sourceId))
            console.log('qqqq',state.users)*/
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map((msg)=>{
                    if(msg.to===targetId&&msg.from===sourceId&&msg.read===false){
                        return {...msg,read:true}
                    }else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount-count
            }
        default:
            return state
    }
}

export default combineReducers({user,userList,chat})