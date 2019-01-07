import React, { Component } from 'react'
import axios from 'axios'

export default class SpellList extends Component {
    constructor() {
        super()

        this.state = {
            orders: []
        }
    }

    componentWillMount() {
        axios.get('/orders').then(res => {
            this.setState({ orders: res.data })
        })
    }

    goToView = (order) => {
        this.props.redirect('/view/order+' + order)
    }

    render() {
        let orders = this.state.orders.map(val => {
            if(val.name !== "All") {
                return (
                    <div key={val.id} className="orderEach" onClick={_=>this.goToView(val.name)}>
                        <p>{val.name}</p>
                    </div>
                )
            }
        })

        return (
            <div>
                SpellList
                <p className="orderEach all" onClick={_=>this.goToView("All")}>View All</p>
                <div className="orderBox">
                    {orders}
                </div>
            </div>
        )
    }
}