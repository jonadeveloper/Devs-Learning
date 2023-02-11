import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ isLoggedin, children }: any) => {


    return isLoggedin === "notLoggedIn"
        ? children
        : <Navigate to={`/`} />
}