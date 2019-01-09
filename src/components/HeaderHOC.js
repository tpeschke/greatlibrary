import React from 'react'

export default function HeaderHOC(Page) {
    return props =>
        <div>
            <div className="headerShell">
                <div className="headerImage"></div>
                <h2>A Spell and Miracle reference for the <a href="http://highadventuregames.net">Bonfire Roleplaying Game</a></h2>
                <i className={props.match.path === '/' ? "hidden" : "fa fa-home home"} onClick={_=>props.history.push('/')}></i>
            </div>

            <Page {...props} />
        </div>
}