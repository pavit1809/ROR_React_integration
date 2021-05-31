import React from "react";
import Navbar from "../../Components/Navbar";
import SIPCard from "../../Components/SIPCard";
import { Radio } from "antd";
import ClearableLabeledInput from "antd/lib/input/ClearableLabeledInput";
const bgstyle = {
  width: "100vw",
  height: "100vh",
  backgroundSize: "100%",
};
import { useSelector } from "react-redux";

export default function ViewSIPs() {
  const [operation, setOperation] = React.useState("sip");
  const [cardsInfoList, setCardsInfoList] = React.useState("");
  const [cardsInfo, setCardsInfo] = React.useState("");
  const [cardsList, setCardsList] = React.useState("");
  const user = useSelector((state) => state.user);

  const onOperationSwitch = async (e) => {
    setOperation(e.target.value);
  };

  const getCardsInfo = async() => {
    if (operation == "lumpsum") {
      //API Call for lumpsum
      console.log("here1", operation);
      await Axios.get("localhost:5000/api/v1/lumpsums/all", {
        params: { id: user.id, token: user.token },
      })
        .then((res) => {
          console.log(res);
          // setCardsInfoList(res);
        })
        .catch((err) => {
          console.log("Axios error");
        });
      //const cards=[];
      //cardsInfoList.map((value)=>{
      setCardsInfo({
        totalInvestment: 190000,
        estReturnRate: 12,
        timePeriod: 10,
        dateOfApplication: "date",
        dateOfMaturity: "YYY-MM-DD",
      });
      // cards.push(
      // <SIPCard cardsInfo={cardsInfo} operation={operation} />
      // )
      //})
      // setCardsList(cards)
    } else {
      //API Call for sip
      console.log("here2", operation);
      await Axios.get("localhost:5000/api/v1/sips/all", {
        params: { id: user.id, token: user.token },
      })
        .then((res) => {
          console.log(res);
          // setCardsInfoList(res);
        })
        .catch((err) => {
          console.log("Axios error");
        });
      //const cards=[];
      //res.map((value)=>{
      setCardsInfo({
        monthlyInvestment: 25000,
        estReturnRate: 15,
        timePeriod: 10,
        dateOfApplication: "date",
        dateOfMaturity: "YYY-MM-DD",
      });
      // cards.push(
      // <SIPCard cardsInfo={cardsInfo} operation={operation} />
      // )
      //})
      // setCardsList(cards)
    }
  };
  React.useEffect(() => {
    getCardsInfo();
  }, [operation]);
  return (
    <div style={bgstyle}>
      <Navbar current="viewsip" />
      <div
        style={{
          margin: "5vw 40vw 0 40vw ",
          padding: "1vw 1.5vw 1vw 2.5vw",
          height: "3vw",
          width: "14vw",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "4px 4px 4px 2px #888888",
        }}
      >
        <Radio.Group onChange={onOperationSwitch} value={operation}>
          <Radio value={"sip"}>SIP</Radio>
          <Radio value={"lumpsum"}>Lumpsum</Radio>
        </Radio.Group>
      </div>
      <div style={{ paddingTop: "5vw" }}>
        <SIPCard cardsInfo={cardsInfo} operation={operation} />
        <SIPCard cardsInfo={cardsInfo} operation={operation} />
        {/* {cardsList} */}
      </div>
    </div>
  );
}
