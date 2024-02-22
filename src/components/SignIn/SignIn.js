import React from 'react'
import './SignIn.css'

const SignIn = ({ signInWithGoogle }) => {
  return (
    <div className="sign-in">
      <span className="sign-in__title">Weather App</span>

      <div className="sign-in__content">
        <div className="sign-in__google-icon">
          <img
            className="sign-in__image"
            src="/images/google.svg"
            alt="google"
          ></img>
        </div>

        <div className="sign-in__button">
          <img
            className="sign-in__button__image"
            src="/images/google.svg"
            alt="google-button"
          ></img>
          <span onClick={signInWithGoogle}>Sign In With Google</span>
        </div>
      </div>
    </div>
  )
}

export default SignIn
