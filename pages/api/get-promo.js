import { GoogleSpreadsheet } from 'google-spreadsheet'
import { fromBase64 } from '../../utils/base64'

/**
 * CONECTANDO COM A PLANILHA PEGANDO O ID DELA
 */
const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)


export default async(req, res) =>{
    //console.log(fromBase64(process.env.SHEET_PRIVATE_KEY))
    try{
        //LENDO DADOS
        // await doc.useServiceAccountAuth(projetoclientes)
        /**
         * PARA IR NO ENV PEGAR A PLANILHA
         */
        await doc.useServiceAccountAuth({
            client_email:process.env.SHEET_CLIENT_EMAIL,
            private_key:fromBase64(process.env.SHEET_PRIVATE_KEY),
        })
        await doc.loadInfo()

        // CARREGAR E LER OS DADOS DA PLANILHA 
        const sheet = doc.sheetsByIndex[1]
        await sheet.loadCells('A1:B3')

        const mostrarPromocao = sheet.getCell(2,0)
        const textoCell = sheet.getCell(2,1)

        res.end(JSON.stringify({
            showCupon: mostrarPromocao.value === "VERDADEIRO",
            message:textoCell.value
        }))

    }catch(err){
        res.end(JSON.stringify({
            showCupon: false,
            message:'Erro ao solicitar'
        }))
    }

    
}