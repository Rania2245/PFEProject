import React, { useState, useEffect } from "react";
import { Form, Input, Button, Switch, Select, message } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { QuestionRequest } from "../types/questionrequest";
import {
  getRequestById,
  modifyRequest,
} from "../services/CustomRequestService";

import { getUserById, getUsersEmail } from "../services/UserService";
import { getDeps } from "../services/departmentService";
import { PartageOption } from "../types/partageOption";

const { Option } = Select;

interface Props {
  id: string;
  visible: boolean;
  onCancel: () => void;
}

const UserModify: React.FC<Props> = ({ id, visible, onCancel }) => {
  const [form] = Form.useForm<QuestionRequest>();
  const [loading, setLoading] = useState(false);
  const [userEmails, setUserEmails] = useState<string[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [initialPartageValue, setInitialPartageValue] =
    useState<PartageOption>();

  useEffect(() => {
    if (visible) {
      fetchData();
    }
  }, [visible]);

  const fetchData = async () => {
    try {
      const response = await getUserById(Number(id));
      console.log(response);
      const partageData: { type: PartageOption; value: string }[] = JSON.parse(
        response.data.partage
      );
      const initialType = partageData[0].type;
      setInitialPartageValue(initialType);

      //          form.setFieldsValue({
      //         id:
      //    });
      //@ts-expect-error
      if (initialType === "users") {
        const emails = await getUsersEmail();
        setUserEmails(emails);
        //@ts-expect-error
      } else if (initialType === "department") {
        const deps = await getDeps();
        setDepartments(deps);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePartageTypeChange = async (value: PartageOption) => {
    //@ts-expect-error
    if (value === "users") {
      const emails = await getUsersEmail();
      setUserEmails(emails);
      //@ts-expect-error
    } else if (value === "department") {
      const departmentsData = await getDeps();
      setDepartments(departmentsData);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const modifiedPartage =
        values.partage === "users" || values.partage === "department"
          ? [{ type: values.partage, value: values[values.partage].join(",") }]
          : [{ type: values.partage, value: "" }];

      const modifiedValues = {
        active: values.active,
        partage: modifiedPartage,
        questions: values.questions.map((question: string) => ({
          text: question,
        })),
        responses: values.responses.map((response: string) => ({
          text: response,
        })),
      };
      //@ts-expect-error
      await modifyRequest(Number(id), modifiedValues);
      message.success("Request updated successfully");
    } catch (error) {
      console.error("Error modifying request:", error);
      message.error("Failed to updated ");
    } finally {
      setLoading(false);
      onCancel();
    }
  };

  return (
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
              <Option key={department} value={department}>
                {department}
              </Option>
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
  );
};

export default UserModify;
