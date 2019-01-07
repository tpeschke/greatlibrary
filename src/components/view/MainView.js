import React, { Component } from 'react'
import axios from 'axios'

import SpellHolder from './SpellHolder'

export default class MainView extends Component {
    constructor() {
        super()

        this.state = {
            spells: [],
            active: null
        }
    }

    componentWillMount() {
        let {type, param} = this.props
        axios.get('/by' + type + '/' + param).then( res => {
            this.setState({spells: res.data})
        })
    }

    componentWillReceiveProps(newProps) {
        let {type, param} = newProps
        axios.get('/by' + type + '/' + param).then( res => {
            this.setState({spells: res.data})
        })
    }

    setActive = (id) => {
        if (id === this.state.active) {
            this.setState({active: null})
        } else {
            this.setState({active: id})
        }
    }

    render() {
        let {name, descrip} = this.props

        let format = this.state.spells.map(val => {
            let {name, duration, aoe, components, effects, req, id} = val
            return (
                <SpellHolder key={id} 
                    name={name} id={id} duration={duration} aoe={aoe} 
                    components={components} effects={effects} req={req}
                    setActive={this.setActive} active={this.state.active}
                    type={this.props.type}/>
            )
        })

        return (
            <div>
                <div>
                    {name}
                    {descrip}
                </div>
                <div className="spellHolder">
                    {format}
                </div>
            </div>
        )
    }
}