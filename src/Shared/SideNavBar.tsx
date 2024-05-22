import { Drawer, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ApartmentOutlined,
  ApiOutlined,
  DatabaseOutlined,
  FolderAddOutlined,
  FolderViewOutlined,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  OpenAIOutlined,
  PlusCircleOutlined,
  RobotOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import RequestAdd from "../CustomRequest/RequestAdd";
import AddUserForm from "../User/AddUser";
import AddDepartmentForm from "../Department/AddDep";
import sidebarLogo from "../assets/crm.jpg";
import AddRoleForm from "../Role/AddRole";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [tokenExists, setTokenExists] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const tokenExists = !!token;
    setTokenExists(tokenExists);
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("role");
    //@ts-expect-error
    setUserEmail(email);
    //@ts-expect-error
    setUserRole(role);
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
    localStorage.removeItem("userRole");
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

  if (!tokenExists) {
    return null;
  }

  return (
    <Sider
      width={hovered ? 250 : 70}
      style={{
        backgroundColor: "#f0f0f0",
        color: "#000",
        left: 0,
        top: 0,
        overflowY: "auto",
        position: "fixed",
        height: "100vh",
        zIndex: hovered ? 1000 : 1,
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
        <Menu.ItemGroup
          style={{ marginBottom: "30px" }}
          key="automatiser"
          title={
            <span style={{ fontWeight: "bold" }}>
              Automation
              <OpenAIOutlined style={{ marginLeft: "10px", color: "#000" }} />
            </span>
          }
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="/homePages">Home Page</Link>
          </Menu.Item>
          <Menu.Item
            key="knowledgeBase"
            icon={<DatabaseOutlined />}
            style={{ color: "#000" }}
          >
            <Link to="/requests">knowledge base</Link>
          </Menu.Item>
          <Menu.Item
            key="aiKnowledgeBase"
            icon={<ApiOutlined />}
            style={{ color: "#000" }}
          >
            <Link to="/questionRequestAi"> Knowledge Base with AI</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        {userRole === "admin" && (
          <Menu.ItemGroup key="user">
            <Menu.Item key="userList" icon={<UserOutlined />}>
              <Link to="/listUser">Managing Users</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        )}
        <Menu.ItemGroup style={{ marginBottom: "30px" }} key="Historique">
          <Menu.Item key="history" icon={<HistoryOutlined />}>
            <Link to="/history"> View History</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        {userRole === "admin" && (
          <>
            <Menu.Item
              onClick={() => setShowSubMenu(!showSubMenu)}
              key="settings"
              icon={<SettingOutlined style={{ color: "#000" }} />}
            >
              <span style={{ fontWeight: "bold" }}>Settings</span>
              <span style={{ marginLeft: "10px" }}>
                {showSubMenu ? "▼" : "►"}
              </span>
            </Menu.Item>
            {showSubMenu && (
              <>
                <Menu.Item key="roleList" icon={<UnorderedListOutlined />}>
                  <Link to="/listRole"> Manage Roles</Link>
                </Menu.Item>
                <Menu.Item key="departmentList" icon={<ApartmentOutlined />}>
                  <Link to="/listdep">Manage Departments </Link>
                </Menu.Item>
              </>
            )}
          </>
        )}

        <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            style={{ marginBottom: "40px" }}
            onClick={handleLogout}
          >
            Log Out
          </Menu.Item>
        </div>
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
