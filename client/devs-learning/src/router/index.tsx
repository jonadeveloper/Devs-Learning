import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../views/Home";

export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path={`/`} element={<Home />} />
      </Routes>
    </div>
  );
};
