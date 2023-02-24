import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import { useAppSelector } from "../hooks/hooksRedux";

export const AuthRouter = () => {
  const logState = useAppSelector((state) => state.users);
  const [isAuth, setAuth] = useState(logState.status);
  return (
    <div>
      <Routes>
        <Route path={`/signup`} element={<Register />} />
        <Route path={`/signin`} element={<Login setAuth={setAuth} />} />
      </Routes>
    </div>
  );
};
