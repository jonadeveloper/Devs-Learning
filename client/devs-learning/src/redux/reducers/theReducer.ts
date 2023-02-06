import { AnyAction } from 'redux'

interface CoursesState {
    courses: Array<unknown>
    categories:Array<unknown>
    currentCourse: {}
    currentPage: number
}

const initialState:CoursesState = {
    courses: [],
    categories: [],
    currentCourse: {},
    currentPage: 1
}

const theReducer = (state = initialState, action:AnyAction) => {
    
    switch(action.type) {

        case 'GET_COURSES':
            return {
                ...state,
                courses: action.payload};
        default:
            return {...state};
    }
    
};

export default theReducer;