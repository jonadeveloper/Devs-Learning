import React from "react";
import { Routes, Route } from "react-router-dom";
import CourseDetail from "../components/Detail/CourseDetail";
import { Home } from "../views/Home";

export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/courseDetail/:id`}  element={<CourseDetail />}/>
      </Routes>
    </div>
  );
};
