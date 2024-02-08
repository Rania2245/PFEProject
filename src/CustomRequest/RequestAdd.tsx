// RequestAdd.tsx
import React, { useState } from "react";
import { Form, Input, Button, Switch } from "antd";
import { addRequest } from "../services/CustomRequestService";
import { QuestionRequest } from "../types/questionrequest";
import { useNavigate } from "react-router-dom";




const RequestAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
    const onFinish = async (values: QuestionRequest) => {
      setLoading(true);
      try {
        // Set default values for active and partage if they are undefined
        const formData = {
          ...values,
          active: values.active || false,
          partage: values.partage || false,
        };
        await addRequest(formData);
        form.resetFields();
        navigate("/requests");
      } catch (error) {
        console.error("Error while adding the question:", error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Question"
        name="question"
        rules={[{ required: true, message: "Please enter the question!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Response"
        name="response"
        rules={[{ required: true, message: "Please enter the response!" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Active" name="active" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Shared" name="partage" valuePropName="checked">
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
