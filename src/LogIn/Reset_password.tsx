import { Form, Input, Button, Row, Col, Space, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { resetPassword } from "../services/UserService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    const { useremail, password, confirmPassword } = values;
    try {
      setLoading(true);
      if (!useremail || !password || !confirmPassword) {
        throw new Error("Please fill in all fields!");
      }
      if (password !== confirmPassword) {
        message.error('Passwords do not match!"');
        throw new Error("Passwords do not match!");
      }
      console.log("Submitting form...");
      await resetPassword(useremail, password);
      message.success(
        "Your password has been reset successfully. You can now login with your new password."
      );
      setLoading(false);
      navigate("/login");
    } catch (error) {
      message.error("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "90vh", fontSize: "20px" }}
    >
      <Col span={12}>
        <Space
          direction="vertical"
          size="large"
          align="center"
          style={{ padding: "20px" }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "20px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Form name="resetPassword" onFinish={onFinish} autoComplete="off">
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <img
                  src="src/assets/crm.jpg"
                  alt="Login Image"
                  style={{
                    width: "50%",
                    maxWidth: "200px",
                    borderRadius: "50%",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Form.Item
                  name="useremail"
                  label="Email"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    style={{ fontSize: "18px", width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="New Password"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<UserOutlined />}
                    placeholder="New Password"
                    style={{ fontSize: "18px", width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  style={{ marginBottom: 0 }}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<UserOutlined />}
                    placeholder="Confirm Password"
                    style={{ fontSize: "18px", width: "100%" }}
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "100%",
                      fontSize: "18px",
                      backgroundColor: "#f0f0f3",
                      border: "1px solid #f0f0f0",
                      color: "black",
                      transition: "background-color 0.3s",
                      borderRadius: "5px",
                    }}
                    className="custom-button"
                    loading={loading}
                  >
                    Reset Password
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default ResetPassword;
