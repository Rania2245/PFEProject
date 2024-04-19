import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Typography, Divider } from "antd";
import {
  EyeOutlined,
  InfoCircleOutlined,
  KeyOutlined,
  LinkOutlined,
  LockOutlined,
  MessageOutlined,
  PlusOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import VerifyPage from "./VerifyPage";
import { Page } from "../types/Page";
import { getAllPages } from "../services/PageService";
import { useNavigate } from "react-router-dom";

const HomeAuto = () => {
  const [showModal, setShowModal] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [pages, setPages] = useState<Page[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const fetchedPages = await getAllPages();
        setPages(fetchedPages);
        console.log(fetchedPages);
      } catch (error) {
        // Handle error
      }
    };

    fetchPages();
  }, []);
  const handleView = (page: string) => {
    console.log(page);
    if (page) {
      console.log(page);
      navigate(`/autoMess/${page}`);
    } else {
      console.error("Page ID is undefined.");
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {};
  const { Title } = Typography;
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          className="cadre"
          style={{
            backgroundColor: "#f0f2f5",
            borderRadius: "10px",
            padding: "20px",
            minHeight: "200px",
            marginBottom: "20px",
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

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            marginBottom: "20px",
          }}
        >
          {pages.map((page, index) => (
            <div
              key={index}
              className="cadre-page"
              style={{
                backgroundColor: "#f0f2f5",
                borderRadius: "10px",
                padding: "20px",
                margin: "0 10px",
                minWidth: "300px",
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
                <div style={{ marginBottom: "16px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    <InfoCircleOutlined style={{ marginRight: "8px" }} />
                    Access Token:
                  </p>
                  <p
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                      maxWidth: "300px",
                      overflowY: "auto",
                    }}
                  >
                    {page.accessToken}
                  </p>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    <LockOutlined style={{ marginRight: "8px" }} />
                    App Secret:
                  </p>
                  <p
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {page.appSecret}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    <KeyOutlined style={{ marginRight: "8px" }} />
                    Verify Token:
                  </p>
                  <p
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {page.verifyToken}
                  </p>
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
                      handleView(page.id);
                      console.log(page.id);
                    }}
                  >
                    Automatizer
                  </Button>
                </div>
              </div>
            </div>
          ))}
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
    </>
  );
};

export default HomeAuto;
