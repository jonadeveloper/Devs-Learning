const initialState = {
    courses: [],
    categories: [],
    
    currentCourse: {},
    currentPage: 1
};

const theReducer = (state = initialState, action) => {
    
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