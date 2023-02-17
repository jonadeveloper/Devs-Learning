import React from 'react'
import { Route, Routes } from 'react-router'
import { EditForm } from '../components/Courses/EditForm'
import Admin from '../components/Dashboards/NavBarAdmin'
import UserDashboard from '../components/Dashboards/UserDashboard'
import { CreateCourse } from '../views/CreateCourse'
interface Props {
    rol: string
}
export const LoggedRoutes = ({ rol }: Props) => {
    return (
        <Routes>
            <Route path={`/dashboard/create/course`} element={<CreateCourse />} />
            <Route path={`/dashboard/create/course`} element={
                rol === "admin" ? <Admin /> : <UserDashboard />} />
            <Route path={`/dashboard/edit/course/:name`} element={<EditForm />} />

            {/* <Route path={`/dashboard/*`} element={<DashBoardPage />} /> */}
        </Routes>
    )
}
