import { Menu, Modal } from "antd";
import {
  LogoutOutlined,
  RobotOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import RequestAdd from "./RequestAdd";
import { useState } from "react";
import AddUserForm from "./AddUser";
import AddDepartmentForm from "./AddDep";

const LogoutButton = () => {
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isDepartmentModalVisible, setIsDepartmentModalVisible] =
    useState(false);
  const navigate = useNavigate();

  const handleAddRequest = () => {
    setIsRequestModalVisible(true);
  };

  const handleAddUser = () => {
    setIsUserModalVisible(true);
  };

  const handleAddDepartment = () => {
    setIsDepartmentModalVisible(true);
  };

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

  return (
    <>
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
          key="logout"
          onClick={handleLogout}
          style={{ float: "left" }}
        >
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
      <Modal
        title="Add Request"
        visible={isRequestModalVisible}
        footer={null}
        onCancel={() => setIsRequestModalVisible(false)}
        width={800}
        style={{ position: "fixed", top: 0, right: 0, height: "1000vh" }}
      >
        <RequestAdd />
      </Modal>
      <Modal
        title="Add User"
        visible={isUserModalVisible}
        footer={null}
        onCancel={() => setIsUserModalVisible(false)}
        width={800}
        style={{ position: "fixed", top: 0, right: 0, height: "1000vh" }}
      >
        <AddUserForm />
      </Modal>
      <Modal
        title="Add Department"
        visible={isDepartmentModalVisible}
        footer={null}
        onCancel={() => setIsDepartmentModalVisible(false)}
        width={800}
        style={{ position: "fixed", top: 0, right: 0, height: "1000vh" }}
      >
        <AddDepartmentForm />
      </Modal>
    </>
  );
};

export default LogoutButton;
