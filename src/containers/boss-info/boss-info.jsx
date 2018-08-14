import React,{Component} from 'react';
import {NavBar,WingBlank,InputItem,Button,TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {update} from '../../redux/actions'
class BossInfo extends Component{
    state = {
        header: '', // 头像名称
        info: '', // 职位简介
        post: '', // 职位名称
        company: '', // 公司名称
        salary: '' // 工资
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

            return <Redirect to='/boss'/>
        }
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <WingBlank>
                    <InputItem placeholder='请输入招聘职位' onChange={(val)=>this.clickHandler('post',val)}>招聘职位</InputItem>
                    <InputItem placeholder='请输入公司名称' onChange={(val)=>this.clickHandler('company',val)}>公司名称</InputItem>
                    <InputItem placeholder='请输入职位薪资' onChange={(val)=>this.clickHandler('salary',val)}>职位薪资</InputItem>
                    <TextareaItem title='职位要求' placeholder='请输入职位要求' onChange={(val)=>this.clickHandler('info',val)} rows={3}/>
                </WingBlank>
                <Button type='primary' onClick={this.saveInfo}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    {update}
)(BossInfo)