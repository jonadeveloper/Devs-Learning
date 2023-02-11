import React from 'react'
import { Navigate } from 'react-router'

export const PrivateRoute = ({ children, isLoggedin }: any) => {
    return isLoggedin === "loggedIn"
        ? children
        : <Navigate to={`/auth/login`} />
}
