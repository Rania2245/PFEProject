import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch } from "antd";
import { QuestionRequest } from "../types/questionrequest";
import {
  getRequestById,
  modifyRequest,
} from "../services/CustomRequestService";
import { useNavigate, useParams } from "react-router-dom";

const RequestModify: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [questionRequest, setQuestionRequest] = useState<QuestionRequest>({
    id: "1",
    active: true,
    createdAt: new Date().toString(),
    question: "Quest",
    response: "resp",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) {
    navigate(`/requests`);
    return <></>;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getRequestById(id);
      setQuestionRequest(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const onFinish = async (data: QuestionRequest) => {
    setLoading(true);
    try {
      await modifyRequest(questionRequest.id, data);
    } catch (error) {
      console.error("Error modifying question:", error);
    }
    setLoading(false);
  };

  return (
    <Form
      form={form}
      initialValues={{ ...questionRequest }}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item label="Question" name="question">
        <Input />
      </Form.Item>
      <Form.Item label="Response" name="response">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Active" name="active" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Modify Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RequestModify;
