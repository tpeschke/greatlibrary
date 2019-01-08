import React from 'react'

export default function Login({logIn}) {
    return (
        <div className="orderBox loginBox">
            <button onClick={logIn}>Log In</button>
        </div>
    )
}