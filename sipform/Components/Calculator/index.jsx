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
// import { Pie } from "@ant-design/charts";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../Store/actions";
import { useRouter } from "next/router";
import Axios from "axios";
import OptionsModal from "../../Components/OptionsModal";
import DetailsModal from "../../Components/DetailsModal";
import { CalculatorBody } from "./styles";

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
  const [showOptions, setShowOptions] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const user = useSelector((state) => state.user);

  // let data = [
  //   {
  //     type: `Invested Amount : ${inputValue.investedValue}`,
  //     value: 100 - parseFloat(inputValue.percent),
  //   },
  //   {
  //     type: `Est. Returns: ${inputValue.expReturn}`,
  //     value: parseFloat(inputValue.percent),
  //   },
  // ];

  // let config = {
  //   appendPadding: 10,
  //   data: data,
  //   angleField: "value",
  //   colorField: "type",
  //   radius: 1,
  //   innerRadius: 0.6,
  //   label: {
  //     type: "inner",
  //     offset: "-50%",
  //     content: "",
  //     style: {
  //       textAlign: "center",
  //       fontSize: 14,
  //     },
  //   },
  //   interactions: [{ type: "element-selected" }, { type: "element-active" }],
  //   statistic: {
  //     title: false,
  //     content: {
  //       style: {
  //         whiteSpace: "pre-wrap",
  //         overflow: "hidden",
  //         textOverflow: "ellipsis",
  //       },
  //       formatter: function formatter() {
  //         return "SIP chart";
  //       },
  //     },
  //   },
  // };

  const onChange = async (input, value) => {
    calculate({ ...inputValue, [input]: value });
  };

  const calculate = (inputValue) => {
    //SIP calculation to be checked
    const { amount, rate, time } = inputValue;
    let investedValue, expReturn, totalAmount, percent;
    if (operation == "lumpsum") {
      investedValue = parseFloat(amount) * parseInt(time);
      expReturn =
        (parseFloat(amount) * parseInt(time) * parseFloat(rate)) / 100;
    } else {
      investedValue = parseFloat(amount) * 12 * parseInt(time);
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
    setInputValue({
      ...inputValue,
      investedValue: investedValue,
      expReturn: expReturn,
      totalAmount: totalAmount,
      percent: percent,
    });
  };

  const invest = async () => {
    //API call for adding SIP to user's db
    const values = {
      ...user,
      data: inputValue,
    };
    if (operation === "sip") {
      await Axios.post(
        "https://floating-escarpment-56394.herokuapp.com/api/v1/sips/new",
        values
      )
        .then((res) => {
          message.success("Your SIP has been stored successfully");
        })
        .catch((err) => {
          // console.log("Axios error",err);
          message.error(
            "Your SIP limit has been depleted.Please upgrade for complete access and benefits"
          );
        });
    } else {
      await Axios.post(
        "https://floating-escarpment-56394.herokuapp.com/api/v1/lumpsums/new",
        values
      )
        .then((res) => {
          message.success("Your Lumpsum has been stored successfully");
        })
        .catch((err) => {
          message.error(
            "Your Lumpsum limit has been depleted.Please upgrade for complete access and benefits"
          );
          // console.log("Axios error");
        });
    }
  };

  const showAndConfirmDetails = async () => {
    if (user === null) {
      // Not logged in
      setShowOptions(true);
    } else if (user.role === "user" || user.role === "visitor") {
      // logged in
      setShowDetails(true);
    }
  };

  const onOperationSwitch = async (e) => {
    setOperation(e.target.value);
  };

  React.useEffect(() => {
    calculate(inputValue);
  }, [operation]);

  React.useEffect(() => {
    message.info("Check View your SIPs tab to view your investments until now");
  }, []);

  return (
    <CalculatorBody>
      <OptionsModal
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        setShowDetails={setShowDetails}
        flag={true}
      />
      <DetailsModal
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        inputValue={inputValue}
        invest={invest}
        operation={operation}
      />
      <div className="content">
        <Divider className="heading">SIP Calculator</Divider>
        <Row>
          <Col span={12} className="details">
            <Radio.Group onChange={onOperationSwitch} value={operation}>
              <Radio value={"sip"}>SIP</Radio>
              <Radio value={"lumpsum"}>Lumpsum</Radio>
            </Radio.Group>
            <Row className="detail-topRow">
              <Col className="heading" span={16}>
                {operation == "sip" ? "Monthly" : "Total"} Investment
              </Col>
              <Col span={4}>
                <InputNumber
                  min={5000}
                  max={200000}
                  step={5000}
                  className="input"
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
                typeof parseFloat(inputValue.amount) === "number"
                  ? parseFloat(inputValue.amount)
                  : 0
              }
            />
            <Row className="detail-row">
              <Col className="heading" span={18}>
                Expected Return Rate
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={30}
                  className="input"
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
              value={
                typeof parseFloat(inputValue.rate) === "number"
                  ? parseFloat(inputValue.rate)
                  : 0
              }
            />
            <Row className="detail-row">
              <Col className="heading" span={18}>
                Time Period
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={30}
                  className="input"
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
              value={
                typeof parseInt(inputValue.time) === "number"
                  ? parseInt(inputValue.time)
                  : 0
              }
            />
            <Row className="calculated-details1">
              <Col span={10} type="flex" className="container">
                <Row className="label">Invested Amount </Row>
                <Row className="value">
                  <b>
                    {inputValue.investedValue
                      ? `₹ ${inputValue.investedValue}`
                      : null}
                  </b>
                </Row>
              </Col>
              <Col span={10} className="container">
                <Row className="label">Est. Returns </Row>
                <Row className="value">
                  <b>
                    {inputValue.expReturn ? `₹ ${inputValue.expReturn}` : null}
                  </b>
                </Row>
              </Col>
            </Row>
            <Row className="calculated-details2">
              <Col span={20} className="container">
                <span className="label">Total Value </span>
                <b>
                  {inputValue.totalAmount
                    ? ` ₹ ${inputValue.totalAmount}`
                    : null}
                </b>
              </Col>
            </Row>
          </Col>
          <Col span={10} className="visualization">
            {/* <Pie {...config} /> */}
            <Button
              type="primary"
              size="large"
              icon={<MoneyCollectOutlined />}
              className="styledButton"
              onClick={showAndConfirmDetails}
            >
              Invest Now
            </Button>
            {user === null ? (
              <div className="info">
                *To use this feature without any limits,{" "}
                <span onClick={() => router.push("/SignUp")}>Login/SignUp</span>{" "}
                to our site
              </div>
            ) : null}
          </Col>
        </Row>
      </div>
    </CalculatorBody>
  );
}
