import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'

/**
 * CONECTANDO COM A PLANILHA PEGANDO O ID DELA
 */
const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const getCupon = () =>{
    const code = parseInt(moment().format('YYYYMMDDHHmmss')).toString(16).toUpperCase()
    return code.substr(0,4) + '-' + code.substr(4,4) + '-' + code.substr(8,4)
}

const fromBase64 = value =>{
    const buff = Buffer.from(value,'base64')
    return buff.toString('ascii')
}

export default async(req, res) =>{
    console.log(JSON.parse(req.body))

    try{
        //LENDO DADOS
        await doc.useServiceAccountAuth({
            client_email:process.env.SHEET_CLIENT_EMAIL,
            private_key:fromBase64(process.env.SHEET_PRIVATE_KEY),
        })
        await doc.loadInfo()

        const sheet = doc.sheetsByIndex[1]
        await sheet.loadCells('A1:B3')

        const mostrarPromocao = sheet.getCell(2,0)
        const textoCell = sheet.getCell(2,1)

        let Promocao = ''
        let Cupom = ''

        if(mostrarPromocao.value === 'VERDADEIRO'){
            Cupom = getCupon()
            Promocao = textoCell.value
        }

        //ESCREVENDO ARQUIVO NA PLANILHA
        const data = JSON.parse(req.body)
        const readFile = doc.sheetsByIndex[2]
        await readFile.addRow({
            Nome:data.nome,
            Email:data.email,
            Telefone:data.telefone,
            'Data Selecionada':data.mdata,
            'Promocao':'PROMOÇÃO DOS 15%',
            Cupom
            //Nota:'5'
        })
        res.end(JSON.stringify({
            showCupom:Cupom !== '',
            Cupom,
            Nome:data.nome
            //Obrigado:`${data.nome} Muito obrigado por se cadastrar. Entraremos em contato em breve para mais informações.`
        }))
        // res.end(req.body)
        

    }catch(err){
        console.log('error',err)
        res.end('error', err)
    }

}