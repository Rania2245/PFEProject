import React, { useState } from "react";
import { Form, Input, Button, Switch } from "antd";
import { QuestionRequest } from "../types/questionrequest";
import { addRequest } from "../services/CustomRequestService";

const RequestAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (data: QuestionRequest) => {
    setLoading(true);
    const formData: QuestionRequest = {
      id: 0,
      question: data.question,
      response: data.response,
      createdAt: new Date(),
      active: data.active,
      partage: data.partage,
      user_id: 0,
    };
    try {
      await addRequest(formData);
      form.resetFields();
    } catch (error) {
      console.error("Error lors d'ajout du question:", error);
    }
    setLoading(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Question"
        name="question"
        rules={[{ required: true, message: "Veuillez saisir la question !" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Response"
        name="response"
        rules={[{ required: true, message: "Veuillez saisir la réponse !" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Active" name="active" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="partage" name="partage" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RequestAdd;
