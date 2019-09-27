import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'
import Loading from '../Loading'

import SpellHolder from './SpellHolder'
import Header from './Header'

export default class MainView extends Component {
    constructor() {
        super()

        this.state = {
            spells: 'loading'
        }
    }

    componentWillMount() {
        let { type, param, redirect } = this.props
        console.log(type, param)
        axios.get('/by' + type + '/' + param).then(res => {
            if (res.data === 'no') {
                redirect('/')
            } else {
                this.setState({ spells: res.data })
            }
        })
    }

    componentWillReceiveProps(newProps) {
        let { type, param, redirect } = newProps
        axios.get('/by' + type + '/' + param).then(res => {
            if (res.data === 'no') {
                redirect('/')
            }
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
        let { name, descrip, setActive, active, openModel, openModModel, listid, updateList, type } = this.props

        if (typeof (this.state.spells) === 'string') {
            return (
                <div>
                    <div className="spellHolder">
                        <Loading />
                    </div>
                </div>
            )
        }
        
        let format = this.state.spells.map(val => {
            let { name, duration, aoe, components, positive, negative, base_cost, req, id, modmag, modaoe, modduration } = val

            return (
                <SpellHolder key={id}
                    name={name} id={id} duration={duration} aoe={aoe} base_cost={base_cost}
                    components={components} positive={positive} negative={negative} req={req}
                    setActive={setActive} active={active} deleteSpell={this.deleteSpell}
                    type={type} openModel={openModel} openModModel={openModModel} loggedIn={this.props.loggedIn}
                    modmag={modmag} modaoe={modaoe} modduration={modduration} />
            )
        })
        return (
            <div>
                <Header
                    name={name}
                    descrip={descrip}
                    listid={listid}
                    updateList={updateList}
                    type={type}
                    openModel={openModel}
                    setActive={setActive}
                    loggedIn={this.props.loggedIn} />

                <div className="spellHolder">
                    {format}
                </div>

                <button className={this.props.type === 'list' ? 'deleteButton' : 'hidden'} onClick={this.deleteList}>Delete List</button>
            </div>
        )
    }
}