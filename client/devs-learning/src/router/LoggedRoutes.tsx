import { Route, Routes } from "react-router";
import { EditForm } from "../components/Courses/EditForm";
import DashboardAdmin from "../components/Dashboards/Admin/DashboardAdmin";
import UserDashboard from "../components/Dashboards/UserDashboard";
import { SuccessPage } from "../components/Payment/SuccessPage";
import { CreateCourse } from "../views/CreateCourse";
interface Props {
  rol: string;
}
export const LoggedRoutes = ({ rol }: Props) => {
  return (
    <Routes>
      {/* <Route
        path={`/profile`}
        element={rol === "admin" ? <DashboardAdmin /> : <UserDashboard />}
      /> */}
      {rol === "admin" && (
        <Route path={`/profile`} element={<DashboardAdmin />} />
      )}
      {rol === "admin" && (
        <Route path={`/dashboard/create/course`} element={<CreateCourse />} />
      )}
      {rol === "admin" && (
        <Route path={`/dashboard/edit/course/:id`} element={<EditForm />} />
      )}
      {rol === "student" && (
        <Route path={`/profile`} element={<UserDashboard />} />
      )}
      <Route path={"/payment/success"} element={<SuccessPage />} />
    </Routes>
  );
};
