import { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { deleteRequest, getRequests } from "../services/CustomRequestService";
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
    <>
      <LogoutButton />

      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Request
      </Button>
      <Table
        dataSource={requests}
        columns={Actions}
        rowKey={(record) => record.id.toString()}
      />
    </>
  );
};

export default RequestList;
