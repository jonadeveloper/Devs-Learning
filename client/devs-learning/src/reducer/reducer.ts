import { AnyAction } from "redux";

const initialState = {
    courses: [],
    categories: [],
    currentCourse: {},
    currentPage: 1
};


const theReducer = (state = initialState, action: AnyAction) => {
    
    switch(action.type) {

        case 'GET_COURSES':
            return {
                ...state,
                courses: action.payload};
        case 'GET_COURSE_DETAIL':
            return {
                ...state,
                currentCourse: action.payload
            };
        default:
            return {...state};
    }
    
};

export default theReducer;


