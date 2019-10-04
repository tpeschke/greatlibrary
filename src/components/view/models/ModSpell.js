import React, { Component } from 'react'
import Loading from '../../Loading'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export default class ListSelection extends Component {
    constructor() {
        super()

        this.state = {
            modOpen: false,
            // SPELL OPTIONS
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
            magnitude: 1,
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
            ],
            // MIRACLE OPTIONS
            miracleName: null,
            areaOfEffect: [
                { label: 'Personal', value: '0' },
                { label: 'Personal (center)', value: '1' },
                { label: '2 People', value: '2' },
                { label: 'Add. Person (x3 per person)', value: '2' },
            ],
            areaOfEffectBaseIncrease: 0,
            areaOfEffectSpecial: null,
            areaOfEffectSelect: 'Personal',
            distance: [
                { label: 'Person', value: '0' },
                { label: 'Touch', value: '1' },
                { label: 'Earshot', value: '5' },
                { label: 'Eye Sight', value: '10' },
                { label: 'Same Continent', value: '20' },
                { label: 'Somewhere Else', value: '40' },
            ],
            distanceBaseIncrease: 0,
            distanceSelect: 'Person',
            delievery: [
                { label: '1d12 + 12 Hours', value: '0' },
                { label: '1d12 + 4', value: '1' },
                { label: '1d4 Hours', value: '2' },
                { label: '1d20 + 10 Minutes', value: '3' },
                { label: '1d10 Minutes', value: '4' },
                { label: '1d20 + 20 Seconds', value: '5' },
                { label: '1d20 Seconds', value: '6' },
                { label: 'Instanteous', value: '7' },
            ],
            delieveryBaseIncrease: 0,
            delieverySelect: '1d12 + 12 Hours',
            longevity: [
                { label: '1 Second', value: '0' },
                { label: '1d4 Seconds', value: '2' },
                { label: '1d20 + 4 Seconds', value: '4' },
                { label: '1d4 Minutes', value: '8' },
                { label: '1d10 + 4 Minutes', value: '16' },
                { label: '1d4 Hours', value: '32' },
                { label: '1d12 + 12 Hours', value: '48' },
            ],
            longevityBaseIncrease: 0,
            longevitySelect: '1 Second',
            strength: [
                { label: '+1', value: '0' },
                { label: '+2', value: '1' },
                { label: '+2 / Additional Point', value: '2' },
            ],
            strengthBaseIncrease: 0,
            strengthSpecial: null,
            strengthSelect: '+1'
        }
    }

    componentWillReceiveProps(next) {
        this.setState({ modOpen: next.modOpen }, _ => {
            if (next.spell && next.spell.base_cost) {
                let duration = next.spell.duration.split(' ')
                    , cost = +next.spell.base_cost
                    , radius = next.spell.aoe.split(' ')

                this.setState({
                    spellName: next.spell.name,
                    durationAmount: isNaN(+duration[0]) ? 1 : +duration[0],
                    durationUnit: duration[1],
                    baseCost: cost,
                    radiusAmount: +radius[0],
                    radiusUnit: radius[1]
                })
            } else if (next.spell) {
                this.setState({ miracleName: next.spell.name })
            }
        })
    }

    closeModal(e) {
        let { durationIncrease, durationAmount, durationUnit, radiusIncrease, radiusAmount, radiusUnit, rangeIncrease, magnitude, posBuyDown, negBuyDown, aoeType, baseCost, radiusRangeMultiplier } = this.state
        let spellPointTotal = ((magnitude + posBuyDown + negBuyDown) * baseCost) + radiusIncrease + Math.ceil((rangeIncrease) * radiusRangeMultiplier * baseCost) + (baseCost * (durationIncrease - 1))

        if (spellPointTotal !== 0) {
            // degree, 
            let degree = Math.ceil(spellPointTotal / 10)
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

            let modifiedSpell = Object.assign({}, { degree, pos, neg, aoe, duration })

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
                magnitude: 1,
                posBuyDown: 0,
                negBuyDown: 0,
                aoeType: "Full +0",
            })
        } else {
            this.closeModalWithNoSave(e)
        }
    }

    closeModalWithNoSave = (e) => {
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
            magnitude: 1,
            posBuyDown: 0,
            negBuyDown: 0,
            aoeType: "Full +0",
            miracleName: null,
            areaOfEffectBaseIncrease: 0,
            areaOfEffectSpecial: null,
            areaOfEffectSelect: 'Personal',
            distanceBaseIncrease: 0,
            distanceSelect: 'Person',
            delieveryBaseIncrease: 0,
            delieverySelect: '1d12 + 12 Hours',
            longevityBaseIncrease: 0,
            longevitySelect: '1 Second',
            strengthBaseIncrease: 0,
            strengthSpecial: null,
            strengthSelect: '+1'
        })
    }

    changeBuyDown = (value, type) => {
        if (value <= this.state.magnitude && value > -1 && type !== 'magnitude') {
            if (type === 'posBuyDown') {
                this.setState({ posBuyDown: value })
            } else if (type === 'negBuyDown') {
                this.setState({ negBuyDown: value })
            }
        } else if (type === 'magnitude' && value > 0) {
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

    changeMiracle = (e, type) => {
        this.setState({ [`${type}BaseIncrease`]: +e.value, [`${type}Select`]: e.label }, _ => {
            if (e.label === 'Add. Person (x3 per person)') {
                this.setState({ areaOfEffectSpecial: 2 })
            } else if (this.state.areaOfEffectSelect !== 'Add. Person (x3 per person)' && type !== 'strength') {
                this.setState({ areaOfEffectSpecial: null })
            } else if (e.label === '+2 / Additional Point') {
                this.setState({ strengthSpecial: 2 })
            } else if (this.state.strengthSelect !== '+2 / Additional Point') {
                this.setState({ strengthSpecial: null })
            }
        })
    }

    changeStrengthSpecial = (e) => {
        if (+e.target.value >= 2) {
            this.setState({ strengthSpecial: e.target.value })
        }
    }

    changeAreaOfEffectSpecial = (e) => {
        if (+e.target.value >= 3) {
            this.setState({ areaOfEffectSpecial: e.target.value })
        }
    }

    render() {
        let { loggedIn } = this.props

        if (!this.state.spellName && !this.state.miracleName) {
            return (<div className={this.state.modOpen ? "" : "hidden"}>
                <div className="overlay" onClick={e => this.closeModal(e)}></div>
                <div className="selectionModal modifyModal">
                    <Loading />
                </div>
            </div>)
        }

        if (this.state.baseCost) {
            return (
                <div className={this.state.modOpen ? "" : "hidden"}>
                    <div className="overlay modoverlay" onClick={e => this.closeModalWithNoSave(e)}></div>
                    <div className="selectionModal modifyModal">
                        <button className="modalCloseButton" onClick={e => this.closeModalWithNoSave(e)}>X</button>
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
                            <Dropdown options={this.state.options} value={this.state.aoeType} onChange={this.changeAoE} placeholder="Select an option" />

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
        } else {
            return (
                <div className={this.state.modOpen ? "" : "hidden"}>
                    <div className="overlay modoverlay" onClick={e => this.closeModalWithNoSave(e)}></div>
                    <div className="selectionModal modifyModal">
                        <button className="modalCloseButton" onClick={e => this.closeModalWithNoSave(e)}>X</button>
                        <h1 className="selectionTitle">Modify {this.state.miracleName}</h1>
                        <div className="modTray">
                            <h3>Area of Effect</h3>
                            <Dropdown options={this.state.areaOfEffect} value={this.state.areaOfEffectSelect} onChange={e => this.changeMiracle(e, 'areaOfEffect')} placeholder="Select an option" />
                            {this.state.areaOfEffectSpecial ? <input type="number" value={this.state.areaOfEffectSpecial} onChange={e => this.changeAreaOfEffectSpecial(e)} /> : null}

                            <h3>Distance</h3>
                            <Dropdown options={this.state.distance} value={this.state.distanceSelect} onChange={e => this.changeMiracle(e, 'distance')} placeholder="Select an option" />

                            <h3>Delievery Time</h3>
                            <Dropdown options={this.state.delievery} value={this.state.delieverySelect} onChange={e => this.changeMiracle(e, 'delievery')} placeholder="Select an option" />

                            <h3>Longevity</h3>
                            <Dropdown options={this.state.longevity} value={this.state.longevitySelect} onChange={e => this.changeMiracle(e, 'longevity')} placeholder="Select an option" />

                            <h3>Strength</h3>
                            <Dropdown options={this.state.strength} value={this.state.strengthSelect} onChange={e => this.changeMiracle(e, 'strength')} placeholder="Select an option" />
                            {this.state.strengthSpecial ? <input type="number" value={this.state.strengthSpecial} onChange={e => this.changeStrengthSpecial(e)} /> : null}

                            <h3 className="totalTitle">Total Points: {(this.state.areaOfEffectBaseIncrease * (this.state.areaOfEffectSpecial ? (this.state.areaOfEffectSpecial * 3 - 1) : 1)) + this.state.distanceBaseIncrease + this.state.delieveryBaseIncrease + this.state.longevityBaseIncrease + (this.state.strengthBaseIncrease * (this.state.strengthSpecial ? this.state.strengthSpecial : 1))}</h3>
                        </div>
                    </div>
                </div>
            )
        }
    }

}