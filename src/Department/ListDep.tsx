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
import {
  deleteDep,
  findDepByName,
  getDeps,
} from "../services/departmentService";
import AddDepartmentForm from "./AddDep";
import DepModify from "./UpdateDep";

const { Search } = Input;

const DepartmentList = () => {
  const [isDepartmentDrawerVisible, setIsDepartmentDrawerVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [isModifyDrawerVisible, setIsModifyDrawerVisible] = useState(false);
  const [selecteddepId, setSelecteddepId] = useState<string | null>(null);

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
      console.log(response);
      const formattedDepartments = response.map((department: Department) => ({
        id: department.id.toString(), // Assuming department.id is a number
        name: department.name,
      }));
      setDepartments(formattedDepartments);
    } catch (error) {
      console.error("Error fetching departments:", error);
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

  const handleModify = (record: Department) => {
    setSelecteddepId(record.id);
    setIsModifyDrawerVisible(true);
  };

  const handleDelete = async (departmentId: string) => {
    try {
      await deleteDep(departmentId);
      fetchData();
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  const handleSearch = async (value: string) => {
    try {
      setLoading(true);
      const response = await findDepByName(value);
      console.log(response);
      setDepartments(response);
    } catch (error) {
      console.error("Error searching departments:", error);
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
      render: (_: any, record: Department) => (
        <Space>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleModify(record)}
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
            placeholder="Search departments by name"
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
      <Modal
        title="Modify Dep"
        visible={isModifyDrawerVisible}
        onCancel={() => setIsModifyDrawerVisible(false)}
        footer={null}
      >
        {selecteddepId && (
          <DepModify
            id={selecteddepId}
            visible={isModifyDrawerVisible}
            onCancel={() => setIsModifyDrawerVisible(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default DepartmentList;
