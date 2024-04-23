import React, { useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Tooltip,
  Button,
  Spin,
  message,
} from "antd";
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
import {
  getAllBlocs,
  getDefaultMessage,
  getMenu,
  getWelcomeMessage,
} from "../services/BlocService";
import SelectedBloc from "./SelectedBloc";
import "./button.css";
import LogoutButton from "../CustomRequest/NavBar";
import { useParams } from "react-router-dom";
import { getPageById } from "../services/PageService";

const { Title } = Typography;

const AutomatisationMessenger: React.FC = () => {
  const [welcomeHovered, setWelcomeHovered] = useState(false);
  const [defaultHovered, setDefaultHovered] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [addMenuHovered, setAddMenuHovered] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showAddBloc, setShowAddBloc] = useState(false);
  const [existingBlocs, setExistingBlocs] = useState<Bloc[]>([]);
  const [existingMenus, setExistingMenus] = useState<Bloc[]>([]);
  const [selectedBloc, setSelectedBloc] = useState<Bloc | null>(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showDefaultMessage, setShowDefaultMessage] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState<Bloc | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    if (id) {
      fetchExistingBlocs();
      fetchExistingMenus();
    }
  }, [id]);

  const fetchExistingBlocs = async () => {
    try {
      if (!id) return;
      console.log(id);
      const page = await getPageById(id);
      console.log(page);

      const blocs = await getAllBlocs();
      setExistingBlocs(blocs);
      setLoading(false);
      console.log(blocs);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching existing blocs: ", error);
    }
  };
  const fetchExistingMenus = async () => {
    try {
      if (!id) return;
      console.log(id);
      const page = await getPageById(id);
      console.log(page);

      const menus = await getMenu();
      console.log(menus);
      //@ts-expect-error

      setExistingMenus(menus);

      setLoading(false);
      console.log(menus);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching existing menus: ", error);
    }
  };

  const fetchWelcomeMessage = async () => {
    try {
      const welcomeMsg = await getWelcomeMessage();
      console.log(welcomeMsg);
      setWelcomeMessage(welcomeMsg);
    } catch (error) {
      console.error("Error fetching welcome message: ", error);
    }
  };

  const handleWelcomeMessageClick = async () => {
    try {
      setLoading2(true);
      setShowWelcomeMessage(true);
      setShowDefaultMessage(false);
      setSelectedBloc(null);

      const welcomeMsg = await getWelcomeMessage();

      setSelectedBloc(welcomeMsg);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setLoading2(false);
    } catch (error) {
      console.error("Error handling welcome message click: ", error);
      message.error(
        "no welcome messege found ,Please inter your welcome messege first ! "
      );
      setLoading2(false);
    }
  };

  const handleDefaultMessageClick = async () => {
    try {
      setLoading2(true);
      setShowDefaultMessage(true);
      setShowWelcomeMessage(false);
      setSelectedBloc(null);
      const defaultMsg = await getDefaultMessage();
      setSelectedBloc(defaultMsg);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setLoading2(false);
    } catch (error) {
      console.error("Error handling default message click: ", error);
      setLoading2(false);
      message.error(
        "no default message found ,Please inter your default messagefirst ! "
      );
    }
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
    if (showWelcomeMessage && welcomeMessage) {
      setWelcomeMessage(welcomeMessage);
      setSelectedBloc(welcomeMessage);
    }
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
          fontFamily: "cursive",
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
                  fontFamily: "cursive",
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
                <div style={{ display: "flex", alignItems: "center" }}>
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
                    <MessageOutlined
                      style={{
                        fontSize: "14px",
                        fontFamily: "cursive",
                        marginRight: "5px",
                      }}
                    />
                    Welcome Message
                  </span>
                </div>
              }
              style={{
                marginBottom: "10px",
                backgroundColor: welcomeHovered ? " #87abcc" : "#cfd7df",
                color: "#333",
                borderRadius: "10px",
                fontFamily: "Arial, sans-serif",
              }}
              hoverable
              onClick={handleWelcomeMessageClick}
              onMouseEnter={handleWelcomeMouseEnter}
              onMouseLeave={handleWelcomeMouseLeave}
            >
              <p style={{ fontSize: "14px", fontFamily: "cursive" }}>
                The Welcome Message serves as the initial interaction point for
                users initiating a new conversation with your page.
              </p>
            </Card>
            <Card
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
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
                    <ApiOutlined
                      style={{
                        fontSize: "14px",
                        fontFamily: "cursive",
                        marginRight: "5px",
                      }}
                    />
                    Default Message
                  </span>
                </div>
              }
              style={{
                backgroundColor: defaultHovered ? " #87abcc" : "#cfd7df",
                color: "#333",
                borderRadius: "10px",
                marginBottom: "10px",
                fontFamily: "Arial, sans-serif",
              }}
              hoverable
              onClick={handleDefaultMessageClick}
              onMouseEnter={handleDefaultMouseEnter}
              onMouseLeave={handleDefaultMouseLeave}
            >
              <p style={{ fontSize: "14px", fontFamily: "cursive" }}>
                This typically occurs when the message is unclear, contains
                typos, or falls outside the scope of the chatbot's programmed
                capabilities.
              </p>
            </Card>
            <div
              style={{
                textAlign: "left",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {loading && <Spin />}
                </div>

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
                  fontFamily: "cursive",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                <MenuOutlined /> Eléments de menu
              </div>
            }
            style={{
              textAlign: "left",
              cursor: "pointer",
              backgroundColor: "white",
              color: "#333",

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
            <span style={{ fontFamily: "cursive" }}>
              Le menu aide les utilisateurs à accéder à des fonctionnalités tout
              au long de la conversation.
            </span>
            {existingMenus.map((bloc) => (
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
            <div>
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
                  onClick={handleAddBlocClick}
                ></Button>
              </Tooltip>
            </div>
          </Card>
        </div>
        <Col span={12}>
          <Spin spinning={loading2}></Spin>
          {selectedBloc !== null ? <SelectedBloc bloc={selectedBloc} /> : null}
          {showAddMenu && <AddMenu />}
          {showAddBloc && <AddBloc />}
        </Col>
      </Row>
    </>
  );
};

export default AutomatisationMessenger;
