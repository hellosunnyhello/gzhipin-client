import {combineReducers} from 'redux'

import {
    AUTH_DATA,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER} from './action-types'
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
            return state;
    }
}

export default combineReducers({user})