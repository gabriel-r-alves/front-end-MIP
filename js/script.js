import { PrinterTable } from './tbl_printers.js'


async function getFromApi(){
    try{
        const response = await fetch('http://10.18.6.209:8000/printers/')

        if (!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        // console.log(data);
        return apiToList(data)
    }
    catch (erro){
        console.error(erro);
        return null
        
    }
}


function apiToList(data_api){
     return data_api.printers;
}


async function updateTblPrinters(){
    const data = await getFromApi()

    // validar verificação
    if (data != null) {
        const table = new PrinterTable('tbl-printers');

        table.setData(data);
        
        // table.addFilter('status','online')
        table.addFilter('branch_current_id','25')

        table.render();
        console.log('Tabela atualizada com sucesso!');
    }
    else{
        console.log('Dados recebidos da API vazios ou ERRO na validação!')
    }
}


async function startAutoUpdate() {
    while (true) {
        await updateTblPrinters();

        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}

// startAutoUpdate()