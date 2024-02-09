import React, { useState } from "react";
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
import { Menu } from "../types/Menu";

const AddMenu: React.FC = () => {
  const [inputData, setInputData] = useState<{ type: string; data: string }[]>(
    []
  );
  const [MenuName, setMenuName] = useState<string>("Add Menu");
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(-1);

  const handleButtonClick = (type: string) => {
    setInputData([...inputData, { type, data: "" }]);
  };

  const handlMenuNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  const handleDeleteInput = (index: number) => {
    const updatedInputData = [...inputData];
    updatedInputData.splice(index, 1);
    setInputData(updatedInputData);
  };

  const handleDuplicateMenue = async () => {
    try {
      if (currentMenuIndex !== -1) {
        const blockToDuplicate = inputData[currentMenuIndex];
        setInputData([...inputData, blockToDuplicate]);
      }
    } catch (error) {
      console.error("Error duplicating Menu: ", error);
    }
  };

  const handleDeleteMenu = async () => {
    try {
      if (currentMenuIndex !== -1) {
        const updatedInputData = [...inputData];
        updatedInputData.splice(currentMenuIndex, 1);
        setInputData(updatedInputData);
        setCurrentMenuIndex(-1);
      }
    } catch (error) {
      console.error("Error deleting menu: ", error);
    }
  };
  const handleMenuClick = (index: number) => {
    setCurrentMenuIndex(index);
  };
  const renderInput = (type: string, index: number) => {
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
        return (
          <Space direction="vertical" key={index}>
            <input type="file" accept="image/*" />
            <Space direction="vertical" key={index}>
              <Tooltip title="Supprimer">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  style={{ color: "#333" }}
                  onClick={() => handleDeleteInput(index)}
                />
              </Tooltip>
            </Space>
          </Space>
        );
      case "video":
        return (
          <Space direction="vertical" key={index}>
            <input type="file" accept="video/*" />
            <Space direction="vertical" key={index}>
              <Tooltip title="Supprimer">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  style={{ color: "#333" }}
                  onClick={() => handleDeleteInput(index)}
                />
              </Tooltip>
            </Space>
          </Space>
        );
      default:
        break;
    }

    return (
      <Space direction="vertical" key={index}>
        <Input
          placeholder={placeholderText}
          style={{ width: "100%" }}
          onChange={(e) => handleInputChange(e.target.value, index)}
        />
        <Space direction="vertical" key={index}>
          <Tooltip title="Supprimer">
            <Space direction="vertical" key={index}>
              <Tooltip title="Supprimer">
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  style={{ color: "#333" }}
                  onClick={() => handleDeleteInput(index)}
                />
              </Tooltip>
            </Space>
          </Tooltip>
        </Space>
      </Space>
    );
  };

  const handleInputChange = (value: string, index: number) => {
    const updatedInputData = [...inputData];
    updatedInputData[index].data = value;
    setInputData(updatedInputData);
  };
  const handleSaveMenu = async () => {
    try {
      const MenuData: Menu = {
        name: MenuName,
        //@ts-expect-error
        elements: inputData.map((input, index) => ({
          type: input.type,
          data: input.data,
        })),
      };
      console.log(MenuData);
      await createBloc(MenuData);
    } catch (error) {
      console.error("Error saving bloc: ", error);
    }
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
            backgroundColor: "#E3DBDB",
            color: "#333",
            height: "150px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
          onClick={() => handleBlockClick(index)}
        >
          {renderInput(input.type, index)}
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
              <Tooltip title="Enregistrer">
                <Button
                  type="text"
                  icon={<SaveOutlined />}
                  style={{ color: "#333", backgroundColor: "#7fe57b" }}
                  onClick={handleSaveBloc}
                />
              </Tooltip>
              <Tooltip title="Dupliquer">
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  style={{ color: "#333", backgroundColor: "#70b2d8" }}
                  onClick={handleDuplicateBloc}
                />
              </Tooltip>
              <Tooltip title="Supprimer">
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
          backgroundColor: "#E3DBDB",
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
                backgroundColor: "#cbaad8",
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
                backgroundColor: "#cbaad8",
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
                backgroundColor: "#cbaad8",
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
                backgroundColor: "#cbaad8",
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
                backgroundColor: "#cbaad8",
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
              Lien
            </Button>
            <Button
              type="primary"
              icon={<MailOutlined />}
              style={{
                backgroundColor: "#cbaad8",
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
                backgroundColor: "#cbaad8",
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
                backgroundColor: "#cbaad8",
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
              Réponse
              <br /> rapide
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AddMenu;
