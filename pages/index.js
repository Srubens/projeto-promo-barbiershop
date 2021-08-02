import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from './Components/PageTitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())


const Index = () => {
    const {data, error} =useSWR('/api/get-promo', fetcher)
    return(
        <div className="container">
                <PageTitle title="Inicio" />
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-around ">
                    <div className="mt-5 mb-5 col-12 col-md-6 ml-5" >
                        <img className="barber" src="/img-baber-shop.png" alt="img-baber-shop" />
                    </div>
                    <div className="mt-5 mb-5 col-12 col-md-6" >
                    <div className="box_2">
                        { !data || data.showCupon === false && 
                            <h3>A barbearia X está com várias novidades  
                            <br/>
                            <br/>
                                Cadastre-se e fique por dentro das novidades.
                            </h3>
                        }
                        { data && data.showCupon &&
                            <h3>
                                A barbearia X está com uma grande promoção neste dias dos pais.
                                <br/>
                                <br/>
                                Ao se cadastrar você ganha 15% no seu próximo corte.
                                <br/>
                                <br/>
                                Promoção valida dos dias 02 aos dias 06 de Agosto.
                            </h3>
                        }
                        
                        <Link href="/promocao" > 
                            <a className="mt-4 btn btn-dourado p-2 col-12 col-md-12" >fazer meu cadastro</a>
                        </Link>
                        <br/>
                        <br/>
                    </div>
                    </div>
                </div>
                <br/>    
            </div>   
    )
}

export default Index