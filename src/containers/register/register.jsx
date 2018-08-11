import React,{Component} from 'react';
import {NavBar,WingBlank,List,WhiteSpace,Button,InputItem,Radio} from 'antd-mobile';
import Logo from '../../components/logo/logo'
class Register extends Component{

    render (){

        return (
            <div>
                <NavBar>硅谷直聘注册</NavBar>
                <WhiteSpace />
                <Logo/>
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem type='text' placeholder='请输入用户名'>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='请输入密码'>密码：</InputItem>
                        <WhiteSpace />
                        <InputItem type='text' placeholder='请输入确认密码'>确认密码：</InputItem>
                        <WhiteSpace />
                        <List.Item>
                            <span>用户类型</span>
                            <Radio>大神</Radio>
                            <Radio>老板</Radio>
                        </List.Item>
                        <Button type='primary'>注&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace />
                        <Button>已有用户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default Register