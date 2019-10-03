import React from 'react'

export default function SpellHolder({ name, duration, aoe, components, positive, negative, base_cost, id, active, setActive, type, openModel, openModModel, deleteSpell, loggedIn, modmag, modaoe, modduration, invocationdie, effects }) {

    let buttonLabel = type === 'order' || type === 'list' ? "Spell": "Miracle";
    let positiveEffects = <div></div>
    let negativeEffects = <div></div>
    let miracleEffect = <div></div>

    if (positive) {
        positiveEffects = positive.map((val, i) => {
            return (
                <div className="holdIndividual" key={i}>
                    <p>{val}</p>
                </div>
            )
        })
        negativeEffects = negative.map((val, i) => {
            return (
                <div className="holdIndividual" key={i}>
                    <p>{val}</p>
                </div>
            )
        })
    } else {
        miracleEffect = effects.map((val, i) => {
            return (
                <div className="holdIndividual" key={i}>
                    <p>{val}</p>
                </div>
            )
        })
    }

    return (
        <div className="holdOuter" onClick={e => setActive(id, e)}>
            <div className="holdHeader" onClick={e => setActive(id, e)}>
                {name}

                <div className='baseCost'>
                    <p className={base_cost ? 'bold cost' : 'hidden'}>
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
                <div className={invocationdie ? '' : 'hidden'}>
                    <p className="bold">
                        Base Invocation Die:
                    </p>
                    {invocationdie}
                </div>
                <div className={components && components !== "none" ? '' : 'hidden'}>
                    <p className="bold">
                        Components:
                    </p>
                    {!components ? '' : components}
                </div>
            </div>
            <div className={id === active ? "holdEffects" : "holdEffects hidden"}>
                <div className={positive && positive.length > 0 ? '' : 'hidden'}>
                    <h4>Postive:</h4>
                    {positiveEffects}
                </div>
                <div className={negative && negative.length > 0 ? '' : 'hidden'}>
                    <h4>Negative:</h4>
                    {negativeEffects}
                </div>

                {miracleEffect}

                <div className="buttonShell">
                    <div className={type === "order" || type === "list" ? "holdButton" : "hidden"}>
                        <button className={type === "order" && loggedIn || type === "library" && loggedIn ? "" : "hidden"} onClick={e => openModel(e, 'single')}>Add To A List</button>
                        <button className={type === "order" && !loggedIn || type === "library" && !loggedIn ? "greyed" : "hidden"}>Add To A List</button>
                        <button className={type === "list" ? "deleteButton" : "hidden"} onClick={deleteSpell}>Remove from List</button>
                    </div>
                    <div className={type === "list" || type === "library" ? "hidden" : " holdButton"}>
                        <button className="modifyButton" onClick={e => openModModel(e, {name, duration, aoe, components, positive, negative, base_cost, effects, invocationdie})}>Modify {buttonLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
