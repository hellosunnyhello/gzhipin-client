import React,{Component} from 'react';
import {NavBar,WingBlank,InputItem,Button,TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {update} from '../../redux/actions'
class DashenInfo extends Component{
    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
    }

    clickHandler = (name,val) =>{
        this.setState({
            [name]: val
        })
    }
    setHeader = (header) =>{
        this.setState({header})
    }
    saveInfo = ()=>{
        this.props.update(this.state)
    }
    render (){
        const {header} = this.props
        console.log(this.props)
        if(header){
            return <Redirect to='/dashen'/>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <WingBlank>
                    <InputItem placeholder='请输入求职岗位' onChange={(val)=>this.clickHandler('post',val)}>求职岗位</InputItem>
                    <TextareaItem title='个人介绍' placeholder='请输入个人介绍' onChange={(val)=>this.clickHandler('info',val)} rows={3}/>
                </WingBlank>
                <Button type='primary' onClick={this.saveInfo}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    {update}
)(DashenInfo)