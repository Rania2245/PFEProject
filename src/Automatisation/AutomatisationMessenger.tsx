import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Card, Tooltip, Button } from "antd";
import {
  ApiOutlined,
  MessageOutlined,
  BellOutlined,
  PlusOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import AddBloc from "./AddBloc";
import AddMenu from "./AddMenu";
import { Bloc } from "../types/Bloc";
import { getAllBlocs } from "../services/BlocService";
import SelectedBloc from "./SelectedBloc";
import "./button.css";

const { Title } = Typography;

const AutomatisationMessenger: React.FC = () => {
  const [welcomeHovered, setWelcomeHovered] = useState(false);
  const [defaultHovered, setDefaultHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [addMenuHovered, setAddMenuHovered] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showAddBloc, setShowAddBloc] = useState(false);
  const [existingBlocs, setExistingBlocs] = useState<Bloc[]>([]);
  const [selectedBloc, setSelectedBloc] = useState<Bloc | null>(null);

  useEffect(() => {
    fetchExistingBlocs();
  }, []);

  const fetchExistingBlocs = async () => {
    try {
      const blocs = await getAllBlocs();
      setExistingBlocs(blocs);
    } catch (error) {
      console.error("Error fetching existing blocs: ", error);
    }
  };

  const handleAddMenuClick = () => {
    setShowAddMenu(true);
    setShowAddBloc(false);
    setSelectedBloc(null);
  };

  const handleAddBlocClick = () => {
    setShowAddBloc(true);
    setShowAddMenu(false);
    setSelectedBloc(null);
  };

  const handleWelcomeMouseEnter = () => {
    setWelcomeHovered(true);
  };

  const handleWelcomeMouseLeave = () => {
    setWelcomeHovered(false);
  };

  const handleDefaultMouseEnter = () => {
    setDefaultHovered(true);
  };

  const handleDefaultMouseLeave = () => {
    setDefaultHovered(false);
  };

  const handleMenuMouseEnter = () => {
    setMenuHovered(true);
  };

  const handleMenuMouseLeave = () => {
    setMenuHovered(false);
  };

  const handleSelectBloc = (bloc: Bloc) => {
    setSelectedBloc(bloc);
  };

  return (
    <>
      <Title
        level={2}
        style={{
          textAlign: "left",
          borderBottom: "1px solid #D0CCCC",
          color: "#87abcc",
          marginBottom: "10px",
          paddingBottom: "5px",
        }}
      >
        <BellOutlined /> Automatisation Messenger
      </Title>
      <Row gutter={[16, 16]} style={{ padding: "20px", marginBottom: "10px" }}>
        <div style={{ width: "50%" }}>
          <Card
            title={
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "11px 100px",
                  borderRadius: "4px",
                  display: "inline-block",
                  width: "100%",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "18px",
                  color: "#333",
                }}
              >
                <MessageOutlined /> Liste des blocs
              </div>
            }
            bordered={false}
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              borderRadius: "10px",
              width: "100%",
              marginRight: "16px",
              marginBottom: "10px",
            }}
          >
            <Card
              title={
                <>
                  <span
                    style={{
                      marginRight: "8px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      fontFamily: "Arial, sans-serif",
                      color: "#3b5998",
                    }}
                  >
                    Welcome Message
                  </span>

                  <MessageOutlined />
                </>
              }
              style={{
                marginBottom: "10px",
                backgroundColor: welcomeHovered ? " #87abcc" : "#cfd7df",
                color: "#333",
              }}
              hoverable
              onMouseEnter={handleWelcomeMouseEnter}
              onMouseLeave={handleWelcomeMouseLeave}
            >
              Welcome message content
            </Card>
            <Card
              title={
                <>
                  <span
                    style={{
                      marginRight: "8px",
                      marginBottom: "10px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      fontFamily: "Arial, sans-serif",
                      color: "#3b5998",
                    }}
                  >
                    Default Message
                  </span>
                  <ApiOutlined />
                </>
              }
              style={{
                backgroundColor: defaultHovered ? " #87abcc" : "#cfd7df",
                color: "#333",
                marginBottom: "10px",
              }}
              hoverable
              onMouseEnter={handleDefaultMouseEnter}
              onMouseLeave={handleDefaultMouseLeave}
            >
              Default message content
            </Card>

            <div
              style={{
                textAlign: "left",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                {existingBlocs.map((bloc) => (
                  <Button
                    key={String(bloc.id)}
                    style={{
                      marginRight: "10px",
                      marginBottom: "10px",
                      backgroundColor: "#fff",
                      color: "black",
                      border: "2px solid #87abcc",
                      width: "120px",
                      height: "50px",

                      fontFamily: "Arial, sans-serif",
                      fontSize: "16px",
                      padding: "0",
                      transition:
                        "background-color 0.3s, border-color 0.3s, color 0.3s",
                    }}
                    onClick={() => handleSelectBloc(bloc)}
                    className="custom-button"
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#e6f7ff";
                      e.currentTarget.style.borderColor = "#1890ff";
                      e.currentTarget.style.color = "#1890ff";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.borderColor = "#87abcc";
                      e.currentTarget.style.color = "black";
                    }}
                  >
                    {bloc.name}
                  </Button>
                ))}
              </div>

              <div>
                <Tooltip title="Add Bloc">
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                      backgroundColor: "#87abcc",
                      borderColor: "#c9c9c9",
                      width: "100px",
                      height: "40px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                    onClick={handleAddBlocClick}
                  ></Button>
                </Tooltip>
              </div>
            </div>
          </Card>
          <Card
            title={
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "11px 100px",
                  borderRadius: "4px",
                  display: "inline-block",
                  width: "100%",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                <MenuOutlined /> Eléments de menu
              </div>
            }
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              color: "#333",
              height: "200px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              width: "100%",
            }}
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
          >
            <MenuOutlined
              style={{
                fontSize: "24px",
                marginRight: "8px",
                marginBottom: "10px",
              }}
            />
            <span>
              Le menu aide les utilisateurs à accéder à des fonctionnalités tout
              au long de la conversation.
            </span>
            <div
              style={{
                textAlign: "left",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Tooltip title="Add Menu">
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{
                    backgroundColor: "#87abcc",
                    borderColor: "#c9c9c9",
                    width: "100px",
                    height: "40px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  onClick={handleAddMenuClick}
                ></Button>
              </Tooltip>
            </div>
          </Card>
        </div>

        <Col span={12}>
          {selectedBloc !== null ? <SelectedBloc bloc={selectedBloc} /> : null}
          {showAddMenu && <AddMenu />}
          {showAddBloc && <AddBloc />}
        </Col>
      </Row>
    </>
  );
};

export default AutomatisationMessenger;
