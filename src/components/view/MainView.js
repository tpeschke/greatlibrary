import React, { Component } from 'react'
import axios from 'axios'

export default class MainView extends Component {
    constructor() {
        super()

        this.state = {
            spells: []
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

    render() {
        let {name, descrip} = this.props

        let format = this.state.spells.map(val => {
            return (
                <div key={val.id}>
                    {val.name}
                </div>
            )
        })

        return (
            <div>
                <div>
                    {name}
                    {descrip}
                </div>
                <div>
                    {format}
                </div>
            </div>
        )
    }
}