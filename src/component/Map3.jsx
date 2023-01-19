import { React, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import Listbar from "./Listbar";

const Map2 = ({ship}) => {
 
  
 
   // 지도 스타일
  const containerStyle = {
    width: "100%",
    height: "560px",
  };
   // 처음 중심지 위치
  const center = [
    {
      lat: 37.49012631842129,
      lng: 126.62878763527841,
    },
  ];


  const [activeMarker, setActiveMarker] = useState(null);
  // Detail 이동하는 navigate
  const navigate = useNavigate();

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <>
      <Listbar ship={ship}/>
      {/* 구글 맵 api 받아오기 */}
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
        <GoogleMap
          mapContainerStyle={containerStyle} // 구글맵 사이즈
          center={center[0]} // 로드시 위치
          zoom={8} // 지도 확대 zoom 크기
          
        >
          {/* 마커 정보 mapping */}
          {ship.map(({shipId, shipLat, shipLon, shipName, takeTime})=>(
            <MarkerF
            key={takeTime}
            position={console.log(ship[0].shipid)}
            icon={{
              url :require("../img/ship.png"),
              scaledSize : {width : 50, height:50}
            }}
            onMouseOver={() => handleActiveMarker(shipId)} 
            >
              {/* 마커랑 아이디값이 동일하면 infowindow UI 보여줌 */}
              {activeMarker === shipId? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-3 bg-yellow-100 border rounded-lg">
                    <p>선박명 :{shipName}</p>
                    <p>위도 : {shipLat}</p>
                    <p>경도 : {shipLon}</p>
                    <p>도착예정시간 : {takeTime}</p>
                    <span className="flex justify-center">
                      <button
                        className=" bg-blue-500 rounded-full text-white flex p-1 mt-2"
                        onClick={() => navigate("/detail")}
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
      </LoadScript>
    </>
  );
};

export default Map2;
