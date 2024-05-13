import React, { useState } from "react";
import { Radio, Input, Button, Tooltip } from "antd";
import {
  DatabaseOutlined,
  FileDoneOutlined,
  OpenAIOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const QuestionRequestAi = () => {
  const [chatGpt, setChatGpt] = useState("off");
  const [baseConnaissance, setBaseConnaissance] = useState("off");
  const [traning, setTraning] = useState("off");
  const [token, setToken] = useState("");
  const [model, setModel] = useState("");

  const handleGenerateScenario = () => {
    const requestData = {
      chatGpt: chatGpt === "on" ? { token, model } : false,
      baseConnaissance: baseConnaissance === "on" ? true : false,
      traning: traning === "on" ? true : false,
    };
    console.log(requestData);
  };

  const handleChatGptChange = (e: any) => {
    setChatGpt(e.target.value);
    if (e.target.value === "on") {
      setBaseConnaissance("off");
      setTraning("off");
    }
  };

  const handleBaseConnaissanceChange = (e: any) => {
    setBaseConnaissance(e.target.value);
    if (e.target.value === "on") {
      setChatGpt("off");
      setTraning("off");
    }
  };

  const handleTraningChange = (e: any) => {
    setTraning(e.target.value);
    if (e.target.value === "on") {
      setChatGpt("off");
      setBaseConnaissance("off");
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
            Génere votre Base de connaissance avec chatGpt
            <OpenAIOutlined style={{ color: "#000", marginLeft: "5px" }} />
          </p>
          <Radio.Group
            value={chatGpt}
            onChange={handleChatGptChange}
            buttonStyle="solid"
          >
            <Radio.Button value="on">on</Radio.Button>
            <Radio.Button value="off">off</Radio.Button>
          </Radio.Group>
          {chatGpt === "on" && (
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
            Apprendre aupres du liste du Base de connaissance existante
            <DatabaseOutlined style={{ color: "#000", marginLeft: "5px" }} />
          </p>
          <Radio.Group
            value={baseConnaissance}
            onChange={handleBaseConnaissanceChange}
            buttonStyle="solid"
          >
            <Radio.Button value="on">on</Radio.Button>
            <Radio.Button value="off">off</Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontFamily: "cursive" }}>
            Apprendre aupres dune base existante
            <FileDoneOutlined style={{ color: "#000", marginLeft: "5px" }} />
          </p>
          <Radio.Group
            value={traning}
            onChange={handleTraningChange}
            buttonStyle="solid"
          >
            <Radio.Button value="on">on</Radio.Button>
            <Radio.Button value="off">off</Radio.Button>
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
              Générer la base de connaissance
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default QuestionRequestAi;
