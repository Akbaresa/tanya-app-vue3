import { apiHeaderService } from "./apiService";

export const tambahGambar = async (pertanyaanId , data) => {
    try {
        const response = apiHeaderService.post(`/gambar?pertanyaan=${pertanyaanId}` , data)
        return (await response)
    }catch(error){
        return error
    }
}

