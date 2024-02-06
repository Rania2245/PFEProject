import { Form, Input, Button, Row, Col, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../services/UserService";

const Login = () => {
  const onFinish = async (data: { username: string; password: string }) => {
    try {
      console.log(data);
      const token = await loginUser(data.username, data.password);
      console.log("JWT Token :", token);
    } catch (error) {
      console.error("LogIn Error !:", error);
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", fontSize: "20px" }}
    >
      <Col span={30}>
        <Space
          direction="vertical"
          size="large"
          align="center"
          style={{ padding: "20px" }}
        >
          <img
            src="src/assets/crm.jpg"
            alt="Login Image"
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <Form name="login" onFinish={onFinish} autoComplete="off">
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  style={{ fontSize: "18px", width: "100%" }} // Set width to 100%
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  style={{ fontSize: "18px", width: "100%" }} // Set width to 100%
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", fontSize: "18px" }} // Set width to 100%
                >
                  Submit
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Space>
      </Col>
    </Row>
  );
};

export default Login;
