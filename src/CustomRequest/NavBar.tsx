import { useState, useEffect } from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  useState(false);
  const [tokenExists, setTokenExists] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const tokenExists = localStorage.getItem("token") ? true : false;
    setTokenExists(tokenExists);
    const email = localStorage.getItem("userEmail");
    //@ts-expect-error
    setUserEmail(email);
  }, []);

  if (!tokenExists) {
    return null;
  }

  return (
    <>
      {tokenExists}
      <Menu
        mode="horizontal"
        style={{
          backgroundColor: "#f0f0f0",
          color: "#000",
          lineHeight: "64px",
          paddingRight: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
        defaultSelectedKeys={[""]}
        selectable={false}
      >
        <Menu.Item
          key="addUser"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          {userEmail && <span style={{ marginRight: "5px" }}>{userEmail}</span>}
          <Avatar icon={<UserOutlined />} />
        </Menu.Item>
      </Menu>
    </>
  );
};

export default LogoutButton;
