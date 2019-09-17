import React, {Component} from 'react'

export default class ListSelection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modOpen: props.modOpen,
            spell: props.modOpen
        }
    }

    componentWillReceiveProps(next) {
        this.setState({modOpen: next.modOpen, spell: next.spell})
    }

    render() {

        if (!this.state.spell) {
            return <div></div>
        }
        
        return (
            <div className={this.state.modOpen ? "" : "hidden"}>
                <div className="overlay" onClick={e => this.props.openModModel(e)}></div>
                <div className="selectionModal modifyModal">
                    <h1 className="selectionTitle">Modify Spell</h1>
                    <div className="selectTray">
                        Step 1: Magnitude
    
                        Step 2: Alter Area of Effect
    
                        Step 3: Calculate Range
    
                        Step 4: Calcualde Duration
    
                        Total Spell Points
    
                        Add to List
                    </div>
                </div>
            </div>
        )
    }
}