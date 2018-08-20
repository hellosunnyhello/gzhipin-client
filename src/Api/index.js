import ajax from './ajax'

//注册请求后台服务器
export const reqRegister = (user) => ajax('/register',user,'POST')
//登录请求后台服务器
export const reqLogin = (user) => ajax('/login',user,'POST')

//更新请求后台服务器
export const reqUpdateUser = (user) => ajax('/update',user,'POST')

//获取当前的user(根据cookie)
export const reqUser = () => ajax('/user')

//根据当前用户类型获取用户列表
export const reqUserList = (type) => ajax('/userlist',{type})

//获取当前用户的聊天消息列表](#6获取当前用户的聊天消息列表
export const reqChatMsgList = () => ajax('/msglist')
// 修改指定消息为已读](#7修改指定消息为已读)
export const reqReadChatMsg = (from) => ajax('/readmsg',{from},'POST')

