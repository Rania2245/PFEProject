import { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { addUser } from "../services/UserService";
import { User } from "../types/user";
import { getDeps } from "../services/departmentService";

const { Option } = Select;

const AddUserForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const departments = await getDeps();
      setDepartments(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  const onFinish = async (values: User) => {
    setLoading(true);
    try {
      await addUser(values);
      message.success("User added successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error adding user:", error);
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

      <Form.Item
        name="department"
        label="Department"
        rules={[{ required: true, message: "Please select the department" }]}
      >
        <Select>
          {departments.map((department, index) => (
            <Option key={index} value={department}>
              {department}
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
