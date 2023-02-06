import { React, useState, useEffect } from "react";
import MapStyles from "../MapStyles";
import axios from "axios";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
  Polyline,Circle
} from "@react-google-maps/api";
import { useParams, useNavigate} from "react-router-dom";


  
const ShipMap = ({ship}) => {
  // useParams 이용해서 param 값가져오기
const {shipId} = useParams() 
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
  const [obs, setObs] = useState([])
  const [shipEffect, setShipEffect] = useState([])
  const [path, setPath] = useState([]);
  const [countPath, setCountPath] = useState(0)
  const [polyPath, setPolyPath] = useState([])
  const [changePath, setChangePath] = useState([]);
  const [goDetail, setGoDetail] = useState()
  const [timeGroup, setTimeGroup] = useState(1)
  const [changeTime, setChangeTime] = useState([])
  const [showInTime, setShowInTime] = useState([])
  
  const [arrive , setArrive] = useState({
    lat: 37.35,
    lng: 126.99,
  })


  useEffect(()=>{
  const interval = setInterval(()=>{
    (async () => {
      const result = await axios.get(
        `http://localhost:8080/locations/${timeGroup}/${shipId}`
      );
      setPath(result.data);
      setTimeGroup(timeGroup + 1)
  
     
      // 인천항 도착이면 Info 페이지로 이동
    //  if(changePath[changePath.length-1].lat >= arrive.lat){
    //     navigate('/info') 
    //  }
     for(let i in obs){
      if(changePath[changePath.length-1].lat >= obs[i].obsLat){
          setShipEffect(obs[i].obsName)
      }
      console.log(changePath[changePath.length-1].lat)
      console.log(obs[i].obsLat)
    }
    })()
    .catch(()=>{
      console.log("데이터못불러옴")
    })
  },3000)
  return () =>{
    clearInterval(interval)
  } 
},[path])

for (let i in path) {
  changePath.push({lat:path[i].shipLat, lng: path[i].shipLon})
  changeTime.push(path[i].takeTime)
  showInTime.push(path[i].insertTime)

}



useEffect(()=>{
  (async () => {
    const result2 = await axios.get(
      "http://localhost:8080/obs");
    setObs(result2.data);
    console.log(result2.data)
  })()
  .catch(()=>{
    console.log("데이터못불러옴")
  })
},[])

  // 지도 스타일
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };
  // 처음 중심지 위치
  const [position, setPosition] = useState({
    lat: 37.050528979619266, 
    lng: 124.80198175584647
  });

  const options = {
    styles: MapStyles,
    disableDefaultUI: true, // 지도,위성 UI 제거
    zoomControl: true,
  };
  const options2 ={
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
  }
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


  // Marker 클릭, hover 변경 state
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div className="">
     <div className="z-10 bg-white h-[82px] w-screen absolute text-black"/>
      {/* 구글 맵 api 받아오기 */}
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
        <div className="flex">
          <GoogleMap
            mapContainerStyle={containerStyle} // 구글맵 사이즈
            center={position} // 로드시 위치
            zoom={9} // 지도 확대 zoom 크기
            options={options}
          >
            {/* (실시간 데이터) 입력시각 창 */}
            <div className="relative mt-20 ml-96 w-screen items-center justify-center  text-black z-10 bg-[#46BCEC]">
               <p className="text-[20px]">입력시각 :{showInTime[showInTime.length-1]}
               <p>현재 컨테이너 선박은 {shipEffect}관측소의 정보로 예측중입니다</p>
               </p>
            </div>
            <MarkerF
              position={{ 
                lat: 37.46513050623015,
                lng:  126.61136800252747,}}
              icon={{
                url: require(`../img/shipMarker.png`),
                scaledSize: { width: 40, height: 40 },
              }}
              onClick={() => handleActiveMarker("인천항")}
            >
              {activeMarker === "인천항" ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-1 text-[20px]">
                    <p>인천항</p>
                  </div>
                </InfoWindow>
              ) : null}
            </MarkerF>
            {path.map(({shipId, shipName,
                          shipLat ,
                          shipLon ,
                          takeTime,
                          shipUse,
                          speed,
                          departTime,
                          arrivalTime,
                          accuracy,
                          departure,
                          insertTime,
                          arrivalName})=>(
            <MarkerF
            key={takeTime}
            position={{lat : shipLat , lng : shipLon}}
            icon={{
              // url : require(`../img/${getMarker(shipUse)}.png`),
              url : require("../img/ship.png"),
              scaledSize : {width : 25, height:25}
            }}
            onClick={() => {handleActiveMarker(shipId)
            }} 
            >
               {/* 마커랑 아이디값이 동일하면 infowindow UI 보여줌 */}
              {activeMarker === shipId? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-2">
                    <p>선박명 : {shipName}</p>
                    <p>위도 : {path[path.length-1].shipLat}</p>
                    <p>경도 : {path[path.length-1].shipLon}</p>
                    <p className="text-red-500 font-bold">도착예정시간 : <span className="text-[20px]">{changeTime[changeTime.length-1]}분</span></p>
                    <button className="font-bold border border-blue-300 rounded-full bg-blue-400 ml-11"
                    onClick={()=>{
                      setPolyPath(changePath)
                      setCountPath(!countPath)
                    }}>경로보기</button>
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
        radius = {128.748}
        options={circleOptions}
        />:null}
        </MarkerF>
        ))}        
        {polyPath && countPath ? <Polyline path={polyPath} options={options2}/> : null}
          </GoogleMap>
        
        </div>
      </LoadScript>
    </div>
  );
};





export default ShipMap;
