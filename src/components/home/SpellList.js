import React, { Component } from 'react'
import axios from 'axios'
import Loading from '../Loading'

export default class SpellList extends Component {
    constructor() {
        super()

        this.state = {
            orders: 'loading'
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
        if (typeof (this.state.orders) === 'string') {
            return (
                <div>
                    <h3>Spell List by Order</h3>
                    <div className="orderBox">
                        <Loading />
                    </div>
                </div>
            )
        }

        let orders = this.state.orders.map(val => {
            if (val.name !== "All") {
                return (
                    <div key={val.id} className="orderEach" onClick={_ => this.goToView(val.name)}>
                        <p>{val.name}</p>
                    </div>
                )
            }
        })

        return (
            <div>
                <h3>Spell List by Order</h3>
                <div className="orderBox">
                    <p className="orderEach all" onClick={_ => this.goToView("All")}>View All</p>
                    {orders}
                </div>
            </div>
        )
    }
}