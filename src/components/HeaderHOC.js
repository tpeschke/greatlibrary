import React from 'react'

export default function HeaderHOC(Page) {
    return props =>
        <div>
            <div className="headerShell">
                <div className="titleShell">
                    <div className="mobileFlex">
                        <div className="headerImage"></div>
                    </div>
                    <h2 className="mobileFix">A Spell and Miracle reference for the <a href="https://bonfire.dragon-slayer.net/">Bonfire Roleplaying Game</a></h2>
                </div>
                <div className="navIcons HOC">
                    <i className={props.match.path === '/' ? "hidden" : "fa fa-home search"} onClick={_ => props.history.push('/')}></i>
                    <i className={props.match.url === '/view/library+1' ? "hidden" : "fa fa-book bookIcon"} onClick={_ => props.history.push('/view/library+1')}></i>
                    <i className={props.match.path === '/search' ? "hidden" : props.match.path === '/' ? 'fa fa-search search' : "fa fa-search home"} onClick={_ => props.history.push('/search')}></i>
                </div>
            </div>

            <Page {...props} />
        </div>
}