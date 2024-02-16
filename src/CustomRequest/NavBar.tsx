import { Menu } from "antd";
import {
  LogoutOutlined,
  RobotOutlined,
  MenuOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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

  const handleList = () => {
    navigate("/requests");
  };

  const handleAddRequest = () => {
    navigate("/addRequest");
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
        onClick={handleList}
        style={{ marginLeft: "10px" }}
        icon={<MenuOutlined />}
      >
        List
      </Menu.Item>
      <Menu.Item
        key="addRequest"
        onClick={handleAddRequest}
        style={{ marginLeft: "10px" }}
        icon={<PlusOutlined />}
      >
        Add Request
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} style={{ float: "left" }}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default LogoutButton;
