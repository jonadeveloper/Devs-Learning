import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "../components/Detail/CourseDetail";
import { Categories } from "../views/Categories";
import { Home } from "../views/Home";
import NavBar from "../components/navBar/NavBar";
import { CoursePerCategories } from "../views/CoursePerCategories";
import { useAppDispatch, useAppSelector } from "../hooks/hooksRedux";
import { getCategories, getCourses } from "../redux/courses/actions";
import { PrivateRoute } from "./PrivateRoute";
import { LoggedRoutes } from "./LoggedRoutes";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRoute";
import Footer from "../components/Footer/Footer";
import LandingPage from "../components/Landing/LandingPage";
import DashboardAdmin from "../components/Dashboards/DashboardAdmin";
import Admin from "../components/Dashboards/NavBarAdmin";

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.users);
  const { coursesFiltered } = useAppSelector((state) => state.courses);
  useEffect(() => {
    let get = true;
    if (coursesFiltered.length < 1 && get) {
      dispatch(getCourses());
      dispatch(getCategories());
      get = false;
    }
  }, [coursesFiltered]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path={`/`} element={<LandingPage />} />
        <Route path={`/courses`} element={<Home />} />
        <Route path={`/courseDetail/:id`} element={<CourseDetail />} />
        <Route path={`/categories`} element={<Categories />} />
        <Route path={`/categories/:name`} element={<CoursePerCategories />} />
        <Route path={`/dash/Admin`} element={<DashboardAdmin />} />
        <Route path={"/admin"} element={<Admin />} />

        <Route
          path={`/auth/*`}
          element={
            <PublicRoute isLoggedin={status}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path={`/*`}
          element={
            <PrivateRoute isLoggedin={status}>
              <LoggedRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
