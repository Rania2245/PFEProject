// ResetPassword.tsx

import { Form, Input, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/UserService";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { token } = useParams<{ token?: string }>(); // Make token optional
  const navigate = useNavigate();

  const onFinish = async (values: FormValues) => {
    const { email, password, confirmPassword } = values;
    try {
      if (!email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields!");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }

      if (!token) {
        throw new Error("Token is missing."); // Handle token being undefined
      }

      // Make API call to reset password
      await resetPassword(email, password, confirmPassword, token);

      message.success("Your password has been reset successfully.");
      navigate("/login"); // Redirect to the login page after successful reset
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error("Reset Password Error:", error);
    }
  };

  return (
    <Form name="reset-password" onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="New Password"
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input.Password placeholder="New Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("The two passwords do not match!");
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPassword;
