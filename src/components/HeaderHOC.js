import React, { Component } from 'react'

export default class HeaderHOC extends Component {

    render() {
        return (
            <div className="book">
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="page turn"></span>
                <span className="cover"></span>
                <span className="page"></span>
                <span className="cover turn"></span>
            </div>
        )
    }
}