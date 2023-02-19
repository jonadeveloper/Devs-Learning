import { useEffect, useState } from "react";
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
import DashboardAdmin from "../components/Dashboards/Admin/DashboardAdmin";
import UserDashboard from "../components/Dashboards/UserDashboard";
import {
  getUser,
  userData,
  userInfo,
  userInfoObj,
} from "../redux/users/actions";
import { getAuth } from "firebase/auth";
import { setItem } from "../utils/localStorage";
export var profileImg: string;
export var userFullname: string;
export var userEmail: string;
export var userPhoneNumber: string;
export var userLastLogin: any;

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  let { status } = useAppSelector((state) => state.users);
  const auth = getAuth();
  const user = auth.currentUser;
  const userByEmailInfo = userData?.user || userInfoObj;
  console.log(status);
  useEffect(() => {
    dispatch(getUser(status));
    dispatch(getCourses());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (user || userByEmailInfo) {
      setItem("loggedUserInfo", user || userByEmailInfo);
    }
  });

  if (user?.providerId === "firebase") {
    profileImg = user.photoURL!;
    userFullname = user.displayName!;
    userEmail = user.email!;
    userPhoneNumber = user.phoneNumber!;
    userLastLogin = user.metadata.lastSignInTime!;
  } else {
    let time = Number(userByEmailInfo?.lastLoginAt);
    profileImg = userByEmailInfo?.photoURL;
    userFullname = userByEmailInfo?.displayName;
    userEmail = userByEmailInfo?.email;
    userPhoneNumber = userByEmailInfo?.phoneNumber;
    userLastLogin = new Date(time).toDateString();
  }

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
        <Route path={"/user"} element={<UserDashboard />} />

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
              <LoggedRoutes rol={"user"} />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
