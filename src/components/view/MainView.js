import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

import SpellHolder from './SpellHolder'
import Header from './Header'

export default class MainView extends Component {
    constructor() {
        super()

        this.state = {
            spells: []
        }
    }

    componentWillMount() {
        let { type, param } = this.props
        axios.get('/by' + type + '/' + param).then(res => {
            this.setState({ spells: res.data })
        })
    }

    componentWillReceiveProps(newProps) {
        let { type, param } = newProps
        axios.get('/by' + type + '/' + param).then(res => {
            this.setState({ spells: res.data })
        })
    }

    deleteSpell = () => {
        let { listid, active } = this.props
        axios.delete(`/deleteSpell?spellid=${active}&listid=${listid}`).then(res => {
            let newSpells = _.cloneDeep(this.state.spells).filter(v => v.id !== active)
            this.setState({ spells: newSpells })
        })
    }

    deleteList = () => {
        let { listid, redirect } = this.props
        axios.delete(`/deleteList/${listid}`).then(res => {
            redirect('/')
        })
    }

    render() {
        let { name, descrip, setActive, active, openModel, listid, updateList } = this.props

        let format = this.state.spells.map(val => {
            let { name, duration, aoe, components, effects, req, id } = val
            return (
                <SpellHolder key={id}
                    name={name} id={id} duration={duration} aoe={aoe} listid={listid}
                    components={components} effects={effects} req={req}
                    setActive={setActive} active={active} deleteSpell={this.deleteSpell}
                    type={this.props.type} openModel={openModel} />
            )
        })
        return (
            <div>
                <Header
                    name={name}
                    descrip={descrip}
                    listid={listid}
                    updateList={updateList} />

                <div className="spellHolder">
                    {format}
                </div>

                <button onClick={this.deleteList}>Delete List</button>
            </div>
        )
    }
}