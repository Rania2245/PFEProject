import { Drawer, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ApartmentOutlined,
  ApiOutlined,
  DatabaseOutlined,
  FolderAddOutlined,
  HistoryOutlined,
  LogoutOutlined,
  OpenAIOutlined,
  PlusCircleOutlined,
  RobotOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import RequestAdd from "./RequestAdd";
import AddUserForm from "./AddUser";
import AddDepartmentForm from "./AddDep";
import sidebarLogo from "../assets/crm.jpg";
import AddRoleForm from "./AddRole";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [hovered, setHovered] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const tokenExists = !!token;
    setTokenExists(tokenExists);
    const email = localStorage.getItem("userEmail");
    //@ts-expect-error
    setUserEmail(email);
  }, [token]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/");
    window.location.reload();
  };

  const [isRequestDrawerVisible, setIsRequestDrawerVisible] = useState(false);
  const [isUserDrawerVisible, setIsUserDrawerVisible] = useState(false);
  const [isDepartmentDrawerVisible, setIsDepartmentDrawerVisible] =
    useState(false);

  const [isRoleDrawerVisible, setIsRoleDrawerVisible] = useState(false);

  const handleAddRequest = () => {
    setIsRequestDrawerVisible(true);
  };

  const handleAddUser = () => {
    setIsUserDrawerVisible(true);
  };

  const handleAddDepartment = () => {
    setIsDepartmentDrawerVisible(true);
  };
  const handleAddRole = () => {
    setIsRoleDrawerVisible(true);
  };

  const handleChatBot = () => {
    navigate("/chatbot");
  };
  const handleAutoMess = () => {
    navigate("/autoMess");
  };

  if (!tokenExists) {
    return null;
  }

  return (
    <Sider
      width={hovered ? 250 : 80}
      style={{
        backgroundColor: "#f0f0f0",
        color: "#000",
        left: 0,
        top: 0,
        overflowY: "auto",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "64px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            zIndex: 10,
          }}
        >
          <img
            src={sidebarLogo}
            alt="sidebar Image"
            style={{
              width: "50%",
              maxWidth: "50px",
              borderRadius: "50%",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>
      <div
        style={{ height: "1px", backgroundColor: "#ccc", margin: "0 24px" }}
      />
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          backgroundColor: "#f0f0f0",
          color: "#000",
          borderRight: 0,
          display: hovered ? "block" : "none",
        }}
      >
        {" "}
        <Menu.Item
          key="60"
          icon={<OpenAIOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "10px",
          }}
        >
          <Link to="/questionRequestAi" style={{ color: "#000" }}>
            Generer Base de Connaissanceavec AI
          </Link>
        </Menu.Item>
        <Menu.Item
          key="1"
          icon={<DatabaseOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "10px",
          }}
        >
          <Link to="/requests" style={{ color: "#000" }}>
            Base de Connaissance
          </Link>
        </Menu.Item>
        <Menu.Item
          key="8"
          icon={<ApartmentOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "10px",
          }}
        >
          <Link to="/listdep" style={{ color: "#000" }}>
            Departmnet List
          </Link>
        </Menu.Item>
        <Menu.Item
          key="10"
          icon={<UserOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "10px",
          }}
        >
          <Link to="/listUser" style={{ color: "#000" }}>
            User List
          </Link>
        </Menu.Item>
        <Menu.Item
          key="107"
          icon={<UserOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "10px",
          }}
        >
          <Link to="/listRole" style={{ color: "#000" }}>
            Role List
          </Link>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<HistoryOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "10px",
          }}
        >
          <Link to="/history" style={{ color: "#000" }}>
            Historique
          </Link>
        </Menu.Item>
        <Menu.Item
          key="9"
          onClick={handleChatBot}
          style={{ transition: "background-color 0.3s", marginBottom: "10px" }}
          icon={<RobotOutlined />}
        >
          ChatBot
        </Menu.Item>
        <Menu.Item
          key="addRequest"
          onClick={handleAddRequest}
          style={{
            marginLeft: "10px",
            marginBottom: "10px",
          }}
          icon={<PlusCircleOutlined />}
        >
          Add Request
        </Menu.Item>
        <Menu.Item
          key="addUser"
          onClick={handleAddUser}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
          icon={<UserAddOutlined />}
        >
          Add User
        </Menu.Item>
        <Menu.Item
          key="addDepartment"
          onClick={handleAddDepartment}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
          icon={<FolderAddOutlined />}
        >
          Add Department
        </Menu.Item>
        <Menu.Item
          key="add Role"
          onClick={handleAddRole}
          style={{ marginLeft: "10px", marginBottom: "10px" }}
          icon={<FolderAddOutlined />}
        >
          Add Role
        </Menu.Item>
        <Menu.Item
          key="14"
          icon={<HistoryOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "100px",
          }}
        >
          <Link to="/homePages" style={{ color: "#000" }}>
            home Pages
          </Link>
        </Menu.Item>
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginTop: "auto",
            marginBottom: "10px",
          }}
          onClick={handleLogout}
        >
          Déconnexion
        </Menu.Item>
      </Menu>
      <Drawer
        title="Add Request"
        placement="right"
        closable={true}
        onClose={() => setIsRequestDrawerVisible(false)}
        visible={isRequestDrawerVisible}
        width={800}
      >
        <RequestAdd onCancel={() => setIsRequestDrawerVisible(false)} />
      </Drawer>
      <Drawer
        title="Add User"
        placement="right"
        closable={true}
        onClose={() => setIsUserDrawerVisible(false)}
        visible={isUserDrawerVisible}
        width={800}
      >
        <AddUserForm onCancel={() => setIsUserDrawerVisible(false)} />
      </Drawer>

      <Drawer
        title="Add Department"
        placement="right"
        closable={true}
        onClose={() => setIsDepartmentDrawerVisible(false)}
        visible={isDepartmentDrawerVisible}
        width={400}
      >
        <AddDepartmentForm
          onCancel={() => setIsDepartmentDrawerVisible(false)}
        />
      </Drawer>
      <Drawer
        title="Add role"
        placement="right"
        closable={true}
        onClose={() => setIsRoleDrawerVisible(false)}
        visible={isRoleDrawerVisible}
        width={400}
      >
        <AddRoleForm onCancel={() => setIsRoleDrawerVisible(false)} />
      </Drawer>
    </Sider>
  );
};

export default Sidebar;
