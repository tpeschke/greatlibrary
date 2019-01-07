import React, {Component} from 'react'
import axios from 'axios'
import './view.css'

import Sidebar from './Sidebar'
import MainView from './MainView'

export default class View extends Component {
    constructor() {
        super()

        this.state = {
            type: '',
            param: '',
            data: [],
            name: '',
            descrip: null
        }
    }

    componentWillMount() {
        let params = this.props.match.params.type.split('+');
        this.setState({type: params[0], param: params[1]})

        if (params[0] === 'list') {
            axios.get('/getSingleList/'+ params[1]).then( res => {
                this.setState({name: res.data.name, descrip: res.data.description})
            })
            axios.get('/getAllLists').then(res => {
                this.setState({data: res.data})
            })
        } else if (params[0] === 'order') {
            axios.get('/orders').then(res => {
                this.setState({data: res.data, name: params[1]})
            })
        } else {
            axios.get('/domains').then(res => {
                this.setState({data: res.data, name: params[1]})
            })
        }
    }

    changeView = (newRoute) => {
        let {type} = this.state
        this.props.history.push(`/view/${type}+${newRoute}`)

        this.setState({param: newRoute})

        if (type === 'list') {
            axios.get('/getSingleList/'+ newRoute).then( res => {
                this.setState({name: res.data.name, descrip: res.data.description})
            })
            axios.get('/getAllLists').then(res => {
                this.setState({data: res.data})
            })
        } else if (type === 'order') {
            axios.get('/orders').then(res => {
                this.setState({data: res.data, name: newRoute})
            })
        } else {
            axios.get('/domains').then(res => {
                this.setState({data: res.data, name: newRoute})
            })
        }
    }

    render() {
        let {param, data, name, descrip, type} = this.state
        
        return (
            <div className="viewShell">
                <div className="viewBox viewBoxSidebar">
                    <Sidebar 
                        type={type}
                        data={data}
                        changeView={this.changeView}/>
                </div>
                <div className="viewBox">
                    <MainView 
                        name={name}
                        descrip={descrip}
                        type={type}
                        param={param}/>
                </div>
            </div>
        )
    }
}