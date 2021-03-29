import React from 'react'

export const FixedTopNavbar = ({ toHomePage }) => {
    return (
        <nav class="fixed-top-navbar">
            <a className="nav-top-link"
               onClick={toHomePage}
            >
            Home</a>
        </nav>
    )
}

export default FixedTopNavbar
