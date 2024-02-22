import React from 'react'
import { connect } from 'react-redux'
import { redirect } from 'react-router-dom'
import { withFirebase } from '../../services/firebase'
import { compose } from 'redux'
import { removeUser } from '../App/actions'
import { useState, useEffect } from 'react'
import {
  collection,
  query,
  setDoc,
  doc,
  where,
  getDocs,
} from 'firebase/firestore'
import axios from 'axios'
import config from '../../services/firebase/config'
import Modal from '../../components/Modal/Modal'
import CreateTrip from '../../components/CreateTrip/CreateTrip'
import Trip from '../../components/Trip/Trip'
import TripWeather from '../../components/TripWeather/TripWeather'
import Loader from '../../components/Loader/Loader'
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather'
import './HomeContainer.css'

const HomeContainer = ({ user, removeUser, firebase }) => {
  const [trips, setTrips] = useState([])
  const [currentTrip, setCurrentTrip] = useState(null)
  const [filteredTrips, setFilteredTrips] = useState([])

  const [todayWeather, setTodayWeather] = useState(null)
  const [tripWeather, setTripWeather] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)

  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      getTrips()
    }
  }, [])

  const createTrip = async (formData) => {
    if (formData && formData.city) {
      const citiesRef = collection(firebase.fireStore, 'trips')
      const dataToSave = {
        uid: user.uid,
      }

      if (formData.startDate) {
        dataToSave.startDate = formData.startDate.toString()
      }

      if (formData.endDate) {
        dataToSave.endDate = formData.endDate.toString()
      }

      if (formData.city) {
        dataToSave.city = formData.city
      }

      await setDoc(doc(citiesRef), dataToSave)
      getTrips()
    }
  }

  const getTrips = async () => {
    const q = query(
      collection(firebase.fireStore, 'trips'),
      where('uid', '==', user.uid)
    )

    const querySnapshot = await getDocs(q)
    const tripsData = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))

    setTrips(tripsData)
    setFilteredTrips(tripsData)
    setIsLoading(false)
  }

  const getTodayWeather = async (city) => {
    const day = await axios
      .get(
        `${config.weatherApiUrl}/${city},UA/today?key=${config.weatherKey}&unitGroup=metric`
      )
      .then((response) => response.data)
      .then((response) => response.days[0])

    setTodayWeather(day)
  }

  const getTripWeather = async (city, startDate, endDate) => {
    const days = await axios
      .get(
        `${config.weatherApiUrl}/${city},UA/${startDate}/${endDate}/?key=${config.weatherKey}&unitGroup=metric`
      )
      .then((response) => response.data)
      .then((response) => response.days)

    setTripWeather(days)
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)

    setFilteredTrips(
      trips.filter((trip) =>
        trip.city.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  const tripSelectHandler = (trip) => {
    setCurrentTrip(trip)
    getTodayWeather(trip.city)
    getTripWeather(trip.city, trip.startDate, trip.endDate)
  }

  const signOut = (e) => {
    e.preventDefault()

    firebase
      .signOut()
      .then(() => removeUser())
      .then(() => redirect('/signIn'))
      .catch((error) => console.error(error))
  }

  return (
    <div className="home-container">
      {isLoading && <Loader></Loader>}
      <div className="home-container__trip-container">
        <div className="home-container__trip-info">
          <div className="home-container__greetings">
            <div>
              Weather
              <span className="home-container__bold">Forecast</span>
            </div>

            <button className="home-container__sign-out" onClick={signOut}>
              signOut
            </button>
          </div>
          <div className="search-container">
            <link
              rel="stylesheet"
              href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <i className="fa fa-search"></i>
            <input
              className="home-container__search"
              type="text"
              id="search"
              name="search"
              placeholder="Search your trip"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div className="home-container__trips">
            <div className="home-container__trips-info">
              {filteredTrips.map((trip) => (
                <Trip
                  key={trip.id}
                  trip={trip}
                  currentTrip={currentTrip}
                  onSelect={tripSelectHandler}
                ></Trip>
              ))}
            </div>

            <div
              className="home-container__create_trip"
              onClick={() => setModalOpen(true)}
            >
              + Add new trip
            </div>

            <Modal isOpen={isModalOpen}>
              <CreateTrip
                onClose={(formData) => {
                  createTrip(formData)
                  setModalOpen(false)
                }}
              />
            </Modal>
          </div>
          <h2 className="home-container-week__word">Week</h2>
          <div className="home-container__weather">
            <TripWeather weathers={tripWeather}></TripWeather>
          </div>
        </div>

        {currentTrip && (
          <div className="home-container__current-weather">
            <CurrentWeather
              currentTrip={currentTrip}
              weather={todayWeather}
            ></CurrentWeather>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default compose(
  connect(mapStateToProps, { removeUser }),
  withFirebase
)(HomeContainer)
