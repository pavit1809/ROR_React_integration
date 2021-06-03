import React from "react";
import { Drawer, Form, Button, Col, Row, Input, Image } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../Store/actions";
import Axios from "axios";
import { StyledButton, ButtonContainer, ImageContainer } from "./styles";
import { ST } from "next/dist/next-server/lib/utils";

export default function LoginDrawer(props) {
  const [values, setValues] = React.useState({});
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const onClose = () => {
    props.setDrawerShow(false);
  };

  const onChangeEmail = (e) => {
    setValues({ ...values, email: e.target.value });
  };

  const onChangePassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const login = async () => {
    //API Call to login user
    await Axios.post(
      "https://floating-escarpment-56394.herokuapp.com/api/v1/users/login",
      values
    )
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.CHANGE_USER,
          user: { id: res.data.id, token: res.data.token, role: "user" },
        });
        router.push("/SIPCalculator");
      })
      .catch((err) => {
        console.log("Axios error");
      });
  };

  const loginClick = async () => {
    try {
      await form.validateFields();
      console.log(values);
      login();
      props.setDrawerShow(false);
      router.push("/SIPCalculator");
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  return (
    <>
      <Drawer
        title="Login"
        width={720}
        onClose={onClose}
        visible={props.drawerShow}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <ButtonContainer>
            <StyledButton onClick={onClose}>Cancel</StyledButton>
            <Button onClick={loginClick} type="primary">
              Login
            </Button>
          </ButtonContainer>
        }
      >
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
        <ImageContainer>
          <Image src="/login.webp" width={700} height={500} />
        </ImageContainer>
      </Drawer>
    </>
  );
}
