import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Typography, Divider, Tooltip, Spin } from "antd"; // Import Spin component from antd
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
import "./homeAuto.css";

const HomeAuto = () => {
  const [showModal, setShowModal] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const fetchedPages = await getAllPages();
        setPages(fetchedPages);
        setLoading(false);
        console.log(fetchedPages);
      } catch (error) {
        setLoading(false);
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
          className="big-cadre"
          style={{
            display: "flex",
            alignItems: "center",
            //    background: `url('https://t3.ftcdn.net/jpg/02/56/78/360_F_213567841_SiyyM6H4y067caRy58iLulWazeezPaui.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
            transition: "background-color 0.3s",
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
              animation: "slideFromRight 1s ease-in-out",
            }}
          >
            <img
              src="https://www.grit.online/wp-content/uploads/2019/06/Chatbot-Concept-animated.gif"
              alt="Chatbot Concept"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              animation: "slideFromLeft 1s ease-in-out",
            }}
          >
            <h2 style={{ fontFamily: "Arial", color: "#333" }}>
              <UserOutlined style={{ marginRight: "10px" }} />
              Automatisez votre service client de votre page Facebook
            </h2>
            <p style={{ fontFamily: "Arial", color: "#666" }}>
              <MessageOutlined style={{ marginRight: "10px" }} />
              Créez votre chatbot et automatisez vos réponses sur Messenger.
              L'application vous permet de générer votre base de connaissance
              avec l'IA, de créer des messages de bienvenue/défaut et des menus
              et blocs pour améliorer la relation avec le consommateur.
            </p>
          </div>
        </div>

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
            <h2>Créez votre chatbot</h2>
            <p>Automatisez Votre Service Client de votre page Facebook</p>
          </div>
          <Tooltip title="Add New Page">
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
          </Tooltip>
        </div>

        {loading && <Spin />}

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
                      backgroundColor: "white",
                      border: "2px solid #1890ff",
                      borderRadius: "30px",
                      width: "150px",
                      color: "#1890ff",
                    }}
                    icon={<RobotOutlined style={{ marginRight: "5px" }} />}
                    onClick={() => {
                      handleView(page.id);
                      console.log(page.id);
                    }}
                    title="Automatiser cette page"
                  >
                    Automatiser
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
