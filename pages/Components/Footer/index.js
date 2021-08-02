import React from 'react'
import Link from 'next/link'

const Footer = () =>{
    return (
        <div className="bg_footer">
            <div className="container">
                <div className="d-flex flex-column flex-md-row justify-content-around align-items-center justify-content-center p-2 mt-1">

                    <div>Todos os direitos reservados &copy;</div>
                    <div>Agencia Dallas</div>

                </div>
            </div>
        </div>
    )
}

export default Footer