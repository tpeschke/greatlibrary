import React from 'react'

export default function SpellHolder({ name, duration, aoe, components, effects, req, id, active, setActive, type, openModel }) {

    let eff = effects.map(val => {
        return (
            <div className="holdIndividual">
                <p>{val}</p>
            </div>
        )
    })
    return (
        <div className="holdOuter">
            <div className="holdHeader" onClick={_=>setActive(id)}>
                {name}
            </div>
            <div className="holddetails">
                <div className={duration ? '' : 'hidden'}>
                    Duration: {duration}
                </div>
                <div className={aoe ? '' : 'hidden'}>
                    Area of Effects: {aoe}
                </div>
                <div className={components && components !== "None" ? '' : 'hidden'}>
                    Components: {components}
                </div>
                <div className={req && req !== "none" ? '' : 'hidden'}>
                    Req: {req}
                </div>
            </div>
            <div className={id == active ? "holdEffects" : "holdEffects hidden"}>
                {eff}

                <div className="holdButton">
                    <button className={type !== "list" ? "" : "hidden"} onClick={openModel}>Add To A List</button>
                    <button className={type === "list" ? "" : "hidden"}>Remove from List</button>
                </div>
            </div>
        </div>
    )
}