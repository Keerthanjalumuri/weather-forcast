import {Component} from 'react'
import WeatherCard from '../WeatherCard'

import './index.css'

class Forecast extends Component {
  render() {
    const {forecast} = this.props
    return (
      <div className="forecast">
        {forecast.map(day => (
          <WeatherCard key={day} weather={day} />
        ))}
      </div>
    )
  }
}

export default Forecast
