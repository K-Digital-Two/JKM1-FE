import { React, useState, useEffect, useRef } from "react";
import MapStyles from "../MapStyles";
import axios from "axios";

import {
  Circle,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  MarkerF,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const TotalMap = () => {
  const [ship, setShip] = useState([
    {
      shipId: "",
      shipName: "",
      shipLat: "",
      shipLon: "",
      takeTime: "",
      shipUse: "",
      speed: "",
      departTime: "",
      arrivalTime: "",
      accuracy: "",
      departure: "",
      arrivalName: "",
    },
  ]);

  const [changePath, setChangePath] = useState([]);
  const [timeGroup, setTimeGroup] = useState(1)
  const [activeMarker, setActiveMarker] = useState(null);
  const [countDetail, setCountDetail] = useState(0)
  const [shipClick, setShipClick] = useState()
  const [path, setPath] = useState([])
  const [obs, setObs] = useState([])
  

 useEffect(()=>{
  const interval = setInterval(()=>{
    (async () => {
      const result = await axios.get(
        `http://localhost:8080/locations/${timeGroup}`);
      setShip(result.data);
      setTimeGroup(timeGroup + 1)   
      // console.log(changePath)
      // console.log(timeGroup)
      // console.log(ship)
    })()
    .catch(()=>{
      console.log("데이터못불러옴")
    })
  }, 1000)
  return () =>{
    clearInterval(interval)
  } 
},[ship])


useEffect(()=>{
  (async () => {
    const result2 = await axios.get(
      "http://localhost:8080/obs");
    setObs(result2.data);
    console.log(obs)
  })()
  .catch(()=>{
    console.log("데이터못불러옴")
  })
},[])





 
for (let i in ship) {
  changePath.push({lat:ship[i].shipLat, lng: ship[i].shipLon})
}




   // 지도 스타일
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };
   // 처음 중심지 위치
  const mapRef = useRef(null);
  const [position, setPosition] = useState(
    {
      lat: 37.050528979619266, 
      lng: 124.80198175584647
    },
  );

  function handleLoad(map) {
    mapRef.current = map;
  }

  function handleCenter() {
    if (!mapRef.current) return;

    const newPos = mapRef.current.getCenter().toJSON();
    setPosition(newPos);
  }

  const options = {
    styles: MapStyles,
    disableDefaultUI: true, // 지도,위성 UI 제거
    zoomControl: true,
  };
  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#007AFF",
    fillOpacity: 0.2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1,
  };




  const getShipClick = (text)=>{
      setShipClick(text)
  }
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
 
 const navigate = useNavigate()

 const getMarker =
 ((shipUse) => {
   if(shipUse === "LNG 운반선"){
     return 'm1'
   }
   if(shipUse === "견인용예선"){
     return 'ship'
   }
   if(shipUse === "급유선"){
     return 'm2'
   }
   if(shipUse === "기타 예선"){
     return 'm3'
   }
   if(shipUse === "산물선(벌크선)"){
     return 'm4'
   }
   if(shipUse === "석유제품 운반선"){
     return 'm5'
   }
   if(shipUse === "세미(혼재)컨테이너선"){
     return 'm6'
   }
   if(shipUse === "시멘트운반선"){
     return 'm7'
   }
   if(shipUse === "압항 예선"){
     return 'm8'
   }
   if(shipUse === "일반화물선"){
    return 'm9'
   } 
   if(shipUse === "자동차운반선"){
    return 'm10'
   }
   if(shipUse === "케미칼 운반선"){
    return 'ship'
  }
  if(shipUse === "풀컨테이너선"){
    return 'm3'
  }
  if(shipUse === "기타유조선"){
    return 'shipMarker'
  }
 }
 )


 
