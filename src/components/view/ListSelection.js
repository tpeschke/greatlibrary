import React from 'react'

export default function ListSelection({ lists, open, openModel, addSpell }) {

    let format = lists.map(val => {
        return (
            <div key={val.id} className="selectItem" onClick={e=>addSpell(e, val.id)}>
                {val.name}
            </div>
        )
    })

    return (
        <div className={open ? "" : "hidden"}>
            <div className="overlay" onClick={e=>openModel(e)}></div>
            <div className="selectionModal">
                Select Which List:
            <div className="selectTray">
                    {format}
                </div>
            </div>
        </div>
    )
}