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
import Axios from 'axios'

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
      await Axios.get("https://maingapp.herokuapp.com/api/v1/lumpsums/all", {
        params: { id: user.id, token: user.token },
      })
        .then((res) => {
          // console.log(res);
          setCardsInfoList(res.data);
          const cards=[];
          res.data.forEach((value)=>{
          // setCardsInfo(value);
          cards.push(
          <SIPCard cardsInfo={value} operation={operation} />
          )
          })
          setCardsList(cards)
        })
        .catch((err) => {
          console.log("Axios error");
        });
    } else {
      //API Call for sip
      // console.log("here2", operation);
      await Axios.get("https://maingapp.herokuapp.com/api/v1/sips/all", {
        params: { id: user.id, token: user.token },
      })
        .then((res) => {
          setCardsInfoList(res.data);
          const cards=[];
          res.data.forEach((value)=>{
          // setCardsInfo(value);
          cards.push(
          <SIPCard cardsInfo={value} operation={operation} />
          )
          })
          setCardsList(cards)
        })
        .catch((err) => {
          console.log("Axios error");
        });
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
      {cardsList}
      </div>
    </div>
  );
}