for (let i in path) {
  changePath.push({lat:path[i].shipLat, lng: path[i].shipLon})
}


  return (
    <>
      {/* 구글 맵 api 받아오기 */}
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
    
      <div className="z-10 bg-white h-[82px] w-screen absolute"/>
        <div className="z-0 absolute">
        <GoogleMap
          mapContainerStyle={containerStyle} // 구글맵 사이즈
          center={position} // 로드시 위치
          zoom={9} // 지도 확대 zoom 크기 
          options={options}
        >
          <MarkerF
          position={{ 
            lat: 37.46513050623015,
            lng:  126.61136800252747,}}
          icon={{
            url : require("../img/shipMarker.png"),
            scaledSize : {width : 40, height : 40},
            
          }}
          onClick={()=> handleActiveMarker("인천항")}
          >
          {activeMarker === "인천항" ? (
            <InfoWindow onCloseClick={()=>setActiveMarker(null)}>
                <div className="font-bold p-1 text-[20px]">
                  <p>인천항</p>
                  </div>
            </InfoWindow>
          ):null}
          </MarkerF>
          {/* 마커 정보 mapping */}
          {ship.map(({shipId, shipName,
                          shipLat ,
                          shipLon ,
                          takeTime,
                          shipUse,
                          speed,
                          departTime,
                          arrivalTime,
                          accuracy,
                          departure,
                          arrivalName})=>(
            <MarkerF
            key={shipName}
            position={{lat : parseFloat(shipLat) , lng : parseFloat(shipLon)}}
            icon={{
              // url : require(`../img/${getMarker(shipUse)}.png`),
              url :require("../img/ship.png"),
              scaledSize : {width : 25, height:25}
             
            }}
            onClick={() => {handleActiveMarker(shipId)}} 
            
            >
              {/* 마커랑 아이디값이 동일하면 infowindow UI 보여줌 */}
              {activeMarker === shipId? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-2">
                    <p>선박명 : {shipName}</p>
                    <p>위도 : {shipLat}</p>
                    <p>경도 : {shipLon}</p>
                    <p>도착예정시간 : {takeTime}분</p>
                    <span className="flex justify-center">
                    </span>
                  </div>
                </InfoWindow>
              ) : null}
            </MarkerF>
        ))}

        {obs.map(({obsId, obsName, obsLat, obsLon})=>(
            <MarkerF
            key={obsId}
            icon={{
              url : require("../img/m2.png"),
              scaledSize : {width : 25, height : 25}
            }}
            position={{lat : parseFloat(obsLat), lng : parseFloat(obsLon)}}
            onClick={()=>{handleActiveMarker(obsName)}}
            
            >
            {activeMarker === obsName ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div className="font-bold p-2">
                <p>관측소명 : {obsName}</p>
                <p>위도 : {obsLat}</p>
                <p>경도 : {obsLon}</p>
                <span className="flex justify-center">
                </span>
              </div>
            </InfoWindow>
            ) : null}
       
        {activeMarker === obsName ? <Circle
        center={{lat :  parseFloat(obsLat), lng : parseFloat(obsLon)}}
        radius = {30000}
        options={circleOptions}
        />:null}
        </MarkerF>
        ))}        





        {/* <MarkerF
        icon={{
          url : require("../img/m2.png"),
          scaledSize : {width : 25, height : 25}
        }}
        position={{lat : 36.590781400156004, lng : 126.30540784017813}}
        onClick={()=>{handleActiveMarker("관측소")}}
        animation ={1}
        >
          {activeMarker === "관측소" ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-2">
                    <p>선박명 : 관측소</p>
                    <p>위도 : </p>
                    <p>경도 :</p>
                    <p>도착예정시간 : 분</p>
                    <span className="flex justify-center">
                    </span>
                  </div>
                </InfoWindow>
                  ) : null}
        </MarkerF>
        <Circle
        center={{lat : 36.590781400156004, lng : 126.30540784017813}}
        radius = {128.748}
        options={circleOptions2}
        
        />




         <MarkerF
        icon={{
          url : require("../img/m2.png"),
          scaledSize : {width : 25, height : 25}
        }}
        position={{lat : 37.70918028888277, lng : 125.34580570799294 }}
        onClick={()=>{handleActiveMarker("관측소2")}}
        animation ={1}
        >
          {activeMarker === "관측소2" ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-2">
                    <p>선박명 : 관측소2</p>
                    <p>위도 : </p>
                    <p>경도 :</p>
                    <p>도착예정시간 : 분</p>
                    <span className="flex justify-center">
                    </span> 
                  </div>
                </InfoWindow>
                  ) : null}
        </MarkerF>
        <Circle
        center={{lat : 37.70918028888277, lng : 125.34580570799294}}
        radius = {128.748}
        options={circleOptions}
        
        /> */}
        </GoogleMap>
        </div>
      </LoadScript>
    </>
  
  );
};

export default TotalMap;

