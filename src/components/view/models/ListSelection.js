import React from 'react'
import { isArray } from 'util';

export default function ListSelection({ lists, open, openModel, addSpell }) {

    if (!isArray(lists)) {
        return (
            <div>
            </div>
        )
    }

    let format = lists.map(val => {
        return (
            <div key={val.id} className="selectItem" onClick={e => addSpell(e, val.id)}>
                {val.name}
            </div>
        )
    })

    return (
        <div className={open ? "" : "hidden"}>
            <div className="overlay" onClick={e => openModel(e)}></div>
            <div className="selectionModal">
                <h1 className="selectionTitle">Select Which List:</h1>
                <div className="selectTray">
                    {format}
                </div>
            </div>
        </div>
    )
}