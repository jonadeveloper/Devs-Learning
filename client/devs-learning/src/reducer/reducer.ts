const initialState = {
    courses: [],
    categories: [],
    currentCourse: {},
    currentPage: 1
};

interface action {
    type: string
    payload: any
}


const theReducer = (state = initialState, action: action) => {
    
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


