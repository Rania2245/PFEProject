import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { PlusOutlined, RobotOutlined } from "@ant-design/icons";
import { createPage } from "../services/PageService";

interface VerifyPageProps {
  showModal: boolean;
  handleCancel: () => void;
  handleSubmit: () => void;
  verifyToken: string;
  setVerifyToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  appSecret: string;
  setAppSecret: React.Dispatch<React.SetStateAction<string>>;
}

const VerifyPage: React.FC<VerifyPageProps> = ({ showModal, handleCancel }) => {
  const [verifyToken, setVerifyToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [appSecret, setAppSecret] = useState("");

  const handleSubmit = async () => {
    try {
      if (!accessToken || !verifyToken || !appSecret) {
        message.error("Please fill all fields");
        return;
      }
      //@ts-expect-error
      await createPage({ accessToken, verifyToken, appSecret });

      message.success("Page created successfully");
      window.location.reload();
      setAccessToken("");
      setVerifyToken("");
      setAppSecret("");
      handleCancel();
    } catch (error) {
      console.error("Error creating page: ", error);
      message.error("Failed to create page");
    }
  };

  return (
    <Modal
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
      bodyStyle={{ padding: "20px" }}
    >
      <div style={{ backgroundColor: "#f0f2f5" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
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
      </div>
    </Modal>
  );
};

export default VerifyPage;
