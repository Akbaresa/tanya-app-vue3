import { apiService } from "./apiService";

export const getUserByUsername = async (username) => {
    try{
        const response = apiService.get(`/user/${username}`)
        return (await response).data
    }catch(error){
        console.log(error)
        return error
    }
}