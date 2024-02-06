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
//import { useHistory } from "react-router-dom";
const RequestList = () => {
  const [requests, setRequests] = useState<QuestionRequest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getRequests();
      setRequests(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const handleView = (record: QuestionRequest) => {
    // history.push(`/requests/${record.id}`);
    navigate(`/requests/${record.id}`);
  };

  const handleModify = (record: QuestionRequest) => {
    //history.push(`/requests/${record.id}/modify`);
    navigate(`/requests/${record.id}/modify`);
  };

  const handleDelete = async (record: QuestionRequest) => {
    try {
      await deleteRequest(record.id);
      fetchData();
    } catch (error) {
      console.error("Error deleting record: ", error);
    }
  };

  const Actions = [
    ...requestColumns,
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: QuestionRequest) => (
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
      <Button type="primary" icon={<PlusOutlined />}>
        Add Request
      </Button>
      <Table dataSource={requests} columns={Actions} />
    </>
  );
};

export default RequestList;
