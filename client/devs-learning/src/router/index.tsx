import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "../components/Detail/CourseDetail";
import { Categories } from "../views/Categories";
import { Home } from "../views/Home";
import NavBar from "../components/navBar/NavBar";
import { CoursePerCategories } from "../views/CoursePerCategories";
import { useAppDispatch } from "../hooks/hooksRedux";
import { getCourses } from "../redux/courses/actions";
import { PrivateRoute } from "./PrivateRoute";
import { LoggedRoutes } from "./LoggedRoutes";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRoute";
import { CreateCourse } from "../views/CreateCourse";


export const AppRouter = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, [])

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/courseDetail/:id`} element={<CourseDetail />} />
        <Route path={`/categories`} element={<Categories />} />
        <Route path={`/categories/:name`} element={<CoursePerCategories />} />

        {/* Deberia ser private */}
        <Route path={`/dashboard/create/course`} element={<CreateCourse />} />

        <Route path={`/auth/*`}
          element={
            <PublicRoute isLoggedin={"notLoggedIn"}>
              <AuthRouter />
            </PublicRoute>
          } />
        <Route path={`/*`}
          element={
            <PrivateRoute isLoggedin={"notLoggedIn"}>
              <LoggedRoutes />
            </PrivateRoute>
          } />
      </Routes>
    </div>
  );
};
