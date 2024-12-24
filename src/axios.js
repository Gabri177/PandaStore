import axios from 'axios';
import { getToken } from '~/composables/auth.js';


const service = axios.create({
	  baseURL: '/api'
});

// Agregar un interceptor a la petición
service.interceptors.request.use(function (config) {
    // Haz algo antes que la petición se ha enviada

	const token = getToken()

	if (token) {
		config.headers['token'] = token
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
	//console.log("完整的回答: ", response)
    return response.data.data;
  }, function (error) {
    // Cualquier código de estado que este fuera del rango de 2xx causa la ejecución de esta función
    // Haz algo con el error
    return Promise.reject(error);
  });

export default service;