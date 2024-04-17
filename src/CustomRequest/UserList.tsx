import React, { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, Input, Pagination } from "antd";
import { deleteUser, getAllUsers } from "../services/UserService";
import { User } from "../types/user";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const handleView = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const handleModify = (userId: string) => {
    navigate(`/user/${userId}/edit`);
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      fetchData();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  const handleAdd = () => {
    navigate("/user/add");
  };

  const handleSearch = async (value: string) => {
    // Implement search functionality here
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100, // Set fixed width for all columns
      align: "center", // Center align the content
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center", // Center align the content
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      align: "center", // Center align the content
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center", // Center align the content
    },
    {
      title: "Actions",
      key: "actions",
      align: "center", // Center align the content
      width: 200, // Set fixed width for the actions column
      render: (_: any, record: User) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record.id)}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleModify(record.id)}
          >
            Modify
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
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
      <h2 style={{ marginBottom: "20px" }}>
        User List{" "}
        <PlusOutlined
          style={{ marginLeft: "10px", color: "red" }}
          onClick={handleAdd}
        />
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <Search
          placeholder="Search users"
          allowClear
          onSearch={handleSearch}
          style={{ width: 300 }}
          suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
        />
      </div>
      <Table
        dataSource={users}
        //@ts-expect-error
        columns={columns}
        pagination={false}
        rowKey="id"
      />
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
    </div>
  );
};

export default UserList;
