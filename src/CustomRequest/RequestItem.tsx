import React, { useState, useEffect } from "react";
import { Spin, Descriptions, Button } from "antd";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getRequestById } from "../services/CustomRequestService";
import { QuestionRequest } from "../types/questionrequest";
import { LeftOutlined, InfoCircleOutlined } from "@ant-design/icons";
import LogoutButton from "./NavBar";

const RequestItem: React.FC = () => {
  const [requestDetails, setRequestDetails] = useState<QuestionRequest | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <Navigate to="/requests" />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequestById(Number(id));
        console.log("Response from API:", response);
        setRequestDetails(response.data);
      } catch (error) {
        console.error("Error fetching request details:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleGoBack = () => {
    navigate(`/requests`);
  };

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
      <Descriptions title={customTitle}>
        <Descriptions.Item label="ID">
          {loading ? <Spin /> : requestDetails?.id}
        </Descriptions.Item>

        <Descriptions.Item label="Questions">
          {loading ? (
            <Spin />
          ) : (
            requestDetails?.questions?.map((q, index) => (
              <div key={index}>{q.text}</div>
            ))
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Responses">
          {loading ? (
            <Spin />
          ) : (
            requestDetails?.responses?.map((r, index) => (
              <div key={index}>{r.text}</div>
            ))
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Created At">
          {loading ? (
            <Spin />
          ) : (
            new Date(requestDetails!.created_at).toDateString()
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Active">
          {loading ? <Spin /> : requestDetails?.active ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Partage">
          {loading ? <Spin /> : requestDetails?.partage ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="User ID">
          {loading ? <Spin /> : requestDetails?.user_id}
        </Descriptions.Item>
      </Descriptions>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button type="primary" icon={<LeftOutlined />} onClick={handleGoBack}>
          Go Back to Requests
        </Button>
      </div>
    </div>
  );
};

export default RequestItem;
