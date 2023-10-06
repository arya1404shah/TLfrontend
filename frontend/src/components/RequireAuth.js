import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { URLs } from '../utils/constants'

function RequireAuth({children}) {
  const { user } = useContext(AuthContext)
  return (
    user.token?children:<Navigate to={URLs.login.route} replace={true} />
  )
}

export default RequireAuth