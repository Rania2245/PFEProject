import React, { useState } from "react";
import { Radio, Input, Button, Checkbox, Tooltip } from "antd";
import {
  AreaChartOutlined,
  DatabaseOutlined,
  FacebookOutlined,
  PlusOutlined,
  QrcodeOutlined,
  ReloadOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

const QuestionRequestAi = () => {
  const [selectedServices, setSelectedServices] = useState<CheckboxValueType[]>(
    []
  );
  const [selectedProducts, setSelectedProducts] = useState<CheckboxValueType[]>(
    []
  );
  const [selectedSalesServices, setSelectedSalesServices] = useState<
    CheckboxValueType[]
  >([]);

  const [selectedPageType, setSelectedPageType] = useState(null);

  const [additionalDescriptions, setAdditionalDescriptions] = useState<
    string[]
  >([]);

  const handleGenerateScenario = () => {
    console.log("Page Type:", selectedPageType);
    console.log("Selected Services:", selectedServices);
    console.log("Selected Products:", selectedProducts);
    console.log("Selected Sales Services:", selectedSalesServices);
    console.log("Additional Descriptions:", additionalDescriptions);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        marginTop: "-30px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontFamily: "cursive",
            textAlign: "center",
            color: "#5072A7",
          }}
        >
          Générer votre base de connaissances avec l'IA
          <DatabaseOutlined style={{ color: "green" }} />
        </h2>

        <div>
          <h3
            style={{
              fontFamily: "cursive",
              textAlign: "left",
              color: "#72A0C1",
            }}
          >
            Type De Page <FacebookOutlined style={{ color: "green" }} />
          </h3>
          <Radio.Group onChange={(e) => setSelectedPageType(e.target.value)}>
            <Radio value="Business Pages">Pages professionnelles</Radio>
            <Radio value="Brand Pages">Pages de marque</Radio>
            <Radio value="Community Pages">Pages communautaires</Radio>
            <Radio value="Fan Pages">Pages de fans</Radio>
            <Radio value="Personal Blog Pages">
              Pages de blog personnelles
            </Radio>
            <Radio value="Educational Pages">Pages éducatives</Radio>
            <Radio value="Nonprofit Pages">Pages à but non lucratif</Radio>
            <Radio value="Entertainment Pages">Pages de divertissement</Radio>
            <Radio value="News and Media Pages">
              Pages d'actualités et de médias
            </Radio>
            <Radio value="Health and Wellness Pages">
              Pages de santé et de bien-être
            </Radio>
            <Radio value="Food and Recipe Pages">
              Pages de recettes et de cuisine
            </Radio>
            <Radio value="Travel Pages">Pages de voyage</Radio>
            <Radio value="Photography Pages">Pages de photographie</Radio>
            <Radio value="Pet Pages">Pages d'animaux de compagnie</Radio>
            <Radio value="Fashion and Beauty Pages">
              Pages de mode et de beauté
            </Radio>
          </Radio.Group>
        </div>

        <div>
          <h3
            style={{
              fontFamily: "cursive",
              textAlign: "left",
              color: "#72A0C1",
            }}
          >
            {" "}
            Services
            <SafetyOutlined style={{ color: "green" }} />
          </h3>
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={(values) => setSelectedServices(values)}
          >
            <Checkbox value="Website Development">
              Développement de site web
            </Checkbox>
            <Checkbox value="App Development">
              Développement d'application
            </Checkbox>
            <Checkbox value="Community Management">
              Gestion de communauté
            </Checkbox>
            <Checkbox value="Brand Management">Gestion de marque</Checkbox>
            <Checkbox value="SEO Services">
              Services de référencement (SEO)
            </Checkbox>
            <Checkbox value="PPC Advertising">Publicité PPC</Checkbox>
            <Checkbox value="Email Marketing">Marketing par e-mail</Checkbox>
            <Checkbox value="Content Marketing">Marketing de contenu</Checkbox>
            <Checkbox value="Event Management">Gestion d'événements</Checkbox>
            <Checkbox value="Analytics and Reporting">
              Analyse et rapports
            </Checkbox>
          </Checkbox.Group>
        </div>

        <div>
          <h3
            style={{
              fontFamily: "cursive",
              textAlign: "left",
              color: "#72A0C1",
            }}
          >
            {" "}
            Produits
            <QrcodeOutlined style={{ color: "green" }} />
          </h3>
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={(values) => setSelectedProducts(values)}
          >
            <Checkbox value="Social Media Toolkit">
              Boîte à outils des médias sociaux
            </Checkbox>
            <Checkbox value="Graphic Design Package">
              Pack de conception graphique
            </Checkbox>
            <Checkbox value="Content Creation Bundle">
              Ensemble de création de contenu
            </Checkbox>
            <Checkbox value="Digital Marketing Suite">
              Suite de marketing numérique
            </Checkbox>
            <Checkbox value="Website Builder Kit">
              Kit de création de site web
            </Checkbox>
            <Checkbox value="Mobile App Development Package">
              Pack de développement d'applications mobiles
            </Checkbox>
            <Checkbox value="Brand Identity Package">
              Pack d'identité de marque
            </Checkbox>
            <Checkbox value="SEO Optimization Service">
              Service d'optimisation SEO
            </Checkbox>
            <Checkbox value="PPC Campaign Management Tool">
              Outil de gestion de campagnes PPC
            </Checkbox>
            <Checkbox value="Email Marketing Software">
              Logiciel de marketing par e-mail
            </Checkbox>
            <Checkbox value="Content Marketing Planner">
              Planificateur de marketing de contenu
            </Checkbox>
            <Checkbox value="Event Planning Toolkit">
              Boîte à outils de planification d'événements
            </Checkbox>
            <Checkbox value="Analytics Dashboard">
              Tableau de bord d'analyse
            </Checkbox>
            <Checkbox value="Influencer Marketing Platform">
              Plateforme de marketing d'influence
            </Checkbox>
            <Checkbox value="Customer Relationship Management (CRM) System">
              Système de gestion de la relation client (CRM)
            </Checkbox>
          </Checkbox.Group>
        </div>

        <div>
          <h3
            style={{
              fontFamily: "cursive",
              textAlign: "left",
              color: "#72A0C1",
            }}
          >
            {" "}
            Services de Vente
            <AreaChartOutlined style={{ color: "green" }} />
          </h3>
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={(values) => setSelectedSalesServices(values)}
          >
            <Checkbox value="Sales Consultation">
              Consultation en Vente
            </Checkbox>
            <Checkbox value="Lead Generation">Génération de Leads</Checkbox>
            <Checkbox value="Sales Training">Formation en Vente</Checkbox>
            <Checkbox value="Sales Funnel Optimization">
              Optimisation du Tunnel de Vente
            </Checkbox>
            <Checkbox value="Customer Relationship Management (CRM)">
              Gestion de la Relation Client (CRM)
            </Checkbox>
            <Checkbox value="Sales Strategy Development">
              Développement de Stratégie de Vente
            </Checkbox>
            <Checkbox value="Sales Pipeline Management">
              Gestion du Pipeline de Vente
            </Checkbox>
            <Checkbox value="Sales Enablement Solutions">
              Solutions d'Autonomisation des Ventes
            </Checkbox>
            <Checkbox value="Sales Forecasting">Prévision des Ventes</Checkbox>
            <Checkbox value="Sales Performance Analysis">
              Analyse de Performance des Ventes
            </Checkbox>
          </Checkbox.Group>
        </div>
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              placeholder="Ajouter plus de description de votre page"
              onChange={(e) => {
                const updatedDescriptions = [...additionalDescriptions];
              }}
              style={{
                width: "100%",
                height: "80px",
                backgroundColor: "#e6f7ff",
              }}
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Tooltip title="Appuyez pour générer votre base de connaissances avec l'IA selon vos choix sélectionnés">
            <Button
              style={{
                fontFamily: "cursive",
                textAlign: "left",
                color: "#72A0C1",
              }}
              onClick={handleGenerateScenario}
            >
              <ReloadOutlined style={{ color: "green" }} />
              Générer la base de connaissance
            </Button>
          </Tooltip>
        </div>
        <div style={{ marginTop: "20px" }}>
          {additionalDescriptions.map((description, index) => (
            <div
              key={index}
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Input
                placeholder="Ajouter plus de description de votre page"
                value={description}
                onChange={(e) => {
                  const updatedDescriptions = [...additionalDescriptions];

                  updatedDescriptions[index] = e.target.value;
                  setAdditionalDescriptions(updatedDescriptions);
                }}
                style={{ width: "80%", backgroundColor: "#e6f7ff" }}
              />
              <Button
                type="link"
                onClick={() => {
                  const updatedDescriptions = [...additionalDescriptions];

                  updatedDescriptions.push("");
                  setAdditionalDescriptions(updatedDescriptions);
                }}
                icon={<PlusOutlined />}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionRequestAi;
