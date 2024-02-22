import React from 'react'
import './Weather.css'

const Weather = ({ weather, date, isCurrentWeather }) => {
  const formattedDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
    })

  const generateImageUrl = () => `/weather-icons/${weather.icon}.svg`

  const getClassNames = () => {
    return isCurrentWeather
      ? 'weather-container--current'
      : 'weather-container--all'
  }

  return (
    weather &&
    date && (
      <div className={getClassNames()}>
        <div className="weather-info">
          <div className="weather-info__date">{formattedDate(date)}</div>
          <img
            className="weather-container__image"
            src={generateImageUrl()}
            alt="weather-container"
          ></img>
          <div className="weather-info__temperature">{weather.temp} °C</div>
        </div>
      </div>
    )
  )
}

export default Weather
