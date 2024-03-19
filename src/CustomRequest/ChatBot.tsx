import React, { useState } from "react";
import { Input, Button, message, Space } from "antd";
import { SendOutlined, MessageOutlined } from "@ant-design/icons";
import { findRequest } from "../services/CustomRequestService";
import "./Chatbot.css";

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
        const randomIndex = Math.floor(Math.random() * allResponses.length);
        const randomResponse = allResponses[randomIndex];
        setMessages([
          //@ts-expect-error
          ...messages,

          //@ts-expect-error
          { text: question, sender: "user" },

          //@ts-expect-error
          { text: randomResponse, sender: "bot" },
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
      setQuestion("");
    } catch (error) {
      console.error("Erreur lors de la recherche de la question:", error);
      message.error(
        "Une erreur s'est produite lors de la recherche de la question."
      );
    }
  };

  return (
    <>
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
