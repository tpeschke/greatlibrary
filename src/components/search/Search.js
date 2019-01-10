import React, { Component } from 'react'
import './search.css'
import SpellHolder from '../view/SpellHolder'
import ListSelection from '../view/ListSelection'
import Loading from '../Loading'
import axios from 'axios'

export default class Search extends Component {
    constructor() {
        super()

        this.state = {
            results: [],
            type: 'order',
            selected: false,
            active: null,
            loggedIn: false,
            open: false,
            lists: []
        }
    }

    componentWillMount() {
        axios.get('/checkLogin').then(res => {
            if (res.data === 'nope') { } else {
                this.setState({ loggedIn: true })
            }
        })
        axios.get('/getAllLists').then(res => {
            this.setState({lists: res.data})
        })
    }

    sendSearch = (search) => {
        let { type } = this.state
        this.setState({ results: 'loading' }, _ => {
            axios.get(`/search?type=${type}&search=${search}`).then(res => {
                this.setState({ results: res.data })
            })
        })
    }

    switchType = () => {
        let { selected, type } = this.state
        let newtype = type === 'order' ? 'domain' : 'order';
        this.setState({ selected: !selected, type: newtype, results: [] })
    }

    setActive = (id, e) => {
        e.stopPropagation()
        if (id === this.state.active) {
            this.setState({ active: null })
        } else {
            this.setState({ active: id })
        }
    }

    openModel = (e) => {
        e.stopPropagation()
        this.setState({open: !this.state.open})
    }

    addSpell = (e, id) => {
        let {active} = this.state
            axios.post('/addSpell', {spellid: active, listid: id}).then( _ => {
                this.openModel(e)
            })
    }

    render() {
        let { results, selected, active, type, lists, open, loggedIn } = this.state

        let format = Array.isArray(results) ? results.map(val => {
            let { name, duration, aoe, components, effects, req, id } = val
            return (
                <SpellHolder key={id}
                    name={name} id={id} duration={duration} aoe={aoe}
                    components={components} effects={effects} req={req}
                    setActive={this.setActive} active={active}
                    type={type} openModel={this.openModel} loggedIn={loggedIn} 
                />
            )
        }) : null;

        let show = results === 'loading' ? (
            <div>
                <div className="spellHolder">
                    <Loading />
                </div>
            </div>
        ) : (
                <div>
                    <p className="mobileP">Displaying {results.length} Results</p>
                    {format}
                </div>
            )

        return (
            <div className="searchShell">
                <div className="searchUpper">
                    <input type="text" placeholder="Ask the Ancient One" onChange={e => this.sendSearch(e.target.value)} />
                    <div className="searchSwitcher">
                        <p className="searchHead">Search</p>
                        <div className="switchShell" onClick={this.switchType}>
                            <div className={selected ? "switchSelector switchSelected" : 'switchSelector'}></div>
                            <div className="switchChoice">Miracles</div>
                            <div className="switchChoice">Spells</div>
                        </div>
                    </div>
                </div>
                <div className="searchLower">
                    {show}
                </div>

                <ListSelection 
                    lists={lists}
                    open={open}
                    openModel={this.openModel}
                    addSpell={this.addSpell}/>
            </div>
        )
    }
}