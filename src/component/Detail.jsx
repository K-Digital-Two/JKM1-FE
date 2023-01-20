import {React, useState} from "react";
import { SiCodeship } from "react-icons/si";
import { BsInfoCircle, BsSpeedometer } from "react-icons/bs";
import { TiMediaPlay, TiMediaPlayReverse } from "react-icons/ti";
import {RiBarChartGroupedLine} from 'react-icons/ri'
import { useParams } from "react-router-dom";


const Detail = ({ship}) => {
  
  const {shipId} = useParams()

  const [currentId , setCurrentId] = useState('')

  


  const topics = [
    { icons: <SiCodeship />, title: "MMSI / 선박명" , answer : (`${ship[0].shipId} / ${ship[0].shipName}`)},
    { icons: <BsInfoCircle />, title: "현위치" ,answer : (`(위도)${ship[0].shipLat} / (경도)${ship[0].shipLon}`)},
    { icons: <BsInfoCircle />, title: "선박용도", answer : `${ship[0].shipUse}` },
    { icons: <BsSpeedometer />, title: "선박속도" ,answer : `${ship[0].speed}`},
    { icons: <TiMediaPlay />, title: "출발시간" ,answer : (`${ship[0].departTime}`).slice(`${ship[0].departTime}`,-10)},
    { icons: <TiMediaPlayReverse />, title: "출발시각 / 도착예정시간",answer : (`${ship[0].arrivalTime}`).slice(`${ship[0].arrivalTime}`, -10) },
    { icons: <RiBarChartGroupedLine/>, title : "정확성", answer : `${ship[0].accuracy}`}
  ];

  


  return (
    <div className="">
      <div className="font-bold text-blue-900 text-3xl">선박 상세정보</div>
      <div className="mt-2">
          {topics.map(({icons,title,answer})=>{
          return (
            <ul className="flex items-center text-2xl" key={title}>
              <li className="flex items-center m-2">
                <p className="text-blue-800 mr-3">{icons}</p>
                <p className=""> {title} :</p>
                <p> {answer}</p> 
              </li>
            </ul>
          )
         })}
         
      </div>
    </div>
  );
};

export default Detail;
