import { useState, useEffect } from "react";
import { Menu, Avatar, Dropdown, Space } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const [tokenExists, setTokenExists] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const tokenExists = localStorage.getItem("token") ? true : false;
    setTokenExists(tokenExists);
    const email = localStorage.getItem("userEmail");
    //@ts-expect-error
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.reload();
  };

  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setShowLogout(false);
  };

  if (!tokenExists) {
    return null;
  }

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Log Out <LogoutOutlined />
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        marginBottom: "16px",
        backgroundColor: "#f0f0f0",
        height: "70px",
      }}
    >
      <div
        style={{
          marginBottom: "16px",
          backgroundColor: "#f0f0f0",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Space wrap>
          <Dropdown.Button
            overlay={menu}
            onClick={handleMouseEnter}
            //@ts-expect-error
            onMouseLeave={handleMouseLeave}
            icon={<UserOutlined />}
            style={{
              border: "none",
              backgroundColor: "#f0f0f0",
            }}
          >
            {userEmail && (
              <span style={{ marginLeft: "8px", marginRight: "8px" }}>
                {userEmail}
              </span>
            )}
          </Dropdown.Button>
          {showLogout && (
            <Menu
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
            >
              <Menu.Item key="logout" onClick={handleLogout}>
                <Space>
                  <LogoutOutlined />
                  Déconnexion
                </Space>
              </Menu.Item>
            </Menu>
          )}
        </Space>
      </div>
    </div>
  );
};

export default LogoutButton;
