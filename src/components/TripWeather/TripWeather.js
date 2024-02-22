import React from 'react'
import Weather from '../Weather/Weather'
import './TripWeather.css'

const TripWeather = ({ weathers }) => {
  return (
    <div className="week-weather-container">
      {weathers.map((weather, index) => (
        <Weather
          weather={weather}
          date={new Date(weather.datetime)}
          isCurrentWeather={false}
          key={index}
        ></Weather>
      ))}
    </div>
  )
}

export default TripWeather
