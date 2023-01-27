import { React, useState, useEffect, useRef } from "react";
import MapStyles from "../MapStyles";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";

import Listbar from '../component/Listbar'
import Navbar from '../component/Navbar';
import Detail from "./Detail";
import ShipList from "./ShipList";





const Map = ({ship}) => {
 

   // 지도 스타일
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };
   // 처음 중심지 위치
  const mapRef = useRef(null);
  const [position, setPosition] = useState(
    {
      lat: 37.49012631842129,
      lng: 126.62878763527841,
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


  const [showDetail, setShowDetail] = useState()

  const [detailInfo, setDetailInfo] = useState()

  const [activeMarker, setActiveMarker] = useState(null);

  const [countDetail, setCountDetail] = useState(0)

  const [shipClick, setShipClick] = useState()

  const getShipClick = (text)=>{
      setShipClick(text)
  }
  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  
  // useEffect로 Detail버그 해결
  useEffect(()=>{
   
   return function cleanup(){
    setShowDetail(!showDetail)
   }
  },[activeMarker])
  



  return (
    <>
      {/* 구글 맵 api 받아오기 */}
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
      {/* <Navbar className='p-3 w-[100%] h-20 absoulte z-20 bg-slate-600' ship={ship}/> */}
      <Listbar className='flex z-10 h-screen' ship={ship} getShipClick={getShipClick}/>
      
        <div className="z-0 absolute">
        <GoogleMap
          mapContainerStyle={containerStyle} // 구글맵 사이즈
          center={position} // 로드시 위치
          zoom={9} // 지도 확대 zoom 크기 
          options={options}
        >
          <MarkerF
          position={position}
          icon={{
            url : require("../img/shipMarker.png"),
            scaledSize : {width : 40, height : 40},
            
          }}
          onClick={()=> handleActiveMarker("인천항")}
          >
          {activeMarker === "인천항" ? (
            <InfoWindow onCloseClick={()=>setActiveMarker(null)}>
                <div className="font-bold p-1">
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
            key={takeTime}
            position={{lat : parseFloat(shipLat) , lng : parseFloat(shipLon)}}
            icon={{
              url :require("../img/ship.png"),
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
                    <p>위도 : {shipLat}</p>
                    <p>경도 : {shipLon}</p>
                    <p>도착예정시간 : {takeTime}분</p>
                    <span className="flex justify-center">
                    <button
                        className=" bg-blue-500 rounded-full text-white flex p-1 mt-2"
                        onClick={() =>{ 
                          setShowDetail(!showDetail)
                          //setDetailInfo([...detailInfo, {
                          setDetailInfo([{  
                          shipId,
                          shipName,
                          shipLat ,
                          shipLon ,
                          takeTime,
                          shipUse,
                          speed,
                          departTime,
                          arrivalTime,
                          accuracy,
                          departure,
                          arrivalName}])
                        setCountDetail(countDetail+ 1)
                        }}
                      >
                        상세보기
                      </button>
                    </span>
                  </div>
                </InfoWindow>
              ) : null}
            </MarkerF>
        ))}
        </GoogleMap>
        </div>
      </LoadScript>

      <div className="absoulte z-20 bg-white float-right relative">
      {!showDetail && countDetail !== 0 ? <Detail detailInfo={detailInfo}/> : null}
      </div>
    </>
  
  );
};

export default Map;
