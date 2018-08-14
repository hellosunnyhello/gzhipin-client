import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom'

import BossInfo from '../boss-info/boss-info'
import DashenInfo from '../dashen-info/dashen-info'
import Boss from '../boss/boss'
import Dashen from '../dashen/dashen'
class Main extends Component{

    render (){

        return (
            <Switch>
                <Route path='/bossinfo' component={BossInfo}/>
                <Route path='/dasheninfo' component={DashenInfo}/>
                <Route path='/dashen' component={Dashen}/>
                <Route path='/boss' component={Boss}/>
            </Switch>
        )
    }
}

export default Main