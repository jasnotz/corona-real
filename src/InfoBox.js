import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent id="box-color">
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          +{cases}명
        </h2>
        <a
        href="https://m.news.naver.com/covid19/index.nhn"
        target="_blank"
        id="live__text"
        >실시간 코로나 현황보기</a>
        <Typography className="infoBox__total" color="textSecondary">
          총 {total}명
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
