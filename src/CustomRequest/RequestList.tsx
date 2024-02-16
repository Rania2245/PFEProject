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
import LogoutButton from "./NavBar";
import { GetRowKey } from "antd/es/table/interface";
import moment from "moment";
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

      const formattedRequests: QuestionRequest[] = response.map(
        (item: any) => ({
          id: item.id,
          active: item.active,
          partage: item.partage,
          questions: item.questions.map((q: { text: string }) => q.text),
          responses: item.responses.map((r: { text: string }) => r.text),
          created_at: item.created_at,
          user_id: 0,
        })
      );

      setRequests(formattedRequests);
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
      await deleteRequest(Number(record.id));
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

  const getRowClassName = (record: QuestionRequest, index: number) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  const getRowKey: GetRowKey<QuestionRequest> = (record) => {
    return record.id ? record.id.toString() : "";
  };

  return (
    <>
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
            Ajouter Une Base De Connaissance
          </Button>
        </div>
        <Table
          dataSource={requests}
          columns={Actions}
          rowKey={getRowKey}
          bordered
          pagination={{ pageSize: 10 }}
          rowClassName={getRowClassName}
        />
      </div>
    </>
  );
};

export default RequestList;
