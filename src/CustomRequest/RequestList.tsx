import { useState, useEffect } from "react";
import { Table, Button, Space, Popconfirm, Input, Modal, Select } from "antd";

import { deleteRequest, getRequests } from "../services/CustomRequestService";
import { QuestionRequest } from "../types/questionrequest";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./NavBar";
import { GetRowKey } from "antd/es/table/interface";
import RequestAdd from "./RequestAdd";

const { Search } = Input;
const { Option } = Select;

const RequestList = () => {
  const [requests, setRequests] = useState<readonly QuestionRequest[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

      console.log(formattedRequests);
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
    setIsModalVisible(true);
  };

  const handleSearch = async (value: string) => {
    try {
      if (value.trim() === "") {
        fetchData();
      } else {
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
        const results = formattedRequests.filter((request) =>
          request.questions.some((question) =>
            //@ts-expect-error
            question.toLowerCase().includes(value.toLowerCase())
          )
        );
        setRequests(results);
      }
    } catch (error) {
      console.error("Error while searching:", error);
    }
  };

  const renderQuestion = (record: QuestionRequest) => {
    return (
      <Select
        mode="tags"
        style={{ width: 200 }}
        placeholder="Select or input tags"
        defaultValue={record.questions[0]}
        onChange={(value) => handleSelectChange(value.text, record)}
        allowClear={true}
      >
        {record.questions.map((questions, index) => (
          <Option key={index} value={questions}>
            {questions.text}
          </Option>
        ))}
      </Select>
    );
  };
  const renderResponse = (record: QuestionRequest) => {
    return (
      <Select
        mode="tags"
        style={{ width: 200 }}
        placeholder="Select or input tags"
        defaultValue={record.responses[0]}
        onChange={(value) => handleSelectChange(value.text, record)}
        allowClear={true}
      >
        {record.responses.map((response, index) => (
          <Option key={index} value={response}>
            {response.text}
          </Option>
        ))}
      </Select>
    );
  };

  const handleSelectChange = (value: string, record: QuestionRequest) => {
    console.log("Selected value:", value);
    console.log("Record:", record);
  };

  const Actions = [
    {
      title: "Questions",
      dataIndex: "questions",
      key: "questions",
      render: (_: any, record: QuestionRequest) => renderQuestion(record),
    },
    {
      title: "Réponses",
      dataIndex: "responses",
      key: "responses",
      render: (_: any, record: QuestionRequest) => renderResponse(record),
    },
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

  const refreshPage = () => {
    fetchData();
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

      <Modal
        title="Add Request"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        style={{ position: "fixed", top: 0, right: 0, height: "1000vh" }}
        afterClose={refreshPage}
      >
        <RequestAdd />
      </Modal>
    </>
  );
};

export default RequestList;
