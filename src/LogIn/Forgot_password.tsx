import { Form, Input, Button, Row, Col, Space, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { forgotPassword } from "../services/UserService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    const { useremail } = values;
    try {
      setLoading(true);
      if (!useremail) {
        throw new Error("Please input your email!");
      }
      console.log("Submitting form...");
      await forgotPassword(useremail);
      message.success(
        "An email has been sent to reset your password. Please check your inbox."
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
            <Form name="login" onFinish={onFinish} autoComplete="off">
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
