import React, {Component} from 'react'
import axios from 'axios'

export default class MiracleList extends Component {
    constructor() {
        super()

        this.state = {
            domains: []
        }
    }

    componentWillMount() {
        axios.get('/domains').then(res => {
            this.setState({ domains: res.data })
        })
    }

    goToView = (domain) => {
        this.props.redirect('/view/domain+' + domain)
    }

    render() {
        let domains = this.state.domains.map(val => {
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
                <h3>Miracle List</h3>
                <div className="orderBox">
                <p className="orderEach all" onClick={_=>this.goToView("All")}>View All</p>
                    {domains}
                </div>
            </div>
        )
    }
}