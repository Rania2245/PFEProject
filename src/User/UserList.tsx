import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Input,
  Pagination,
  Spin,
  Select,
  Drawer,
} from "antd";
import { deleteUser, getAllUsers } from "../services/UserService";
import { User } from "../types/user";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import AddUserForm from "./AddUser";
import UserModify from "./UserModifier";

const { Search } = Input;
const { Option } = Select;

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isUserDrawerVisible, setIsUserDrawerVisible] = useState(false);
  const handleSelectChange = (value: string, record: User) => {
    console.log("Selected value:", value);
    console.log("Record:", record);
  };
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isModifyDrawerVisible, setIsModifyDrawerVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching users: ", error);
    } finally {
      setLoading(false);
    }
  };
  const capitalizeName = (name: any) => {
    return name.replace(/\b\w/g, (char: any) => char.toUpperCase());
  };

  const refreshPage = () => {
    fetchData();
  };

  const handleView = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const handleModify = (record: User) => {
    if (record.id) {
      setSelectedUserId(record.id);
      setIsModifyDrawerVisible(true);
    }
  };

  const handleDelete = async (record: User) => {
    try {
      await deleteUser(record.id);
      fetchData();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };
  const handleAdd = () => {
    setIsUserDrawerVisible(true);
  };

  const handleSearch = async (value: string) => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      const filteredUsers = response.filter((user: User) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error searching users: ", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name: any) => capitalizeName(name),
    },
    {
      title: "Department",
      dataIndex: "departments",
      key: "departments",
      align: "center",
      render: (departments: string[], record: User) => (
        <Select
          mode="tags"
          style={{ width: 200 }}
          placeholder="Select or input departments"
          defaultValue={departments.length > 0 ? departments[0] : undefined}
          onChange={(value) => handleSelectChange(value, record)}
          allowClear
        >
          {departments.map((department, index) => (
            <Option key={`department_${index}`} value={department}>
              {department}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      align: "center",
      render: (roles: string[], record: User) => (
        <Select
          mode="tags"
          style={{ width: 200 }}
          placeholder="Select or input role"
          defaultValue={roles.length > 0 ? roles[0] : undefined}
          onChange={(value) => handleSelectChange(value, record)}
          allowClear
        >
          {roles.map((role, index) => (
            <Option key={`roles${index}`} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 200,
      render: (_: any, record: User) => (
        <Space>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleModify(record)}
          >
            Modify
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px", fontFamily: "cursive" }}>
        <UsergroupAddOutlined
          style={{ marginLeft: "10px", color: "red" }}
          onClick={handleAdd}
        />
        User List
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Search
            placeholder="Search users"
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
            suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add User
          </Button>
        </div>
      </div>
      <Spin spinning={loading}>
        <Table
          dataSource={users}
          //@ts-expect-error
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </Spin>
      <Pagination
        style={{ marginTop: "20px", textAlign: "center" }}
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        showSizeChanger
        showQuickJumper
        onChange={(page, pageSize) =>
          setPagination({ ...pagination, current: page, pageSize })
        }
        onShowSizeChange={(current, size) =>
          setPagination({ ...pagination, current: 1, pageSize: size })
        }
      />
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
      {selectedUserId && (
        <Drawer
          title="Modify User"
          placement="right"
          closable={true}
          onClose={() => setIsModifyDrawerVisible(false)}
          visible={isModifyDrawerVisible}
          width={700}
          destroyOnClose={true}
          afterVisibleChange={refreshPage}
        >
          <UserModify
            id={selectedUserId}
            visible={isModifyDrawerVisible}
            onCancel={() => setIsModifyDrawerVisible(false)}
          />
        </Drawer>
      )}
    </div>
  );
};

export default UserList;
