import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';  // Replace with your Django backend URL

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login/`, {
      username,
      password,
    });

    // Handle the successful login, store the token, etc.
    const token = response.data.access;
    // Store the token in local storage or a global state management tool (like Redux).

    return response.data;
  } catch (error) {
    // Handle login error
    console.error('Login error:', error);
    throw error;
  }
};
