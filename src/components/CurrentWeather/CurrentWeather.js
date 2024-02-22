import React from 'react'
import { useState, useEffect } from 'react'
import Weather from '../../components/Weather/Weather'
import './CurrentWeather.css'

const CurrentWeather = ({ currentTrip, weather }) => {
  const [timeDifference, setTimeDifference] = useState(null)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const difference = getTimeDifference(currentTrip.startDate)
      setTimeDifference(difference)
    }, 500)

    return () => clearInterval(intervalId)
  }, [currentTrip.startDate])

  const getTimeDifference = (startDate) => {
    const currentDate = new Date()
    startDate = new Date(startDate).setHours(0, 0, 0, 0)
    const difference = startDate - currentDate
    let remainingSeconds = Math.floor(difference / 1000)

    const days = Math.floor(remainingSeconds / (3600 * 24))
    remainingSeconds %= 3600 * 24
    const hours = Math.floor(remainingSeconds / 3600)
    remainingSeconds %= 3600
    const minutes = Math.floor(remainingSeconds / 60)
    remainingSeconds %= 60

    if (days < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return { days, hours, minutes, seconds: remainingSeconds }
  }

  return (
    <div className="current-weather-container">
      <div className="current-weather-box">
        <Weather
          weather={weather}
          date={new Date()}
          isCurrentWeather={true}
        ></Weather>
        <span className="current-weather-container__city">
          {currentTrip.city}
        </span>
      </div>

      {timeDifference && (
        <div className="weather-remaining">
          <p className="weather-remaining__time">
            <span>{timeDifference.days}</span>
            <span className="weather-remaining__time__words">Days</span>
          </p>
          <p className="weather-remaining__time">
            <span>{timeDifference.hours}</span>
            <span className="weather-remaining__time__words">Hours</span>
          </p>
          <p className="weather-remaining__time">
            <span>{timeDifference.minutes}</span>
            <span className="weather-remaining__time__words">Minutes</span>
          </p>
          <p className="weather-remaining__time">
            <span>{timeDifference.seconds}</span>
            <span className="weather-remaining__time__words">Seconds</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default CurrentWeather
