export async function fetchDataApi(path) {
    try{
        const response = await fetch('http://10.18.7.113:8000/'+path)

        if (!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        return data
    }
    catch (erro){
        console.error(erro);
        return []
        
    }
}

