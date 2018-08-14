import {combineReducers} from 'redux'

import {AUTH_DATA, ERROR_MSG, UPDATE_USER, UPDATE_MSG} from './action-types'
import userInfo from '../utils'
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirect: ''
}
function user(state = initUser,action) {
    switch (action.type){
        case AUTH_DATA:
            const redirect = userInfo(action.data.type,action.data.header)
            return {...action.data, redirect}
        case ERROR_MSG:
            return {...state, msg: action.data}
        case UPDATE_USER:
            return action.data
        case UPDATE_MSG:
            return {...initUser, msg: action.data}
        default:
            return state;
    }
}

export default combineReducers({user})