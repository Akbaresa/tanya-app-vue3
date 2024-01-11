import { apiHeaderService } from "./apiService";

export const tambahFollow = async (data) => {
    try {
        const response = apiHeaderService.post('/follow' , data)
        return (await response).data
    }catch(error){
        return error
    }
}