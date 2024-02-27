import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  DatabaseOutlined,
  HistoryOutlined,
  LogoutOutlined,
  RobotOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
  const token = localStorage.getItem("token");
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    window.location.reload();
  };

  if (!token) {
    return null;
  }

  return (
    <Sider
      width={hovered ? 250 : 80}
      style={{ backgroundColor: "#f0f0f0", color: "#000" }}
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
        {hovered ? (
          <UnorderedListOutlined style={{ fontSize: "24px", color: "#000" }} />
        ) : (
          <UnorderedListOutlined style={{ fontSize: "24px", color: "#000" }} />
        )}
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
          key="2"
          icon={<HistoryOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "600px",
          }}
        >
          <Link to="/history" style={{ color: "#000" }}>
            Historique
          </Link>
        </Menu.Item>

        <Menu.Item
          key="logout"
          icon={<LogoutOutlined style={{ color: "#000" }} />}
          style={{
            transition: "background-color 0.3s",
            marginBottom: "10px",
          }}
          onClick={handleLogout}
        >
          Déconnexion
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
