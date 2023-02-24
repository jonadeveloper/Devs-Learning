import { Navigate } from "react-router";

export const PrivateRoute = ({ children, isLoggedin }: any) => {
  return isLoggedin === "logged" ? children : <Navigate to={`/auth/signin`} />;
};
