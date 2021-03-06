import React, { Component } from 'react'
import axios from 'axios';
import Login from './Login'
import SpellList from './SpellList'
import MiracleList from './MiracleList'
import MyList from './MyList'
import './home.css'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            loggedIn: false
        }
    }

    componentWillMount() {
        axios.get('/getAlllists').then(res => {
            if (res.data === 'no') {
                this.setState({loggedIn: false})
            } else {
                this.setState({loggedIn: true})
            }
        })
    }

    logIn = () => {
        axios.get('/login').then(res => {
            this.setState({ loggedIn: res.data })
        })
    }

    render() {
        let leftDiv = this.state.loggedIn ? <MyList redirect={this.props.history.push} /> : <Login />

        return (
            <div className="outerShell">
                <div className="box">
                    <h3>My Lists</h3>
                    {leftDiv}
                </div>
                <div className="box">
                    <div className="innerBox">
                        <SpellList 
                            redirect={this.props.history.push}/>
                    </div>
                    <div className="innerBox">
                        <MiracleList 
                            redirect={this.props.history.push}/>
                    </div>
                </div>
            </div>
        )
    }
}