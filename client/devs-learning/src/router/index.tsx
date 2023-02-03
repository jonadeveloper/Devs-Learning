import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from '../views/Home'
import { Test } from '../views/Test'

export const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route path={`/`} element={<Home />} />
                <Route path={`/test`} element={<Test />} />
            </Routes>
        </div>
    )
}

