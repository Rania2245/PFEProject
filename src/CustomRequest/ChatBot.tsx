import React, { useState } from "react";
import { Input, Button, message, Space } from "antd";
import { SendOutlined, MessageOutlined } from "@ant-design/icons";
import { findRequest } from "../services/CustomRequestService";
import "./Chatbot.css";
import LogoutButton from "./NavBar";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const requests = await findRequest(question);
      console.log(requests);
      if (requests.length > 0) {
        const allResponses = requests.map((request) => request.responses);
        const combinedResponses = allResponses.join("\n");
        setMessages([
          ...messages,
          { text: question, sender: "user" },
          { text: combinedResponses, sender: "bot" },
        ]);
      } else {
        setMessages([
          ...messages,
          {
            text: "Désolé, je n'ai pas de réponse à cette question.",
            sender: "bot",
          },
        ]);
      }
      setQuestion(""); // Clear input after sending message
    } catch (error) {
      console.error("Erreur lors de la recherche de la question:", error);
      message.error(
        "Une erreur s'est produite lors de la recherche de la question."
      );
    }
  };

  return (
    <>
      <LogoutButton />
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h1 className="chatbot-title">
            <MessageOutlined /> Chatbot
          </h1>
        </div>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${
                message.sender === "user" ? "user" : "bot"
              }`}
            >
              <span className="chatbot-message-text">{message.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chatbot-input">
        <Input
          placeholder="Posez une question..."
          value={question}
          onChange={handleChange}
          onPressEnter={handleSubmit}
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
    </>
  );
};

export default Chatbot;
