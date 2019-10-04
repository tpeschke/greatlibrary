import React, { Component } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import WarningModal from '../view/models/WarningModal'

export default class MyList extends Component {
    constructor() {
        super()

        this.state = {
            lists: 'loading',
            warning: false,
            title: 'Your Account Has Too Many Spell Lists',
            body: 'To add more spell lists, you need to increase your Patreon Tier'
        }
    }

    componentWillMount() {
        axios.get('/getAlllists').then(res => {
            this.setState({ lists: res.data })
        })
    }

    getList = (id) => {
        this.props.redirect('/view/list+' + id)
    }

    newList = (e) => {
        axios.post('/newList').then(res => {
        if (res.data === 'To add more spell lists, you need to increase your Patreon Tier') {
            this.openWarning(e)
        } else {
            this.props.redirect('/view/list+' + res.data[0].id)
        }
    })
}

openWarning = (e) => {
    e.stopPropagation()
    this.setState({ warning: !this.state.warning })
}

render() {
    let { lists, warning, body, title } = this.state

    if (typeof (lists) === 'string') {
        return (
            <div className="listShell">
                <div className="listInner">
                    <Loading />
                </div>
            </div>
        )
    }

    let listsFormat = lists.map(val => {
        return (
            <div key={val.id} className="listBox" onClick={_ => this.getList(val.id)}>
                <h4 className="listTitle">{val.name}</h4>
                <p className={val.description ? "listDescrip" : 'listNoDescrip'}>{val.description}</p>
            </div>
        )
    })

    return (
        <div className="listShell">
            <div className="listInner">
                {listsFormat}
            </div>
            <div className="listButton">
                <button id="listButton" onClick={this.newList}>New List</button>
            </div>

            <WarningModal 
                warning={warning}
                body={body}
                title={title}
                open={this.openWarning}/>
        </div>
    )
}
}