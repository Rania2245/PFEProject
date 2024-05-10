import { Form, Input, Button, message, Space, Row, Col } from "antd";
import { forgotPassword } from "../services/UserService";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: { useremail: string }) => {
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
            <Form name="forgot-password" onFinish={onFinish}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                {" "}
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
                <p>
                  Forgot your password? No problem! Enter your email and we'll
                  send you a link to reset your password.
                </p>
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
                    Send Reset Email
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

export default ForgotPassword;
