import React from 'react'
import './Error.css'

export default function Error(error) {
    return (
        <div className="error-container">
            <h1>Error</h1>
            <p>{error.message}</p>
            <button onClick={() => window.location.reload()}>Reload</button>
        </div>
    )
}
