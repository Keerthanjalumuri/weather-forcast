import {BrowserRouter} from 'react-router-dom'
import {Component} from 'react'

import Forecast from './components/Forecast'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'

import './App.css'

class App extends Component {
  state = {
    currentWeather: null,
    forcast: '',
    error: '',
  }

  componentDidMount = () => {
    this.fetchWeatherData('New york')
  }

  fetchWeatherData = async city => {
    const apiKey = '3413c6f810d3b35da25b75bc0b3bd1e9'
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    try {
      const currentResponse = await fetch(currentWeatherUrl)
      const forecastResponse = await fetch(forecastUrl)

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('City Not Found or Data Unavailable')
      }

      const currentData = await currentResponse.json()
      const forecastData = await forecastResponse.json()
      console.log(currentData)
      console.log(forecastData)

      const currentWeather = {
        date: new Date(currentData.dt * 1000).toDateString(),
        temp: currentData.main.temp,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        description: currentData.weather[0].description,
      }

      const forecast = forecastData.list
        .filter((_, index) => index % 8 === 0)
        .map(day => ({
          date: new Date(day.dt * 1000).toDateString(),
          temp: day.main.temp,
          description: day.weather[0].description,
          humidity: day.main.humidity,
          windSpeed: day.wind.speed,
        }))

      this.setState({currentWeather, forecast, error: ''})
    } catch (err) {
      this.setState({error: err.message})
    }
  }

  render() {
    const {currentWeather, forcast, error} = this.state
    return (
      <BrowserRouter>
        <div className="app">
          <SearchBar onSearch={this.fetchWeatherData} />
          {error && <p>{error}</p>}
          {currentWeather && <WeatherCard weather={currentWeather} />}
          {forcast.length > 0 && <Forecast forcast={forcast} />}
        </div>
      </BrowserRouter>
    )
  }
}

export default App
