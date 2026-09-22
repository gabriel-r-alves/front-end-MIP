export async function getAllPrinters(){
    // Ainda implementar um setting que irá salvar e carregar o ip de .env
    const data = await fetchDataApi('http://10.18.7.36:8000/printers/')
    // console.log(data)
    // data = apiToList(data)
    return data
}


async function fetchDataApi(endpoint) {
    try{
        const response = await fetch(endpoint)

        if (!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        return apiToList(data)
    }
    catch (erro){
        console.error(erro);
        return []
        
    }
}


function apiToList(data_api){
    return data_api.printers;
}