import React from 'react'
import Link from 'next/link'

const Header = () =>{
    return(
        <div className="bg_top">
            <div className="container">
                <div className="d-flex align-items-start justify-content-center">
                    <Link href="/" >
                        <a >
                            <img className="logo mt-3" src="/logo.png" alt="logo" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header