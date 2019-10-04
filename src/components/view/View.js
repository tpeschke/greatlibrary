import React, { Component } from 'react'
import _ from "lodash"
import axios from 'axios'
import './view.css'

import Sidebar from './Sidebar'
import MainView from './MainView'
import ListSelection from './models/ListSelection'
import ModSpell from './models/ModSpell'
import WarningModal from './models/WarningModal'

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
            modOpen: false,
            spell: null,
            ham: false,
            addType: null,
            loggedIn: false,
            modifiedSpell: {},
            warning: false,
            title: 'This List Has Too Many Spells',
            body: 'To add more spells to this spell list, you need to increase your Patreon Tier'
        }
    }

    componentWillMount() {
        let params = this.props.match.params.type.split('+');
        this.setState({ type: params[0], param: params[1]})

        if (!this.state.loggedIn) {
            axios.get('/checkLogin').then(res => {
                this.setState({ loggedIn: res.data })
            })
        }

        if (params[0] === 'list') {
            axios.get('/getSingleList/' + params[1]).then(res => {
                this.setState({ name: res.data.name, descrip: res.data.description, listid: res.data.id })
            })
            axios.get('/getAllLists').then(res => {
                this.setState({ data: res.data })
            })
        } else if (params[0] === 'order') {
            axios.get('/orders').then(res => {
                this.setState({ data: res.data, name: params[1] })
            })
            axios.get('/getAllLists').then(res => {
                this.setState({ lists: res.data })
            })
        } else if (params[0] === 'library') {
            axios.get('/degrees').then(res => {
                this.setState({ data: res.data, name: params[1] })
            })
            axios.get('/getAllLists').then(res => {
                this.setState({ lists: res.data })
            })
        } else {
            axios.get('/domains').then(res => {
                this.setState({ data: res.data, name: params[1] })
            })
            axios.get('/getAllLists').then(res => {
                this.setState({ lists: res.data })
            })
        }
    }

    changeView = (newRoute) => {
        let { type } = this.state
        this.props.history.push(`/view/${type}+${newRoute}`)
        this.setState({ param: newRoute, ham: this.state.ham ? false : true })

        if (type === 'list') {
            axios.get('/getSingleList/' + newRoute).then(res => {
                this.setState({ name: res.data.name, descrip: res.data.description })
            })
            axios.get('/getAllLists').then(res => {
                this.setState({ data: res.data })
            })
        } else if (type === 'order') {
            axios.get('/orders').then(res => {
                this.setState({ data: res.data, name: newRoute })
            })
        } else if (type === 'library') {

        } else {
            axios.get('/domains').then(res => {
                this.setState({ data: res.data, name: newRoute })
            })
        }
    }

    setActive = (id, e) => {
        e.stopPropagation()
        if (id === this.state.active) {
            this.setState({ active: null })
        } else {
            this.setState({ active: id })
        }
    }

    openModel = (e, addType, modSpell) => {
        e.stopPropagation()
        if (modSpell) {
            this.setState({ open: !this.state.open, addType, modifiedSpell: modSpell })
        } else {
            this.setState({ open: !this.state.open, addType })
        }
    }

    openModModel = (e, spell) => {
        e.stopPropagation()
        this.setState({ modOpen: !this.state.modOpen, spell })
    }

    addSpell = (e, id) => {
        let { active, addType, modifiedSpell } = this.state
        if (addType === 'all') {
            axios.post(`/addAllSpells`, { type: active, listid: id }).then(res => {
                if (res.data === 'To add more spells to this spell list, you need to increase your Patreon Tier') {
                    this.openWarning(e)
                } else {
                    this.openModel(e)
                }
            })
        } else if (addType === 'single') {
            axios.post('/addSpell', { spellid: active, listid: id, ...modifiedSpell }).then(res => {
                if (res.data === 'To add more spells to this spell list, you need to increase your Patreon Tier') {
                    this.openWarning(e)
                } else {
                    this.openModel(e)
                }
            })
        }
    }

    openWarning = (e) => {
        e.stopPropagation()
        this.setState({ warning: !this.state.warning })
    }

    updateList = (id, name, descrip) => {
        let newInfo = _.cloneDeep(this.state.data).map(val => {
            if (val.id === id) {
                return { id, name, descrip }
            }
            return val
        })
        this.setState({ name, descrip, data: newInfo }, _ => this.forceUpdate())
    }

    openHam = () => {
        this.setState({ ham: !this.state.ham })
    }

    render() {
        let { param, data, name, descrip, type, lists, active, open, listid, ham, modOpen, spell, loggedIn, warning, body, title } = this.state

        return (
            <div className="viewShell">
                <div className="viewBox viewBoxSidebar">
                    <Sidebar
                        type={type}
                        data={data}
                        changeView={this.changeView}
                        param={param}
                        ham={ham}
                        openHam={this.openHam}
                        match={this.props.match}
                        history={this.props.history} />
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
                        openModModel={this.openModModel}
                        deleteSpell={this.deleteSpell}
                        listid={listid}
                        redirect={this.props.history.push}
                        updateList={this.updateList}
                        loggedIn={loggedIn} />
                </div>

                <ListSelection
                    lists={lists}
                    open={open}
                    openModel={this.openModel}
                    addSpell={this.addSpell} />

                <ModSpell 
                   modOpen={modOpen}
                   openModModel={this.openModModel}
                   openModel={this.openModel}
                   spell={spell}
                   loggedIn={loggedIn} />

                <WarningModal 
                    body={body}
                    title={title}
                    warning={warning}
                    open={this.openWarning}/>
            </div>
        )
    }
}