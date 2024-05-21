import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Tooltip,
  Modal,
  message,
  Select,
} from "antd";
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
  UploadOutlined,
} from "@ant-design/icons";
import { Bloc } from "../types/Bloc";
import {
  updateBloc,
  duplicateBloc,
  deleteBloc,
  getAllBlocs,
} from "../services/BlocService";
import { ElementBloc } from "../types/elementBloc";
import AddOptionModal from "./AddOptionBloc";
import { BlocOption } from "../types/BlocOptions";
import ButtonCard from "./ButtonCard";
import { GalleryFormData } from "../types/Galerie";
import GalleryForm from "./GalerieForm";

interface SelectedBlocProps {
  bloc: Bloc;
}

const SelectedBloc: React.FC<SelectedBlocProps> = ({ bloc }) => {
  const { Option } = Select;
  const [inputData, setInputData] = useState<ElementBloc[]>(
    bloc.elementsBloc.map((elem) => ({ ...elem, blocOptions: [] }))
  );
  const [fileInputs, setFileInputs] = useState<File[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedBlocIndex, setSelectedBlocIndex] = useState<number[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [blocName, setBlocName] = useState<string>(bloc.name);
  const [confirmDeleteVisible, setConfirmDeleteVisible] =
    useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean[]>(
    new Array(bloc.elementsBloc.length).fill(false)
  );
  const [blocNames, setBlocNames] = useState<string[]>([]);
  const [galleryForms, setGalleryForms] = useState<GalleryFormData[]>([]);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(-1);
  useEffect(() => {
    const initialFileInputs = bloc.elementsBloc
      .filter((elem) => elem.type === "file")
      .map((elem) => {
        const file = new File([], elem.data);
        return file;
      });
    setFileInputs(initialFileInputs);

    const initialGalleryForms = bloc.elementsBloc
      .filter((elem) => elem.type === "gallery")
      .map((elem) => {
        const galleryFormData: GalleryFormData = JSON.parse(elem.data);
        return galleryFormData;
      });
    setGalleryForms(initialGalleryForms);

    const initialBlocNames = bloc.elementsBloc
      .filter((elem) => elem.type === "redirect")
      .map((elem) => elem.data as string);
    setBlocNames(initialBlocNames);
    setSelectedBlocIndex(initialBlocNames.map((value, index) => index));

    const initialFacebookUrls = bloc.elementsBloc
      .filter((elem) => elem.type === "media")
      .map((elem) => elem.data as string);
    setFacebookUrls(initialFacebookUrls);
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

  const handleRedirectionSelect = (value: string, index: number) => {
    console.log(index);
    if (value !== "") {
      const selectedIndex = parseInt(value);

      setSelectedBlocIndex((prevIndexes) => {
        const updatedIndexes = [...prevIndexes];
        updatedIndexes[index] = selectedIndex;
        console.log(updatedIndexes);
        return updatedIndexes;
      });

      const selectedBlocName = blocNames[selectedIndex];
      const updatedInputData = [...inputData];
      updatedInputData[index].data = selectedBlocName;
      setInputData(updatedInputData);
    }
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = e.target.files;
    console.log({ files });
    if (files && files.length > 0) {
      const file = files[0];
      const updatedInputData = [...inputData];
      updatedInputData[index].data = file.name;
      updatedInputData[index].file = file;
      if (file.size > 3e6) {
        window.alert("Please upload a file smaller than 3MB");
      }
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
    }
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
      message.success("Bloc has been duplicated successfully!");
      await duplicateBloc(bloc.id.valueOf());

      window.location.reload();
    } catch (error) {
      console.error("Error duplicating bloc: ", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlocName(e.target.value);
  };

  const handleSaveBloc = async () => {
    try {
      console.log({ inputData });
      const updatedElementsBloc = inputData.map((input, index) => {
        switch (input.type) {
          case "gallery":
            return {
              type: input.type,
              data: "",
              options_bloc: input.blocOptions,
              gallery: galleryForms,
            };
          case "photo":
          case "video":
          case "audio":
            return {
              type: input.type,
              data: uploadedFileName || input.data,
              file: input.file,
              options_bloc: input.blocOptions,
            };
            case "redirect":{
              return {
                type: input.type,
                data: input.data,}
            };
          
          case "media": {
            console.log({ facebookUrls });
            if (facebookUrls[index] === "") {
              message.error(
                "Please fill all required fields of the gallerie before saving the bloc."
              );
            }
            return {
              type: input.type,
              data: facebookUrls[index],
              options_bloc: input.blocOptions,
            };
          }
          default:
            return {
              type: input.type,
              data: input.data,
              options_bloc: input.blocOptions,
            };
        }
      });

      const updatedBloc: Bloc = {
        id: bloc.id,
        id_page: bloc.id_page,
        name: blocName,
        //@ts-expect-error
        elementsBloc: updatedElementsBloc,
      };

      console.log({ updatedBloc });

      //@ts-expect-error
      const Bloc1 = await updateBloc(bloc.id.valueOf(), updatedBloc);
      //@ts-expect-error
      if (Bloc1) {
        message.success("Bloc has been updated successfully!");
      }
      //@ts-expect-error
      await updateBloc(bloc.id.valueOf(), updatedBloc);
      window.location.reload();
    } catch (error) {
      console.error("Error saving bloc: ", error);
      message.error(
        "An error occurred while saving the bloc. Please try again."
      );
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
  const handleSave = () => {
    console.log("Saved forms:", galleryForms);
  };

  const handleInputChange = (value: string, index: number) => {
    console.log(`input ${index} with value ${value}`);
    const updatedInputData = [...inputData];
    updatedInputData[index].data = value;
    setInputData(updatedInputData);
  };

  const handleAddOptionClick = (index: number) => {
    setCurrentBlockIndex(index);
    setModalVisible((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };
  const [facebookUrls, setFacebookUrls] = useState(
    Array(inputData.length).fill("")
  );

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
  const handleFacebookURLChange = (url: string, index: number): void => {
    const updatedUrls = [...facebookUrls];
    updatedUrls[index] = url;
    setFacebookUrls(updatedUrls);
  };

  const handleDeleteGallerie = (index: number) => {
    setGalleryForms((prevForms) => prevForms.filter((_, i) => i !== index));
  };
  const handleModalCancel = () => {
    setModalVisible((prev) =>
      prev.map((visible, i) => (i === currentBlockIndex ? false : visible))
    );
  };
  (url: string, index: number) => {
    const updatedUrls = [...facebookUrls];
    updatedUrls[index] = url;
    setFacebookUrls(updatedUrls);
  };
  const renderSlider = (index: number, defaultValue: number) => {
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
            defaultValue={defaultValue}
            onChange={(event) => handleSliderChange(event, index)}
            style={{ width: "300px", height: "7px" }}
          />
        </div>
        <div style={{ fontSize: "16px" }}>{defaultValue} seconds</div>
      </div>
    );
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

  const renderInput = (type: string, index: number) => {
    if (type === "typing") {
      const defaultValue = parseInt(inputData[index]?.data) || 0;
      return (
        <Space
          direction="vertical"
          key={index}
          style={{ position: "relative" }}
        >
          {renderSlider(index, defaultValue)}
        </Space>
      );
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
      case "Agent":
        placeholderText += " Agent";

        break;
      case "photo":
      case "video":
      case "file":
      case "Audio":
        const element = inputData.find((elem) => elem.type === type);
        const fileName = element ? element.data : "";
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
            {fileName && (
              <p
                style={{
                  marginLeft: "10px",
                  fontSize: "14px",
                  color: "#87abcc",
                }}
              >
                <a>{fileName}</a>
              </p>
            )}
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

      case "redirect":
        const defaultRedirectionValue = inputData[index]?.data || "";

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
              value={defaultRedirectionValue}
              style={{ width: 200 }}
              onChange={(value) => {
                const inputIndex = inputData.findIndex(
                  (item, i) => i == index && item.type === "redirect"
                );
                if (inputIndex !== -1) {
                  handleRedirectionSelect(value, inputIndex);
                }
              }}
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
                .map((name, idx) => (
                  <Select.Option key={idx} value={idx}>
                    {name}
                  </Select.Option>
                ))}
            </Select>
          </div>
        );
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
  };

  return (
    <Card
      title={
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "11px 100px",
            borderRadius: "4px",
          }}
        >
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
                style={{ color: "green" }}
                onClick={handleSaveBloc}
              />
            </Tooltip>
            <Tooltip title="Dupliquer">
              <Button
                type="text"
                icon={<CopyOutlined />}
                style={{ color: "blue" }}
                onClick={handleDuplicateBloc}
              />
            </Tooltip>
            <Tooltip title="Supprimer">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                style={{ color: "red" }}
                onClick={() => handleDeleteInput(-1)}
              />
            </Tooltip>
          </div>
        </div>
      }
      style={{
        textAlign: "center",
        backgroundColor: "white",
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
              {input.type === "audio" && <BellOutlined />}
              {input.type === "media" && <BellOutlined />}
              {input.type === "gallery" && <BellOutlined />}
              {input.type === "redirection" && <BellOutlined />}
              {input.type === "typing" && <BellOutlined />}
              {input.type === "video" && <VideoCameraAddOutlined />}
            </div>
          }
          key={index}
          style={{
            textAlign: "center",
            backgroundColor: "white",
            color: "blue",
            height:
              input.type === "gallery"
                ? "550px"
                : input.type === "media"
                ? "250px"
                : "180px",
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
      <ButtonCard handleButtonClick={handleButtonClick} />{" "}
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
