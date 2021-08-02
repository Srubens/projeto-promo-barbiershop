import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '/css/style.css'
import Layout from './Components/Layout'
import PageTitle from './Components/PageTitle'



function MyApp({Component, pagesViwes}){
    return (
        <Layout>
            <Component {...pagesViwes} />
        </Layout>  
    )
}

export default MyApp