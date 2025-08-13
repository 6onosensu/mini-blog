import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};
