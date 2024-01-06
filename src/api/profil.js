import { getApiHeaderService } from "./apiService";

const apiHeaderService = getApiHeaderService();

export const profil = async () => {
    try {
        const response = await apiHeaderService.get('/user/current')
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}