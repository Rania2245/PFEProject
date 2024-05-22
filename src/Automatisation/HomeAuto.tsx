import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Typography, Divider, Tooltip, Spin } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  KeyOutlined,
  LockOutlined,
  MessageOutlined,
  PlusOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import VerifyPage from "./VerifyPage";
import { Page } from "../types/Page";
import { deletePage, getAllPages } from "../services/PageService";
import { useNavigate } from "react-router-dom";
import "./homeAuto.css";
const AppSecretDisplay: React.FC<TokenDisplayProps> = ({ token }) => {
  const [showFullSecret, setShowFullSecret] = useState(false);

  const handleToggleSecret = () => {
    setShowFullSecret(!showFullSecret);
  };

  const truncatedSecret = showFullSecret
    ? token
    : token.slice(0, 4) + "*".repeat(token.length - 4);

  return (
    <div style={{ marginBottom: "16px" }}>
      <p style={{ fontSize: "16px", color: "#333", marginBottom: "8px" }}>
        <LockOutlined style={{ textAlign: "center", marginRight: "8px" }} />
        App Secret:
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
        {truncatedSecret}
        {!showFullSecret && (
          <button
            onClick={handleToggleSecret}
            style={{
              marginLeft: "8px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <EyeOutlined />
          </button>
        )}
      </p>
    </div>
  );
};

interface TokenDisplayProps {
  token: string;
}

const TokenDisplay: React.FC<TokenDisplayProps> = ({ token }) => {
  const [showFullToken, setShowFullToken] = useState(false);
  const truncatedToken = showFullToken
    ? token
    : token.slice(0, 4) + "*".repeat(token.length - 4);

  return (
    <div style={{ marginBottom: "16px" }}>
      <p style={{ fontSize: "16px", color: "#333", marginBottom: "8px" }}>
        <InfoCircleOutlined
          style={{ textAlign: "center", marginRight: "8px" }}
        />
        Access Token:
      </p>
      <p
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
          color: "#666",
          maxWidth: "300px",
          overflowY: "auto",
          verticalAlign: "middle",
        }}
      >
        {truncatedToken}
        {!showFullToken && (
          <button
            onClick={() => setShowFullToken(true)}
            style={{
              marginLeft: "8px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <EyeOutlined />
          </button>
        )}
      </p>
    </div>
  );
};

const HomeAuto: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePageId, setDeletePageId] = useState<string | null>(null);

  const handleDelete = (pageId: string) => {
    setDeletePageId(pageId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      if (deletePageId) {
        await deletePage(deletePageId);
        console.log("Page deleted:", deletePageId);
        setPages(pages.filter((page) => page.id !== deletePageId));
      }
      setDeletePageId(null);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting page:", error);
    }
  };

  const cancelDelete = () => {
    setDeletePageId(null);
    setShowDeleteConfirmation(false);
  };
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
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log(page);
      const existingPage = localStorage.getItem("pageId");
      if (existingPage) {
        console.log(`Removing existing pageId: ${existingPage}`);
        localStorage.removeItem("pageId");
      }

      localStorage.setItem("pageId", page);
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
            <h2 style={{ fontFamily: "cursive", color: "#333" }}>
              <UserOutlined style={{ marginRight: "10px" }} />
              Automate your customer service for your Facebook page
            </h2>
            <p style={{ fontFamily: "cursive", color: "#666" }}>
              <MessageOutlined style={{ marginRight: "10px" }} />
              Create your chatbot and automate your responses on Messenger. The
              application allows you to generate responses using AI, create
              welcome/default messages, design menus and blocks to enhance
              customer relations, and add your own knowledge base
            </p>
          </div>
        </div>

        <div
          className="cadre"
          style={{
            fontFamily: "cursive",
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
          <div style={{ fontFamily: "cursive" }}>
            <h2>Create your chatbot</h2>
            <p>Automate your customer service on your Facebook page</p>
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
            fontFamily: "cursive",
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
                minWidth: "100px",
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
                  marginLeft: "350px",
                }}
              >
                <Tooltip title="Delete">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    style={{
                      color: "red",
                      borderRadius: "100%",
                      position: "absolute",
                    }}
                    onClick={() => handleDelete(page.id)}
                  />
                </Tooltip>
              </div>
              <div
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={page.picture}
                  alt="Page Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div>
                <h3 style={{ margin: 0 }}> Page Name: {page.name}</h3>
                <p>
                  Visit the page:{" "}
                  <a href={page.link} target="_blank" rel="noopener noreferrer">
                    {page.link}
                  </a>
                </p>
              </div>
              <TokenDisplay token={page.accessToken.toString()} />
              <AppSecretDisplay token={page.appSecret.toString()} />
              <p
                style={{
                  fontSize: "16px",
                  color: "#333",
                  marginBottom: "8px",
                  textAlign: "center",
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
                  textAlign: "center",
                }}
              >
                {page.verifyToken}
              </p>
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
                  title="Automate  page"
                >
                  Automate
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Modal
          visible={showDeleteConfirmation}
          title="Confirm Delete"
          onCancel={cancelDelete}
          footer={[
            <Button key="cancel" onClick={cancelDelete}>
              Cancel
            </Button>,
            <Button key="delete" type="primary" onClick={confirmDelete}>
              Delete
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this page?</p>
        </Modal>

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
