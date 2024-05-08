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
              Automatiser
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
            <Link to="/requests">Base de Connaissance</Link>
          </Menu.Item>
          <Menu.Item
            key="aiKnowledgeBase"
            icon={<ApiOutlined />}
            style={{ color: "#000" }}
          >
            <Link to="/questionRequestAi">
              Gérer Base de Connaissance avec AI
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>

        {userRole === "admin" && (
          <Menu.ItemGroup
            style={{ marginBottom: "30px" }}
            key="user"
            title={
              <span style={{ fontWeight: "bold" }}>
                Users{" "}
                <UserDeleteOutlined
                  style={{ marginLeft: "10px", color: "#000" }}
                />
              </span>
            }
          >
            <Menu.Item key="userList" icon={<UserOutlined />}>
              <Link to="/listUser">Gérer les utilisateurs </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        )}
        <Menu.ItemGroup
          style={{ marginBottom: "30px" }}
          key="Historique"
          title={
            <span style={{ fontWeight: "bold" }}>
              Historique
              <FolderViewOutlined
                style={{
                  marginLeft: "10px",
                  color: "#000",
                  marginBottom: userRole !== "admin" ? "100px" : "0",
                }}
              />
            </span>
          }
        >
          <Menu.Item key="history" icon={<HistoryOutlined />}>
            <Link to="/history"> Consulter Historique</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        {userRole === "admin" && (
          <Menu.ItemGroup
            style={{ marginBottom: "30px" }}
            key="settings"
            title={
              <span style={{ fontWeight: "bold" }}>
                Paramètres
                <SettingOutlined
                  style={{ marginLeft: "10px", color: "#000" }}
                />
              </span>
            }
          >
            <Menu.Item key="roleList" icon={<UnorderedListOutlined />}>
              <Link to="/listRole"> Gérer les Rôle </Link>
            </Menu.Item>
            <Menu.Item
              key="departmentList"
              icon={<ApartmentOutlined />}
              style={{ marginBottom: "180px" }}
            >
              <Link to="/listdep"> Gérer les Department </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        )}

        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
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
