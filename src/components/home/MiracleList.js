import React, {Component} from 'react'
import axios from 'axios'
import Loading from '../Loading'

export default class MiracleList extends Component {
    constructor() {
        super()

        this.state = {
            domains: 'loading'
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
        if (typeof(this.state.domains) === 'string') {
            return (
                <div className="miracleBox">
                <h3>Miracle List by Domain</h3>
                <div className="orderBox">
                    <Loading />
                </div>
            </div>
            )
        } 


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
            <div className="miracleBox">
                <h3>Miracle List by Domain</h3>
                <div className="orderBox">
                <p className="orderEach all" onClick={_=>this.goToView("All")}>View All</p>
                    {domains}
                </div>
            </div>
        )
    }
}