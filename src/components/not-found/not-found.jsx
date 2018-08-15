import React,{Component} from 'react';
import {Button} from 'antd-mobile'
class NotFound extends Component{


    render (){

        return (
            <div>
                <h2>404not found</h2>
                <Button type='primary' onClick={()=>this.props.history.replace('/')}>登录</Button>
            </div>
        )
    }
}

export default NotFound