import axios from 'axios'
//const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
//set "VITE_SOME_KEY=4ae48c8a0926a5cf20b7dc54247b846c" && npm run dev // For Windows cmd.exe
const apiKey = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getWeather = (lon, lat) => {
  const request = axios.get(baseUrl+'lat='+lat+'&lon='+lon+'&appid='+apiKey)
  return request.then(response => response.data)
}


export default {getAll, getWeather}