import React, {Component} from 'react'
import _ from "lodash"
import axios from 'axios'
import './view.css'

import Sidebar from './Sidebar'
import MainView from './MainView'
import ListSelection from './ListSelection'

export default class View extends Component {
    constructor() {
        super()

        this.state = {
            type: '',
            param: '',
            data: 'loading',
            listid: '',
            name: '',
            descrip: null,
            lists: [],
            active: null,
            open: false,
            mobile: false,
            ham: false
        }
    }

    componentWillMount() {
        let params = this.props.match.params.type.split('+');
        this.setState({type: params[0], param: params[1], mobile: document.documentElement.clientWidth <= 500 ? true : false})

        if (params[0] === 'list') {
            axios.get('/getSingleList/'+ params[1]).then( res => {
                this.setState({name: res.data.name, descrip: res.data.description, listid: res.data.id})
            })
            axios.get('/getAllLists').then(res => {
                this.setState({data: res.data})
            })
        } else if (params[0] === 'order') {
            axios.get('/orders').then(res => {
                this.setState({data: res.data, name: params[1]})
            })
            axios.get('/getAllLists').then(res => {
                this.setState({lists: res.data})
            })
        } else {
            axios.get('/domains').then(res => {
                this.setState({data: res.data, name: params[1]})
            })
            axios.get('/getAllLists').then(res => {
                this.setState({lists: res.data})
            })
        }
    }

    changeView = (newRoute) => {
        let {type} = this.state
        this.props.history.push(`/view/${type}+${newRoute}`)

        this.setState({param: newRoute, ham: this.state.ham ? false : true})

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

    setActive = (id, e) => {
        e.stopPropagation()
        if (id === this.state.active) {
            this.setState({active: null})
        } else {
            this.setState({active: id})
        }
    }

    openModel = (e) => {
        e.stopPropagation()
        this.setState({open: !this.state.open})
    }

    addSpell = (e, id) => {
        let {active} = this.state
        axios.post('/addSpell', {spellid: active, listid: id}).then( _ => {
            this.openModel(e)
        })
    }

    updateList = (id, name, descrip) => {
        let newInfo = _.cloneDeep(this.state.data).map(val => {
            if (val.id === id) {
                return {id, name, descrip}
            }
             return val
        })
        this.setState({name, descrip, data: newInfo}, _ => this.forceUpdate())
    }

    openHam = () => {
        this.setState({ham: !this.state.ham})
    }

    render() {
        let {param, data, name, descrip, type, lists, active, open, listid, mobile, ham} = this.state

        return (
            <div className="viewShell">
                <div className="viewBox viewBoxSidebar">
                    <Sidebar 
                        type={type}
                        data={data}
                        changeView={this.changeView}
                        param={param}
                        mobile={mobile}
                        ham={ham}
                        openHam={this.openHam}/>
                </div>
                <div className="viewBox viewBoxMain">
                    <MainView 
                        name={name}
                        descrip={descrip}
                        type={type}
                        param={param}
                        setActive={this.setActive}
                        active={active}
                        openModel={this.openModel}
                        deleteSpell={this.deleteSpell}
                        listid={listid}
                        redirect={this.props.history.push}
                        updateList={this.updateList}/>
                </div>

                <ListSelection 
                    lists={lists}
                    open={open}
                    openModel={this.openModel}
                    addSpell={this.addSpell}/>
            </div>
        )
    }
}