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
  Modal,
} from "antd";

import { Role } from "../types/Role";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getRoles, deleteRoles, findRoleByName } from "../services/RoleService";
import AddRoleForm from "./AddRole";
import RoleModify from "./UpdateRole";

const { Search } = Input;

const RoletList = () => {
  const [isRoleDrawerVisible, setIsRoleDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [isModifyDrawerVisible, setIsModifyDrawerVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getRoles();
      setRoles(response);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = () => {
    setIsRoleDrawerVisible(true);
  };

  const handleModify = (record: Role) => {
    setSelectedRoleId(record.id);
    setIsModifyDrawerVisible(true);
  };

  const handleDelete = async (roleId: string) => {
    try {
      await deleteRoles(roleId);
      fetchData();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleSearch = async (value: string) => {
    try {
      setLoading(true);
      const response = await findRoleByName(value);
      setRoles(response);
    } catch (error) {
      console.error("Error searching roles:", error);
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
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      width: 200,
      render: (_: any, record: Role) => (
        <Space>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleModify(record)}
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
      <h2 style={{ fontFamily: "cursive" }}>
        Role List <UserOutlined style={{ color: "#000" }} />
      </h2>
      <div style={{ marginBottom: "20px" }}>
        <Search
          placeholder="Search Role"
          allowClear
          onSearch={handleSearch}
          style={{ width: 300, marginRight: "20px" }}
          suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRole}>
          Add Role
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          dataSource={roles}
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
        <AddRoleForm onCancel={() => setIsRoleDrawerVisible(false)} />
      </Drawer>
      <Modal
        title="Modify Role"
        visible={isModifyDrawerVisible}
        onCancel={() => setIsModifyDrawerVisible(false)}
        footer={null}
      >
        {selectedRoleId && (
          <RoleModify
            id={selectedRoleId}
            visible={isModifyDrawerVisible}
            onCancel={() => setIsModifyDrawerVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default RoletList;
