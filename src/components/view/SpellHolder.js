import React from 'react'

export default function SpellHolder({ name, duration, aoe, components, effects, req, id, active, setActive, type, openModel, deleteSpell, loggedIn }) {

    let eff = effects.map((val, i) => {
        return (
            <div className="holdIndividual" key={i}>
                <p>{val.replace(/&rsquo;/g, "'")}</p>
            </div>
        )
    })

    return (
        <div className="holdOuter" onClick={e => setActive(id, e)}>
            <div className="holdHeader" onClick={e => setActive(id, e)}>
                {name.replace(/&rsquo;/g, "'")}
            </div>
            <div className="holddetails">
                <div className={duration ? '' : 'hidden'}>
                    <p className="bold">
                        Duration:
                    </p>
                    {duration}
                </div>
                <div className={aoe ? '' : 'hidden'}>
                    <p className="bold">
                        Area of Effects:
                    </p>
                    {aoe}
                </div>
                <div className={components && components !== "None" ? '' : 'hidden'}>
                    <p className="bold">
                        Components:
                    </p>
                    {components}
                </div>
                <div className={req && req !== "none" ? '' : 'hidden'}>
                    <p className="bold">
                        Requirement: 
                    </p>
                    {req}
                </div>
            </div>
            <div className={id === active ? "holdEffects" : "holdEffects hidden"}>
                {eff}

                <div className="holdButton">
                    <button className={type !== "list" && loggedIn ? "" : "hidden"} onClick={e=>openModel(e,'single')}>Add To A List</button>
                    <button className={type !== "list" && !loggedIn ? "greyed" : "hidden"}>Add To A List</button>
                    <button className={type === "list" ? "deleteButton" : "hidden"} onClick={deleteSpell}>Remove from List</button>
                </div>
            </div>
        </div>
    )
}