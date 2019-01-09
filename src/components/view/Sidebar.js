import React from 'react'
import Loading from '../Loading'

export default function Sidebar({ type, data, changeView, param }) {
    if (typeof (data) === 'string') {
        return (
            <div className="sidebarShell">
                <div className="sidebarLoader">
                    <Loading />
                </div>
            </div>
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

    return (
        <div className="sidebarShell">
            {format}
        </div>
    )
}