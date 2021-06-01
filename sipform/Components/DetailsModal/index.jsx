import React from "react";
import { Modal, Button, Row, Col, InputNumber, Slider } from "antd";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useRouter } from "next/router";

export default function OptionsModal(props) {
  const [values, setValues] = React.useState({});
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const cancelInvest = () => {
    props.setShowDetails(false);
  };

  const invest = () => {
    console.log("Clicked");
    props.invest();
    props.setShowDetails(false);
  };

  React.useEffect(async () => {
    user === null
      ? null
      : await Axios.get(
          "https://floating-escarpment-56394.herokuapp.com/api/v1/users/details",
          { params: { id: user.id, role: user.role, token: user.token } }
        )
          .then((res) => {
            console.log(res.data);
            setValues(res.data);
          })
          .catch((err) => {
            console.log("Axios error");
          });
  }, [user]);

  return (
    <Modal
      title={
        <span
          style={{
            fontSize: "1vw",
            margin: "0 0 0 9vw",
          }}
        >
          Confirm the Details
        </span>
      }
      bodyStyle={{ backgroundColor: "#1890ff46", border: "2px solid #000000" }}
      style={{ top: 150 }}
      visible={props.showDetails}
      onClose={() => props.setShowDetails(false)}
      footer={[
        <Button onClick={cancelInvest} style={{ marginRight: 8 }}>
          Cancel
        </Button>,
        <Button onClick={invest} type="primary">
          Proceed To Invest
        </Button>,
      ]}
      zIndex={0}
      width={1000}
    >
      {values.name ? (
        <div
          style={{
            fontSize: "1.3vw",
            color: "black",
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          Name:{" "}
          <span
            style={{
              fontWeight: "450",
            }}
            onClick={() => router.push("/SignUp")}
          >
            {values.name}
          </span>
        </div>
      ) : null}

      <div
        style={{
          fontSize: "1.3vw",
          color: "black",
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        Email ID:{" "}
        <span
          style={{
            fontWeight: "450",
          }}
          onClick={() => router.push("/SignUp")}
        >
          {values.email}
        </span>
      </div>

      {values.pan ? (
        <div
          style={{
            fontSize: "1.3vw",
            color: "black",
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          Pan Card Number:{" "}
          <span
            style={{
              fontWeight: "450",
            }}
            onClick={() => router.push("/SignUp")}
          >
            {values.pan}
          </span>
        </div>
      ) : null}

      <div style={{ margin: "2vw 0 0 10vw" }}>
        <Col span={16} style={{ margin: " 0 0 0 2vw" }}>
          <Row
            style={{
              marginTop: "1vw",
            }}
          >
            <Col
              style={{
                marginLeft: "2vw",
                fontSize: "1.2vw",
                fontWeight: "400",
              }}
              span={16}
            >
              {props.operation == "sip" ? "Monthly" : "Total"} Investment
            </Col>
            <Col span={4}>
              <InputNumber
                min={5000}
                max={200000}
                step={5000}
                style={{ margin: "0 16px", fontSize: "1vw", width: "9vw" }}
                value={
                  parseFloat(props.inputValue.amount) > 200000
                    ? "200,000"
                    : props.inputValue.amount
                }
                // formatter={(value) =>
                //   `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                // }
                // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                readOnly
              />
            </Col>
          </Row>
          <Slider
            min={5000}
            max={200000}
            step={5000}
            value={
              typeof parseFloat(props.inputValue.amount) === "number"
                ? parseFloat(props.inputValue.amount)
                : 0
            }
            readOnly
          />
          <Row>
            <Col
              style={{
                marginLeft: "2vw",
                fontSize: "1.2vw",
                fontWeight: "400",
              }}
              span={18}
            >
              Expected Return Rate
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={30}
                style={{ margin: "0 16px", fontSize: "1vw" }}
                value={props.inputValue.rate}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                readOnly
              />
            </Col>
          </Row>
          <Slider
            min={1}
            max={30}
            value={
              typeof parseFloat(props.inputValue.rate) === "number"
                ? parseFloat(props.inputValue.rate)
                : 0
            }
            readOnly
          />
          <Row>
            <Col
              style={{
                marginLeft: "2vw",
                fontSize: "1.2vw",
                fontWeight: "400",
              }}
              span={18}
            >
              Time Period
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={30}
                style={{ margin: "0 16px", fontSize: "1vw" }}
                value={props.inputValue.time}
                formatter={(value) => `${value} Yr`}
                parser={(value) => value.replace("Yr", "")}
                readOnly
              />
            </Col>
          </Row>
          <Slider
            min={1}
            max={30}
            value={
              typeof parseInt(props.inputValue.time) === "number"
                ? parseInt(props.inputValue.time)
                : 0
            }
            readOnly
          />
          <Row
            style={{
              margin: "2vw 2vw 0 2vw",
            }}
          >
            <Col
              span={12}
              type="flex"
              style={{
                fontSize: "1.3vw",
                fontWeight: "400",
              }}
            >
              <Row
                style={{
                  justifyContent: "center",
                  fontSize: "1.1vw",
                  fontWeight: "300",
                }}
              >
                Invested Amount{" "}
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <b>
                  {props.inputValue.investedValue
                    ? `₹ ${props.inputValue.investedValue}`
                    : null}
                </b>
              </Row>
            </Col>
            <Col
              span={12}
              style={{
                fontSize: "1.3vw",
                fontWeight: "400",
              }}
            >
              <Row
                style={{
                  justifyContent: "center",
                  fontSize: "1.1vw",
                  fontWeight: "300",
                }}
              >
                Est. Returns{" "}
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <b>
                  {props.inputValue.expReturn
                    ? `₹ ${props.inputValue.expReturn}`
                    : null}
                </b>
              </Row>
            </Col>
          </Row>
          <Row style={{ margin: "1vw 2vw 2vw 10vw" }}>
            <Col
              span={22}
              style={{
                fontSize: "1.3vw",
                fontWeight: "400",
              }}
            >
              <span style={{ fontSize: "1.1vw", fontWeight: "300" }}>
                Total Value{" "}
              </span>
              <b>
                {props.inputValue.totalAmount
                  ? ` ₹ ${props.inputValue.totalAmount}`
                  : null}
              </b>
            </Col>
          </Row>
        </Col>
      </div>

    </Modal>
  );
}
