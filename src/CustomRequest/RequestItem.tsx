import { Spin, Descriptions } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequestById } from "../services/CustomRequestService";
import { QuestionRequest } from "../types/questionrequest";

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

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        requestDetails && (
          <Descriptions title="Request Details">
            <Descriptions.Item label="ID">
              {requestDetails.id.toString()}
            </Descriptions.Item>
            <Descriptions.Item label="Question">
              {requestDetails.question}
            </Descriptions.Item>
            <Descriptions.Item label="Response">
              {requestDetails.response}
            </Descriptions.Item>
            {requestDetails.createdAt && ( // Add this condition
              <Descriptions.Item label="Created At">
                {requestDetails.createdAt.toDateString()}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Active">
              {requestDetails.active ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Share">
              {requestDetails.partage ? "Yes" : "No"}
            </Descriptions.Item>
          </Descriptions>
        )
      )}
    </div>
  );
};

export default RequestItem;
