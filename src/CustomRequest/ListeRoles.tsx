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

import { Role } from "../types/Role";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  FolderAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { deleteDep, getDeps } from "../services/departmentService";
import AddDepartmentForm from "./AddDep";
import { deleteRoles, getRoles } from "../services/RoleService";

const { Search } = Input;

const RoletList = () => {
  const [isRoleDrawerVisible, setIsRoleDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [Role, setRole] = useState<Role[]>([]);
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
      const response = await getRoles();
      const formattedRoles = response.map((name: any, index: any) => ({
        id: index.toString(),
        name: name,
      }));
      setRole(formattedRoles);
    } catch (error) {
      console.error("Error fetching role : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = () => {
    setIsRoleDrawerVisible(true);
  };

  const handleView = (RoleId: string) => {
    navigate(`/role/${RoleId}`);
  };

  const handleModify = (RoleId: string) => {
    navigate(`/role/${RoleId}/edit`);
  };

  const handleDelete = async (RoleId: string) => {
    try {
      await deleteRoles(RoleId);
      fetchData();
    } catch (error) {
      console.error("Error deleting role: ", error);
    }
  };

  const handleSearch = async (value: string) => {};

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
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 200,
      render: (_: any, record: Role) => (
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
            title="Are you sure you want to delete this role?"
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
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "cursive",
        }}
      >
        Role List icon={<UserOutlined style={{ color: "#000" }} />}
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
            placeholder="Search Rôle"
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
            onClick={handleAddRole}
          >
            Add Role
          </Button>
        </div>
      </div>
      <Spin spinning={loading}>
        <Table
          dataSource={Role}
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
        title="Add Role"
        placement="right"
        closable={true}
        onClose={() => setIsRoleDrawerVisible(false)}
        visible={isRoleDrawerVisible}
        width={300}
      >
        <AddDepartmentForm onCancel={() => setIsRoleDrawerVisible(false)} />
      </Drawer>
    </div>
  );
};

export default RoletList;
