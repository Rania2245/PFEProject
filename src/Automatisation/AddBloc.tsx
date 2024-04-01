import React, { useEffect, useState } from "react";
import { Card, Button, Input, Space, Tooltip, Slider, Select } from "antd";
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
  AppstoreAddOutlined,
  PartitionOutlined,
  RedoOutlined,
  UserOutlined,
  CustomerServiceOutlined,
  FacebookOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Bloc } from "../types/Bloc";
import {
  createBloc,
  deleteBloc,
  duplicateBloc,
  getAllBlocs,
} from "../services/BlocService";

import { BlocOption } from "../types/BlocOptions";
import { ElementBloc } from "../types/elementBloc";
import AddOptionModal from "./AddOptionBloc";
import { message } from "antd";
import { GalleryFormData } from "../types/Galerie";
import ButtonCard from "./ButtonCard";
import GalleryForm from "./GalerieForm";
import button from "antd/es/button";
const { Option } = Select;

const AddBloc: React.FC = () => {
  const [inputData, setInputData] = useState<ElementBloc[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean[]>([]);
  const [blocName, setBlocName] = useState<string>("Add Bloc");
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(-1);
  const [optionIdCounter, setOptionIdCounter] = useState<number>(0);
  const [blocNames, setBlocNames] = useState<string[]>([]);
  const [selectedBlocIndex, setSelectedBlocIndex] = useState<number | null>(
    null
  );
  const [forms, setForms] = useState<GalleryFormData[]>([]);

  const [uploadedFileName, setUploadedFileName] = useState<File | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [fileInputs, setFileInputs] = useState<File[]>([]);

  const [facebookUrls, setFacebookUrls] = useState(
    Array(inputData.length).fill("")
  );

  const [elementsBloc, setElementsBloc] = useState<ElementBloc[]>([]);
  const [galleryForms, setGalleryForms] = useState<GalleryFormData[]>([]);

  (url: string, index: number) => {
    const updatedUrls = [...facebookUrls];
    updatedUrls[index] = url;
    setFacebookUrls(updatedUrls);
  };
  const [uploadFile, setUploadFile] = useState({
    file: "",
    filename: "",
    filesize: "",
    filetype: "",
  });

  const handleSave = () => {
    console.log("Saved forms:", galleryForms);
  };
  const handleGalerieInputChange = (
    data: GalleryFormData,
    index: number,
    fileName: File
  ) => {
    const updatedForms = [...galleryForms];
    updatedForms[index] = { ...data, photo: fileName };
    setGalleryForms(updatedForms);
  };
  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const updatedInputData = [...inputData];
      updatedInputData[index].data = file.name;
      updatedInputData[index].file = file;
      if (file.size > 3e6) {
        window.alert("Please upload a file smaller than 3MB");
      }
      setUploadedFileName(file);
      setFileInputs((prevFileInputs) => {
        const updatedFileInputs = [...prevFileInputs];
        updatedFileInputs[index] = file;
        return updatedFileInputs;
      });
      setInputData(updatedInputData);
      handleGalerieInputChange(
        { ...galleryForms[index], photo: file },
        index,
        file
      );
    } else {
      setUploadedFileName(null);
    }
  };
  const handleAddGalleryForm = () => {
    //@ts-ignore
    setGalleryForms((prevState) => [
      ...prevState,
      {
        photo: null,
        title: "",
        description: "",
        url: "",
      },
    ]);
  };

  useEffect(() => {
    const fetchBlocNames = async () => {
      try {
        const blocs = await getAllBlocs();
        const blocNames = blocs.map((bloc) => bloc.name);
        setBlocNames(blocNames);
      } catch (error) {
        console.error("Error fetching bloc names:", error);
      }
    };

    fetchBlocNames();
  }, [galleryForms]);

  const handleRedirectionSelect = (value: string) => {
    const index = parseInt(value);
    setSelectedBlocIndex(index);
  };

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
        //@ts-expect-error
        const duplicatedBloc = await duplicateBloc(blockToDuplicate.id);
        //@ts-expect-error
        setInputData([...inputData, duplicatedBloc]);
        setModalVisible([...modalVisible, false]);
      }
    } catch (error) {
      console.error("Error duplicating bloc: ", error);
    }
  };

  const handleDeleteBloc = async () => {
    try {
      if (currentBlockIndex !== -1) {
        //@ts-expect-error
        await deleteBloc(inputData[currentBlockIndex].id);
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
  const handleDeleteGallerie = (index: number) => {
    setElementsBloc((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleInputChange = (value: string, index: number) => {
    const updatedInputData = [...inputData];
    updatedInputData[index].data = value;
    setInputData(updatedInputData);
  };

  const handleSaveBloc = async () => {
    try {
      console.log({ inputData });
      const blocData: Bloc = {
        name: blocName,
        //@ts-expect-error
        elementsBloc: inputData.map((input: ElementBloc, index: number) => {
          if (input.type === "galerie") {
            return {
              type: input.type,
              data: "",
              options_bloc: input.blocOptions,
              galerie: galleryForms,
            };
          } else if (input.type === "photo" && uploadedFileName) {
            return {
              type: input.type,
              data: `${uploadedFileName.name}`,
              file: input.file,
              options_bloc: input.blocOptions,
            };
          } else if (
            input.type === "Redirection" &&
            selectedBlocIndex !== null
          ) {
            const selectedBlocName = blocNames[selectedBlocIndex];
            return {
              type: input.type,
              data: selectedBlocName,
              options_bloc: input.blocOptions,
            };
          } else if (input.type === "media") {
            return {
              type: input.type,
              data: facebookUrls[index],
              options_bloc: input.blocOptions,
            };
          } else {
            return {
              type: input.type,
              data: input.data,
              file: input.file,
              options_bloc: input.blocOptions,
            };
          }
        }),
      };
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
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(event.target.value);
    const updatedInputData = [...inputData];
    updatedInputData[index].data = `${value} seconds`;
    setInputData(updatedInputData);
  };
  const handleFacebookURLChange = (url: string, index: number): void => {
    const updatedUrls = [...facebookUrls];
    updatedUrls[index] = url;
    setFacebookUrls(updatedUrls);
  };

  const renderSlider = (index: number) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <Tooltip title="Delete">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              style={{ color: "red", borderRadius: "50%", fontSize: "16px" }}
              onClick={() => handleDeleteInput(index)}
            />
          </Tooltip>
          <input
            type="range"
            min={0}
            max={60}
            defaultValue={0}
            onChange={(event) => handleSliderChange(event, index)}
            style={{ width: "300px", height: "7px" }}
          />
        </div>
        <div style={{ fontSize: "16px" }}>
          {" "}
          {inputData[index].data as string}
        </div>
      </div>
    );
  };

  const renderInput = (type: string, index: number) => {
    const inputDataAtIndex = inputData[index];
    if (!inputDataAtIndex) {
      return null;
    }
    if (type === "typing") {
      return (
        <Space
          direction="vertical"
          key={index}
          style={{ position: "relative" }}
        >
          {renderSlider(index)}
        </Space>
      );
    }

    let placeholderText = "Enter ";
    switch (type) {
      case "text":
      case "email":
      case "link":
      case "mobile":
      case "quickResponse":
        return (
          <Space
            direction="vertical"
            key={index}
            style={{ position: "relative" }}
          >
            <Input
              value={inputDataAtIndex.data}
              placeholder={`Enter ${type === "link" ? "link" : type}`}
              onChange={(e) => handleInputChange(e.target.value, index)}
              style={{ width: "300px", backgroundColor: "#f5f5f5" }}
            />
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                style={{
                  color: "red",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "-25px",
                }}
                onClick={() => handleDeleteInput(index)}
              />
            </Tooltip>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Tooltip title="Add Option">
                <Button
                  type="text"
                  icon={<FileAddOutlined />}
                  style={{
                    color: "#333",
                    backgroundColor: "white",
                    border: "2px solid #87abcc",
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
      case "galerie":
        return (
          <div style={{ overflowX: "auto" }}>
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                style={{ color: "red", borderRadius: "50%", fontSize: "16px" }}
                onClick={() => handleDeleteInput(index)}
              />
            </Tooltip>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              {galleryForms.map((formData, idx) => (
                <div key={idx} style={{ marginRight: "20px" }}>
                  <GalleryForm
                    index={idx}
                    initialFormData={{
                      photo: formData.photo,
                      title: formData.title,
                      description: formData.description,
                      url: formData.url,
                    }}
                    handleDeleteInput={() => handleDeleteGallerie(idx)}
                    handleGalerieInputChange={(
                      data: GalleryFormData,
                      idx: number,
                      fileName: File
                    ) => handleGalerieInputChange(data, idx, fileName)}
                    handleAddOptionClick={handleAddOptionClick}
                    handleSave={handleSave}
                    handleFileInputChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => handleFileInputChange(e, idx)}
                  />
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                type="primary"
                onClick={handleAddGalleryForm}
                style={{ backgroundColor: "#87abcc", border: "none" }}
              >
                Add Gallery Form
              </Button>
            </div>
          </div>
        );

      case "media":
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
              <p>
                The media model allows you to visualize videos, GIFs, and photos
                from Facebook by adding their URL.
              </p>
            </div>
            <Input
              placeholder="Enter Facebook URL (e.g., https://www.facebook.com/...)"
              style={{ width: "300px" }}
              value={facebookUrls[index]}
              onChange={(e) => handleFacebookURLChange(e.target.value, index)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Tooltip title="Add Option">
                <Button
                  type="text"
                  icon={<FileAddOutlined />}
                  style={{
                    color: "#333",
                    backgroundColor: "white",
                    border: "2px solid #87abcc",
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

      case "Redirection":
        return (
          <div>
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                style={{ color: "red", borderRadius: "50%" }}
                onClick={() => handleDeleteInput(index)}
              />
            </Tooltip>

            <Select
              defaultValue=""
              style={{ width: 200 }}
              onChange={(value) => handleRedirectionSelect(value)}
              showSearch
              filterOption={(input, option) =>
                option?.children
                  ? option.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  : false
              }
            >
              <Select.Option value="">
                Select a bloc to redirect to...
              </Select.Option>
              {blocNames
                .filter((name) =>
                  name.toLowerCase().includes(searchKeyword.toLowerCase())
                )
                .map((name, index) => (
                  <Select.Option key={index} value={index}>
                    {name}
                  </Select.Option>
                ))}
            </Select>
          </div>
        );

      case "photo":
      case "video":
      case "file":
      case "Audio":
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
                type="file"
                accept={
                  type === "photo"
                    ? "image/*"
                    : type === "video"
                    ? "video/*"
                    : type === "file"
                    ? ".pdf,.doc,.docx"
                    : "audio/*"
                }
                multiple
                style={{ display: "none" }}
                id={`file-upload-${index}`}
                onChange={(e) => handleFileInputChange(e, index)}
              />
              <label htmlFor={`file-upload-${index}`}>
                <Button
                  type="default"
                  icon={<UploadOutlined />}
                  style={{
                    width: "200px",
                    height: "40px",
                    borderRadius: "8px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const input = document.getElementById(
                      `file-upload-${index}`
                    ) as HTMLInputElement;
                    input.click();
                  }}
                >
                  Upload File
                </Button>
              </label>
            </div>
            {uploadedFileName && (
              <p
                style={{
                  marginLeft: "10px",
                  fontSize: "14px",
                  color: "#87abcc",
                }}
              >
                {uploadedFileName.name}
              </p>
            )}
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
            style={{ width: "300px" }}
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
      style={{
        backgroundColor: "white",
      }}
      title={
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "11px 100px",
            borderRadius: "4px",
          }}
        >
          <Tooltip title="Add Bloc">
            <FileAddOutlined
              style={{
                borderRadius: "50%",
                backgroundColor: "grey",
                color: "white",
                padding: "8px",
              }}
            />
          </Tooltip>
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
                style={{ color: "green" }}
                onClick={handleSaveBloc}
              />
            </Tooltip>
            <Tooltip title="Duplicate">
              <Button
                type="text"
                icon={<CopyOutlined />}
                style={{ color: "blue" }}
                onClick={handleDuplicateBloc}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                style={{ color: "red" }}
                onClick={handleDeleteBloc}
              />
            </Tooltip>
          </div>
        </div>
      }
    >
      {inputData.map((input, index) => (
        <Card
          title={
            <div
              style={{
                backgroundColor: "white",
                padding: "11px 100px",
                borderRadius: "4px",
                display: "inline-block",
                width: "100%",
              }}
            >
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
            backgroundColor: "white",
            color: "blue",
            height:
              input.type === "Generic" ||
              input.type === "galerie" ||
              input.type === "media"
                ? "550px"
                : "170px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
          onClick={() => handleBlockClick(index)}
          data-testid={
            input.type === "generic" ? "generic-card" : "default-card"
          }
        >
          {renderInput(input.type, index)}
        </Card>
      ))}
      <ButtonCard handleButtonClick={handleButtonClick} />
      <AddOptionModal
        key={currentBlockIndex}
        visible={modalVisible[currentBlockIndex] || false}
        onCancel={() => handleAddOptionModalClose(currentBlockIndex)}
        onAdd={(options: BlocOption[]) => handleAddNewOption(options)}
        index={currentBlockIndex}
      />
    </Card>
  );
};

export default AddBloc;
