import {RECEIVE_DATA, RECEIVE_MSG} from './action-types'
import {reqRegister,reqLogin} from '../Api'

const receiveData = (user) => ({type: RECEIVE_DATA, data: user})
const receiveMsg = (msg) => ({type: RECEIVE_MSG, data: msg})


//注册
export const register = (user) =>{
    return dispatch => {
        //发送注册的异步请求
        reqRegister(user)
            .then(response => {
                const result = response.data //{code: 0, data: {}}
                //分发同步action
                if(result.code===0){
                    dispatch(receiveData(result.data))
                }else {
                    //分发同步action
                    dispatch(receiveMsg(result.msg))
                }
            })
            .catch(err => {
               console.log(err)
            })
    }
};

//登录
export const login = (user) =>{
    return dispatch => {
        //发送注册的异步请求
        reqLogin(user)
            .then(response => {
                const result = response.data //{code: 0, data: {}}
                //分发同步action
                if(result.code===0){
                    dispatch(receiveData(result.data))
                }else {
                    //分发同步action
                    dispatch(receiveMsg(result.msg))
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}