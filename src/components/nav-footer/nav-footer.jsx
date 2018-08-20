import React,{Component} from 'react';
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

import '../../assets/css/index.less'
const Item = TabBar.Item

class NavFooter extends Component{
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render (){
        const navList = this.props.navList.filter((nav) => !nav.hide)
        const {pathname} = this.props.location
        const {unReadCount} = this.props
        console.log(JSON.stringify(unReadCount))
        return (
            <TabBar>
                {
                    navList.map((nav,index)=>(
                        <Item key={index}
                              badge={nav.path === '/message'? unReadCount:0}
                              title={nav.text}
                              icon={{uri: require(`./nav/${nav.icon}.png`)}}
                              selectedIcon={{uri: require(`./nav/${nav.icon}-selected.png`)}}
                              selected={pathname===nav.path}
                              onPress={()=>this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)