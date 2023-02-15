import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'


export const AuthRouter = () => {
    return (
        <div>
            <Routes>
                <Route path={`/signup`} element={<Register />} />
                <Route path={`/signin`} element={<Login />} />
            </Routes>
        </div>
    )
}
