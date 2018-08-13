import React,{Component} from 'react';
import {NavBar,WingBlank,List,WhiteSpace,Button,InputItem} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

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
    login = () => {
        this.props.login(this.state)
    }
    render (){

        const {replace} = this.props.history
        const {msg,redirect} = this.props
        if(redirect){

            return <Redirect to={redirect}/>
        }
        return (
            <div>
                <NavBar>硅谷直聘登录</NavBar>
                <WhiteSpace />
                <Logo/>
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <p>{msg}</p>
                        <WhiteSpace />
                        <InputItem type='text' placeholder='请输入用户名' onChange = {(val)=>this.changeHandler('username',val)}>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='请输入密码' onChange = {(val)=>this.changeHandler('password',val)}>密码：</InputItem>
                        <WhiteSpace />

                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace />
                        <Button onClick={()=>replace('/register')}>未有用户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    {login}
)(Login)