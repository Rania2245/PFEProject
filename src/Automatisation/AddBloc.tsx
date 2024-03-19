import React, { useEffect, useState } from "react";
import { Card, Button, Input, Space, Tooltip } from "antd";
import {
  FileAddOutlined,
  DeleteOutlined,
  MessageOutlined,
  ApiOutlined,
  BellOutlined,
  VideoCameraAddOutlined,
  MenuOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  SaveOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Bloc } from "../types/Bloc";
import { createBloc } from "../services/BlocService";

import { BlocOption } from "../types/BlocOptions";
import { ElementBloc } from "../types/elementBloc";
import AddOptionModal from "./AddOptionBloc";
import { message } from "antd";

const AddBloc: React.FC = () => {
  const [inputData, setInputData] = useState<ElementBloc[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean[]>([]);
  const [blocName, setBlocName] = useState<string>("Add Bloc");
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(-1);
  const [optionIdCounter, setOptionIdCounter] = useState<number>(0);

  const handleButtonClick = (type: string) => {
    setInputData([
      ...inputData,
      { id: optionIdCounter, type, data: "", blocOptions: [] },
    ]);
    setModalVisible([...modalVisible, false]);
    setOptionIdCounter((prevCounter) => prevCounter + 1);
  };

  const handleBlocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlocName(e.target.value);
  };

  const handleDeleteInput = (index: number) => {
    const updatedInputData = [...inputData];
    updatedInputData.splice(index, 1);
    setInputData(updatedInputData);
    setModalVisible((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleDuplicateBloc = async () => {
    try {
      if (currentBlockIndex !== -1) {
        const blockToDuplicate = inputData[currentBlockIndex];
        setInputData([...inputData, blockToDuplicate]);
        setModalVisible([...modalVisible, false]);
      }
    } catch (error) {
      console.error("Error duplicating bloc: ", error);
    }
  };

  const handleDeleteBloc = async () => {
    try {
      if (currentBlockIndex !== -1) {
        const updatedInputData = [...inputData];
        updatedInputData.splice(currentBlockIndex, 1);
        setInputData(updatedInputData);
        setCurrentBlockIndex(-1);
        setModalVisible((prev) => {
          const updated = [...prev];
          updated.splice(currentBlockIndex, 1);
          return updated;
        });
      }
    } catch (error) {
      console.error("Error deleting bloc: ", error);
    }
  };

  const handleBlockClick = (index: number) => {
    setCurrentBlockIndex(index);
  };

  const handleAddOptionClick = (index: number) => {
    setCurrentBlockIndex(index);
    setModalVisible((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const handleInputChange = (value: string, index: number) => {
    const updatedInputData = [...inputData];
    updatedInputData[index].data = value;
    setInputData(updatedInputData);
  };

  const handleSaveBloc = async () => {
    try {
      const blocData: Bloc = {
        name: blocName,
        //@ts-expect-error
        elementsBloc: inputData.map((input: ElementBloc) => ({
          type: input.type,
          data: input.data,
          options_bloc: input.blocOptions,
        })),
      };
      console.log(blocData);
      message.success("Bloc has been added successfully!");
      await createBloc(blocData);

      setInputData([]);
      setModalVisible([]);
      window.location.reload();
      setBlocName("Add Bloc");
    } catch (error) {
      console.error("Error saving bloc: ", error);
    }
  };

  const handleAddOptionModalClose = (index: number) => {
    setModalVisible((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };
  const handleAddNewOption = (options: BlocOption[]) => {
    const updatedInputData = [...inputData];
    updatedInputData[currentBlockIndex].blocOptions = options;
    setInputData(updatedInputData);
  };

  const renderInput = (type: string, index: number) => {
    const inputDataAtIndex = inputData[index];
    if (!inputDataAtIndex) {
      return null;
    }
    let placeholderText = "Enter ";
    switch (type) {
      case "text":
        placeholderText += "text";
        break;
      case "email":
        placeholderText += "email address";
        break;
      case "link":
        placeholderText += "link";
        break;
      case "mobile":
        placeholderText += "mobile number";
        break;
      case "quickResponse":
        placeholderText += "quick response";
        break;
      case "photo":
      case "video":
        return (
          <Space
            direction="vertical"
            key={index}
            style={{ position: "relative" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Delete">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  style={{ color: "red", borderRadius: "50%" }}
                  onClick={() => handleDeleteInput(index)}
                />
              </Tooltip>
              <input
                type={type === "photo" ? "file" : "video"}
                accept={type === "photo" ? "image/*" : "video/*"}
                style={{ marginLeft: "10px" }}
              />
            </div>
          </Space>
        );
      default:
        break;
    }

    return (
      <Space direction="vertical" key={index} style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: "red", borderRadius: "50%" }}
              onClick={() => handleDeleteInput(index)}
            />
          </Tooltip>
          <Input
            value={inputData[index].data}
            name={`inputData${index}`}
            placeholder={placeholderText}
            style={{ width: "100%" }}
            onChange={(e) => handleInputChange(e.target.value, index)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Add Option">
            <Button
              type="text"
              icon={<FileAddOutlined />}
              style={{
                color: "#333",
                backgroundColor: "#87abcc",
                width: "100px",
                height: "40px",
                fontSize: "20px",
              }}
              onClick={() => handleAddOptionClick(index)}
            />
          </Tooltip>
        </div>
      </Space>
    );
  };

  return (
    <div>
      {inputData.map((input, index) => (
        <Card
          title={
            <div>
              {input.type.toUpperCase()}{" "}
              {input.type === "text" && <MessageOutlined />}
              {input.type === "email" && <MailOutlined />}
              {input.type === "link" && <MenuOutlined />}
              {input.type === "mobile" && <PhoneOutlined />}
              {input.type === "quickResponse" && <ApiOutlined />}
              {input.type === "photo" && <BellOutlined />}
              {input.type === "video" && <VideoCameraAddOutlined />}
            </div>
          }
          key={index}
          style={{
            textAlign: "center",
            backgroundColor: "#e5e5e5",
            color: "#333",
            height: "150px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
          onClick={() => handleBlockClick(index)}
        >
          {renderInput(input.type, index)}
          {input.blocOptions && input.blocOptions.length > 0 && (
            <div>
              <h3>Review Options:</h3>
              {input.blocOptions.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <p>Title: {option.name}</p>
                  <p>Type: {option.type}</p>
                  <p>
                    {option.type}: {option.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
      <Card
        title={
          <>
            <FileAddOutlined />
            <Input
              value={blocName}
              onChange={handleBlocNameChange}
              style={{ width: "150px" }}
            />
            <div style={{ float: "right" }}>
              <Tooltip title="Save">
                <Button
                  type="text"
                  icon={<SaveOutlined />}
                  style={{ color: "#333", backgroundColor: "#7fe57b" }}
                  onClick={handleSaveBloc}
                />
              </Tooltip>
              <Tooltip title="Duplicate">
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  style={{ color: "#333", backgroundColor: "#70b2d8" }}
                  onClick={handleDuplicateBloc}
                />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  style={{ color: "#333", backgroundColor: "#ea6161" }}
                  onClick={handleDeleteBloc}
                />
              </Tooltip>
            </div>
          </>
        }
        style={{
          textAlign: "center",
          backgroundColor: "#e5e5e5",
          color: "#333",
          height: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <Button
              type="primary"
              icon={<MessageOutlined />}
              style={{
                backgroundColor: "#87abcc",
                borderColor: "#cbaad8",
                width: "80px",
                height: "80px",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              onClick={() => handleButtonClick("text")}
            >
              <br />
              Text
            </Button>
            <Button
              type="primary"
              icon={<ApiOutlined />}
              style={{
                backgroundColor: "#87abcc",
                borderColor: "#cbaad8",
                width: "80px",
                height: "80px",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              onClick={() => handleButtonClick("quickResponse")}
            >
              <br />
              Typing
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              icon={<BellOutlined />}
              style={{
                backgroundColor: "#87abcc",
                borderColor: "#cbaad8",
                width: "80px",
                height: "80px",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              onClick={() => handleButtonClick("photo")}
            >
              <br />
              Photo
            </Button>
            <Button
              type="primary"
              icon={<VideoCameraAddOutlined />}
              style={{
                backgroundColor: "#87abcc",
                borderColor: "#cbaad8",
                width: "80px",
                height: "80px",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              onClick={() => handleButtonClick("video")}
            >
              <br />
              Video
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              icon={<MenuOutlined />}
              style={{
                backgroundColor: "#87abcc",
                borderColor: "#cbaad8",
                width: "80px",
                height: "80px",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              onClick={() => handleButtonClick("link")}
            >
              <br />
              Link
            </Button>
            <Button
              type="primary"
              icon={<MailOutlined />}
              style={{
                backgroundColor: "#87abcc",
                borderColor: "#cbaad8",
                width: "80px",
                height: "80px",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              onClick={() => handleButtonClick("email")}
            >
              <br />
              Mail
            </Button>
          </div>
          <div>
            <Button
              type="primary"
              icon={<PhoneOutlined />}
              style={{
                backgroundColor: "#87abcc",
                borderColor: "#cbaad8",
                width: "80px",
                height: "80px",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              onClick={() => handleButtonClick("mobile")}
            >
              <br />
              Mobile
            </Button>
            <Button
              type="primary"
              icon={<SendOutlined />}
              style={{
                backgroundColor: "#87abcc",
                borderColor: "#cbaad8",
                width: "80px",
                height: "80px",
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
              onClick={() => handleButtonClick("quickResponse")}
            >
              <br />
              Quick
              <br />
              Response
            </Button>
          </div>
        </div>
      </Card>

      <AddOptionModal
        key={currentBlockIndex}
        visible={modalVisible[currentBlockIndex] || false}
        onCancel={() => handleAddOptionModalClose(currentBlockIndex)}
        onAdd={(options: BlocOption[]) => handleAddNewOption(options)}
        index={currentBlockIndex}
      />
    </div>
  );
};

export default AddBloc;
