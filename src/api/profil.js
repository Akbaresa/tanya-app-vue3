import { apiHeaderService } from "./apiService";

export const profil = async () => {
    try {
        const response = await apiHeaderService.get('/user/current');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};