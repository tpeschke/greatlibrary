import React, { Component } from 'react'
import axios from 'axios'

export default class HeaderMain extends Component {
    constructor() {
        super()

        this.state = {
            name: 'hello',
            descrip: 'des',
            holdN: null,
            holdD: null,
            edit: false
        }
    }

    componentWillMount() {
        let { name, descrip } = this.props
        this.setState({ name, descrip })
    }

    componentWillReceiveProps(newProps) {
        let { name, descrip } = newProps
        this.setState({ name, descrip })
    }

    saveDetails = () => {
        let { holdN, holdD, name, descrip } = this.state
        let { listid, updateList } = this.props
        let n = holdN || name
        let description = holdD || descrip
        axios.patch('/updateListInfo', { name: n, description, id: listid }).then(res => {
            this.setState({ name: res.data[0].name, descrip: res.data[0].description, holdD: null, holdN: null, edit: false })
            updateList(listid, res.data[0].name, res.data[0].description)
        })
    }

    render() {
        let { name, descrip, edit } = this.state

        if (edit) {
            return (
                <div className="inputShell">
                    <input className="inputTitle" type="text" placeholder={name} onChange={e => this.setState({ holdN: e.target.value })} />
                    <input className="inputDescrip" type="text" placeholder={descrip} onChange={e => this.setState({ holdD: e.target.value })} />
                    <div className="inputButtons">
                        <button onClick={this.saveDetails}>Save Details</button>
                        <button className='deleteButton inputCancel' onClick={_ => this.setState({ edit: !edit, holdN: null, holdD: null })}>Cancel</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>{name}</h1>
                    <p className="headerDescrip">{descrip}</p>

                    <button className={this.props.type === 'list' ? 'listButton' : 'hidden'} onClick={_ => this.setState({ edit: !edit })}>Edit Details</button>
                </div>
            )
        }
    }
}