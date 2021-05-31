import React from "react";
import { Drawer, Form, Button, Col, Row, Input } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as actionTypes from "../../Store/actions";

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

  const login = async() => {
    //API Call
    await Axios.post("localhost:5000/api/v1/users/login", values)
       .then((res) => {
        console.log(res)
        dispatch({ type: actionTypes.CHANGE_USER, user: res });
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
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={loginClick} type="primary">
              Login
            </Button>
          </div>
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
      </Drawer>
    </>
  );
}
