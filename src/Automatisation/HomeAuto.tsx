import React, { useState } from "react";
import { Modal, Input, Button, Typography, Divider } from "antd";
import {
  EyeOutlined,
  LinkOutlined,
  MessageOutlined,
  PlusOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import VerifyPage from "./VerifyPage";

const HomeAuto = () => {
  const [showModal, setShowModal] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [appSecret, setAppSecret] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    // Logic to handle form submission
  };
  const { Title } = Typography;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title
        level={1}
        style={{
          paddingBottom: "5px",
          marginBottom: "0",
          color: "#87abcc",
          textAlign: "left",
        }}
      >
        <UserOutlined style={{ fontSize: "20px", marginRight: "10px" }} />
        Chiffres
        <Divider style={{ marginBottom: "10px" }} />
      </Title>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ flex: 1, marginRight: "20px" }}>
          <div
            className="cadre"
            style={{
              backgroundColor: "#f0f2f5",
              borderRadius: "10px",
              padding: "20px",
              minHeight: "200px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d9d9d9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f2f5")
            }
          >
            <div>
              <UserOutlined style={{ fontSize: "24px" }} />
              <p>Total abonnés: </p>
              <MessageOutlined style={{ fontSize: "24px" }} />
              <p>Total messages pour toute la période: </p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, marginRight: "20px" }}>
          <div
            className="cadre"
            style={{
              backgroundColor: "#f0f2f5",
              borderRadius: "10px",
              padding: "20px",
              minHeight: "200px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d9d9d9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f2f5")
            }
          >
            <div>
              <UserOutlined style={{ fontSize: "24px" }} />
              <p>Abonnés ce mois-ci: </p>
              <MessageOutlined style={{ fontSize: "24px" }} />
              <p>Pack ce mois-ci: </p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div
            className="cadre"
            style={{
              backgroundColor: "#f0f2f5",
              borderRadius: "10px",
              padding: "20px",
              minHeight: "200px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d9d9d9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f2f5")
            }
          >
            <div>
              <LinkOutlined style={{ fontSize: "24px" }} />
              <p>Total liens:</p>
              <EyeOutlined style={{ fontSize: "24px" }} />
              <p>Total vues toute la période: </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: "fit-content" }}>
        <Title
          level={1}
          style={{
            color: "#87abcc",
            display: "flex",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <RobotOutlined
            style={{ fontSize: "20px", marginRight: "10px", color: "#87abcc" }}
          />
          Vos bots
        </Title>
        <Divider style={{ marginBottom: "10px" }} />
      </div>

      <div style={{ display: "flex", width: "100%", marginRight: "100px" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <div
            className="cadre"
            style={{
              backgroundColor: "#f0f2f5",
              borderRadius: "10px",
              padding: "20px",
              minHeight: "200px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d9d9d9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f2f5")
            }
          >
            <div>
              <h2>Cree votre chatbot</h2>
              <p>Automatisez Votre Service Client de votre page facebook</p>
            </div>
            <button
              className="add-button"
              style={{
                backgroundColor: "#1890ff",
                color: "white",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                fontSize: "20px",
                width: "40px",
                height: "40px",
              }}
              onClick={openModal}
            >
              <PlusOutlined />
            </button>
          </div>
          <VerifyPage
            showModal={showModal}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            verifyToken={verifyToken}
            setVerifyToken={setVerifyToken}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            appSecret={appSecret}
            setAppSecret={setAppSecret}
          />
        </div>
        {/* <Modal
            title={
              <span>
                <RobotOutlined /> Add Page
              </span>
            }
            visible={showModal}
            onCancel={handleCancel}
            footer={null}
            centered
            style={{ borderRadius: "10px" }}
            bodyStyle={{ backgroundColor: "#f0f2f5", padding: "20px" }}
          >
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="verifyToken">Verify Token</label>
              <Input
                id="verifyToken"
                placeholder="Enter Verify Token"
                value={verifyToken}
                onChange={(e) => setVerifyToken(e.target.value)}
                style={{ marginBottom: "10px" }}
              />

              <label htmlFor="accessToken">Access Token</label>
              <Input
                id="accessToken"
                placeholder="Enter Access Token"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                style={{ marginBottom: "10px" }}
              />

              <label htmlFor="appSecret">App Secret</label>
              <Input
                id="appSecret"
                placeholder="Enter App Secret"
                value={appSecret}
                onChange={(e) => setAppSecret(e.target.value)}
                style={{ marginBottom: "10px" }}
              />

              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#40a9ff",
                  color: "white",
                  border: "none",
                }}
                icon={<PlusOutlined />}
              >
                Submit
              </Button>
            </form>
          </Modal> */}

        <div style={{ flex: 1 }}>
          <div
            className="cadre"
            style={{
              backgroundColor: "#f0f2f5",
              borderRadius: "10px",
              padding: "20px",
              minHeight: "200px",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#d9d9d9")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f2f5")
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <img
                  src="https://www.facebook.com/images/fb_icon_325x325.png"
                  alt="Facebook Pic"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <h2>Page Name</h2>
                  <p>Chat Bot Name</p>
                </div>
              </div>

              <div style={{ alignSelf: "center" }}>
                <Button
                  className="automatizer-button"
                  type="primary"
                  style={{
                    backgroundColor: "#1890ff",
                    border: "none",
                    borderRadius: "20px",
                    width: "120px",
                    color: "white",
                  }}
                  icon={<RobotOutlined style={{ marginRight: "5px" }} />}
                  onClick={() => {
                    window.location.href = "/autoMess";
                  }}
                >
                  Automatizer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAuto;
