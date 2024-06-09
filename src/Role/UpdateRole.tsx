import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { getUserById, updateUser } from "../services/UserService";
import { getDeps } from "../services/departmentService";
import { getRoles } from "../services/RoleService";

const { Option } = Select;

interface Props {
  id: string;
  visible: boolean;
  onCancel: () => void;
}

const RoleModify: React.FC<Props> = ({ id, visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible]);

  const fetchData = async () => {
    try {
      const userResponse = await getUserById(id);
      const userData = userResponse.data;

      form.setFieldsValue({
        name: userData.name,
        email: userData.email,
        //@ts-expect-error
        departments: userData.departments.map(dep => dep.id), // Set department IDs
        //@ts-expect-error
        roles: userData.roles.map(role => role.id) // Set role IDs
      });

      const depResponse = await getDeps();
      setDepartments(depResponse);

      const roleResponse = await getRoles();
      setRoles(roleResponse);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const updateUserPayload = {
        name: values.name,
        email: values.email,
        departments: values.departments, // Send department IDs
        roles: values.roles, // Send role IDs
      };
      //@ts-expect-error
      await updateUser(id, updateUserPayload);
      message.success("User updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update user");
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

      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Departments" name="departments">
        <Select mode="multiple">
          {departments.map((dep) => (
            //@ts-expect-error
            <Option key={dep.id} value={dep.id}>
              {//@ts-expect-error
              dep.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Roles" name="roles">
        <Select mode="multiple">
          {roles.map((role) => (
            //@ts-expect-error
            <Option key={role.id} value={role.id}>
              
              {//@ts-expect-error
              role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Modify User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoleModify;
