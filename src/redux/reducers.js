import {combineReducers} from 'redux'

import {RECEIVE_DATA, RECEIVE_MSG} from './action-types'
const initUser = {
    username: '',
    type: '',
    msg: '',
    redirect: ''
}
function user(state = initUser,action) {
    switch (action.type){
        case RECEIVE_DATA:
            return {...action.data, redirect: '/'}
        case RECEIVE_MSG:
            return {...state, msg: action.data}
        default:
            return state;
    }
}


export default combineReducers({user})