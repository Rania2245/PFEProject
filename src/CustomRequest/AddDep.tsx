import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { addDep } from "../services/departmentService";
interface Props {
  onCancel: () => void;
}
const AddDepartmentForm: React.FC<Props> = ({ onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await addDep(values.name);
      message.success("Department added successfully");
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Error adding department:", error);
      message.error("Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: "Please enter the department name" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Department
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddDepartmentForm;
