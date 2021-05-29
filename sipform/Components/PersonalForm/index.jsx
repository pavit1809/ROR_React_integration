import React from "react";
import { Form, Input, Button, DatePicker, Divider, message } from "antd";
import moment from "moment";
import { RightOutlined } from "@ant-design/icons";

export default function PersonalForm(props) {
  const [form] = Form.useForm();

  const next = async () => {
    try {
      const values = await form.validateFields();
      props.nextStep();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const disabledDate = (value) => {
    const maxDate = moment().subtract(18, "years");
    return value > maxDate;
  };

  React.useEffect(() => {
    message.success("Fill in the details and be a part of something amazing.");
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
        <Divider style={{ fontSize: "2vw" }}>Personal Details</Divider>
        <Form
          // form={form}
          style={{ margin: "4vw 10vw 8vw 0 " }}
          size="large"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{
            name: props.values["name"],
            dob: props.values["DOB"]
              ? moment(props.values["DOB"], "YYYY-MM-DD")
              : null,
            pan: props.values["pan"],
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              value={props.values["name"]}
              onChange={props.handleChange("name")}
              placeholder="What's your name"
            />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              {
                required: true,
                message: "Please input your date of birth!",
              },
            ]}
          >
            <DatePicker
              value={
                props.values["dob"]
                  ? moment(props.values["dob"], "YYYY-MM-DD")
                  : null
              }
              disabledDate={disabledDate}
              showToday={false}
              onChange={props.handleChange("dob")}
              placeholder="When were you born"
            />
          </Form.Item>
          <Form.Item
            name="pan card"
            label="Pan Card Number"
            rules={[
              {
                required: true,
                message: "Please input your pan card number!",
              },
              {
              validator: (_, value) =>
              value.length==10 ? Promise.resolve() : Promise.reject(new Error('Pan card should have 10 characters')),
              },
            ]}
          >
            <Input
              value={props.values["pan"]}
              onChange={props.handleChange("pan")}
              placeholder="Enter your pan card details"
            />
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
