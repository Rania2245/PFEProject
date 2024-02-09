import React, { useState, useEffect } from "react";
import { Modal, Radio, Space, Button, Input, Select } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { getAllBlocs } from "../services/BlocService";
import { Bloc } from "../types/Bloc";

export interface BlocOption {
  type: string;
  name: string;
  value: string;
  visible?: boolean[];
}

interface AddOptionModalProps {
  visible: boolean;
  onCancel: () => void;
  onAdd: (options: BlocOption[], index: number) => void;
  bloc?: Bloc;
  index: number;
}

const AddOptionModal: React.FC<AddOptionModalProps> = ({
  visible,
  onCancel,
  onAdd,
  bloc,
  index,
}) => {
  //@ts-expect-error
  const linkData = bloc?.elementsBloc[index]?.options_bloc.find(
    //@ts-expect-error
    (e) => e.type === "link"
  );

  //@ts-expect-error
  const phoneData = bloc?.elementsBloc[index]?.options_bloc.find(
    //@ts-expect-error
    (e) => e.type === "phone"
  );

  //@ts-expect-error
  const blocData = bloc?.elementsBloc[index]?.options_bloc.find(
    //@ts-expect-error
    (e) => e.type === "bloc"
  );

  const [name, setName] = useState<string>(
    blocData?.name ?? linkData?.name ?? phoneData?.name ?? ""
  );
  const [currentType, setCurrentType] = useState<"bloc" | "link" | "phone">(
    "bloc"
  );
  const [blocValue, setBlocValue] = useState<string>(blocData?.value ?? "");
  const [linkValue, setLinkValue] = useState<string>(linkData?.value ?? "");
  const [phoneValue, setPhoneValue] = useState<string>(phoneData?.value ?? "");
  const [blocNames, setBlocNames] = useState<string[]>([]);

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
  }, [getAllBlocs]);

  const handleSaveClick = () => {
    if (name.trim() === "") {
      return;
    }

    const newOptions: BlocOption[] = [];

    if (blocValue.trim() !== "") {
      newOptions.push({
        type: "bloc",
        name: name,
        value: blocValue,
      });
    }

    if (linkValue.trim() !== "") {
      newOptions.push({
        type: "link",
        name: name,
        value: linkValue,
      });
    }

    if (phoneValue.trim() !== "") {
      newOptions.push({
        type: "phone",
        name: name,
        value: phoneValue,
      });
    }

    onAdd(newOptions, index);

    onCancel();
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setCurrentType(e.target.value as "bloc" | "link" | "phone");
  };

  return (
    <Modal
      title="Add Option"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="save" type="primary" onClick={handleSaveClick}>
          Save
        </Button>,
      ]}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="Enter title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Radio.Group onChange={handleRadioChange} value={currentType}>
          <Radio.Button value="bloc">Bloc</Radio.Button>
          <Radio.Button value="link">Link</Radio.Button>
          <Radio.Button value="phone">Phone</Radio.Button>
        </Radio.Group>

        {currentType === "bloc" && (
          <Select
            placeholder="Select a bloc"
            style={{ width: "100%", marginTop: "1rem" }}
            value={blocValue}
            onChange={(value) => setBlocValue(value)}
            defaultValue={blocData?.value}
          >
            {blocNames.map((blocName) => (
              <Select.Option key={blocName} value={blocName}>
                {blocName}
              </Select.Option>
            ))}
          </Select>
        )}
        {currentType === "link" && (
          <Input
            placeholder="Enter link value"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            style={{ width: "100%", marginTop: "1rem" }}
          />
        )}
        {currentType === "phone" && (
          <Input
            placeholder="Enter phone value"
            value={phoneValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            style={{ width: "100%", marginTop: "1rem" }}
          />
        )}
      </Space>
    </Modal>
  );
};

export default AddOptionModal;
