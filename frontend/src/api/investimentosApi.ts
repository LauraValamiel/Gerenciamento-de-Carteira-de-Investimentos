const SERVER = 'http://localhost:3300'

const api = async (endpoint: string, config?: RequestInit) => {
    try{
        console.log(`Endpoint: (TL) ${SERVER}${endpoint}`)

        const result = await fetch(SERVER + endpoint, config)

        if (!result.ok){
            if(result.status === 204){
                return;
            }
            throw new Error(`Erro na requisição: ${result.status} ${result.statusText}`);
        } 

        const contentType = result.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1){
            return result.json();
        }

        return;

    } catch (error){
        console.error("Falha ao buscar dado da API:", error);
        throw error;
    }

    
    
}

export default api