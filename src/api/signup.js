import { apiService } from "./apiService";

export const signup = async (data) => {
    try {
      const response = await apiService.post('/users', data);
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };