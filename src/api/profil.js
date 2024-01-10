import { getApiHeaderService } from "./apiService";
import { getTokenCookie } from './cookie';

const apiHeaderService = getApiHeaderService();

export const profil = async () => {
    try {
        const token = getTokenCookie();
        const response = await apiHeaderService.get('/user/current', {
            headers: {
                'X-API-TOKEN': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};