import React from "react";
import { Button, Row, Col, InputNumber, Slider } from "antd";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useRouter } from "next/router";
import { StyledModal } from "./styles";
import { StyledButton } from "../LoginDrawer/styles";

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
    <StyledModal
      title={
        <span style={{ fontSize: "1.5vw", margin: "0 0 0 22vw" }}>
          Confirm the Details
        </span>
      }
      bodyStyle={{ backgroundColor: "#1890ff46", border: "2px solid #000000" }}
      visible={props.showDetails}
      onClose={() => props.setShowDetails(false)}
      footer={[
        <StyledButton onClick={cancelInvest}>Cancel</StyledButton>,
        <Button onClick={invest} type="primary">
          Proceed To Invest
        </Button>,
      ]}
      zIndex={0}
      width={1000}
    >
      {values.name ? (
        <div className="styledDetails1">
          Name: <span>{values.name}</span>
        </div>
      ) : null}

      <div className="styledDetails1">
        Email ID: <span>{values.email}</span>
      </div>

      {values.pan ? (
        <div className="styledDetails1">
          Pan Card Number: <span>{values.pan}</span>
        </div>
      ) : null}

      <div className="styledDetails2">
        <Col span={16} className="col1">
          <Row className="row1">
            <Col className="heading" span={16}>
              {props.operation == "sip" ? "Monthly" : "Total"} Investment
            </Col>
            <Col span={4}>
              <InputNumber
                min={5000}
                max={200000}
                step={5000}
                className="input"
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
          <Row className="row2">
            <Col className="heading" span={18}>
              Expected Return Rate
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={30}
                className="input"
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
          <Row className="row2">
            <Col className="heading" span={18}>
              Time Period
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={30}
                className="input"
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
          <Row className="row3">
            <Col span={12} type="flex" className="container">
              <Row className="label">Invested Amount </Row>
              <Row className="value">
                <b>
                  {props.inputValue.investedValue
                    ? `₹ ${props.inputValue.investedValue}`
                    : null}
                </b>
              </Row>
            </Col>
            <Col span={12} className="container">
              <Row className="label">Est. Returns </Row>
              <Row className="value">
                <b>
                  {props.inputValue.expReturn
                    ? `₹ ${props.inputValue.expReturn}`
                    : null}
                </b>
              </Row>
            </Col>
          </Row>
          <Row className="row4">
            <Col span={22} className="container">
              <span className="label">Total Value </span>
              <b>
                {props.inputValue.totalAmount
                  ? ` ₹ ${props.inputValue.totalAmount}`
                  : null}
              </b>
            </Col>
          </Row>
        </Col>
      </div>
    </StyledModal>
  );
}
