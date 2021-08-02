import React, { useState } from 'react'
import PageTitle from './Components/PageTitle'
import Swal from 'sweetalert2/dist/sweetalert2'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'

const Promocao = () =>{

    const [form, setForm] = useState({
        nome:'',
        email:'',
        telefone:'',
        mdata:'',
        //nota:'',
        'PROMOÇÃO':'PROMOÇÃO DOS 15%'
    })

    const nome = form.nome
    const email = form.email
    const telefone = form.telefone
    
    

    const [sucess, setSuccess] = useState(false)
    const [retorno, setRetorno] = useState({})

    // console.log(process.env.VAR1)
    const save = async() =>{
        try{
            if(!nome && nome === ''){
                console.log('Erro')
                Swal.fire({
                    icon:'error',
                    title:'Erro ao cadastrar',
                    html:`Para cadastrar preencha todos os campos!`
                })
                return false;
            }
            if(!email && email === ''){
                console.log('Erro')
                Swal.fire({
                    icon:'error',
                    title:'Erro ao cadastrar',
                    html:`Para cadastrar preencha todos os campos!`
                })
                return false;
            }
            if(!telefone && telefone === ''){
                console.log('Erro')
                Swal.fire({
                    icon:'error',
                    title:'Erro ao cadastrar',
                    html:`Para cadastrar preencha todos os campos!`
                })
                return false;
            }
            const response = await fetch('/api/save',{
                method:'POST',
                body:JSON.stringify(form)
            })
            const data = await response.json()
            setSuccess(true)
            setRetorno(data)
            console.log(data)

        }catch(err){
            console.log('Error', err)
        }
    }

    const onChange = evt =>{
        // console.log(evt.target.value)
        const value = evt.target.value
        const key = evt.target.name
        setForm(old => ({
            ...old,
            [key]:evt.target.value
        }))
    }


    return(
        
        <div className="container">
            <PageTitle title="Promoção" />
            <div className="box_container">
                { !sucess &&
                <div className="box_container" >
                <div className="mt-4">
                    <h4>Finalize seu Cadastro:</h4>
                </div>

                <div className="col-12 col-md-5 mt-3 mb-4">
                    
                        <div className="myForm">
                        <div className="mt-4 mb-4">
                            <label className="form-label" htmlFor="name">Nome:</label>
                            <div className="input-group">
                                <input type="text" name="nome" onChange={onChange} value={form.nome} className="form-control" placeholder="Informe seu nome" autoComplete="off" required="required" />
                            </div>
                        </div>
                        <div className="mt-4 mb-4">
                            <label className="form-label" htmlFor="name">E-mail</label>
                            <div className="input-group">
                                <input type="text" name="email" onChange={onChange} value={form.email} className="form-control" placeholder="Informe seu e-mail" autoComplete="off" required="required" />
                            </div>
                        </div>
                        <div className="mt-4 mb-4">
                            <label className="form-label" htmlFor="name">Telefone WhatsApp:</label>
                            <div className="input-group">
                                <input type="text" name="telefone" maxLength="11" onChange={onChange} value={form.telefone} className="form-control" placeholder="Informe seu telefone" autoComplete="off" required="required" />
                            </div>
                        </div>
                        <div className="mt-4 mb-4">
                            <label className="form-label" htmlFor="mdata">Data:</label>
                            <div className="input-group">
                                <input id="mdata" type="date" name="mdata" min="2021-08-02" max="2021-08-06" onChange={onChange} value={form.mdata} className="form-control" autoComplete="off" required="required" />
                                <br/>
                            </div>
                        </div>
                        <div className="mt-4 mb-4">
                            <button type="button" onClick={save} className="mt-4 btn btn-dourado col-12 col-md-12" >Cadastrar</button>
                        </div>
                    </div>
                    
                </div>
                </div>
                }
                {/* <pre>
                    {JSON.stringify(form, null,2)}
                </pre> */}
            </div>
            { retorno.showCupom && 
                <div className="box_success" >
                    <div className="mb-5 col-12 col-md-5" >
                        <p>{`Olá ${JSON.stringify(retorno.Nome).replace(/["]/gm,'')}, você foi cadastrado!`}</p>
                        <p>Entraremos em contato em breve.</p>
                        <p>Anote ou tire um printe deste Cupom <br/>
                            {JSON.stringify(retorno.Cupom).replace(/["]/gm,'')}

                        </p>
                    </div>
                </div>
            }   

            <br/>
        </div>
    )
}

export default Promocao