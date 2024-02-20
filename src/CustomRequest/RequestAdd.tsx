import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch, Row, Col, Select, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { addRequest } from "../services/CustomRequestService";
import { useNavigate } from "react-router-dom";
import { getDeps } from "../services/departmentService";
import { getUsersEmail } from "../services/UserService";
import { Department } from "../types/department";
import { User } from "../types/user";
import { PartageOption } from "../types/partageOption";

const { Option } = Select;

const RequestAdd: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [partageType, setPartageType] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
    fetchUserEmails();
  }, []);

  const fetchDepartments = async () => {
    try {
      const departmentsData = await getDeps();
      setDepartments(departmentsData);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchUserEmails = async () => {
    try {
      const emails = await getUsersEmail();
      console.log(emails);
      setUserEmails(emails);
    } catch (error) {
      console.error("Error fetching user emails:", error);
    }
  };
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      let partage: PartageOption[] = [];
      if (values.partage === "users") {
        console.log({ userEmails });

        partage = userEmails.map((email: string) => ({
          type: "users",
          value: email,
        }));
      } else if (values.partage === "department") {
        console.log({ departments });
        //@ts-expect-error
        partage = departments.map((department) => ({
          type: "department",
          value: department,
        }));
      } else {
        partage.push({ type: values.partage, value: values.partage });
      }

      const requestData = {
        active: values.active,
        partage: partage,
        questions: values.questions.map((question: any) => ({
          text: question.text,
        })),
        responses: values.responses.map((response: any) => ({
          text: response.text,
        })),
      };
      console.log({ requestData });
      await addRequest(requestData);
      navigate("/requests");
      message.success("Question added successfully");
      console.log("Question added successfully:", requestData);
    } catch (error) {
      console.error("Error while adding the question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePartageTypeChange = (value: string) => {
    setPartageType(value);
  };

  const renderValueFields = () => {
    if (partageType === "users") {
      return (
        <Form.Item label="Mail of the users" name="users" key="users">
          <Select mode="multiple">
            {userEmails.map((email, index) => (
              <Option key={index} value={email}>
                {email}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    } else if (partageType === "department") {
      return (
        <Form.Item label="Departments" name="departments" key="departments">
          <Select mode="multiple">
            {departments.map((department, index) => (
              <Option key={index} value={department}>
                {department.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    } else {
      return null;
    }
  };

  return (
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
      <Form.Item label="Partage" name="partage">
        <Select onChange={handlePartageTypeChange}>
          <Option value="private">Private</Option>
          <Option value="public">Public</Option>
          <Option value="users">Users</Option>
          <Option value="department">Department</Option>
        </Select>
      </Form.Item>

      {renderValueFields()}

      <Form.Item label="Active" name="active" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Question
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RequestAdd;
