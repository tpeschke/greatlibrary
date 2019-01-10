import React, { Component } from 'react'
import axios from 'axios'
import Loading from '../Loading'

export default class MyList extends Component {
    constructor() {
        super()

        this.state = {
            lists: 'loading',
            warning: false
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
            if (res.data === 'too many lists') {
                this.openWarning(e)
            } else {
                this.props.redirect('/view/list+' + res.data[0].id)
            }
        })
    }

    openWarning = (e) => {
        e.stopPropagation()
        this.setState({warning: !this.state.warning})
    }

    render() {
        let {lists, warning} = this.state

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

                <div className={warning ? "" : "hidden"}>
                    <div className="overlay" onClick={this.openWarning}></div>
                    <div className="selectionModal">
                        <h1 className="warningTitle">Your Account Has Too Many Lists</h1>
                        <div className="warningTray">
                                You'll need to delete one of your other lists
                                or upgrade your Account Membership
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}