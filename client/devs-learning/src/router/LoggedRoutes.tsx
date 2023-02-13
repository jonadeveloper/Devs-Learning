import React from 'react'
import { Route, Routes } from 'react-router'
import { CreateCourse } from '../views/CreateCourse'

export const LoggedRoutes = () => {
    return (
        <Routes>
            <Route path={`/dashboard/create/course`} element={<CreateCourse />} />

            {/* <Route path={`/dashboard/*`} element={<DashBoardPage />} /> */}
        </Routes>
    )
}
