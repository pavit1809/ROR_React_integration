import React from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Divider,
  message,
  Progress,
} from "antd";
import moment from "moment";
import { RightOutlined } from "@ant-design/icons";
import { FormBody } from "../styles";
import LoginDrawer from "../../LoginDrawer";

export default function PersonalForm(props) {
  const [form] = Form.useForm();
  const [drawerShow, setDrawerShow] = React.useState(false);

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
    <FormBody>
      <div className="content">
        {drawerShow ? (
          <LoginDrawer setDrawerShow={setDrawerShow} drawerShow={drawerShow} />
        ) : null}
        <Divider className="heading">Personal Details</Divider>
        <div className="progress">
          <Progress size="large" percent={33} steps={3} />
        </div>
        <Form
          // form={form}
          className="form"
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
              placeholder="You should atleast be of 18 years"
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
                  value.length == 10
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Pan card should have 10 characters")
                      ),
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
          <div
            className="existingUser"
            onClick={() => {
              setDrawerShow(true);
            }}
          >
            Existing User ? Login
          </div>
        </Form>
      </div>
    </FormBody>
  );
}
