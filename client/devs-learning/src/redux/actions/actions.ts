const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const CREATE_USER:string = "CREATE_USER" //Listo

export const GetCourses = (data:unknown) => {
    return {type: 'GET_COURSES', payload: data}
  }

export const createUser = (data:unknown) =>{
  
}