import React from 'react'

export default function SpellHolder({ name, duration, aoe, components, positive, negative, base_cost, req, id, active, setActive, type, openModel, openModModel, deleteSpell, loggedIn, modmag, modaoe, modduration }) {

    let positiveEffects = positive.map((val, i) => {
        return (
            <div className="holdIndividual" key={i}>
                <p>{val}</p>
            </div>
        )
    })
    let negativeEffects = negative.map((val, i) => {
        return (
            <div className="holdIndividual" key={i}>
                <p>{val}</p>
            </div>
        )
    })

    return (
        <div className="holdOuter" onClick={e => setActive(id, e)}>
            <div className="holdHeader" onClick={e => setActive(id, e)}>
                {name}

                <div className='baseCost'>
                    <p className="bold cost">
                        {modmag ? `Degree: ${modmag}` : `Base Cost: ${base_cost}`}
                    </p>
                </div>
            </div>
            <div className="holddetails">
                <div className={duration ? '' : 'hidden'}>
                    <p className="bold">
                        Duration:
                    </p>
                    {modduration ? modduration : duration}
                </div>
                <div className={aoe ? '' : 'hidden'}>
                    <p className="bold">
                        Radius:
                    </p>
                    {modaoe ? modaoe : aoe}
                </div>
                <div className={req && req !== "none" ? '' : 'hidden'}>
                    <p className="bold">
                        Requirement:
                    </p>
                    {req}
                </div>
                <div className={components && components !== "none" ? '' : 'hidden'}>
                    <p className="bold">
                        Components:
                    </p>
                    {!components ? '' : components}
                </div>
            </div>
            <div className={id === active ? "holdEffects" : "holdEffects hidden"}>
                <div className={positive.length > 0 ? '' : 'hidden'}>
                    <h4>Postive:</h4>
                    {positiveEffects}
                </div>
                <div className={negative.length > 0 ? '' : 'hidden'}>
                    <h4>Negative:</h4>
                    {negativeEffects}
                </div>

                <div className="buttonShell">
                    <div className="holdButton">
                        <button className={type === "order" && loggedIn || type === "library" && loggedIn ? "" : "hidden"} onClick={e => openModel(e, 'single')}>Add To A List</button>
                        <button className={type === "order" && !loggedIn || type === "library" && !loggedIn ? "greyed" : "hidden"}>Add To A List</button>
                        <button className={type === "list" ? "deleteButton" : "hidden"} onClick={deleteSpell}>Remove from List</button>
                    </div>
                    <div className={type === "list" || type === "library" ? "hidden" : " holdButton"}>
                        <button className="modifyButton" onClick={e => openModModel(e, {name, duration, aoe, components, positive, negative, base_cost})}>Modify Spell</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
