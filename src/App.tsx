import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import RequestList from "./CustomRequest/RequestList";
import RequestAdd from "./CustomRequest/RequestAdd";
import RequestModify from "./CustomRequest/RequestModify";
import RequestItem from "./CustomRequest/RequestItem";
import "./App.css";
import Chatbot from "./CustomRequest/ChatBot";
import Login from "./Login/LogIn";
import PrivateRoutes from "./PrivateRoutes";
import AddUserForm from "./CustomRequest/AddUser";
import AddDepartmentForm from "./CustomRequest/AddDep";
import History from "./CustomRequest/Historiqe";
import Sidebar from "./CustomRequest/SideNavBar";
import NavBar from "./CustomRequest/NavBar";
import AutomatisationMessenger from "./Automatisation/AutomatisationMessenger";
import HomeAuto from "./Automatisation/HomeAuto";

const { Content } = Layout;

function App() {
  const location = useLocation();

  const isHomeAutoPage = location.pathname === "/homeAuto";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isHomeAutoPage && <Sidebar />}
      <Layout>
        <NavBar />

        <Content style={{ padding: "64px", height: "100%" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/homeAuto" element={<HomeAuto />} />
              <Route path="/requests" element={<RequestList />} />
              <Route path="/autoMess" element={<AutomatisationMessenger />} />
              <Route path="/request/:id" element={<RequestModify />} />
              <Route path="/selectedRequest/:id" element={<RequestItem />} />
              <Route path="/addRequest" element={<RequestAdd />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/addUser" element={<AddUserForm />} />
              <Route path="/history" element={<History />} />
              <Route path="/addDep" element={<AddDepartmentForm />} />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
