import React, { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, Input } from "antd";
import {
  deleteRequest,
  getRequests,
  findRequest,
} from "../services/CustomRequestService";
import { QuestionRequest } from "../types/questionrequest";
import requestColumns from "./requestColumns";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogOutButton";

const { Search } = Input;

const RequestList = () => {
  const [requests, setRequests] = useState<readonly QuestionRequest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getRequests();
      setRequests(response);
    } catch (error) {
      console.error("Error fetching requests: ", error);
    }
  };

  const handleView = (record: QuestionRequest) => {
    navigate(`/selectedRequest/${record.id}`);
  };

  const handleModify = (record: QuestionRequest) => {
    navigate(`/request/${record.id}`);
  };

  const handleDelete = async (record: QuestionRequest) => {
    try {
      await deleteRequest(record.id);
      fetchData();
    } catch (error) {
      console.error("Error deleting record: ", error);
    }
  };

  const handleAdd = async () => {
    navigate(`/addRequest`);
  };

  const handleSearch = async (value: string) => {
    try {
      const results = await findRequest(value);
      console.log("Search results:", results);
      setRequests(results);
    } catch (error) {
      console.error("Error while searching:", error);
    }
  };

  const Actions = [
    ...requestColumns,
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: QuestionRequest) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleModify(record)}
          >
            Modify
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this item?"
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
    <div style={{ padding: "20px" }}>
      <LogoutButton />
      <div style={{ margin: "20px 0" }}>
        <Search
          placeholder="Search questions"
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Request
        </Button>
      </div>
      <Table
        dataSource={requests}
        columns={Actions}
        rowKey={(record) => record.id.toString()}
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default RequestList;
