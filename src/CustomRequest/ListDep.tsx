import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Input,
  Drawer,
  Pagination,
  Spin,
} from "antd";

import { Department } from "../types/department";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteDep, getDeps } from "../services/departmentService";
import AddDepartmentForm from "./AddDep";

const { Search } = Input;

const DepartmentList = () => {
  const [isDepartmentDrawerVisible, setIsDepartmentDrawerVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([]);
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
      setLoading(true);
      const response = await getDeps();
      const formattedDepartments = response.map((name: any, index: any) => ({
        id: index.toString(), // You can use index as the ID if needed
        name: name,
      }));
      setDepartments(formattedDepartments);
    } catch (error) {
      console.error("Error fetching departments : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = () => {
    setIsDepartmentDrawerVisible(true);
  };

  const handleView = (departmentId: string) => {
    navigate(`/department/${departmentId}`);
  };

  const handleModify = (departmentId: string) => {
    navigate(`/department/${departmentId}/edit`);
  };

  const handleDelete = async (departmentId: string) => {
    try {
      await deleteDep(departmentId);
      fetchData();
    } catch (error) {
      console.error("Error deleting department: ", error);
    }
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
      title: "Actions",
      key: "actions",
      align: "center", // Center align the content
      width: 200, // Set fixed width for the actions column
      render: (_: any, record: Department) => (
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
            title="Are you sure you want to delete this department?"
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
      {" "}
      {/* Center align the table */}
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "cursive",
        }}
      >
        Department List{" "}
        <FolderAddOutlined style={{ marginLeft: "10px", color: "red" }} />
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <Search
            placeholder="Search departments"
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
            suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
          />
        </div>
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddDepartment}
          >
            Add Department
          </Button>
        </div>
      </div>
      <Spin spinning={loading}>
        <Table
          dataSource={departments}
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
    </div>
  );
};

export default DepartmentList;
