import {React, useState} from "react";
import { SiCodeship } from "react-icons/si";
import { BsInfoCircle, BsSpeedometer } from "react-icons/bs";
import { TiMediaPlay, TiMediaPlayReverse } from "react-icons/ti";
import {RiBarChartGroupedLine} from 'react-icons/ri'
import {IoCloseOutline} from 'react-icons/io5'



const Detail = ({detailInfo}) => {
  const [showDetail, setShowDetail] = useState()
  
  const answers = detailInfo == null ? [] : [
    { icons: <SiCodeship />, title: "MMSI / 선박명", answer : (detailInfo[0].shipId, detailInfo[0].shipName)},
    { icons: <BsInfoCircle />, title: "현위치" , answer :(`(위도)${detailInfo[0].shipLat} / (경도)${detailInfo[0].shipLon}`)},
    { icons: <BsInfoCircle />, title: "선박용도", answer : detailInfo[0].shipUse},
    { icons: <BsSpeedometer />, title: "선박속도", answer : detailInfo[0].speed + 'm/s'},
    { icons: <TiMediaPlay />, title: "출발시간" , answer : detailInfo[0].departTime},
    { icons: <TiMediaPlayReverse />, title: "도착예정시간", answer : detailInfo[0].arrivalTime},
    { icons: <RiBarChartGroupedLine/>, title : "정확성", answer : detailInfo[0].accuracy}
  ];



  return (
    
     <>
      { !showDetail ? 
        <div className=" h-screen   bg-white float-right relative">
        <div className="text-center font-bold text-blue-900 text-xl">
          <IoCloseOutline 
          className="ml-96 text-[30px] pt-1"
          onClick={()=>setShowDetail(!showDetail)}
          />선박 상세정보
        </div>
        <div className="mt-1">
        {answers === [ ] ? null : answers.map(({title,icons, answer})=>{
            return (
              <ul className=" flex items-center text-lg" key={title}>
                <li className="flex items-center m-2">
                  <p className="text-blue-800 mr-3">{icons}</p>
                  <pre className="">{title} : {answer}</pre>
                </li>
              </ul>
            )
            })}
        </div>
      </div> : null
      } 

      
</>
  );
};

export default Detail;
