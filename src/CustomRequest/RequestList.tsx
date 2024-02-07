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

const RequestList = () => {
  const [requests, setRequests] = useState<QuestionRequest[]>([]);
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

  const filteredRequests = requests.filter((request) => request.partage);

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
            title="Êtes-vous sûr de bien vouloir supprimer cet élément?"
            onConfirm={() => handleDelete(record)}
            okText="Oui"
            cancelText="Non"
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
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Request
      </Button>
      <Table dataSource={filteredRequests} columns={Actions} />
    </>
  );
};

export default RequestList;