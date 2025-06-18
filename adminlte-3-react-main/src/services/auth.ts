import axios from 'axios';

const API = 'http://localhost:5000/api';

export const registerByAuth = async (fullName: string, email: string, password: string) => {
  return await axios.post('http://localhost:5000/api/register', {
    fullName,
    email,
    password,
  });
};

export const loginByAuth = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:5000/api/login', {
    email,
    password,
  });
  return response.data; // should return { token, user }
};

