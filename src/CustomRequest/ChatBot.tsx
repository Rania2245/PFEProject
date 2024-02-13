import React, { useState } from "react";
import { Input, Button, message, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { findRequest } from "../services/CustomRequestService";
import "./Chatbot.css";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const requests = await findRequest(question);
      if (requests.length > 0) {
        setResponse(requests[0].response[0].text);
      } else {
        setResponse("Désolé, je n'ai pas de réponse à cette question.");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche de la question:", error);
      message.error(
        "Une erreur s'est produite lors de la recherche de la question."
      );
    }
  };

  return (
    <>
      {" "}
      <Chatbot />
      <div className="chatbot-container">
        <div className="chatbot-messages">
          {response && (
            <div className="chatbot-message">
              <span className="chatbot-message-text">{response}</span>
            </div>
          )}
        </div>
        <div className="chatbot-input">
          <Input
            placeholder="Posez une question..."
            value={question}
            onChange={handleChange}
            suffix={
              <Space>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  icon={<SendOutlined />}
                />
              </Space>
            }
          />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
