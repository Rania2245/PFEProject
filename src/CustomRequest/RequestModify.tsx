import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch, Select, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { QuestionRequest } from "../types/questionrequest";
import {
  getRequestById,
  modifyRequest,
} from "../services/CustomRequestService";
import { useNavigate, useParams } from "react-router-dom";
import LogoutButton from "./NavBar";

import { getUsersEmail } from "../services/UserService";
import { getDeps } from "../services/departmentService";

const { Option } = Select;

type PartageOption = "private" | "public" | "users" | "department";

const RequestModify: React.FC = () => {
  const [form] = Form.useForm<QuestionRequest>();
  const [loading, setLoading] = useState(false);
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [initialPartageValue, setInitialPartageValue] =
    useState<PartageOption>("private");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await getRequestById(Number(id));
      console.log(response);

      const partageData: { type: PartageOption; value: string }[] =
        //@ts-expect-error
        JSON.parse(response.data.partage);
      const initialType = partageData[0].type;
      setInitialPartageValue(initialType);

      form.setFieldsValue({
        active: response.data.active,
        //@ts-expect-error
        partage: initialType,
        //@ts-expect-error
        questions: response.data.questions.map(({ text }) => text),
        //@ts-expect-error
        responses: response.data.responses.map(({ text }) => text),
      });

      if (initialType === "users") {
        const emails = await getUsersEmail();
        setUserEmails(emails);
      } else if (initialType === "department") {
        const deps = await getDeps();
        setDepartments(deps);
        console.log(departments);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePartageTypeChange = async (value: PartageOption) => {
    if (value === "users") {
      const emails = await getUsersEmail();
      setUserEmails(emails);
    } else if (value === "department") {
      const departmentsData = await getDeps();
      setDepartments(departmentsData);
    }
  };
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      let modifiedPartage: any;

      if (values.partage === "users") {
        modifiedPartage = [
          {
            type: "users",
            value: values.users.join(","),
          },
        ];
      } else if (values.partage === "department") {
        modifiedPartage = [
          {
            type: "department",
            value: values.department.join(","),
          },
        ];
      } else {
        modifiedPartage = [];
      }

      const modifiedQuestions = values.questions.map((question: string) => ({
        text: question,
      }));

      const modifiedResponses = values.responses.map(
        (response: string, id: number) => ({
          id: id + 2, // Ensure response IDs start from 2
          text: response,
        })
      );

      const modifiedValues = {
        active: values.active,
        partage: modifiedPartage,
        questions: modifiedQuestions,
        responses: modifiedResponses,
      };

      await modifyRequest(Number(id), modifiedValues);
      message.success("Request updated successfully");
      navigate("/requests");
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
        <Form.Item
          label="Partage"
          name="partage"
          initialValue={initialPartageValue}
        >
          <Select onChange={handlePartageTypeChange}>
            <Option value="private">Private</Option>
            <Option value="public">Public</Option>
            <Option value="users">Users</Option>
            <Option value="department">Department</Option>
          </Select>
        </Form.Item>
        {form.getFieldValue("partage") === "users" && (
          <Form.Item label="Users" name="users">
            <Select mode="multiple" placeholder="Select users">
              {userEmails.map((email) => (
                <Option key={email} value={email}>
                  {email}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {form.getFieldValue("partage") === "department" && (
          <Form.Item label="Department" name="department">
            <Select mode="multiple" placeholder="Select departments">
              {departments.map((department) => (
                <Option value={department}>{department.name}</Option>
              ))}
            </Select>
          </Form.Item>
        )}

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
