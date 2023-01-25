
import { React, useState, useEffect } from "react";
import MapStyles from "../MapStyles";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import {useNavigate, useParams } from "react-router-dom";
import Listbar from "./Listbar";

const Map2 = ({ship}) => {
 

   // 지도 스타일
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };
   // 처음 중심지 위치
  const center = [
    {
      lat: 37.49012631842129,
      lng: 126.62878763527841,
    },
  ];
  const options = {
    styles: MapStyles,
    disableDefaultUI: true, // 지도,위성 UI 제거
    zoomControl: true,
  };


  // useParmas



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
    <div className="flex">
      <Listbar ship={ship}/>
      {/* 구글 맵 api 받아오기 */}
      <div className="">
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
        <GoogleMap
          mapContainerStyle={containerStyle} // 구글맵 사이즈
          center={center[0]} // 로드시 위치
          zoom={9} // 지도 확대 zoom 크기 
          options={options}
        >
          <MarkerF
          position={center[0]}
          icon={{
            url : require("../img/shipMarker.png"),
            scaledSize : {width : 40, height : 40},
            
          }}
          onMouseOver={()=> handleActiveMarker()}
          >
            {activeMarker === GoogleMap ? (
              <InfoWindow onCloseClick={()=>setActiveMarker(null)}>
                  <div className="font-bold p-2 first:border rounded-lg">
                    <p>선박명 : 인천항</p>
                    </div>
              </InfoWindow>
            ):null}

          </MarkerF>
          {/* 마커 정보 mapping */}
          {ship.map(({shipId, shipLat, shipLon, shipName, takeTime})=>(
            <MarkerF
            key={takeTime}
            position={{lat : parseFloat(shipLat) , lng : parseFloat(shipLon)}}
            icon={{
              url :require("../img/ship.png"),
              scaledSize : {width : 25, height:25}
            }}
            onClick={() => handleActiveMarker(shipId)} 
            >
              {/* 마커랑 아이디값이 동일하면 infowindow UI 보여줌 */}
              {activeMarker === shipId? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-1">
                    <p>선박명 :{shipName}</p>
                    <p>위도 : {shipLat}</p>
                    <p>경도 : {shipLon}</p>
                    <p>도착예정시간 : {takeTime}분</p>
                    <span className="flex justify-center">
                      <button
                        className=" bg-blue-500 rounded-full text-white flex p-1 mt-2"
                        onClick={() => navigate(`/detail/${shipId}`)}
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
      </div>
    </div>
  );
};

export default Map2;
