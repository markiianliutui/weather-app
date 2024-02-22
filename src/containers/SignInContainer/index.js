import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../App/actions/index'
import { withFirebase } from '../../services/firebase'
import { useNavigate } from 'react-router-dom'
import SignIn from '../../components/SignIn/SignIn'

const SignInContainer = ({ setUser, firebase }) => {
  const navigate = useNavigate()

  const signInWithGoogle = async (e) => {
    e.preventDefault()

    try {
      const response = await firebase.signInWithGoogle()
      const user = response.user
      setUser(user)
      navigate('/home')
    } catch (error) {
      console.error('Error signing in:', error)
    }
  }

  return <SignIn signInWithGoogle={signInWithGoogle} />
}

export default connect(null, { setUser })(withFirebase(SignInContainer))
