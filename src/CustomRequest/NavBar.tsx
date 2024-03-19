import { useState, useEffect } from "react";
import { Menu, Drawer, Image, Avatar } from "antd";
import {
  RobotOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
  ApartmentOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RequestAdd from "./RequestAdd";
import AddUserForm from "./AddUser";
import AddDepartmentForm from "./AddDep";

const LogoutButton = () => {
  const [isRequestDrawerVisible, setIsRequestDrawerVisible] = useState(false);
  const [isUserDrawerVisible, setIsUserDrawerVisible] = useState(false);
  const [isDepartmentDrawerVisible, setIsDepartmentDrawerVisible] =
    useState(false);
  const [tokenExists, setTokenExists] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExists = localStorage.getItem("token") ? true : false;
    setTokenExists(tokenExists);
    const email = localStorage.getItem("userEmail");
    //@ts-expect-error
    setUserEmail(email);
  }, []);

  const handleAddRequest = () => {
    setIsRequestDrawerVisible(true);
  };

  const handleAddUser = () => {
    setIsUserDrawerVisible(true);
  };

  const handleAddDepartment = () => {
    setIsDepartmentDrawerVisible(true);
  };

  const handleChatBot = () => {
    navigate("/chatbot");
  };

  const handleList = () => {
    navigate("/requests");
  };

  if (!tokenExists) {
    return null;
  }

  return (
    <>
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
        <Menu.Item key="logo" style={{ marginRight: "auto" }}>
          <Image src="src/assets/crm.jpg" preview={false} width={40} />
        </Menu.Item>
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
          icon={<PlusCircleOutlined />}
        >
          Add Request
        </Menu.Item>
        <Menu.Item
          key="addUser"
          onClick={handleAddUser}
          style={{ marginLeft: "10px" }}
          icon={<UserAddOutlined />}
        >
          Add User
        </Menu.Item>
        <Menu.Item
          key="addDepartment"
          onClick={handleAddDepartment}
          style={{ marginLeft: "10px" }}
          icon={<ApartmentOutlined />}
        >
          Add Department
        </Menu.Item>
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
        width={800}
      >
        <AddDepartmentForm
          onCancel={() => setIsDepartmentDrawerVisible(false)}
        />
      </Drawer>
    </>
  );
};

export default LogoutButton;
