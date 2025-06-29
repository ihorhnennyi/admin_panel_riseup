// import axios from 'axios'

// const API_URL =
// 	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1'

// export const api = axios.create({
// 	baseURL: API_URL,
// 	timeout: 10000,
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// })

// 👉 Пример interceptor для добавления токена (потом допишем):
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// 👉 Пример interceptor для ловли ошибок (можно добавить toast):
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error);
//     // можно добавить toast error
//     return Promise.reject(error);
//   }
// );
