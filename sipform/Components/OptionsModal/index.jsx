import React from "react";
import { Modal, Form, Row, Col, Button, Input } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../Store/actions";
import Axios from "axios";

export default function OptionsModal(props) {
  const [values, setValues] = React.useState({});
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [color, setColor] = React.useState("#000000");
  const router = useRouter();
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setValues({ ...values, email: e.target.value });
  };

  const onChangePassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const usePublicVersion = () => {
    setVisible(true);
    setColor("#696969");
  };

  const cancelLogin = () => {
    setVisible(false);
    setColor("#000000");
  };

  const loginClick = async () => {
    try {
      await form.validateFields();
      signupAndLogin();
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };
  
  const signupAndLogin = async () => {
    //API Call to login and signup visitor
    const data = { ...values, role: "visitor" };
    console.log(data)
    await Axios.post(
      "https://floating-escarpment-56394.herokuapp.com/api/v1/users/visitor",
      data
    )
      .then((res) => {
        dispatch({
          type: actionTypes.CHANGE_USER,
          user: {
            id: res.data.id,
            token: res.data.token,
            role: "visitor",
          },
        }); 
        props.setShowOptions(false)//change after API set
      })
      .catch((err) => {
        console.log("Axios error");
      });
      props.flag ? props.setShowDetails(true) : null;

  };

  return (
    <Modal
      title={
        <span
          style={{
            fontSize: "1.5vw",
            margin: "0 0 0 6vw",
          }}
        >
          You are not Logged In
        </span>
      }
      bodyStyle={{ backgroundColor: "#1890ff69", border: "2px solid #000000" }}
      style={{ top: 200 }}
      visible={props.showOptions}
      onCancel={() => props.setShowOptions(false)}
      onOk={() => props.setShowOptions(false)}
      footer={[
        visible ? (
          <Button onClick={cancelLogin} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        ) : null,
        visible ? (
          <Button onClick={loginClick} type="primary">
            Login
          </Button>
        ) : null,
      ]}
      zIndex={0}
    >
      <div
        style={{
          fontSize: "1.5vw",
          color: color,
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        To use this feature, either
        <br />
        <span
          style={{
            fontWeight: "450",
            cursor: "pointer",
          }}
          onClick={() => router.push("/SignUp")}
        >
          <u>Login/SignUp</u>
        </span>
        <br />
        to our site
      </div>
      <div
        style={{
          fontSize: "1vw",
          color: color,
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        Or
        <br />
        <span
          style={{
          fontSize: "1.3vw",
            fontWeight: "450",
            cursor: "pointer",
          }}
          onClick={usePublicVersion}
        >
          <u>Use</u>
        </span>{" "}
        the public feature by just entering your email to get a{" "}
        <span
          style={{
            fontWeight: "450",
          }}
        >
          max
        </span>{" "}
        limit of calculating and storing SIPs of{" "}
        <span
          style={{
            fontWeight: "450",
          }}
        >
          2
        </span>
        ,
        <br />
        and{" "}
        <span
          style={{
            fontWeight: "450",
            cursor: "pointer",
          }}
          onClick={() => router.push("/Upgrade")}
        >
          <u>Upgrade</u>
        </span>{" "}
        later to the{" "}
        <span
          style={{
            fontWeight: "450",
            cursor: "pointer",
          }}
        >
          premium account
        </span>
        .
      </div>
      {visible ? (
        <Form form={form} layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
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
              >
                <Input
                  placeholder="Please enter user email"
                  value={values.email ? values.email : ""}
                  onChange={onChangeEmail}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
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
                        new Error(
                          "The password should have more than 7 characters"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Please enter your password"
                  value={values.password ? values.password : ""}
                  onChange={onChangePassword}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : null}
    </Modal>
  );
}
