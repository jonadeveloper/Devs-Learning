import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "../components/Detail/CourseDetail";
import { Categories } from "../views/Categories";
import { Home } from "../views/Home";
import NavBar from "../components/navBar/NavBar";
import { CoursePerCategories } from "../views/CoursePerCategories";
import { useAppDispatch } from "../hooks/hooksRedux";
import { getCourses } from "../redux/courses/actions";


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
      </Routes>
    </div>
  );
};
