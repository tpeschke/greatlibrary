import React from 'react'
import Loading from '../Loading'

export default function Sidebar({ type, data, changeView, param, ham, openHam, match, history }) {
    if (typeof (data) === 'string') {
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

    return (
        <div className="sidebarShell">
            <div className="sidebarShellInner">
                {format}
            </div>

            <div className="hamShell">
                <div className={ham ? "hamOverlay" : 'hidden'}>
                    <p className="exit" onClick={openHam}>X</p>
                    <div className="hamHolder">
                        {format}
                    </div>
                </div>
                <div className="hamIconShell">
                    <div className="outerHam" onClick={openHam}>
                        <div className="innerHam"></div>
                        <div className="innerHam"></div>
                        <div className="innerHam"></div>
                    </div>
                    <div className="navIcons">
                        <i className={match.path === '/' ? "hidden" : "fa fa-home search"} onClick={_ => history.push('/')}></i>
                        <i className={match.url === '/view/library+1' ? "hidden" : "fa fa-book bookIcon"} onClick={_ => history.push('/view/library+1')}></i>
                        <i className={match.path === '/search' ? "hidden" : match.path === '/' ? 'fa fa-search search' : "fa fa-search home"} onClick={_ => history.push('/search')}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}