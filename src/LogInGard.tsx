import { Outlet, Navigate } from "react-router-dom";

const LogInGard = () => {
  const token = localStorage.getItem("token");
  return token !== null ? <Navigate to="/homeAuto" /> : <Outlet />;
};

export default LogInGard;
