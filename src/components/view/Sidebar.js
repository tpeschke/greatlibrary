import React from 'react'

export default function Sidebar ({type, data, changeView}) {

    let format = data.map(val => {
        return (
            <div key={val.id} className="sidebarSelection" onClick={_=> type === "list" ? changeView(val.id) : changeView(val.name)}>
                <p>{val.name}</p>
            </div>
        )
    })

    return(
        <div className="sidebarShell">
            {format}
        </div>
    )
}