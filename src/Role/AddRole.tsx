import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { addDep } from "../services/departmentService";
import { addRole } from "../services/RoleService";
import { PlusOutlined } from "@ant-design/icons";
interface Props {
  onCancel: () => void;
}
const AddRoleForm: React.FC<Props> = ({ onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await addRole(values.name);
      message.success("Role added successfully");
      window.location.reload();
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Error adding Role:", error);
      message.error("Failed to add Role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the role " }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          style={{
            textAlign: "center",
            background: "",
            border: "2px solid #1890ff",
            borderRadius: "5px",
          }}
          htmlType="submit"
          loading={loading}
          icon={<PlusOutlined />}
        >
          Add Role
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddRoleForm;
