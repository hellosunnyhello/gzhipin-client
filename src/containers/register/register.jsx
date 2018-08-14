import React,{Component} from 'react';
import {NavBar,WingBlank,List,WhiteSpace,Button,InputItem,Radio} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

import '../../assets/css/index.less'

class Register extends Component{
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'boss'
    };
    register = () => {
        //发送注册请求
        this.props.register(this.state);
    }
    changeHandler = (name,val) =>{
        this.setState({
            [name]: val
        })
    };
    render (){
        const {type} = this.state
        const {replace} = this.props.history
        const {msg, redirect} = this.props
        if(redirect){
            return <Redirect to={redirect}/>
        }
        return (
            <div>
                <NavBar>硅谷直聘注册</NavBar>
                <WhiteSpace />
                <Logo/>
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <p className='errMsg'>{msg}</p>
                        <WhiteSpace />
                        <InputItem type='text' placeholder='请输入用户名' onChange = {(val)=>this.changeHandler('username',val)}>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='请输入密码' onChange = {(val)=>this.changeHandler('password',val)}>密码：</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='请输入确认密码' onChange = {(val)=>this.changeHandler('password2',val)}>确认密码：</InputItem>
                        <WhiteSpace />
                        <List.Item>
                            <span>用户类型</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='dashen'} onChange={()=>this.setState({type: 'dashen'})}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='boss'} onChange={()=>this.setState({type: 'boss'})}>老板</Radio>
                        </List.Item>
                        <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace />
                        <Button onClick={()=>replace('/login')}>已有用户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => state.user ,
    {register}
)(Register)