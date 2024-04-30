import React, { useState } from "react";
import { Radio, Input, Button, Checkbox } from "antd";
import { DatabaseOutlined, PlusOutlined } from "@ant-design/icons";

const QuestionRequestAi = () => {
  const [additionalDescriptions, setAdditionalDescriptions] = useState<
    string[]
  >([]);

  const handleAddDescription = (index: number) => {
    setAdditionalDescriptions((prevDescriptions) => {
      const updatedDescriptions = [...prevDescriptions];
      updatedDescriptions[index] = "";
      return updatedDescriptions;
    });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    setAdditionalDescriptions((prevDescriptions) => {
      const updatedDescriptions = [...prevDescriptions];
      updatedDescriptions[index] = value;
      return updatedDescriptions;
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ fontFamily: "cursive" }}>
        Generate Base de connaissance En Utilisant Ai{" "}
        {<DatabaseOutlined style={{ color: "#000" }} />}
      </h2>

      <div>
        <h2 style={{ fontFamily: "cursive" }}>Page Type</h2>
        <Radio.Group>
          <Radio value={1}>Business Pages</Radio>
          <Radio value={2}>Brand Pages</Radio>
          <Radio value={3}>Community Pages</Radio>
          <Radio value={4}>Fan Pages</Radio>
          <Radio value={5}>Personal Blog Pages</Radio>
          <Radio value={6}>Educational Pages</Radio>
          <Radio value={7}>Nonprofit Pages</Radio>
          <Radio value={8}>Entertainment Pages</Radio>
          <Radio value={9}>News and Media Pages</Radio>
          <Radio value={10}>Health and Wellness Pages</Radio>
          <Radio value={11}>Food and Recipe Pages</Radio>
          <Radio value={12}>Travel Pages</Radio>
          <Radio value={13}>Photography Pages</Radio>
          <Radio value={14}>Pet Pages</Radio>
          <Radio value={15}>Fashion and Beauty Pages</Radio>
        </Radio.Group>
      </div>

      <div>
        <h3 style={{ fontFamily: "cursive" }}>Services</h3>
        <Checkbox.Group style={{ width: "100%" }}>
          <Checkbox value="Website Development">Website Development</Checkbox>
          <Checkbox value="App Development">App Development</Checkbox>
          <Checkbox value="Community Management">Community Management</Checkbox>
          <Checkbox value="Brand Management">Brand Management</Checkbox>
          <Checkbox value="SEO Services">SEO Services</Checkbox>
          <Checkbox value="PPC Advertising">PPC Advertising</Checkbox>
          <Checkbox value="Email Marketing">Email Marketing</Checkbox>
          <Checkbox value="Content Marketing">Content Marketing</Checkbox>
          <Checkbox value="Event Management">Event Management</Checkbox>
          <Checkbox value="Analytics and Reporting">
            Analytics and Reporting
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div>
        <h3 style={{ fontFamily: "cursive" }}>Products</h3>
        <Checkbox.Group style={{ width: "100%" }}>
          <Checkbox value="Social Media Toolkit">Social Media Toolkit</Checkbox>
          <Checkbox value="Graphic Design Package">
            Graphic Design Package
          </Checkbox>
          <Checkbox value="Content Creation Bundle">
            Content Creation Bundle
          </Checkbox>
          <Checkbox value="Digital Marketing Suite">
            Digital Marketing Suite
          </Checkbox>
          <Checkbox value="Website Builder Kit">Website Builder Kit</Checkbox>
          <Checkbox value="Mobile App Development Package">
            Mobile App Development Package
          </Checkbox>
          <Checkbox value="Brand Identity Package">
            Brand Identity Package
          </Checkbox>
          <Checkbox value="SEO Optimization Service">
            SEO Optimization Service
          </Checkbox>
          <Checkbox value="PPC Campaign Management Tool">
            PPC Campaign Management Tool
          </Checkbox>
          <Checkbox value="Email Marketing Software">
            Email Marketing Software
          </Checkbox>
          <Checkbox value="Content Marketing Planner">
            Content Marketing Planner
          </Checkbox>
          <Checkbox value="Event Planning Toolkit">
            Event Planning Toolkit
          </Checkbox>
          <Checkbox value="Analytics Dashboard">Analytics Dashboard</Checkbox>
          <Checkbox value="Influencer Marketing Platform">
            Influencer Marketing Platform
          </Checkbox>
          <Checkbox value="Customer Relationship Management (CRM) System">
            Customer Relationship Management (CRM) System
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div>
        <h3 style={{ fontFamily: "cursive" }}>Sales Services</h3>
        <Checkbox.Group style={{ width: "100%" }}>
          <Checkbox value="Sales Consultation">Sales Consultation</Checkbox>
          <Checkbox value="Lead Generation">Lead Generation</Checkbox>
          <Checkbox value="Sales Training">Sales Training</Checkbox>
          <Checkbox value="Sales Funnel Optimization">
            Sales Funnel Optimization
          </Checkbox>
          <Checkbox value="Customer Relationship Management (CRM)">
            Customer Relationship Management (CRM)
          </Checkbox>
          <Checkbox value="Sales Strategy Development">
            Sales Strategy Development
          </Checkbox>
          <Checkbox value="Sales Pipeline Management">
            Sales Pipeline Management
          </Checkbox>
          <Checkbox value="Sales Enablement Solutions">
            Sales Enablement Solutions
          </Checkbox>
          <Checkbox value="Sales Forecasting">Sales Forecasting</Checkbox>
          <Checkbox value="Sales Performance Analysis">
            Sales Performance Analysis
          </Checkbox>
        </Checkbox.Group>
      </div>

      <div>
        <Button type="primary">Generate Scenario</Button>
      </div>

      <div>
        {additionalDescriptions.map((description, index) => (
          <div key={index} style={{ marginTop: "10px" }}>
            <Input
              placeholder="Additional Description"
              value={description}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              style={{ width: "80%" }}
            />
            <Button
              type="link"
              onClick={() => handleAddDescription(index)}
              icon={<PlusOutlined />}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionRequestAi;
