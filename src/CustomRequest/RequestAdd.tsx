import React, { useState } from "react";
import { Form, Input, Button, Switch } from "antd";
import { QuestionRequest } from "../types/questionrequest";
import LogoutButton from "./LogOutButton";
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
      await addRequest(values);
      console.log({ values });
      form.resetFields();
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
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Questions" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input question delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="question" style={{ width: "60%" }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
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
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Responses" : ""}
                  required={false}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input response delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="response" style={{ width: "60%" }} />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
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
