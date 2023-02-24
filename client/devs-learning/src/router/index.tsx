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
import { getUser, setFullName } from "../redux/users/actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getItem, setItem } from "../utils/localStorage";
import { initializeApp } from "firebase/app";
import { createMPButton } from "../components/meliButton/meliButton";
import { SuccessPage } from "../components/Payment/SuccessPage";
export var profileImg: string;
export var userFullname: string;
export var userEmail: string;
export var userPhoneNumber: string;
export var userLastLogin: any;
const { REACT_APP_FIREBASE_CONFIG } = process.env;
export const AppRouter = () => {
  const dispatch = useAppDispatch();
  let { status } = useAppSelector((state) => state.users);
  const firebaseConfig = JSON.parse(REACT_APP_FIREBASE_CONFIG!);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      profileImg = user.photoURL!;
      userFullname = user.displayName!;
      userEmail = user.email!;
      userPhoneNumber = user.phoneNumber!;
      userLastLogin = user.metadata.lastSignInTime!;
    } else {
      //Do Something
    }
  });

  useEffect(() => {
    dispatch(getUser(status));
    dispatch(getCourses());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      setItem("loggedUserInfo", auth.currentUser);

      dispatch(
        setFullName(auth.currentUser.displayName, auth.currentUser.email)
      );
    }
  }, [status]);

  //recover user info from local storage
  useEffect(() => {
    if (status == "logged") {
      let userInfo = getItem("loggedUserInfo");
      dispatch(setFullName(userInfo.displayName, userInfo.email));
    }
  }, [status]);
  ///////////////////////

  //MP button
  const { cart } = useAppSelector((state) => state.courses);

  useEffect(() => {
    createMPButton(cart);
  }, [cart]);

  ///////////////////////////////////

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
        <Route path={"/payment/success"} element={<SuccessPage />} />
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
