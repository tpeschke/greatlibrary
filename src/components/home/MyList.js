import React, { Component } from 'react'
import axios from 'axios'

export default class MyList extends Component {
    constructor() {
        super()

        this.state = {
            lists: []
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
            this.props.redirect('/view/list+' + res.data[0].id)
        })
    }

    render() {
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