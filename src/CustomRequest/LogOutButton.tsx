import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Menu
      mode="horizontal"
      style={{
        backgroundColor: "#f0f2f5",
        textAlign: "right",
        paddingRight: "20px",
      }}
    >
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default LogoutButton;
