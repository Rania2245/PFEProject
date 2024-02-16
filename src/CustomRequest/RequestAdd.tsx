import React, { useState } from "react";
import { Form, Input, Button, Switch, Row, Col } from "antd";
import { QuestionRequest } from "../types/questionrequest";
import LogoutButton from "./NavBar";
import { MinusCircleOutlined } from "@ant-design/icons";
import { addRequest } from "../services/CustomRequestService";
import { useNavigate } from "react-router-dom";

const RequestAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: QuestionRequest) => {
    setLoading(true);
    try {
      console.log(values);
      await addRequest(values);
      navigate("/requests");
      console.log("Question added successfully:", values);
    } catch (error) {
      console.error("Error while adding the question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LogoutButton />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.List name="questions">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Row gutter={8} key={field.key}>
                  <Col span={22} key={`${field.key}-col`}>
                    <Form.Item
                      label={fields.indexOf(field) === 0 ? "Questions" : ""}
                      name={[field.name, "text"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input question",
                        },
                      ]}
                    >
                      <Input placeholder="Question" />
                    </Form.Item>
                  </Col>
                  <Col span={2} key={`${field.key}-minus`}>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()}>
                  Add question
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="responses">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Row gutter={8} key={field.key}>
                  <Col span={22} key={`${field.key}-col`}>
                    <Form.Item
                      label={fields.indexOf(field) === 0 ? "Responses" : ""}
                      name={[field.name, "text"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input response",
                        },
                      ]}
                    >
                      <Input placeholder="Response" />
                    </Form.Item>
                  </Col>
                  <Col span={2} key={`${field.key}-minus`}>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()}>
                  Add response
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item label="Active" name="active" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Shared" name="partage" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Question
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RequestAdd;
