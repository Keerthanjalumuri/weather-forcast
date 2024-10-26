import {Component} from 'react'

import './index.css'

class WeatherCard extends Component {
  render() {
    const {weather} = this.props
    return (
      <div className="weather-card">
        <h1>{weather.date}</h1>
        <p>{weather.description}</p>
        <p>Temperature : {weather.temp}</p>
        <p>Humidity : {weather.humidity}</p>
        <p>Wind Speed : {weather.windSpeed}</p>
      </div>
    )
  }
}

export default WeatherCard
