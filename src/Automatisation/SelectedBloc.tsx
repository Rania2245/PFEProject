import React, { useState, useEffect } from "react";
import { Card, Button, Input, Space, Tooltip, Modal, message } from "antd";
import {
  DeleteOutlined,
  MessageOutlined,
  ApiOutlined,
  BellOutlined,
  VideoCameraAddOutlined,
  SaveOutlined,
  CopyOutlined,
  MailOutlined,
  PhoneOutlined,
  MenuOutlined,
  FileAddOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Bloc } from "../types/Bloc";
import { updateBloc, duplicateBloc, deleteBloc } from "../services/BlocService";
import { ElementBloc } from "../types/elementBloc";
import AddOptionModal from "./AddOptionBloc";
import { BlocOption } from "../types/BlocOptions";

interface SelectedBlocProps {
  bloc: Bloc;
}

const SelectedBloc: React.FC<SelectedBlocProps> = ({ bloc }) => {
  const [inputData, setInputData] = useState<ElementBloc[]>(
    bloc.elementsBloc.map((elem) => ({ ...elem, blocOptions: [] }))
  );
  const [blocName, setBlocName] = useState<string>(bloc.name);
  const [confirmDeleteVisible, setConfirmDeleteVisible] =
    useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean[]>(
    new Array(bloc.elementsBloc.length).fill(false)
  );
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(-1);
  useEffect(() => {
    console.log(bloc);
    setInputData(
      bloc.elementsBloc.map((elem) => ({ ...elem, blocOptions: [] }))
    );
    setBlocName(bloc.name);
    setModalVisible(new Array(bloc.elementsBloc.length).fill(false));
    setCurrentBlockIndex(-1);
  }, [bloc]);

  const handleDeleteInput = (index: number) => {
    if (index === -1) {
      setConfirmDeleteVisible(true);
    } else {
      const updatedInputData = inputData.filter((_, i) => i !== index);
      setInputData(updatedInputData);
      setModalVisible((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!bloc || bloc.id === undefined) {
        throw new Error("Bloc ID is undefined");
      }
      message.success("Bloc has been deleted successfully!");
      await deleteBloc(bloc.id);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting bloc: ", error);
      message.error(
        "An error occurred while deleting the bloc. Please try again."
      );
    }
    setConfirmDeleteVisible(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteVisible(false);
  };
  const handleButtonClick = (type: string) => {
    const newElement: ElementBloc = { type, data: "", blocOptions: [] };

    setInputData((prevInputData) => [...prevInputData, newElement]);
  };

  const handleDuplicateBloc = async () => {
    try {
      if (!bloc || bloc.id === undefined) {
        throw new Error("Bloc ID is undefined");
      }
      await duplicateBloc(bloc.id.valueOf());
    } catch (error) {
      console.error("Error duplicating bloc: ", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlocName(e.target.value);
  };

  const handleSaveBloc = async () => {
    try {
      if (!bloc || bloc.id === undefined) {
        throw new Error("Bloc ID is undefined");
      }

      const updatedBloc: Bloc = {
        id: bloc.id,
        id_page: bloc.id_page,
        name: blocName,
        //@ts-expect-error
        elementsBloc: inputData.map((input) => ({
          type: input.type,
          data: input.data,
          options_bloc: input.blocOptions,
        })),
      };
      console.log({ updatedBloc });
      message.success("Bloc has been updated successfully!");
      await updateBloc(bloc.id.valueOf(), updatedBloc);
      window.location.reload();
    } catch (error) {
      console.error("Error saving bloc: ", error);
    }
  };

  const handleInputChange = (value: string, index: number) => {
    console.log(`input ${index} with value ${value}`);
    const updatedInputData = [...inputData];
    updatedInputData[index].data = value;
    setInputData(updatedInputData);
  };

  const handleAddOptionClick = (index: number) => {
    setCurrentBlockIndex(index);
    setModalVisible((prev) =>
      prev.map((visible, i) => (i === index ? true : visible))
    );
  };
  const handleModalAdd = async (options: BlocOption[]) => {
    try {
      console.log("Options received:", options);
      const updatedInputData = inputData.map((input, index) => {
        if (index === currentBlockIndex) {
          return { ...input, blocOptions: options };
        }
        return input;
      });

      console.log("Updated input data:", updatedInputData);

      setInputData(updatedInputData);

      setModalVisible((prev) =>
        prev.map((visible, i) => (i === currentBlockIndex ? false : visible))
      );

      message.success("Options added successfully!");
    } catch (error) {
      console.error("Error adding options: ", error);
      message.error(
        "An error occurred while adding options. Please try again."
      );
    }
  };

  const handleModalCancel = () => {
    setModalVisible((prev) =>
      prev.map((visible, i) => (i === currentBlockIndex ? false : visible))
    );
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

    const currentElement = inputData[index];
    return (
      <Space
        direction="vertical"
        key={index}
        style={{
          position: "relative",
          display: currentElement ? "block" : "none",
        }}
      >
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
            name={`inputData${index}`}
            placeholder={placeholderText}
            style={{ width: "100%" }}
            value={currentElement?.data || ""}
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
    <Card
      title={
        <>
          <Input
            value={blocName}
            onChange={handleNameChange}
            style={{ width: "calc(100% - 120px)", marginRight: "10px" }}
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
                onClick={() => handleDeleteInput(-1)}
              />
            </Tooltip>
          </div>
        </>
      }
      style={{
        textAlign: "center",
        backgroundColor: "#e5e5e5",
        color: "#333",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
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
        >
          {renderInput(input.type, index)}
          <AddOptionModal
            bloc={bloc}
            index={index}
            visible={modalVisible[currentBlockIndex]}
            onCancel={handleModalCancel}
            onAdd={async (options) => await handleModalAdd(options)}
          />
        </Card>
      ))}
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

      <Modal
        title="Delete Bloc"
        visible={confirmDeleteVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        Are you sure you want to delete this bloc?
      </Modal>
    </Card>
  );
};

export default SelectedBloc;
