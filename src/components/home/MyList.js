import React, { Component } from 'react'
import axios from 'axios'
import Loading from '../Loading'

export default class MyList extends Component {
    constructor() {
        super()

        this.state = {
            lists: 'loading'
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

    newList = () => {
        axios.post('/newList').then( res => {
            if (res.status === 401) {

            } else {
                this.props.redirect('/view/list+' + res.data[0].id)
            }
        })
    }

    render() {

        if (typeof(this.state.lists) === 'string') {
            return (
                <div className="listShell">
                <div className="listInner">
                    <Loading />
                </div>
            </div>
            )
        }

        let lists = this.state.lists.map(val => {
            return (
                <div key={val.id} className="listBox" onClick={_=>this.getList(val.id)}>
                    <h4 className="listTitle">{val.name}</h4>
                    <p className={val.description ? "listDescrip" : 'listNoDescrip'}>{val.description}</p>
                </div>
            )
        })

        return (
            <div className="listShell">
                <div className="listInner">
                    {lists}
                </div>
                <div className="listButton">
                    <button id="listButton" onClick={this.newList}>New List</button>
                </div>
            </div>
        )
    }
}