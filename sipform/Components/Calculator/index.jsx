import React from "react";
import { Slider, InputNumber, Row, Col, Divider, Form, Radio } from "antd";
import { Pie } from "@ant-design/charts";

export default function Calculator(props) {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = React.useState("");
  const [operation, setOperation] = React.useState("");

  const onChange = async (input, value) => {
    calculate(input, value, { ...inputValue, [input]: value });
  };

  const calculate = (input, value, inputValue) => {             //SIP calculation to be checked
    const amount = inputValue.amount;
    const rate = inputValue.rate;
    const time = inputValue.time;
    let expReturn, totalAmount, percent;
    if (operation == "lumpsum") {
      expReturn = Math.floor(
        (parseInt(amount) * parseInt(time) * parseInt(rate)) / 100
      );
    } else {
      expReturn = Math.floor(
        (parseInt(amount) * 12 * parseInt(time) * parseInt(rate)) / 100
      );
    }
    totalAmount = expReturn + parseInt(amount);
    percent = Math.ceil((expReturn / totalAmount) * 100);
    if (input == null)
      setInputValue({
        ...inputValue,
        expReturn: expReturn,
        totalAmount: totalAmount,
        percent: percent,
      });
    else
      setInputValue({
        ...inputValue,
        expReturn: expReturn,
        totalAmount: totalAmount,
        percent: percent,
        [input]: value,
      });
  };
  var data = [
    {
      type: `Invested Amount : ${inputValue.amount}`,
      value: 100 - parseInt(inputValue.percent),
    },
    {
      type: `Est. Returns: ${inputValue.expReturn}`,
      value: parseInt(inputValue.percent),
    },
  ];
  var config = {
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
  const onOperationSwitch = (e) => {
    setOperation(e.target.value);
    calculate(null, null, inputValue);
  };

  React.useEffect(() => {
    setInputValue({
      amount: "25000",
      rate: "12",
      time: "10",
      expReturn: "2808477",
      totalAmount: "5808477",
      percent: "48",
    });
    setOperation("sip");
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
          width: "85vw",
          margin: "0 7.5vw 20vh 7.5vw ",
          height: "60vh",
          border: "4px solid #1890ff",
          borderRadius: "20px",
          backgroundColor: "white",
          boxShadow: "4px 4px 4px 2px #888888",
        }}
      >
        <Divider style={{ fontSize: "2.5vw" }}>SIP Calculator</Divider>
        <Row>
          <Col span={12} style={{ margin: " 0 1vw 0 2vw" }}>
            <Radio.Group onChange={onOperationSwitch} value={operation}>
              <Radio value={"sip"}>SIP</Radio>
              <Radio value={"lumpsum"}>Lumpsum</Radio>
            </Radio.Group>
            <Row>
              <Col
                style={{
                  marginLeft: "2vw",
                  fontSize: "1.2vw",
                  fontWeight: "400",
                }}
                span={18}
              >
                {operation == "sip" ? "Monthly" : "Total"} Investment
              </Col>
              <Col span={4}>
                <InputNumber
                  min={5000}
                  max={200000}
                  style={{ margin: "0 16px", fontSize: "1vw", width: "6vw" }}
                  value={inputValue.amount}
                  formatter={(value) =>
                    `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(value) => onChange("amount", value)}
                />
              </Col>
            </Row>
            <Slider
              min={5000}
              max={200000}
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
                <Row style={{ justifyContent: "center",fontSize: "1vw", fontWeight: "300" }}>
                  Invested Amount{" "}
                </Row>
                <Row style={{justifyContent: "center"}}>
                  <b>{inputValue.amount ? `₹ ${inputValue.amount}` : null}</b>
                </Row>
              </Col>
              <Col
                span={10}
                style={{
                  fontSize: "1.3vw",
                  fontWeight: "400",
                }}
              >
                <Row style={{ justifyContent: "center",fontSize: "1vw", fontWeight: "300" }}>
                  Est. Returns{" "}
                </Row>
                <Row style={{justifyContent: "center",}}>
                  <b>
                    {inputValue.amount ? `₹ ${inputValue.expReturn}` : null}
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
                  Total Value {" "}
                </span>
                <b>
                  {inputValue.amount ? ` ₹ ${inputValue.totalAmount}` : null}
                </b>
              </Col>
            </Row>
          </Col>
          <Col
            span={10}
            style={{ width: "15vw", height: "20vw", margin: "0 0 0 0" }}
          >
            <Pie {...config} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
