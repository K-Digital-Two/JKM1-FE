import {React} from "react";
import { SiCodeship } from "react-icons/si";
import { BsInfoCircle, BsSpeedometer } from "react-icons/bs";
import { TiMediaPlay, TiMediaPlayReverse } from "react-icons/ti";
import {RiBarChartGroupedLine} from 'react-icons/ri'



const Detail = ({detailInfo}) => {
  
  
  const topics = [
    { icons: <SiCodeship />, title: "MMSI / 선박명", answer : (detailInfo[0].shipId, detailInfo[0].shipName)},
    { icons: <BsInfoCircle />, title: "현위치" , answer :(`(위도)${detailInfo[0].shipLat} / (경도)${detailInfo[0].shipLon}`)},
    { icons: <BsInfoCircle />, title: "선박용도", answer : detailInfo[0].shipUse},
    { icons: <BsSpeedometer />, title: "선박속도", answer : detailInfo[0].speed + 'm/s'},
    { icons: <TiMediaPlay />, title: "출발시간" , answer : detailInfo[0].departTime},
    { icons: <TiMediaPlayReverse />, title: "도착예정시간", answer : detailInfo[0].arrivalTime},
    { icons: <RiBarChartGroupedLine/>, title : "정확성", answer : detailInfo[0].accuracy}
  ];

  console.log(detailInfo)


  return (
    <div className="">
      <div className="font-bold text-blue-900 text-3xl">선박 상세정보</div>
      <div className="mt-2">
         {topics.map(({icons,title,answer})=>{
          return (
            <ul className="flex items-center text-2xl" key={title}>
              <li className="flex items-center m-2">
                <p className="text-blue-800 mr-3">{icons}</p>
                <p className=""> {title} : {answer} </p>
              </li>
            </ul>
          )
         })}
      
         
   
        
       
      </div>
    </div>
  );
};

export default Detail;
