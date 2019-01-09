import React from 'react'

export default function Login() {
    return (
        <div className="orderBox loginBox">
            <a href={`${process.env.REACT_APP_LOGIN}`}>
                <button>Log In</button>
            </a>
        </div>
    )
}