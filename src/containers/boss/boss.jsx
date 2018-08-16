import React,{Component} from 'react';
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
import {reqUserList} from '../../Api'

class Boss extends Component{

    async componentDidMount (){

        this.props.getUserList('dashen')
    }
    render (){

        return <UserList userList={this.props.userList}/>

    }
}

export default connect(
    state=>({userList:state.userList}),
    {getUserList}
)(Boss)