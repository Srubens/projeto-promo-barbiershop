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
                            <div> 
                                <h3>
                                    O Setor 14 está com uma grande promoção do dia 08 
                                    até o dia 12 para você Pai.
                                    <br/>
                                    <br/>
                                    Ao se cadastrar você seu corte sai por apenas R$15,00.
                                    <br/>
                                    <br/>
                                    Não perca esta promoção.<br/>
                                    Promoção validá apenas para os pais.
                                </h3>
                            </div>
                        }
                        
                        <Link href="/promocao" > 
                            <a className="btn-dourado col-12 col-md-12" >fazer meu cadastro</a>
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