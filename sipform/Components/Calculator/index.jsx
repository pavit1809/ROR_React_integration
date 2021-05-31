import React from "react";
import {
  Slider,
  InputNumber,
  Row,
  Col,
  Divider,
  Radio,
  Button,
  message,
} from "antd";
import { Pie } from "@ant-design/charts";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../Store/actions";
import { useRouter } from "next/router";

export default function Calculator(props) {
  const [inputValue, setInputValue] = React.useState({
    amount: "25000",
    rate: "12",
    time: "10",
    investedValue: "3000000",
    expReturn: "2808477",
    totalAmount: "5808477",
    percent: "48",
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [operation, setOperation] = React.useState("sip");
  const user = useSelector((state) => state.user);
  let data = [
    {
      type: `Invested Amount : ${inputValue.investedValue}`,
      value: 100 - parseFloat(inputValue.percent),
    },
    {
      type: `Est. Returns: ${inputValue.expReturn}`,
      value: parseFloat(inputValue.percent),
    },
  ];

  let config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        formatter: function formatter() {
          return "SIP chart";
        },
      },
    },
  };

  const onChange = async (input, value) => {
    console.log(input, value);
    calculate(input, value, { ...inputValue, [input]: value });
  };

  const calculate = (input, value, inputValue) => {
    //SIP calculation to be checked
    const amount = inputValue.amount;
    const rate = inputValue.rate;
    const time = inputValue.time;
    let investedValue, expReturn, totalAmount, percent;
    if (operation == "lumpsum") {
      investedValue = parseFloat(amount) * parseInt(time);
      expReturn =
        (parseFloat(amount) * parseInt(time) * parseFloat(rate)) / 100;
    } else {
      investedValue = parseFloat(amount) * 12 * parseInt(time);
      console.log("s", investedValue, operation);
      const firstFactor = parseFloat(amount);
      const secondFactor =
        Math.pow(1 + parseFloat(rate) / 100 / 12, parseInt(time) * 12) - 1;
      const thirdFactor =
        (1 + parseFloat(rate) / 100 / 12) / (parseFloat(rate) / 100 / 12);
      expReturn = Math.round(firstFactor * secondFactor * thirdFactor);
      expReturn = expReturn - investedValue;
    }
    totalAmount = expReturn + parseFloat(investedValue);
    percent = Math.ceil((expReturn / totalAmount) * 100);
    if (input == null)
      setInputValue({
        ...inputValue,
        investedValue: investedValue,
        expReturn: expReturn,
        totalAmount: totalAmount,
        percent: percent,
      });
    else
      setInputValue({
        ...inputValue,
        investedValue: investedValue,
        expReturn: expReturn,
        totalAmount: totalAmount,
        percent: percent,
        [input]: value,
      });
  };

  const invest = async() => {
    //API call for adding SIP to user's db
    if (operation === "sip") {
      const data = {
        monthlyInvestment: inputValue.amount,
        estReturnRate: inputValue.rate,
        timePeriod: inputValue.time,
      };
      const values = { id: user.id, token: user.token, data: data };
      await Axios.post("localhost:5000/api/v1/sips/new", values)
        .then((res) => {
          console.log(res);
          message.success("Your SIP has been stored successfully");
        })
        .catch((err) => {
          console.log("Axios error");
        });
    } else {
      const data = {
        totalInvestment: inputValue.amount,
        estReturnRate: inputValue.rate,
        timePeriod: inputValue.time,
      };
      const values = { id: user.id, token: user.token, data: data };
      await Axios.post("localhost:5000/api/v1/lumpsums/new", values)
        .then((res) => {
          console.log(res);
          message.success("Your SIP has been stored successfully");
        })
        .catch((err) => {
          console.log("Axios error");
        });
    }
    message.info(
      "Check View your SIPs tab to view your investments until now"
    );
  };

  const onOperationSwitch = async (e) => {
    // Have to find a better way to do this
    setOperation(e.target.value);
  };

  React.useEffect(() => {
    calculate(null, null, inputValue);
  }, [operation]);

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
          width: "85vw",
          margin: "0 6vw 20vh 7.5vw ",
          height: "60vh",
          border: "4px solid #1890ff",
          borderRadius: "20px",
          backgroundColor: "white",
          boxShadow: "4px 4px 4px 2px #888888",
        }}
      >
        <Divider style={{ fontSize: "2.5vw" }}>SIP Calculator</Divider>
        <Row>
          <Col span={12} style={{ margin: " 0 0 0 2vw" }}>
            <Radio.Group onChange={onOperationSwitch} value={operation}>
              <Radio value={"sip"}>SIP</Radio>
              <Radio value={"lumpsum"}>Lumpsum</Radio>
            </Radio.Group>
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
                {operation == "sip" ? "Monthly" : "Total"} Investment
              </Col>
              <Col span={4}>
                <InputNumber
                  min={5000}
                  max={200000}
                  step={5000}
                  style={{ margin: "0 16px", fontSize: "1vw", width: "9vw" }}
                  value={
                    parseFloat(inputValue.amount) > 200000
                      ? "200,000"
                      : inputValue.amount
                  }
                  // formatter={(value) =>
                  //   `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  // }
                  // parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => onChange("amount", value)}
                />
              </Col>
            </Row>
            <Slider
              min={5000}
              max={200000}
              step={5000}
              onChange={(value) => onChange("amount", value)}
              value={
                typeof inputValue.amount === "number" ? inputValue.amount : 0
              }
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
                  value={inputValue.rate}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  onChange={(value) => onChange("rate", value)}
                />
              </Col>
            </Row>
            <Slider
              min={1}
              max={30}
              onChange={(value) => onChange("rate", value)}
              value={typeof inputValue.rate === "number" ? inputValue.rate : 0}
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
                  value={inputValue.time}
                  formatter={(value) => `${value} Yr`}
                  parser={(value) => value.replace("Yr", "")}
                  onChange={(value) => onChange("time", value)}
                />
              </Col>
            </Row>
            <Slider
              min={1}
              max={30}
              onChange={(value) => onChange("time", value)}
              value={typeof inputValue.time === "number" ? inputValue.time : 0}
            />
            <Row
              style={{
                margin: "2vw 2vw 0 2vw",
              }}
            >
              <Col
                span={10}
                type="flex"
                style={{
                  fontSize: "1.3vw",
                  fontWeight: "400",
                }}
              >
                <Row
                  style={{
                    justifyContent: "center",
                    fontSize: "1vw",
                    fontWeight: "300",
                  }}
                >
                  Invested Amount{" "}
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <b>
                    {inputValue.investedValue
                      ? `₹ ${inputValue.investedValue}`
                      : null}
                  </b>
                </Row>
              </Col>
              <Col
                span={10}
                style={{
                  fontSize: "1.3vw",
                  fontWeight: "400",
                }}
              >
                <Row
                  style={{
                    justifyContent: "center",
                    fontSize: "1vw",
                    fontWeight: "300",
                  }}
                >
                  Est. Returns{" "}
                </Row>
                <Row style={{ justifyContent: "center" }}>
                  <b>
                    {inputValue.expReturn ? `₹ ${inputValue.expReturn}` : null}
                  </b>
                </Row>
              </Col>
            </Row>
            <Row style={{ margin: "1vw 2vw 2vw 10vw" }}>
              <Col
                span={20}
                style={{
                  fontSize: "1.3vw",
                  fontWeight: "400",
                }}
              >
                <span style={{ fontSize: "1vw", fontWeight: "300" }}>
                  Total Value{" "}
                </span>
                <b>
                  {inputValue.totalAmount
                    ? ` ₹ ${inputValue.totalAmount}`
                    : null}
                </b>
              </Col>
            </Row>
          </Col>
          <Col
            span={10}
            style={{ width: "15vw", height: "20vw", margin: "0 0 0 0" }}
          >
            <Pie {...config} />
            <Button
              type="primary"
              size="large"
              disabled={user === null}
              icon={<MoneyCollectOutlined />}
              style={{
                marginLeft: "9vw",
              }}
              onClick={invest}
            >
              Invest Now
            </Button>
            <div
              style={{
                fontSize: "1vw",
                color: "#696969",
                marginLeft: "4vw",
                fontWeight: "350",
              }}
            >
              *To use this feature,{" "}
              <span
                style={{
                  fontWeight: "400",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/SignUp")}
              >
                Login/SignUp
              </span>{" "}
              to our site
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
