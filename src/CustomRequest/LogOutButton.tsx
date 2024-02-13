import { Menu } from "antd";
import { LogoutOutlined, RobotOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleChatBot = () => {
    navigate("/chatbot");
  };

  return (
    <Menu
      mode="horizontal"
      style={{
        backgroundColor: "#f0f0f0",
        color: "#000",
        lineHeight: "64px",
        paddingRight: "20px",
      }}
      defaultSelectedKeys={[""]}
      selectable={false}
    >
      <Menu.Item
        key="chatbot"
        onClick={handleChatBot}
        style={{ marginLeft: "10px" }}
        icon={<RobotOutlined />}
      >
        ChatBot
      </Menu.Item>
      <Menu.Item
        key="list"
        style={{ marginLeft: "10px" }}
        icon={<MenuOutlined />}
      >
        List
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} style={{ float: "left" }}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default LogoutButton;
