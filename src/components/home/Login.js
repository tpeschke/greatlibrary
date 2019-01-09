import React from 'react'

export default function Login({ logIn }) {
    return (
        <div className="orderBox loginBox">
            <a href={`${process.env.REACT_APP_LOGIN}`}>
                <button onClick={logIn}>Log In</button>
            </a>
        </div>
    )
}