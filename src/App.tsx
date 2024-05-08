import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import RequestList from "./CustomRequest/RequestList";
import RequestAdd from "./CustomRequest/RequestAdd";
import RequestModify from "./CustomRequest/RequestModify";
import RequestItem from "./CustomRequest/RequestItem";
import "./App.css";
import Chatbot from "./CustomRequest/ChatBot";
import Login from "./Login/LogIn";
import PrivateRoutes from "./PrivateRoutes";
import AddUserForm from "./User/AddUser";
import AddDepartmentForm from "./Department/AddDep";
import Sidebar from "./Shared/SideNavBar";
import NavBar from "./Shared/NavBar";
import History from "./Shared/Historiqe";
import AutomatisationMessenger from "./Automatisation/AutomatisationMessenger";
import HomeAuto from "./Automatisation/HomeAuto";
import { useEffect } from "react";
import UserList from "./User/UserList";
import QuestionRequestAi from "./Ai/QuestionRequestAi";
import AddRoleForm from "./Role/AddRole";
import RoletList from "./Role/ListeRoles";
import DepartmentList from "./Department/ListDep";
import ForgotPassport from "./Login/Forgot_password";
import ResetPassword from "./Login/Reset_password";

const { Content } = Layout;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated =
    localStorage.getItem("username") && localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/homeAuto");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const isHomeAutoPage = location.pathname === "/homeAuto";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isHomeAutoPage && <Sidebar />}
      <Layout>
        <NavBar />

        <Content style={{ padding: "64px", height: "100%" }}>
          <Routes>
            <Route path="/forgot-password" element={<ForgotPassport />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/listUser" element={<UserList />} />

              <Route path="/listdep" element={<DepartmentList />} />
              <Route path="/homeAuto" element={<HomeAuto />} />
              <Route path="/requests" element={<RequestList />} />
              <Route path="/homePages" element={<HomeAuto />} />
              <Route
                path="/autoMess/:id"
                element={<AutomatisationMessenger />}
              />
              <Route
                path="/questionRequestAi"
                element={<QuestionRequestAi />}
              />
              <Route path="/request/:id" element={<RequestModify />} />
              <Route path="/selectedRequest/:id" element={<RequestItem />} />
              <Route path="/addRequest" element={<RequestAdd />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/addUser" element={<AddUserForm />} />
              <Route path="/history" element={<History />} />
              <Route path="/addDep" element={<AddDepartmentForm />} />
              <Route path="/addRole" element={<AddRoleForm />} />
              <Route path="/listRole" element={<RoletList />} />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
