import React from 'react'
import config from '../../services/firebase/config'
import './Trip.css'

const Trip = ({ trip, currentTrip, onSelect }) => {
  const formattedDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

  const generateImageUrl = (city) =>
    `${config.storageUrl}/${city}.jpeg?alt=media`

  const getClassNames = () => {
    return currentTrip?.id === trip.id
      ? 'trip-container trip-container--current'
      : 'trip-container'
  }

  return (
    <div className={getClassNames()} onClick={() => onSelect(trip)}>
      <img
        className="trip-container__image"
        src={generateImageUrl(trip.city)}
        alt="trip-container"
      ></img>

      <div className="trip-info">
        <div className="trip-info__city">{trip.city}</div>
        <div className="trip-info__date">
          {formattedDate(trip.startDate)} - {formattedDate(trip.endDate)}
        </div>
      </div>
    </div>
  )
}

export default Trip
