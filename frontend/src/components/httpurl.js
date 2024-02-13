import axios from 'axios';

export const axiosUsers = axios.create({
  //   baseURL: "https://ylqz0rb9xf.execute-api.us-east-1.amazonaws.com/user",
  // baseURL: "https://64db5b59593f57e435b0d352.mockapi.io/users",
  baseURL: 'http://localhost:3001/candidateData',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosUsers;
