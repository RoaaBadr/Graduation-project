import axios from 'axios';

export const domainBack = 'http://localhost:4000/seff-academy/uploads';

const Api = axios.create({
  baseURL: "https://g-p-1k1q.onrender.com/GP",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


export default Api;