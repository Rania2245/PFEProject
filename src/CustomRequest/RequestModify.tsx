import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { QuestionRequest } from "../types/questionrequest";
import {
  getRequestById,
  modifyRequest,
} from "../services/CustomRequestService";
import { useNavigate, useParams } from "react-router-dom";
import LogoutButton from "./LogOutButton";

const RequestModify: React.FC = () => {
  const [form] = Form.useForm<QuestionRequest>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getRequestById(Number(id));
      form.setFieldsValue({
        active: response.data.active,
        partage: response.data.partage,
        //@ts-expect-error
        questions: response.data.questions.map(({ text }) => text),
        //@ts-expect-error
        responses: response.data.responses.map(({ text }) => text),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onFinish = async (values: QuestionRequest) => {
    setLoading(true);
    try {
      if (questionRequest) {
        await modifyRequest(questionRequest.id, values);
        navigate("/requests");
      }
    } catch (error) {
      console.error("Error modifying request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LogoutButton />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.List name="questions">
          {(fields, { add, remove }) => (
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
                        message: "Please input question or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Question" style={{ width: "60%" }} />
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
                  Add Question
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.List name="responses">
          {(fields, { add, remove }) => (
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
                        message: "Please input response or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Response" style={{ width: "60%" }} />
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
                  Add Response
                </Button>
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
            Modify Question
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RequestModify;
