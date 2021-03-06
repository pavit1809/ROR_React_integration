import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  Alert,
  message,
  Progress,
} from "antd";
import allStateDistrictData from "../../../Assets/city-state-data.json";
import statesData from "../../../Assets/state-data.json";
import { LeftOutlined, LoginOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { ConfirmModal, FormBody } from "../styles";

export default function ContactForm(props) {
  const [displayStates, setDisplayStates] = React.useState("");
  const [displayDistricts, setDisplayDistricts] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const back = async () => {
    props.prevStep();
  };

  const enterLoading = async () => {
    setLoading(true);
    setTimeout(() => {
      checkValidationAndSubmit();
      setLoading(false);
    }, 2000);
  };

  const proceed = () => {
    router.push("/");
  };

  const checkValidationAndSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (await props.submit()) setModalShow(true);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const fillDistricts = () => {
    const districts = allStateDistrictData[props.values.state];
    const districtList = [];
    districts.forEach((value, i) => {
      districtList.push(
        <Select.Option key={i} value={value}>
          {value}
        </Select.Option>
      );
    });
    setDisplayDistricts(districtList);
  };

  React.useEffect(() => {
    message.success("It almost done. Tell us how can we contact you.");
    const stateList = [];
    const states = statesData["states"];
    states.forEach((value, i) => {
      stateList.push(
        <Select.Option key={i} value={value}>
          {value}
        </Select.Option>
      );
    });
    setDisplayStates(stateList);
  }, []);

  return (
    <FormBody
    >
      <ConfirmModal
        title="Success"
        visible={modalShow}
        onOk={() => proceed()}
        footer={[
          <Button type="primary" loading={loading} onClick={() => proceed()}>
            OK
          </Button>,
        ]}
      >
        <Alert
          message="Submission Success"
          description="Your info has been submitted successfully.."
          type="success"
          showIcon
        />
      </ConfirmModal>

      <div className="content">
        <Divider className="heading">Contact Details</Divider>
        <div className="progress">
          <Progress size="large" percent={100} steps={3} />
        </div>
        <Form
          // form={form}
          className="form"
          size="large"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{
            state: props.values["state"],
            city: props.values["city"],
            phno: props.values["phno"],
          }}
        >
          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: "Please input your state!",
              },
            ]}
          >
            <Select
              value={props.values["state"]}
              placeholder="Select your state"
              showSearch
              onChange={props.handleChange("state")}
            >
              {displayStates}
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <Select
              value={props.values["city"]}
              onChange={props.handleChange("city")}
              placeholder="Select your city / district"
              showSearch
              onFocus={() => fillDistricts()}
              disabled={props.values.state == null || props.values.state == ""}
            >
              {displayDistricts}
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                validator: (_, value) =>
                  value.length == 10
                    ? Promise.resolve()
                    : Promise.reject(new Error("Phone should have 10 digits")),
              },
            ]}
          >
            <Input
              value={props.values["phno"]}
              onChange={props.handleChange("phno")}
              placeholder="Enter your phone details"
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
          <Form.Item label="Submit">
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={() => enterLoading()}
              icon={<LoginOutlined />}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </FormBody>
  );
}
