import {apiService} from "./apiService";
import { apiHeaderService } from "./apiService";

export const getPendidikan = async (username) => {
    try {
        const response = await apiService.get(`/pendidikan/${username}`)
        console.log (username)
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}

export const tambahPendidikan = async (data) => {
    try {
        const response = await apiHeaderService.post('/pendidikan' , data)
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}
export const updatePendidikan = async (data , id) => {
    try {
        const response = await apiHeaderService.put(`/pendidikan/${id}` , data)
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}