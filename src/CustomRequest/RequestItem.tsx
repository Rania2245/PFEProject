import React, { useState, useEffect } from "react";
import { Spin, Descriptions, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getRequestById } from "../services/CustomRequestService";
import { QuestionRequest } from "../types/questionrequest";
import { LeftOutlined, InfoCircleOutlined } from "@ant-design/icons";
import LogoutButton from "./LogOutButton";

const RequestItem: React.FC = () => {
  const [requestDetails, setRequestDetails] = useState<QuestionRequest | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  if (id === undefined) {
    navigate(`/requests`);
    return <></>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequestById(Number(id));
        setRequestDetails(response);
      } catch (error) {
        console.error("Error lors du request details:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleGoBack = () => {
    navigate(`/requests`);
  };

  // Custom title component for the Descriptions
  const customTitle = (
    <div>
      <InfoCircleOutlined style={{ color: "blue", marginRight: "8px" }} />
      <span style={{ color: "blue" }}>Request Details</span>
    </div>
  );

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <LogoutButton />
      </div>
      {loading ? (
        <Spin />
      ) : (
        requestDetails && (
          <Descriptions title={customTitle}>
            <Descriptions.Item label="ID">
              {requestDetails.id.toString()}
            </Descriptions.Item>
            <Descriptions.Item label="Question">
              {requestDetails.question}
            </Descriptions.Item>
            <Descriptions.Item label="Response">
              {requestDetails.response}
            </Descriptions.Item>
            {requestDetails.created_at && (
              <Descriptions.Item label="Created At">
                {new Date(requestDetails.created_at).toDateString()}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Active">
              {requestDetails.active ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Partage">
              {requestDetails.partage ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="ID_User">
              {requestDetails.user_id.toString()}
            </Descriptions.Item>
          </Descriptions>
        )
      )}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button type="primary" icon={<LeftOutlined />} onClick={handleGoBack}>
          Go Back to Requests
        </Button>
      </div>
    </div>
  );
};

export default RequestItem;
