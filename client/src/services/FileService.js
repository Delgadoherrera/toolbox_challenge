import axios from 'axios';

const API_URL = 'http://localhost:3001/files/data';
const API_LIST_URL = 'http://localhost:3001/files/list';



const getFilesData = async (fileName) => {
  const url = fileName ? `${API_URL}?fileName=${fileName}` : API_URL;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error en la conexion:", error);
    throw error;
  }
  
};
const getFileList = async () => {
  try {
    const response = await axios.get(API_LIST_URL);
    return response.data;
  } catch (error) {
    console.error("Error en la conexion:", error);
    throw error;
  }
};

export { getFilesData,getFileList };
