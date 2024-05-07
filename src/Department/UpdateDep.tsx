import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { getUserById, updateUser } from "../services/UserService";
import { getDepById, getDeps, updateDep } from "../services/departmentService";
import { getRoleById, getRoles, updateRole } from "../services/RoleService";

const { Option } = Select;

interface Props {
  id: string;
  visible: boolean;
  onCancel: () => void;
}

const DepModify: React.FC<Props> = ({ id, visible, onCancel }) => {
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
      const response = await getDepById(id);
      console.log(response);
      const depData = response;
      const depName = depData.name;

      form.setFieldsValue({
        name: depName,
      });
    } catch (error) {
      console.error("Error fetching dep data:", error);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      message.success("dep updated successfully");
      await updateDep(id, values.name);
      window.location.reload();
    } catch (error) {
      console.error("Error updating dep:", error);
      message.error("Failed to update dep");
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
          Modify Department
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DepModify;
