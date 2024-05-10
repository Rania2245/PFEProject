import { Form, Input, Button, message } from "antd";
import { forgotPassword } from "../services/UserService";

const ForgotPassword = () => {
  const onFinish = async (values: { useremail: string }) => { // Explicitly specify type
    const { useremail } = values;
    try {
      if (!useremail) {
        throw new Error("Please input your email!");
      }
      await forgotPassword(useremail);
      message.success(
        "An email has been sent to reset your password. Please check your inbox."
      );
    } catch (error) {
      message.error("An error occurred. Please try again.");
      console.error("Forgot Password Error:", error);
    }
  };

  return (
    <Form name="forgot-password" onFinish={onFinish}>
      <Form.Item
        name="useremail"
        label="Email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Send Reset Email
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
