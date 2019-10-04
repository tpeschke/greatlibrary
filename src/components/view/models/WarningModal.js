import React from 'react'

export default function WarningModal({ warning, title, body, open }) {

    return (
        <div className={warning ? "" : "hidden"}>
            <div className="overlay" onClick={open}></div>
            <div className="selectionModal">
                <h1 className="warningTitle">{title}</h1>
                <div className="warningTray">
                    {body}
                </div>
            </div>
        </div>
    )
}