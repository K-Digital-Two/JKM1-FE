import { React, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import Listbar from "./Listbar";

const Map = ({ship, info}) => {
 
  const markers = [
    {
      id: 1,
      name: "인천항",
      position: { lat: 37.58365424010193, lng: 126.66654526681425 },
    },
    {
      id: 2,
      name: "선박2",
      position: { lat: 35.08168418627615, lng: 124.46883778701965 },
    },
    {
      id: 3,
      name: "선박3",
      position: { lat: 36.5985426943221, lng: 123.85386908855355 },
    },
    {
      id: 4,
      name: "선박4",
      position: { lat: 33.543245181688484, lng: 128.86371545413655 },
    },
    {
      id: 5,
      name: "선박5",
      position: { lat: 38.82575221585357, lng: 129.58284809850028 },
    },
    {
      id: 6,
      name: "선박6",
      position: { lat: 32.704078492895235, lng: 126.02859057923243 },
    },
  ];

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
      <Listbar/>
      {/* 구글 맵 api 받아오기 */}
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
        <GoogleMap
          mapContainerStyle={containerStyle} // 구글맵 사이즈
          center={center[0]} // 로드시 위치
          zoom={8} // 지도 확대 zoom 크기
        >
          {/* 마커 정보 mapping */}
          {/* {ship.map(({schedule_ship_shipId , shipLat, shipLon, speed,takeTime })=>
            <Marker
            key={shipLat}
            position={(shipLat,shipLon)}
            icon={{
              url : require("../img/ship.png"),
              scaledSize : {width : 50, height:50}
            }}
            >
            
            </Marker>
            )} */}
          {markers.map(({ id, name, position }) => (
            <Marker
              key={id}
              position={position}
              icon={{
                url: require("../img/shipMarker.png"),
                scaledSize: { width: 50, height: 50 },
              }}
              onMouseOver={() => handleActiveMarker(id)} //
            >
              {/* 마커랑 아이디값이 동일하면 infowindow UI 보여줌 */}
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-3 bg-yellow-100 border rounded-lg">
                    <p>선박명 : {name}</p>
                    <p>위도 : {position.lat}</p>
                    <p>경도 : {position.lng}</p>
                    <p>도착예정시간 : </p>
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
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
