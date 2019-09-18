import React, { Component } from 'react'

export default class ListSelection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modOpen: props.modOpen,
            spell: props.modOpen
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ modOpen: next.modOpen, spell: next.spell })
    }

    render() {
        let {loggedIn, openModModel} = this.props

        if (!this.state.spell) {
            return <div></div>
        }

        return (
            <div className={this.state.modOpen ? "" : "hidden"}>
                <div className="overlay" onClick={e => openModModel(e)}></div>
                <div className="selectionModal modifyModal">
                    <h1 className="selectionTitle">Modify Spell</h1>
                    <div className="modTray">
                        <h3>Step 1: Magnitude</h3>
                        <h3>Step 2: Alter Area of Effect</h3>
                        <h3>Step 3: Calculate Range</h3>
                        <h3>Step 4: Calculate Duration</h3>
                        <h3>Total Spell Points</h3>
                        <div className="holdButton">
                            <button className={loggedIn ? "" : "hidden"} onClick={e => openModModel(e)}>Add To A List</button>
                            <button className={!loggedIn ? "greyed" : "hidden"}>Add To A List</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}