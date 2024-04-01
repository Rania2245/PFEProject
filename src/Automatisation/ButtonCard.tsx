import React from "react";

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
} from "@ant-design/icons";
import "./button.css";

const ButtonCard = ({
  handleButtonClick,
}: {
  handleButtonClick: (type: string) => void;
}) => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <Button
            type="primary"
            icon={<MessageOutlined style={{ color: "DarkBlue" }} />}
            className="button-card"
            onClick={() => handleButtonClick("text")}
          >
            <br />
            Text
          </Button>
          <Button
            type="primary"
            icon={<BellOutlined style={{ color: "DarkGreen" }} />}
            className="button-card"
            onClick={() => handleButtonClick("photo")}
          >
            <br />
            Photo
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            icon={<VideoCameraAddOutlined style={{ color: "Purple" }} />}
            className="button-card"
            onClick={() => handleButtonClick("video")}
          >
            <br />
            Video
          </Button>

          <Button
            type="primary"
            icon={<AppstoreAddOutlined style={{ color: "Indigo" }} />}
            className="button-card"
            onClick={() => handleButtonClick("galerie")}
          >
            <br />
            galerie
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            icon={<MenuOutlined style={{ color: "Magenta" }} />}
            className="button-card"
            onClick={() => handleButtonClick("link")}
          >
            <br />
            Link
          </Button>
          <Button
            type="primary"
            icon={<MailOutlined style={{ color: "Olive" }} />}
            className="button-card"
            onClick={() => handleButtonClick("email")}
          >
            <br />
            Mail
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            icon={<UserOutlined style={{ color: "Gold" }} />}
            className="button-card"
            onClick={() => handleButtonClick("Agent")}
          >
            <br />
            Agent
          </Button>
          <Button
            type="primary"
            icon={<FacebookOutlined style={{ color: "blue" }} />}
            className="button-card"
            onClick={() => handleButtonClick("media")}
          >
            <br />
            Media
          </Button>
        </div>{" "}
        <div>
          <Button
            type="primary"
            icon={<CustomerServiceOutlined style={{ color: "pink" }} />}
            className="button-card"
            onClick={() => handleButtonClick("Audio")}
          >
            {" "}
            <br />
            Audio
          </Button>
          <Button
            type="primary"
            icon={<PhoneOutlined style={{ color: "green" }} />}
            className="button-card"
            onClick={() => handleButtonClick("mobile")}
          >
            <br />
            Mobile
          </Button>
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            type="primary"
            icon={<SendOutlined style={{ color: "grey" }} />}
            className="button-card"
            style={{ width: "140px", marginRight: "10px" }}
            onClick={() => handleButtonClick("quickResponse")}
          >
            <br />
            Quick Response
          </Button>
          <Button
            type="primary"
            icon={<RedoOutlined style={{ color: "Brown" }} />}
            className="button-card"
            style={{ width: "140px", marginLeft: "10px" }}
            onClick={() => handleButtonClick("Redirection")}
          >
            <br />
            Redirection
          </Button>
          <Button
            type="primary"
            icon={<ApiOutlined style={{ color: "DarkCyan" }} />}
            className="button-card"
            style={{ width: "140px", marginLeft: "10px" }}
            onClick={() => handleButtonClick("typing")}
          >
            <br />
            Typing
          </Button>
        </div>
      </div>
    </>
  );
};

export default ButtonCard;
