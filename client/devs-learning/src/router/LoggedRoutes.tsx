import { Route, Routes } from "react-router";
import { EditForm } from "../components/Courses/EditForm";
import DashboardAdmin from "../components/Dashboards/DashboardAdmin";
import UserDashboard from "../components/Dashboards/UserDashboard";
import { CreateCourse } from "../views/CreateCourse";
interface Props {
  rol: string;
}
export const LoggedRoutes = ({ rol }: Props) => {
  return (
    <Routes>
      <Route path={`/dashboard/create/course`} element={<CreateCourse />} />
      <Route
        path={`/dashboard/create/course`}
        element={rol === "admin" ? <DashboardAdmin /> : <UserDashboard />}
      />
      <Route path={`/dashboard/edit/course/:name`} element={<EditForm />} />
      <Route path={`/profile`} element={<UserDashboard />} />
      {/* <Route path={`/dashboard/*`} element={<DashBoardPage />} /> */}
    </Routes>
  );
};
