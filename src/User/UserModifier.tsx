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

const UserModify: React.FC<Props> = ({ id, visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const departmentsData = await getDeps();
        const rolesData = await getRoles();
        setDepartments(departmentsData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching departments or roles:", error);
        message.error("Failed to fetch departments or roles");
      }
    };

    fetchAllData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getUserById(id);
      const userData = response;
      const userName = userData.name;
      const userEmail = userData.email;
      const userDepartments = userData.departments.map(
        (department: any) => department.name
      );
      const userRoles = userData.roles.map((role: any) => role.name);
      setUserData(userData);
      form.setFieldsValue({
        name: userName,
        email: userEmail,
        departments: userDepartments,
        roles: userRoles,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const modifiedValues = {
        name: values.name,
        email: values.email,
        departments: values.departments,
        roles: values.roles,
      };
      //@ts-expect-error
      await updateUser(id, modifiedValues);
      message.success("User updated successfully");
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
      <Form.Item
        name="departments"
        label="Department"
        rules={[{ required: true, message: "Please select the department" }]}
      >
        <Select mode="multiple">
          {departments.map((department, index) => (
            <Option key={index} value={department}>
              {department}
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
          {roles.map((roles, index) => (
            <Option key={index} value={roles}>
              {roles}
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

export default UserModify;
