import React, { useState } from "react";
import { Space, Button, Input, Tooltip } from "antd";
import {
  DeleteOutlined,
  FileAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { GalleryFormData } from "../types/Galerie";

interface GalleryFormProps {
  index: number;
  initialFormData: GalleryFormData;
  handleFileInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleDeleteInput: () => void;
  handleGalerieInputChange: (
    data: GalleryFormData,
    index: number,
    file: File
  ) => void;

  handleAddOptionClick: (index: number) => void;
  handleSave: () => void;
}

const GalleryForm: React.FC<GalleryFormProps> = ({
  index,
  initialFormData,
  handleDeleteInput,
  handleGalerieInputChange,
  handleAddOptionClick,
  handleSave,
}) => {
  const [formState, setFormState] = useState<GalleryFormData>(initialFormData);
  const [uploadedFileName, setUploadedFileName] = useState<File>();

  const handleDelete = () => {
    handleDeleteInput();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFileName(file);

      const updatedFormData: GalleryFormData = {
        ...formState,
        photo: file,
      };

      setFormState(updatedFormData);
      handleGalerieInputChange(updatedFormData, index, file);
    }
  };

  const handleInputChange = (field: keyof GalleryFormData, value: string) => {
    const updatedFormData: GalleryFormData = {
      ...formState,
      [field]: value,
    };

    setFormState(updatedFormData);
    handleGalerieInputChange(updatedFormData, index, uploadedFileName!);
  };

  const handleSaveForm = () => {
    handleSave();
  };

  return (
    <Space
      direction="vertical"
      key={index}
      style={{
        border: "1px solid #ddd",
        background: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Delete">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            style={{ color: "red", borderRadius: "50%" }}
            onClick={handleDelete}
          />
        </Tooltip>
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          id={`image-upload-${index}`}
          onChange={handleFileInputChange}
        />
        <label htmlFor={`image-upload-${index}`}>
          <Button
            type="default"
            icon={<UploadOutlined />}
            style={{ width: "200px", height: "40px", borderRadius: "8px" }}
            onClick={(e) => {
              e.preventDefault();
              const input = document.getElementById(
                `image-upload-${index}`
              ) as HTMLInputElement;
              input.click();
            }}
          >
            Upload Image
          </Button>
        </label>
      </div>
      {uploadedFileName && (
        <p style={{ marginLeft: "10px", fontSize: "14px", color: "#87abcc" }}>
          {uploadedFileName.name}
        </p>
      )}
      <Input
        id={`title-${index}`}
        placeholder="Enter title"
        style={{ width: "300px" }}
        value={formState.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <Input
        id={`subtitle-${index}`}
        placeholder="Enter subtitle or description"
        style={{ width: "300px" }}
        value={formState.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
      <Input
        id={`url-${index}`}
        placeholder="Enter URL"
        style={{ width: "300px" }}
        value={formState.url}
        onChange={(e) => handleInputChange("url", e.target.value)}
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
            onClick={() => {
              handleAddOptionClick(index);
              handleSaveForm();
            }}
          />
        </Tooltip>
      </div>
    </Space>
  );
};

export default GalleryForm;
