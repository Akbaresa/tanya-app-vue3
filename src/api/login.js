import {apiService} from "./apiService";

export const login = async (data) => {
    try {
        const response = await apiService.post('/auth/user' , data)
        return response.data
    } catch (error) {
        console.error('Error signing up:', error);
        throw error
    }
}