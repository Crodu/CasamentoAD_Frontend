import axios from 'axios';

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // const port = '8080'; // Keep the existing port
    return `http://api.${hostname}`;
  }
  return 'http://localhost:8080'; // Fallback for non-browser environments
};

const api = axios.create({
  baseURL: getBaseURL(), // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // 'Cors-Allow-Origin': '*', // Optional: Adjust CORS settings if needed - typically handled server-side
    // 'Access-Control-Allow-Origin': '*', // Optional: Adjust CORS settings if needed - typically handled server-side
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