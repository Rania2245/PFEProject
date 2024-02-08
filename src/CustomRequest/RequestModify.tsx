// RequestModify.tsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch } from "antd";
import { QuestionRequest } from "../types/questionrequest";
import {
  getRequestById,
  modifyRequest,
} from "../services/CustomRequestService";
import { useNavigate, useParams } from "react-router-dom";
import LogoutButton from "./LogOutButton";

const RequestModify: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [questionRequest, setQuestionRequest] = useState<QuestionRequest>();
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
      const response = await getRequestById(Number(id));
      setQuestionRequest(response);
      form.setFieldsValue(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const onFinish = async (data: QuestionRequest) => {
    setLoading(true);
    try {
      if (questionRequest) {
        await modifyRequest(questionRequest.id, data);
        navigate("/requests");
      }
    } catch (error) {
      console.error("Error modifying question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LogoutButton />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Question" name="question">
          <Input />
        </Form.Item>
        <Form.Item label="Response" name="response">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Active" name="active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Partage" name="partage" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Modify Question
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RequestModify;
