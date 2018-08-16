import React,{Component} from 'react';
import {Result,List,Button,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'

const Item = List.Item
const Brief = Item.Brief
class Personal extends Component{

    logout = ()=>{
        alert('aaa')
    }
    render (){
        const {username, header,company,salary,post,info} = this.props.user
        return (
            <div>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} alt={header} style={{ width: 50 }} />}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        {post ? <Brief>职位: {post}</Brief>:null}
                        {info ? <Brief>简介: {info}</Brief>:null}
                        {salary ? <Brief>薪资: {salary}</Brief>:null}

                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {}
)(Personal)