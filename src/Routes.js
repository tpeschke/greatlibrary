import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home';
import View from './components/view/View';

export default class Routes extends Component {
    render(){
        return (
            <div>
                <Switch>
                    <Route 
                        exact path='/'
                        component={Home}/>
                    <Route 
                        path='/view'
                        component={View}/>
                </Switch>
            </div>
        )
    }
}