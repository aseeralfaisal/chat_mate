import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export const fetchApi = async (url: string, method: 'GET' | 'POST', data: null | object = null) => {
  try {
    let response = null;
    if (method === 'POST') {
      response = await axios.post(`${BASE_URL}/${url}`, data);
    } else {
      response = await axios.get(`${BASE_URL}/${url}`);
    }
    if (response === null) return;
    return { value: response.data, code: response.status };
  } catch (error) {
    console.error(error);
  }
};
