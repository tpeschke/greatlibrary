import React from 'react'

export default function SpellHolder({ name, duration, aoe, components, effects, req, id, active, setActive, type, openModel, deleteSpell }) {

    let eff = effects.map((val, i) => {
        return (
            <div className="holdIndividual" key={i}>
                <p>{val}</p>
            </div>
        )
    })

    return (
        <div className="holdOuter" onClick={e=>setActive(id, e)}>
            <div className="holdHeader" onClick={e=>setActive(id, e)}>
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
                    <button className={type === "list" ? "" : "hidden"} onClick={deleteSpell}>Remove from List</button>
                </div>
            </div>
        </div>
    )
}