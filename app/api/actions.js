import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    'Cors-Allow-Origin': '*', // Optional: Adjust CORS settings if needed
    'Access-Control-Allow-Origin': '*', // Optional: Adjust CORS settings if needed
  },
  withCredentials: false,
});

// Example of an API call
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export default api;