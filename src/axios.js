import axios from 'axios';
import { getToken } from '~/composables/auth.js';
import qs from 'qs';


const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
console.log("apiBaseURL: ", apiBaseURL)
const service = axios.create({
	  // baseURL: apiBaseURL + '/api',
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // 设置全局默认 Content-Type
    }
});

// Agregar un interceptor a la petición
service.interceptors.request.use(function (config) {
    // Haz algo antes que la petición se ha enviada

    const token = getToken()

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Bearer 是常见的 Token 前缀
      config.headers['token'] = token;
    }
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded' && config.data) {
      config.data = qs.stringify(config.data); // 将数据序列化为 x-www-form-urlencoded 格式
      console.log("序列化后的数据: ", config.data)
    }

    return config;
  }, function (error) {
    // Haz algo con el error de la petición
    return Promise.reject(error);
  });

// Agregar una respuesta al interceptor
service.interceptors.response.use(function (response) {
    // Cualquier código de estado que este dentro del rango de 2xx causa la ejecución de esta función 
    // Haz algo con los datos de la respuesta
    console.log("完整的回答: ", response)
    return response.data.data;
  }, function (error) {
    // Cualquier código de estado que este fuera del rango de 2xx causa la ejecución de esta función
    // Haz algo con el error
    return Promise.reject(error);
  });

export default service;