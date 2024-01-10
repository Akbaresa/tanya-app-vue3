import {apiService } from "./apiService";
import { apiHeaderService } from "./apiService";


export const getPekerjaan = async (username) => {
    try {
        const response = await apiService.get(`/pekerjaan/${username}`)
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}

export const tambahPekerjaan = async (data) => {
    try {
        const response = await apiHeaderService.post('/pekerjaan' , data)
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}
export const updatePekerjaan = async (data , id) => {
    try {
        const response = await apiHeaderService.put(`/pekerjaan/${id}` , data)
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}