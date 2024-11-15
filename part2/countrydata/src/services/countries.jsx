import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const api_key = import.meta.env.VITE_SOME_KEY
const api_url = `https://api.openweathermap.org/data/2.5/weather?`

const getAll = () => {
  const request = axios.get(`${baseUrl}all`)
  return request.then(response => response.data)
}

const getWeather = country => {
  const request = axios.post(`${api_url}lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
  return request.then(response => response.data)
}

export default { getAll, getWeather }