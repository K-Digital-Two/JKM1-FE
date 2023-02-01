import { React, useState, useEffect } from "react";
import MapStyles from "../MapStyles";
import axios from "axios";

import Detail from "../component/Detail";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";


const ShipMap = ({ship}) => {
  // useParams 이용해서 param 값가져오기
const {shipId} = useParams() 

  const [path, setPath] = useState([]);
  const [changePath, setChangePath] = useState([]);
  const [startPath, setStartPath] = useState([]);
  const [timeGroup, setTimeGroup] = useState(1)
  const [changeTime, setChangeTime] = useState([])
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
     console.log(changePath)
    })()
  }, 5000)
  return () =>{
    clearInterval(interval)

  }
},[path])

for (let i in path) {
  changePath.push({lat:path[i].shipLat, lng: path[i].shipLon})
  changeTime.push(path[i].takeTime)
}


  // 지도 스타일
  const containerStyle = {
    width: "100vw",
    height: "100vh",
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
        <div className="">
          <GoogleMap
            mapContainerStyle={containerStyle} // 구글맵 사이즈
            center={position} // 로드시 위치
            zoom={9} // 지도 확대 zoom 크기
            options={options}
          >
            <MarkerF
              position={position}
              icon={{
                url: require("../img/shipMarker.png"),
                scaledSize: { width: 40, height: 40 },
              }}
              onClick={() => handleActiveMarker("인천항")}
            >
              {activeMarker === "인천항" ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="font-bold p-1">
                    <p>인천항</p>
                  </div>
                </InfoWindow>
              ) : null}
            </MarkerF>
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
            position={changePath[changePath.length-1]}
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
                    <p>위도 : {path[path.length-1].shipLat}</p>
                    <p>경도 : {path[path.length-1].shipLon}</p>
                    <p>도착예정시간 : {changeTime[changeTime.length-1]}분</p>
                    <span className="flex justify-center">
                    <button
                        className=" bg-blue-500 rounded-full text-white flex p-1 mt-2"
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
     
      
    </div>
  );
};

export default ShipMap;
