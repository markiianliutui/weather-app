import './CreateTrip.css'
import { useState } from 'react'

function CreateTrip({ onClose }) {
  const cities = ['Lviv', 'Ternopil', 'Lutsk', 'Kyiv', 'Ivano-frankivsk']
  const minDateString = new Date().toISOString().split('T')[0]

  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 15)

  const [formData, setFormData] = useState({
    city: '',
    startDate: '',
    endDate: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
  
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.startDate || !formData.endDate || !formData.city) {
      return
    }

    onClose(formData)

    setFormData({
      city: null,
      startDate: null,
      endDate: null,
    })
  }

  return (
    <div className="wrapper">
      <div className="label-container">
        <h2 className="trip-label">Create trip</h2>
        <span className="close-icon" onClick={onClose}>
          X
        </span>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="city">
            <span className="label-required">*</span>City
          </label>
          <select
            className="trip-input"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a city...</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="startDate">
            <span className="label-required">*</span>Start Date
          </label>
          <input
            className="trip-input"
            type="date"
            id="startDate"
            name="startDate"
            placeholder="Select Date"
            min={minDateString}
            value={formData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="endDate">
            <span className="label-required">*</span>End Date
          </label>
          <input
            className="trip-input"
            type="date"
            id="endDate"
            name="endDate"
            placeholder="Select Date"
            min={formData.startDate}
            disabled={!formData?.startDate?.length}
            value={formData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <hr className="divider" />
        <div className="btn-container">
          <button className="cancel-btn" type="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTrip
