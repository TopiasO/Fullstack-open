import { useState, useEffect } from 'react'
import countryService from '../services/countries'

const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        console.log('effect run, weather is now', weather)

        countryService
        .getWeather(country)
        .then(weather => {
            setWeather(weather)
        })
    }, [])

    if (!weather) {
      return null;
    }

    console.log(weather.weather[0].icon)

    const IconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>
            <b>Languages:</b>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>
                        {language}
                    </li>
                )}
            </ul>
            <img id="flag" src={country.flags.png} />
            <h2>Weather in {country.capital}</h2>
            <div>temperature {(weather.main.temp - 272.15).toFixed(2)} Celsius</div>
            <img id="icon" src={IconUrl} />
            <div>Wind {weather.wind.speed} m/s</div>
        </div>

    )
}

export default CountryInfo