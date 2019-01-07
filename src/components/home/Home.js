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
        axios.get('/checkLogin').then(res => {
            this.setState({ loggedIn: res.data })
        })
    }

    logIn = () => {
        axios.get('/login').then(res => {
            this.setState({ loggedIn: res.data })
        })
    }

    render() {
        let leftDiv = this.state.loggedIn ? <MyList redirect={this.props.history.push} /> : <Login logIn={this.logIn} />

        return (
            <div className="outerShell">
                <div className="box">
                    <h1>My List</h1>
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