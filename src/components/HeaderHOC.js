import React from 'react'

export default function HeaderHOC(Page) {
    return props =>
        <div>
            <div className="headerShell">
                <div className="mobileFlex">
                    <div className="headerImage"></div>
                </div>
                <h2 className="mobileFix">A Spell and Miracle reference for the <a href="http://highadventuregames.net">Bonfire Roleplaying Game</a></h2>
                <i className={props.match.path === '/' ? "hidden" : "fa fa-home search"} onClick={_ => props.history.push('/')}></i>
                <i className={props.match.path === '/search' ? "hidden" : props.match.path === '/' ? 'fa fa-search search' : "fa fa-search home"} onClick={_ => props.history.push('/search')}></i>
            </div>

            <Page {...props} />
        </div>
}