import { useState, useEffect } from 'react'
import countriesData from './services/countriesData'
import WeatherData from './services/WeatherData'


const App = ()=>{
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [displayInfos, setDisplayInfos] = useState([])


  useEffect(()=>{
    countriesData.getAll()
    .then(intializeCountries=>{setCountries(intializeCountries)})
  }, [])

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }


  const DisplayCountries = (filteredCountries)=>{
    if(filteredCountries.length === 1){
      return(
        <div>
          {oneCountry}
        </div>
      )
    }
    else if(filteredCountries.length <= 10){
      return(
        <div>
          {filteredCountries}
        </div>
      )
    }
    else{
      return(
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
  }


  const DisplayInfo = (country)=>{
    //console.log(country.name.common)
    //console.log('display info called')
    const findCountry = displayInfos.find(info=> info.name.common === country.name.common)
    if(findCountry != null && findCountry.name.common === country.name.common){
      //console.log('remove'+findCountry.name.common)
      const newDisplayInfos = displayInfos.filter(country=> country.name.common !== findCountry.name.common)
      setDisplayInfos(newDisplayInfos)
      return;
    }
    else{
      //console.log('added'+country.name.common)
      const newDisplayInfos = displayInfos.concat(country)
      setDisplayInfos(newDisplayInfos)
    }
  }
 

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))


  const filteredCountries = countriesToShow.map(country =><CountryName key={country.name.common} country= {country} displayInfo={()=>DisplayInfo(country)} displayCInfos={displayInfos}/>)

  const oneCountry = countriesToShow.map(country =><OneCountry key={country.name.common} country= {country}/>)

  return(
    <div>
      <Filter newValue = {filter} change={handleFilterChange}/>
      <div>
        {
          DisplayCountries(filteredCountries)
        }
      </div>
    </div>
  )

}

const Filter = (filterProps)=>{
  return(
  <div>
        find countries <input value={filterProps.newValue} onChange={filterProps.change}/>
  </div>
  )
}


const CountryName = ({country, displayInfo, displayCInfos}) =>{
    //const showMoreInfo = displayCInfos.find(info=> info.name.common === country.name.common)
    //console.log('display c info' + {displayCInfos})
    //if(showMoreInfo!= null){
    //console.log('show more info of' + showMoreInfo.name.common)
    if(displayCInfos.find(info=> info.name.common === country.name.common)){
      return(
      <div>
        {country.name.common} 
        <button onClick={displayInfo}> Show  </button>
        
        <ShowCountryInfo country={country}/>
      </div>
      )
    }
    else{
        return(
      <div>
        {country.name.common} 
        <button onClick={displayInfo}> Show  </button>
      </div>
      )
    }
  
    
}

 const ShowCountryInfo = ({country})=>{
    const languages = Object.values(country.languages)
    console.log(country)

    return(
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>

        <h2>Languages</h2>
        <ul>
          {languages.map(languages => <Languages key={languages} languages={languages}/>)}
        </ul>

        <img src={country.flags.png} alt={country.flags.alt}/>
        
      </div>
    )
  }

const OneCountry = ({country}) =>{
  const [weatherInfo, setWeatherInfo] = useState(null)

  useEffect(()=>{
    WeatherData.getWeather(country.latlng[0], country.latlng[1])
    .then(weatherResponse => {
      console.log(weatherResponse)
      setWeatherInfo(weatherResponse)
    })
  }, [])

  //convert temp from kelvin to celsius -273.15
  return(
    <div>
      <ShowCountryInfo country = {country} weather = {weatherInfo}></ShowCountryInfo>
      {weatherInfo &&
       (
        <div>
        <h2>Weather in {country.name.common}</h2>
        <div>
          Tempature {(weatherInfo.main.temp -273.15).toFixed(2)} Celsius
        </div>
        <img src={"https://openweathermap.org/img/wn/"+ weatherInfo.weather[0].icon +"@2x.png"}></img>
        <div>
          Wind {weatherInfo.wind.speed} m/s
        </div>
        </div>
      )
      }
    
    </div>
  )
}
const WeatherDisplay =()=>{
  
}

const Languages = ({languages})=>{
  return(
    <div>
      <li>
        {languages}
      </li>
    </div>
  )
}



export default App