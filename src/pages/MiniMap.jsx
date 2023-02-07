import { React, useState, useEffect } from "react";
import MapStyles from "../MapStyles";
import axios from "axios";

import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";
import {useNavigate } from "react-router-dom";

const MiniMap = ({shipId}) => {

  const [path, setPath] = useState([]);
  const [changePath, setChangePath] = useState([]);
  const [startPath, setStartPath] = useState([]);
  const navigate = useNavigate()

  for (let i in path) {
    changePath.push({ lat: path[i].shipLat, lng: path[i].shipLon }); // 변하는 위치
    startPath.push({ lat: path[0].shipLat, lng: path[0].shipLon }); // 초기 마커위치
  }

  // 지도 스타일
  const containerStyle = {
    width: "20vw",
    height: "20vh",
  };
  // 처음 중심지 위치
  const [position, setPosition] = useState({
    lat: 37.49012631842129,
    lng: 126.62878763527841,
  });

  const options = {
    styles: MapStyles,
    disableDefaultUI: true, // 지도,위성 UI 제거
    zoomControl: true,
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
    <div className="flex">
      {/* 구글 맵 api 받아오기 */}
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
        <div className=""
          onClick={()=>{navigate(`/shipMap/${shipId}`)}}
          >
          <GoogleMap
            mapContainerStyle={containerStyle} // 구글맵 사이즈
            center={startPath[0]} // 로드시 위치
            zoom={9} // 지도 확대 zoom 크기
            options={options}
          >
            <MarkerF
              position={position}
              icon={{
                url: require("../img/shipMarker.png"),
                scaledSize: { width: 30, height: 30 },
              }}
              onClick={() => handleActiveMarker("인천항")}
            >
            </MarkerF>
            <MarkerF
              position={startPath[0]}
              icon={{
                url: require("../img/ship.png"),
                scaledSize: { width: 25, height: 25 },
              }}
                onClick={() => {
                setActiveMarker(shipId);
              }}>
              </MarkerF>
           
           
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  );
};

export default MiniMap;
