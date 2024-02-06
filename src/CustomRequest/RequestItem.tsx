import React, { useState, useEffect } from "react";
import { Spin, Descriptions } from "antd";
import { QuestionRequest } from "../types/questionrequest";
import { getRequestById } from "../services/CustomRequestService";
import { useNavigate, useParams } from "react-router-dom";

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
        const response = await getRequestById(id);
        setRequestDetails(response.data);
      } catch (error) {
        console.error("Error lors du request details:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        requestDetails && (
          <Descriptions title="Request Details">
            <Descriptions.Item label="ID">
              {requestDetails.id}
            </Descriptions.Item>
            <Descriptions.Item label="Question">
              {requestDetails.question}
            </Descriptions.Item>
            <Descriptions.Item label="Response">
              {requestDetails.response}
            </Descriptions.Item>
            <Descriptions.Item label="Creatée a">
              {requestDetails.createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="Active">
              {requestDetails.active ? "Oui" : "Non"}
            </Descriptions.Item>
          </Descriptions>
        )
      )}
    </div>
  );
};

export default RequestItem;
