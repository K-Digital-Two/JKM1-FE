import { React, useState } from "react";
import { SiCodeship } from "react-icons/si";
import { BsInfoCircle, BsSpeedometer } from "react-icons/bs";
import { TiMediaPlay, TiMediaPlayReverse } from "react-icons/ti";
import { RiBarChartGroupedLine } from "react-icons/ri";

const Detail = ({
  shipId,
  shipName,
  shipLat,
  shipLon,
  takeTime,
  shipUse,
  speed,
  departTime,
  arrivalTime,
  accuracy,
  departure,
  arrivalName,
}) => {

  const answers = [
    { icons: <SiCodeship />, title: "MMSI / 선박명", answer: shipId, shipName },
    { icons: <BsInfoCircle />,title: "현위치",answer: `(위도)${shipLat} / (경도)${shipLon}`,},
    { icons: <BsInfoCircle />, title: "선박용도", answer: shipUse },
    { icons: <BsSpeedometer />, title: "선박속도", answer: speed + "m/s" },
    { icons: <TiMediaPlay />, title: "출발시간", answer: departTime },
    { icons: <TiMediaPlayReverse />,title: "도착예정시간",answer: arrivalTime,},
    { icons: <RiBarChartGroupedLine />, title: "정확성", answer: accuracy },
  ];

  return (
    <>
      <div className=" absolute text-center font-bold text-blue-900 text-xl">

      </div>
    
    </>
  );
};

export default Detail;
