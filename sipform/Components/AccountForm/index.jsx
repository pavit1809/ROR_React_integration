import React from "react";
import { Form, Input, Button, Divider, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

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
    try {
      const values = await form.validateFields();
      props.prevStep();
    } catch (errorInfo) { 
      console.log("Failed:", errorInfo);
    }
  };

  React.useEffect(() => {
    message.success("You are one step closer of being a part of our family.");
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundSize: "100vw 100vh",
        paddingTop: "20vh",
      }}
    >
      <div
        style={{
          width: "50vw",
          margin: "0 25vw 20vh 25vw ",
          height: "60vh",
          border: "4px solid #1890ff",
          borderRadius: "20px",
          boxShadow: "4px 4px 4px 2px #888888",
        }}
      >
        <Divider style={{ fontSize: "2vw" }}>Account Details</Divider>
        <Form
          // form={form}
          style={{ margin: "4vw 10vw 8vw 0 " }}
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
                  if (value.length > 8) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The password should have more than 8 characters")
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
    </div>
  );
}
