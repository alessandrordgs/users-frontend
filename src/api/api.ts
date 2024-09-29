import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT_BASE_URL,
})

api.interceptors.response.use((response) => {
  return response
}, error => {
  switch (error.response.status) {
    case 401:
      console.log('401')
      break
    case 403:
      console.log('403')
      break
    case 404:
      console.log('404')
      break
    case 500:
      console.log('500')
      break
    default:
      console.log('Error')
      break
  } 
  return Promise.reject(error)
})