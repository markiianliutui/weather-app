import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import * as routes from '../constants/routes'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

import SignInContainer from '../containers/SignInContainer'
import HomeContainer from '../containers/HomeContainer/HomeContainer'

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={routes.SIGN_IN}
        element={<PublicRoute component={SignInContainer} />}
      />
      <Route
        path={routes.HOME}
        element={<PrivateRoute component={HomeContainer} />}
      />

      <Route path="*" element={<Navigate to={routes.HOME} replace />} />
    </Routes>
  )
}

export default AppRoutes
