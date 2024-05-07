import { Form, Input, Button, Row, Col, Space, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (data: { username: string; password: string }) => {
    try {
      if (data.username === "" || data.password === "") {
        message.error("Error: Username or password cannot be empty!");
        return;
      }

      console.log("Submitting form...");
      const response = await loginUser(data.username, data.password);
      if (response && response.token && response.roles) {
        const { token, roles } = response;

        message.success("Logged In successfully!");
        localStorage.setItem("token", token);
        if (Array.isArray(roles) && roles.length > 0) {
          const role = roles[0];
          localStorage.setItem("role", role);
        }

        localStorage.setItem("userEmail", data.username);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        navigate("/homeAuto");
        window.location.reload();
      } else {
        message.error("Invalid response from server. Please try again.");
      }
    } catch (error) {
      message.error("Error when Logging in, verify your email and password!");
      console.error("Login Error:", error);
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
                  name="username"
                  label="Username"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    style={{ fontSize: "18px", width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  style={{ marginBottom: 0 }}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
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
                  >
                    LOGIN
                  </Button>
                  <div
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      color: " #FF4500",
                    }}
                  >
                    <a
                      style={{
                        color: "#FF4500",
                      }}
                      href="/forgot-password"
                    >
                      Mot de passe oublié?
                    </a>
                  </div>
                </Form.Item>
              </Space>
            </Form>
          </div>
        </Space>
      </Col>
    </Row>
  );
};

export default Login;
