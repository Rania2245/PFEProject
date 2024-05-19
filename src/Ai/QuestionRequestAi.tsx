import React, { useState } from "react";
import { Radio, Input, Button, Tooltip } from "antd";
import {
  DatabaseOutlined,
  FileDoneOutlined,
  OpenAIOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { generateAI } from "../services/CustomRequestService";

import "./QuestionRequestAi.css";

const QuestionRequestAi = () => {
  const [chatGpt, setChatGpt] = useState(false);
  const [baseConnaissance, setBaseConnaissance] = useState(false);
  const [traning, setTraning] = useState(false);
  const [token, setToken] = useState("");
  const [model, setModel] = useState("");

  const handleGenerateScenario = () => {
    const requestData = {
      chatGpt: chatGpt ? { token, model } : false,
      baseConnaissance,
      traning,
    };
    console.log(requestData);
    generateAI(requestData);
  };

  const handleChatGptChange = (value: any) => {
    setChatGpt(value);
    if (value) {
      setBaseConnaissance(false);
      setTraning(false);
    }
  };

  const handleBaseConnaissanceChange = (value: any) => {
    setBaseConnaissance(true);
    if (value) {
      setChatGpt(false);
      setTraning(false);
    }
  };

  const handleTraningChange = (value: any) => {
    setTraning(true);
    if (value) {
      setChatGpt(false);
      setBaseConnaissance(false);
      window.location.href = "http://127.0.0.1:7860/";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "800px",
        backgroundColor: "#f5f5f5",
        marginTop: "-30px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontFamily: "cursive",
            textAlign: "center",
            color: "#5072A7",
          }}
        >
          Configuration AI
          <DatabaseOutlined style={{ color: "green" }} />
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontFamily: "cursive" }}>
            Génère votre Base de connaissance avec chatGpt
            <OpenAIOutlined style={{ color: "#000", marginLeft: "5px" }} />
          </p>
          <Radio.Group
            value={chatGpt}
            onChange={handleChatGptChange}
            buttonStyle="solid"
            className="custom-radio-group"
          >
            <Radio.Button value={true} className={chatGpt ? "active" : ""}>
              on
            </Radio.Button>
            <Radio.Button value={false} className={!chatGpt ? "active" : ""}>
              off
            </Radio.Button>
          </Radio.Group>
          {chatGpt && (
            <>
              <Input
                placeholder="Enter Token"
                style={{ marginTop: "10px" }}
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <Input
                placeholder="Enter Model"
                style={{ marginTop: "10px" }}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontFamily: "cursive" }}>
            Apprendre auprès de la liste de la Base de connaissance existante
            <DatabaseOutlined style={{ color: "#000", marginLeft: "5px" }} />
          </p>
          <Radio.Group
            value={baseConnaissance}
            onChange={handleBaseConnaissanceChange}
            buttonStyle="solid"
            className="custom-radio-group"
          >
            <Radio.Button
              value={true}
              className={baseConnaissance ? "active" : ""}
            >
              on
            </Radio.Button>
            <Radio.Button
              value={false}
              className={!baseConnaissance ? "active" : ""}
            >
              off
            </Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontFamily: "cursive" }}>
            Apprendre auprès d'un document
            <FileDoneOutlined style={{ color: "#000", marginLeft: "5px" }} />
          </p>
          <Radio.Group
            value={traning}
            onChange={handleTraningChange}
            buttonStyle="solid"
            className="custom-radio-group"
          >
            <Radio.Button value={true} className={traning ? "active" : ""}>
              on
            </Radio.Button>
            <Radio.Button value={false} className={!traning ? "active" : ""}>
              off
            </Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Tooltip title="Appuyez pour générer votre base de connaissances avec l'IA selon vos choix sélectionnés">
            <Button
              style={{
                fontFamily: "cursive",
                textAlign: "left",
                color: "#72A0C1",
              }}
              onClick={handleGenerateScenario}
            >
              <ReloadOutlined style={{ color: "green" }} />
              Générer la base de connaissances
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default QuestionRequestAi;
