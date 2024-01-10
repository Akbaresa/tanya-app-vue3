import { apiService , apiHeaderService } from "./apiService";

export const tambahPertanyaan = async (data) => {
  try {
      const response = apiHeaderService.post('/pertanyaan' , data)
      return response.data
  } catch(error){
      console.log(error)
      throw error
  }
}

export const getPertanyaan = async (username) => {
  try {
    const response = apiService.get(`/pertanyaan/${username}`)
    return response
  }catch (error){
    console.log(error)
    throw error
  }
}

export const fetchLazyLoading = async (currentPage, itemPerPage) => {
    try {
      const response = await apiService.get('/beranda', {
        params: {
          currentPage,
          itemPerPage
        }
      });
  
      const newPertanyaan = response.data;
  
      if (newPertanyaan.length > 0) {
        for (const pertanyaan of newPertanyaan) {
          pertanyaan.gambarList = [];
  
          if (pertanyaan.gambar && pertanyaan.gambar.length > 0) {
            for (const gambar of pertanyaan.gambar) {
              const gambarResponse = await apiService.get(`/gambar/${gambar}`, {
                headers: {
                  'X-API-TOKEN': 'token0'
                }
              });
              pertanyaan.gambarList.push({
                id: gambarResponse.data.data.id,
                path: gambarResponse.data.data.path,
              });
            }
          }
        }
  
        return newPertanyaan;
      }
  
      return [];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export const postKomentar = async (pertanyaanId, deskripsi) => {
    try {
      const response = await apiHeaderService.post('/komentar', {
        deskripsi : deskripsi,
        idPertanyaan: pertanyaanId,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };