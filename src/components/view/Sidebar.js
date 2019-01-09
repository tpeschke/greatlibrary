import React from 'react'
import Loading from '../Loading'

export default function Sidebar({ type, data, changeView, param, mobile, ham, openHam }) {
    if (typeof (data) === 'string' && !mobile) {
        return (
            <div className="sidebarShell">
                <div className="sidebarLoader">
                    <Loading />
                </div>
            </div>
        )
    } else if (typeof (data) === 'string') {
        return (
            <div className="sidebarShell"></div>
        )
    }

    let format = data.map(val => {
        if (val.name === param) {
            return (
                <div key={val.id} className="sidebarSelection sidebarSelected">
                    <p className="sidebarItem">{val.name}</p>
                </div>
            )
        }
        return (
            <div key={val.id} className="sidebarSelection" onClick={_ => type === "list" ? changeView(val.id) : changeView(val.name)}>
                <p className="sidebarItem">{val.name}</p>
            </div>
        )
    })

    if (mobile) {
        return (
            <div className="hamShell">
                <div className={ham ? "hamOverlay" : 'hidden'}>
                    <p className="exit" onClick={openHam}>X</p>
                    <div className="hamHolder">
                        {format}
                    </div>
                </div>
                <div className="outerHam" onClick={openHam}>
                    <div className="innerHam"></div>
                    <div className="innerHam"></div>
                    <div className="innerHam"></div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="sidebarShell">
                {format}
            </div>
        )
    }
}