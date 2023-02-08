import { createSlice } from '@reduxjs/toolkit'
import { Course, CoursoBack } from '../../components/Cards/Card'

interface CoursesState {
    courses: CoursoBack[]
    categories: Array<unknown>
    currentCourse: {}
    currentPage: number
}

const initialState: CoursesState = {
    courses: [],
    categories: [],
    currentCourse: {},
    currentPage: 1
}

export const courses = createSlice({
    name: 'courses',
    initialState, // defino initial state (state= initialState)
    reducers: {
        allCourses: (state, { payload }) => {
            state.courses = payload;
        },
        setCurrent: (state, { payload }) => {
            state.currentCourse = payload;
        }
    }
})

export const reducer = courses.actions