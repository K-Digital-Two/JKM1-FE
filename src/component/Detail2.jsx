import {React, useEffect, useParams} from "react";
import { SiCodeship } from "react-icons/si";
import { BsInfoCircle, BsSpeedometer } from "react-icons/bs";
import { TiMediaPlay, TiMediaPlayReverse } from "react-icons/ti";
import {RiBarChartGroupedLine} from 'react-icons/ri'


const Detail = ({ship, shipId}) => {



  const topics = [
    { icons: <SiCodeship />, title: "MMSI / 선박명" },
    { icons: <BsInfoCircle />, title: "현위치" },
    { icons: <BsInfoCircle />, title: "선박용도",},
    { icons: <BsSpeedometer />, title: "선박속도" },
    { icons: <TiMediaPlay />, title: "출발시간" },
    { icons: <TiMediaPlayReverse />, title: "출발시각 / 도착예정시간"},
    { icons: <RiBarChartGroupedLine/>, title : "정확성"}
  ];

  console.log(shipId)
  
 
  


  return (
    <div className="">
      <div className="font-bold text-blue-900 text-3xl">선박 상세정보</div>
      <div className="mt-2">
          {topics.map(({icons,title})=>{
          return (
            <ul className="flex items-center text-2xl" key={title}>
              <li className="flex items-center m-2">
                <p className="text-blue-800 mr-3">{icons}</p>
                <p className=""> {title} :</p>
              </li>
            </ul>
          )
         })}
      </div>
    </div>
  );
};

export default Detail;
