import React, { useEffect, useState } from "react";
import { Radio, Input, Button, Tooltip, message } from "antd";
import {
  DatabaseOutlined,
  FileDoneOutlined,
  OpenAIOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { generateAI, getMethodAI } from "../services/CustomRequestService";

import "./QuestionRequestAi.css";

const QuestionRequestAi = () => {
  const [chatGpt, setChatGpt] = useState(false);
  const [baseConnaissance, setBaseConnaissance] = useState(false);
  const [training, setTraining] = useState(false);
  const [methodId, setMethodId] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("");
  useEffect(() => {
    const fetchInitialData = async () => {
      const pageId = localStorage.getItem("pageId");
      if (pageId) {
        try {
          const data = await getMethodAI(pageId);
          setChatGpt(data.chatGpt ? true : false);
          setBaseConnaissance(data.baseConnaissance);
          // Ensure that training state is initialized properly
          setTraining(data.training !== undefined ? data.training : false);
          if (data.chatGpt) {
            setToken(data.chatGpt.token);
            setModel(data.chatGpt.model);
          }
          setMethodId(data.id);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching initial data:", error);
          message.error("Error fetching initial data");
          setLoading(false);
        }
      }
    };
    fetchInitialData();
  }, []);

  const handleGenerateScenario = async () => {
    const requestData = {
      chatGpt: chatGpt ? { token, model } : false,
      baseConnaissance,
      training,
    };
    console.log(requestData);
    try {
      await generateAI(requestData, methodId);
      message.success("Configuration AI modifiée avec succès !");
    } catch (error) {
      console.error("Error lors de generation de  request using AI:", error);
      message.error("Error lors de generation de  request using AI");
    }
  };

  const handleChatGptChange = (value: any) => {
    setChatGpt(value);
    if (value) {
      setBaseConnaissance(false);
      setTraining(false);
    }
  };

  const handleBaseConnaissanceChange = (value: any) => {
    setBaseConnaissance(true);
    if (value) {
      setChatGpt(false);
      setTraining(false);
    }
  };

  const handleTrainingChange = async (value: any) => {
    setTraining(true);
    setChatGpt(false);
    setBaseConnaissance(false);

    if (value) {
      handleGenerateScenario();
    }
  };

  const handleTrainingButtonClick = () => {
    window.location.href = "http://127.0.0.1:7860/";
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
            value={training}
            onChange={handleTrainingChange}
            buttonStyle="solid"
            className="custom-radio-group"
          >
            <Radio.Button value={true} className={training ? "active" : ""}>
              on
            </Radio.Button>
            <Radio.Button value={false} className={!training ? "active" : ""}>
              off
            </Radio.Button>
          </Radio.Group>
        </div>

        {training && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Tooltip title="add training file">
              <Button
                style={{
                  fontFamily: "cursive",
                  textAlign: "left",
                  color: "#72A0C1",
                }}
                onClick={handleTrainingButtonClick}
              >
                <ReloadOutlined style={{ color: "green" }} />
                ajouter fichier pour training
              </Button>
            </Tooltip>
          </div>
        )}

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
