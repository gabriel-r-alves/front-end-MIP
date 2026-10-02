import { fetchDataApi } from "./api.js";

export async function getAllPrinters(){
    // Ainda implementar um setting que irá salvar e carregar o ip de .env
    const data = await fetchDataApi('printers/');
    // console.log(data)
    // data = apiToList(data)
    return data.printers
}