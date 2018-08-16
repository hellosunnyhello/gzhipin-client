import React,{Component} from 'react';
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'
class HeaderSelector extends Component{
    state = {
        icon: null
    }
    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.headerList = []

        for(let i=0; i<20; i++){
            this.headerList.push({
                text: `头像${i+1}`,
                icon: require(`../../assets/images/头像${i+1}.png`)
            })
        }
    }
    selectHeader = ({icon,text})=>{
        this.setState({icon})
        this.props.setHeader(text)
    }
    render (){

        const girdHeader = this.state.icon ? <div>已选择头像：<img src={this.state.icon}/></div> : '请选择头像'
        return (
            <div>
                <List renderHeader={()=>girdHeader} >
                    <Grid data={this.headerList} columnNum={5} onClick={this.selectHeader}/>
                </List>
            </div>
        )
    }
}

export default HeaderSelector