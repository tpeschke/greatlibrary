import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import View from './components/view/View';
import HeaderHOC from './components/HeaderHOC';
import Search from './components/search/Search';

export default class Routes extends Component {
    render(){
        return (
            <div>
                <Switch>
                    <Route 
                        exact path='/'
                        component={HeaderHOC(Home)}/>
                    <Route 
                        path='/view/:type'
                        component={HeaderHOC(View)}/>
                    <Route 
                        path='/search'
                        component={HeaderHOC(Search)}/>
                </Switch>
            </div>
        )
    }
}