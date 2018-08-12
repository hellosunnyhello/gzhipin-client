import React,{Component} from 'react';
import {NavBar,WingBlank,List,WhiteSpace,Button,InputItem,Radio} from 'antd-mobile';

import Logo from '../../components/logo/logo'
class Login extends Component{
    state = {
        username: '',
        password: '',
    };
    changeHandler = (name,val) =>{
        this.setState({
            [name]: val
        })
    };
    render (){
        const {type} = this.state
        const {replace} = this.props.history
        return (
            <div>
                <NavBar>硅谷直聘登录</NavBar>
                <WhiteSpace />
                <Logo/>
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem type='text' placeholder='请输入用户名' onChange = {(val)=>this.changeHandler('username',val)}>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='请输入密码' onChange = {(val)=>this.changeHandler('password',val)}>密码：</InputItem>
                        <WhiteSpace />


                        <Button type='primary'>登&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace />
                        <Button onClick={()=>replace('/register')}>未有用户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Login