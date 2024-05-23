import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { addUser } from "../services/UserService";
import { User } from "../types/user";
import { getDeps } from "../services/departmentService";
import { getRoles } from "../services/RoleService";
import { Department } from "../types/department";
import { Role } from "../types/Role";

const { Option } = Select;

interface Props {
  onCancel: () => void;
}

const AddUserForm: React.FC<Props> = ({ onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetchDepartments();
    fetchRoles();
  }, []);

  const fetchDepartments = async () => {
    try {
      const departmentsData = await getDeps();
      console.log(departmentsData);
      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const roles = await getRoles();
      setRoles(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      message.error("Failed to fetch roles. Please try again later.");
    }
  };

  const onFinish = async (values: User) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        departments: Array.isArray(values.departments)
          ? values.departments.map((d: string) => d.trim())
          : //@ts-expect-error
            [values.departments?.trim()],
        roles: Array.isArray(values.roles)
          ? values.roles.map((r: string) => r?.trim())
          : //@ts-expect-error
            [values.roles?.trim()],
      };

      console.log(formData);
      //@ts-expect-error

      await addUser(formData);

      message.success("User added successfully");
      window.location.reload();
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Error adding user:", error);
      message.error("Failed to add User. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Please enter the name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please enter the email" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter the password" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Departments" name="departments" key="departments">
        <Select mode="multiple">
          {departments.map((department, index) => (
            <Option key={index} value={department.name}>
              {department.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="roles"
        label="Rôle"
        rules={[{ required: true, message: "Please select the Rôle" }]}
      >
        <Select mode="multiple">
          {roles.map((role) => (
            <Option key={role.id} value={role.name}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
