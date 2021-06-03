import React from "react";
import { Form, Input, Button, Divider, message, Progress } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { FormBody } from "../styles";

export default function AccountForm(props) {
  const [form] = Form.useForm();

  const next = async () => {
    try {
      const values = await form.validateFields();
      props.nextStep();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const back = async () => {
    props.prevStep();
  };

  React.useEffect(() => {
    message.success("You are one step closer of being a part of our family.");
  }, []);

  return (
    <FormBody>
      <div className="content">
        <Divider className="heading">Account Details</Divider>
        <div className="progress">
          <Progress size="large" percent={66} steps={3} />
        </div>
        <Form
          // form={form}
          className="form"
          size="large"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{
            email: props.values["email"],
            password: props.values["password"],
            confirmPassword: props.values["confirmPassword"],
          }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input
              value={props.values["email"]}
              onChange={props.handleChange("email")}
              placeholder="Enter your email so that we can contact you"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length > 7) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The password should have more than 7 characters")
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              value={props.values["password"]}
              onChange={props.handleChange("password")}
              placeholder="Input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              value={props.values["confirmPassword"]}
              onChange={props.handleChange("confirmPassword")}
              placeholder="Confirm password to recheck"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item label="Wanna recheck something">
            <Button
              type="primary"
              size="large"
              onClick={back}
              icon={<LeftOutlined />}
            >
              Back
            </Button>
          </Form.Item>
          <Form.Item label="Press to advance">
            <Button
              type="primary"
              size="large"
              onClick={next}
              icon={<RightOutlined />}
            >
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </FormBody>
  );
}
