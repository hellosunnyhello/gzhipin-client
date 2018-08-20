import React,{Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import {getUserInfo} from '../../redux/actions'
import userTargetPath from '../../utils'
import BossInfo from '../boss-info/boss-info'
import DashenInfo from '../dashen-info/dashen-info'
import Boss from '../boss/boss'
import Dashen from '../dashen/dashen'
import Personal from '../personal/personal'
import Message from '../message/message'
import Chat from '../chat/chat'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'

// import '../../assets/css/index.less'

class Main extends Component{
    navList = [
        {
            path: '/boss', // 路由路径
            component: Boss,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount (){
        const user_id = Cookies.get('user_id')
        if(user_id && !this.props.user._id){

            this.props.getUserInfo();
        }
    }

    render (){
        const user_id = Cookies.get('user_id')
        const {_id,type,header} = this.props.user
        const path = this.props.location.pathname
        const currentNav = this.navList.find((nav,index)=> path===nav.path)
        if(!user_id){
            return <Redirect to='/login'/>
        }

        if(!_id){
            return null
        }else {
            if(path === '/'){
                const targetPath = userTargetPath(type, header)
                return <Redirect to={targetPath} />
            }
            if(type==='boss'){
                if(path==='/dashen'){
                    return <Redirect to='/boss' />
                }
                this.navList[1].hide = true
            }else {
                if(path==='/boss'){
                    return <Redirect to='/dashen' />
                }
                this.navList[0].hide = true
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='fixed-top'>{currentNav.title}</NavBar> : null}
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route path='/dashen' component={Dashen}/>
                    <Route path='/boss' component={Boss}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList = {this.navList} unReadCount={this.props.unReadCount}/> : null}
            </div>

        )
    }
}

export default connect(
    (state)=> ({user: state.user,unReadCount: state.chat.unReadCount}),
    {getUserInfo}
)(Main)