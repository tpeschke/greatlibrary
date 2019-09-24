import React, { Component } from 'react'
import Loading from '../../Loading'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import axios from 'axios'

export default class ListSelection extends Component {
    constructor() {
        super()

        this.state = {
            modOpen: false,
            spellName: null,
            durationAmount: null,
            durationUnit: null,
            baseCost: null,
            radiusAmount: null,
            radiusUnit: null,
            durationIncrease: 1,
            radiusIncrease: 0,
            rangeIncrease: 0,
            radiusRangeMultiplier: 2,
            magnitude: 0,
            posBuyDown: 0,
            negBuyDown: 0,
            aoeType: "Full +0",
            options: [
                { label: 'Full +0', value: '0' },
                {
                    type: 'group', name: 'Half +2', items: [
                        { label: 'Zone +2', value: '02' },
                        { label: 'Ray +2', value: '002' },
                        { label: 'Cone +2', value: '0002' },
                        { label: 'Sphere +2', value: '00002' },
                        { label: 'Wall +2', value: '000002' },
                    ]
                },
                {
                    type: 'group', name: 'Individual +3', items: [
                        { label: 'Personal +3', value: '03' },
                        { label: 'Touch +3', value: '003' },
                        { label: 'Chain +3', value: '0003' },
                        { label: 'Target +3', value: '00003' },
                    ]
                },
            ]
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ modOpen: next.modOpen }, _ => {
            if (next.spell) {
                let duration = next.spell.duration.split(' ')
                    , cost = +next.spell.base_cost
                    , radius = next.spell.aoe.split(' ')

                this.setState({
                    spellName: next.spell.name,
                    durationAmount: +duration[0],
                    durationUnit: duration[1],
                    baseCost: cost,
                    radiusAmount: +radius[0],
                    radiusUnit: radius[1]
                })
            }
        })
    }

    closeModal(e) {
        let { durationIncrease, durationAmount, durationUnit, radiusIncrease, radiusAmount, radiusUnit, rangeIncrease, magnitude, posBuyDown, negBuyDown, aoeType, baseCost, radiusRangeMultiplier } = this.state
        let spellPointTotal = ((magnitude + posBuyDown + negBuyDown) * baseCost) + radiusIncrease + Math.ceil((rangeIncrease) * radiusRangeMultiplier * baseCost) + (baseCost * (durationIncrease - 1))

        if (spellPointTotal % 10 === 0 && spellPointTotal !== 0) {
            // degree, 
            let degree = Math.floor(spellPointTotal / 10)
            // pos, 
            let pos = magnitude - posBuyDown
            // neg
            let neg = magnitude - negBuyDown
            // aoe & range, 
            let aoe = ''
            if (aoeType === 'Full +0') {
                aoe = `A ${(radiusIncrease + 1) * radiusAmount} ${radiusUnit} radius`
                if (rangeIncrease > 0) {
                    aoe = aoe + ` centered ${radiusAmount * (rangeIncrease + 1)} ${radiusUnit} from caster`
                } else {
                    aoe = aoe + ' around the caster'
                }
            } else if (aoeType === 'Zone +2') {
                aoe = `A ${(radiusIncrease * radiusAmount) / 2} ${radiusUnit} radius`
                if (rangeIncrease > 0) {
                    aoe = aoe + ` centered ${radiusAmount * rangeIncrease} ${radiusUnit} from caster`
                } else {
                    aoe = aoe + ' around the caster'
                }
            } else if (aoeType === 'Ray +2') {
                aoe = `A ${(radiusIncrease * radiusAmount)} ${radiusUnit} long ray`
                if (rangeIncrease > 0) {
                    aoe = aoe + ` originating ${radiusAmount * rangeIncrease} ${radiusUnit} from caster`
                } else {
                    aoe = aoe + ' originating from the caster'
                }
            } else if (aoeType === 'Cone +2') {
                aoe = `A ${(radiusIncrease * radiusAmount)} ${radiusUnit} long cone, extend in a 90 arch`
                if (rangeIncrease > 0) {
                    aoe = aoe + ` originating ${radiusAmount * rangeIncrease} ${radiusUnit} from the caster`
                } else {
                    aoe = aoe + ' originating from the caster'
                }
            } else if (aoeType === 'Sphere +2') {
                aoe = `A 1 ft sphere originating within a ${(radiusIncrease * radiusAmount)} ${radiusUnit} radius`
                if (rangeIncrease > 0) {
                    aoe = aoe + ` ${radiusAmount * rangeIncrease} ${radiusUnit} from the caster`
                } else {
                    aoe = aoe + ' around the caster'
                }
            } else if (aoeType === 'Wall +2') {
                aoe = `A ${(radiusIncrease * radiusAmount)} ${radiusUnit} long wall`
                if (rangeIncrease > 0) {
                    aoe = aoe + ` originating ${radiusAmount * rangeIncrease} ${radiusUnit} from caster`
                } else {
                    aoe = aoe + ' originating from the caster'
                }
            } else if (aoeType === 'Personal +3') {
                aoe = `This only affects the caster`
            } else if (aoeType === 'Touch +3') {
                aoe = `One person the caster touches`
            } else if (aoeType === 'Chain +3') {
                aoe = `A chained spell with a jump radius of ${(radiusIncrease * radiusAmount)} ${radiusUnit}`
                if (rangeIncrease > 0) {
                    aoe = aoe + ` originating ${radiusAmount * rangeIncrease} ${radiusUnit} from caster`
                } else {
                    aoe = aoe + ' originating from the caster'
                }
            } else if (aoeType === 'Target +3') {
                aoe = `One person within sight`
            }
            // duration, 
            let duration = `${durationIncrease * durationAmount} ${durationUnit}`

            let modifiedSpell = Object.assign({}, {degree, pos, neg, aoe, duration})

            this.props.openModel(e, 'single', modifiedSpell)
            this.props.openModModel(e)
            this.setState({
                spellName: null,
                durationAmount: null,
                durationUnit: null,
                baseCost: null,
                radiusAmount: null,
                radiusUnit: null,
                durationIncrease: 1,
                radiusIncrease: 0,
                rangeIncrease: 0,
                radiusRangeMultiplier: 2,
                magnitude: 0,
                posBuyDown: 0,
                negBuyDown: 0,
                aoeType: "Full +0",
            })
        } else {
            // put warning toast here
        }

    }

    changeBuyDown = (value, type) => {
        if (value <= this.state.magnitude && value > -1 && type !== 'magnitude') {
            if (type === 'posBuyDown') {
                this.setState({ posBuyDown: value })
            } else if (type === 'negBuyDown') {
                this.setState({ negBuyDown: value })
            }
        } else if (type === 'magnitude' && value > -1) {
            this.setState({ magnitude: value }, _ => {
                if (value < this.state.posBuyDown) {
                    this.setState({ posBuyDown: value })
                }
                if (value < this.state.negBuyDown) {
                    this.setState({ negBuyDown: value })
                }
            })
        }
    }

    changeAoE = (e) => {
        let rangeMultiplier = 0;
        if (+e.value === 0) {
            rangeMultiplier = 2;
        } else if (+e.value === 2) {
            rangeMultiplier = 1
        } else if (+e.value === 3) {
            rangeMultiplier = .5
        }
        this.setState({ radiusIncrease: +e.value, radiusRangeMultiplier: rangeMultiplier, aoeType: e.label })
    }

    changeRange = (e) => {
        if (e > -1) {
            this.setState({ rangeIncrease: e })
        }
    }

    changeDuration = (e) => {
        if (e > 0) {
            this.setState({ durationIncrease: e })
        }
    }

    render() {
        let { loggedIn } = this.props

        if (!this.state.spellName) {
            return (<div className={this.state.modOpen ? "" : "hidden"}>
                <div className="overlay" onClick={e => this.closeModal(e)}></div>
                <div className="selectionModal modifyModal">
                    <Loading />
                </div>
            </div>)
        }

        return (
            <div className={this.state.modOpen ? "" : "hidden"}>
                <div className="overlay modoverlay" onClick={e => this.props.openModModel(e)}></div>
                <div className="selectionModal modifyModal">
                    <h1 className="selectionTitle">Modify {this.state.spellName}</h1>
                    <div className="modTray">
                        <h3>Step 1: Magnitude</h3>
                        <div>
                            <div className="flexbox">
                                <p>Base Magnitude: </p>
                                <input type="number" value={this.state.magnitude} onChange={e => this.changeBuyDown(+e.target.value, 'magnitude')} />
                            </div>
                            <div className="flexbox">
                                <div>
                                    <p>Positive Buy Down: </p>
                                    <input type="number" value={this.state.posBuyDown} onChange={e => this.changeBuyDown(+e.target.value, 'posBuyDown')} />
                                </div>
                                <div>
                                    <p>Negative Buy Down: </p>
                                    <input type="number" value={this.state.negBuyDown} onChange={e => this.changeBuyDown(+e.target.value, 'negBuyDown')} />
                                </div>
                            </div>
                        </div>

                        <h3>Step 2: Alter Area of Effect</h3>
                        <Dropdown options={this.state.options} value={this.state.options[0]} onChange={this.changeAoE} placeholder="Select an option" />

                        <h3>Step 3: Calculate Range</h3>
                        Move it {this.state.radiusAmount} * <input type="number" className="rangeInput" value={this.state.rangeIncrease} onChange={e => this.changeRange(e.target.value)} /> ( {this.state.radiusAmount * this.state.rangeIncrease} ) {this.state.radiusUnit} away from caster

                        <h3>Step 4: Calculate Duration</h3>
                        {this.state.durationAmount} * <input type="number" className="rangeInput" value={this.state.durationIncrease} onChange={e => this.changeDuration(e.target.value)} /> ( {this.state.durationAmount * (this.state.durationIncrease)} ) {this.state.durationUnit}

                        <h3 className="totalTitle">Total Spell Points: {((this.state.magnitude + this.state.posBuyDown + this.state.negBuyDown) * this.state.baseCost) + this.state.radiusIncrease + Math.ceil((this.state.rangeIncrease) * this.state.radiusRangeMultiplier * this.state.baseCost) + (this.state.baseCost * (this.state.durationIncrease - 1))}</h3>
                        <div className="holdButton">
                            <button className={loggedIn ? "" : "hidden"} onClick={e => this.closeModal(e)}>Add To A List</button>
                            <button className={!loggedIn ? "greyed" : "hidden"}>Add To A List</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}