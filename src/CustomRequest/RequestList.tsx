import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  Input,
  Drawer,
  Select,
  Pagination,
} from "antd";
import { deleteRequest, getRequests } from "../services/CustomRequestService";
import { QuestionRequest } from "../types/questionrequest";
import {
  DatabaseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import RequestAdd from "./RequestAdd";
import RequestModify from "./RequestModify";
import { useNavigate } from "react-router-dom";
import Typography from "antd/es/typography/Typography";
import Icon from "@ant-design/icons/lib/components/AntdIcon";
const { Search } = Input;
const { Option } = Select;

const RequestList = () => {
  const [requests, setRequests] = useState<readonly QuestionRequest[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isRequestDrawerVisible, setIsRequestDrawerVisible] = useState(false);
  const [isModifyDrawerVisible, setIsModifyDrawerVisible] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");
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
      const response = await getRequests(
        //@ts-expect-error
        pagination.current,
        pagination.pageSize
      );
      console.log(response);
      //@ts-expect-error
      const formattedRequests: QuestionRequest[] = response.map((item: any) => {
        //@ts-expect-error
        const questions = Object.values(item.questions).map((text: string) => ({
          text,
        }));
        //@ts-expect-error
        const responses = Object.values(item.responses).map((text: string) => ({
          text,
        }));

        return {
          id: item.id,
          active: item.active,
          partage: item.partage,
          questions: questions,
          responses: responses,
          created_at: item.created_at,
          user_id: 0,
        };
      });

      setRequests(formattedRequests);
      setPagination({
        ...pagination,
        //@ts-expect-error
        total: response.total,
      });
    } catch (error) {
      console.error("Error fetching requests: ", error);
    }
  };

  const handleView = (record: QuestionRequest) => {
    navigate(`/selectedRequest/${record.id}`);
  };

  const handleModify = (record: QuestionRequest) => {
    if (record.id) {
      //@ts-expect-error
      setSelectedRequestId(record.id);
      setIsModifyDrawerVisible(true);
    }
  };

  const handleDelete = async (record: QuestionRequest) => {
    try {
      await deleteRequest(Number(record.id));
      fetchData();
    } catch (error) {
      console.error("Error deleting record: ", error);
    }
  };

  const handleAdd = () => {
    setIsRequestDrawerVisible(true);
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
        defaultValue={
          record.questions.length > 0 ? record.questions[0].text : undefined
        }
        //@ts-expect-error
        onChange={(value) => handleSelectChange(value.text, record)}
        allowClear={true}
      >
        {record.questions.map((question, index) => (
          <Option key={`question_${index}`} value={question.text}>
            {question.text}
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
        defaultValue={
          record.responses.length > 0 ? record.responses[0].text : undefined
        }
        //@ts-expect-error
        onChange={(value) => handleSelectChange(value.text, record)}
        allowClear={true}
      >
        {record.responses.map((response, index) => (
          <Option key={`response_${index}`} value={response.text}>
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
  const getRowKey = (record: QuestionRequest) => {
    return record.id ? record.id.toString() : "";
  };

  const refreshPage = () => {
    fetchData();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>
          Base de connaissance {<DatabaseOutlined style={{ color: "#000" }} />}
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "20px" }}>
            <Search
              placeholder="Search questions"
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
              suffix={<SearchOutlined style={{ color: "#1890ff" }} />}
            />
          </div>
          <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Ajouter
            </Button>
          </div>
        </div>
      </div>
      <Table
        dataSource={requests}
        columns={Actions}
        rowKey={getRowKey}
        bordered
        pagination={false}
        rowClassName={getRowClassName}
      />
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
        title="Add Request"
        placement="right"
        closable={true}
        onClose={() => setIsRequestDrawerVisible(false)}
        visible={isRequestDrawerVisible}
        width={800}
        //@ts-expect-error
        onClose={() => setIsRequestDrawerVisible(false)}
      >
        <RequestAdd onCancel={() => setIsRequestDrawerVisible(false)} />
      </Drawer>
      {selectedRequestId && (
        <Drawer
          title="Modify Request"
          placement="right"
          closable={true}
          onClose={() => setIsModifyDrawerVisible(false)}
          visible={isModifyDrawerVisible}
          width={700}
          destroyOnClose={true}
          afterVisibleChange={refreshPage}
        >
          <RequestModify
            id={selectedRequestId}
            visible={isModifyDrawerVisible}
            onCancel={() => setIsModifyDrawerVisible(false)}
          />
        </Drawer>
      )}
    </>
  );
};

export default RequestList;
