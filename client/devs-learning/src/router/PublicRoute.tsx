import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ isLoggedin, children }: any) => {


    return isLoggedin === "notLogged"
        ? children
        : <Navigate to={`/`} />
}