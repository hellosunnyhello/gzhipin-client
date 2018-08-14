import {AUTH_DATA, ERROR_MSG, UPDATE_USER, UPDATE_MSG} from './action-types'
import {reqRegister,reqLogin,reqUpdateUser} from '../Api'

const authData = (user) => ({type: AUTH_DATA, data: user})
const errMsg = (msg) => ({type: ERROR_MSG, data: msg})
const updateUser = (user) => ({type: UPDATE_USER, data: user})
const updateMsg = (msg) => ({type: UPDATE_MSG, data: msg})

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
            dispatch(authData(result.data))
        }else {
            //分发同步action
            dispatch(errMsg(result.msg))
        }

    }
}

//更新用戶信息

export const update = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code === 0){
            dispatch(updateUser(result.data))
        }else {
            dispatch(updateMsg(result.msg))
        }
    }
}
