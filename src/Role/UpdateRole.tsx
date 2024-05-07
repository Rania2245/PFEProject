import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { getUserById, updateUser } from "../services/UserService";
import { getDeps } from "../services/departmentService";
import { getRoleById, getRoles, updateRole } from "../services/RoleService";

const { Option } = Select;

interface Props {
  id: string;
  visible: boolean;
  onCancel: () => void;
}

const RoleModify: React.FC<Props> = ({ id, visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible]);

  const fetchData = async () => {
    try {
      console.log(id);
      const response = await getRoleById(id);
      console.log(response);
      const ROLEData = response;
      const RoleName = ROLEData.name;

      form.setFieldsValue({
        name: RoleName,
      });
    } catch (error) {
      console.error("Error fetching role data:", error);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      message.success("role updated successfully");
      await updateRole(id, values.name);
      window.location.reload();
    } catch (error) {
      console.error("Error updating role:", error);
      message.error("Failed to update role");
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Modify rôle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoleModify;
