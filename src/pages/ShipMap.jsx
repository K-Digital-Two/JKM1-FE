import { React, useState, useEffect } from "react";
import MapStyles from "../MapStyles";
import axios from "axios";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
  Polyline,
  Circle,
} from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";

const ShipMap = ({ timeGroup }) => {
  // useParams 이용해서 param 값가져오기
  
  const { paramId } = useParams();
  const navigate = useNavigate();
  const [obs, setObs] = useState([]);
  const [shipEffect, setShipEffect] = useState([]);
  const [path, setPath] = useState([]);
  const [countPath, setCountPath] = useState(0);
  const [polyPath, setPolyPath] = useState([]);
  const [changePath, setChangePath] = useState([]);
  const [changeTime, setChangeTime] = useState([]);
  const [showInTime, setShowInTime] = useState([]);
  const [signal, setSignal] = useState("");
  const [shipSpeed, setShipSpeed] = useState([]);
  const [fristName, setFristName] = useState()

  const [arrive, setArrive] = useState({
    lat: 37.440515,
    lng: 126.601098,
  });
  const [checkStatus, setCheckStatus] = useState()

  // timeGroup, shipId별 로그 데이터 불러오기
  useEffect(() => {
    const interval = setInterval(() => {
      (async () => {
        const result = await axios.get(
          `http://10.125.121.170:8080/locations/${timeGroup}/${paramId}`
        )
        setPath(result.data)
        if(path === null || path[0] == null || path[0].shipName == null){
         return 
        }
        setSignal(path[0].shipName)
        // 도착시 list 페이지로 이동
        if (path[path.length-1].status === 1) {
          setTimeout(()=>{
            alert("도착하여\nList페이지로 이동합니다")
            navigate("/info")
          },1000)
          
        }
      })()
    },1000)
    return () => {
      clearInterval(interval)
    }
  }, [path])

  for (let i in path) {
    changePath.push({ lat: path[i].shipLat, lng: path[i].shipLon})
    changeTime.push(path[i].takeTime)
    showInTime.push(path[i].insertTime)
    shipSpeed.push(path[i].speed)
    
  }
  // 관측소 데이터 불러오기
  useEffect(() => {
    (async () => {
      const result2 = await axios.get("http://10.125.121.170:8080/obs")
      setObs(result2.data)
      console.log(result2.data)
    })().catch(() => {
      console.log("데이터못불러옴")
    })
  }, [])

  // 지도 스타일
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  }

  // 처음 중심지 위치
  const [position, setPosition] = useState({
    lat: 37.31489164635451,
    lng: 125.01447327312809 ,
  })

  // 지도 옵션
  const options = {
    styles: MapStyles,
    disableDefaultUI: true, // 지도,위성 UI 제거
    zoomControl: true,
  };

  // 관측소 기준 반경 30,000m 표시하는 원의 옵션
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
  }
  // PolyLine Option 경로
  const pLineOptions ={
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 0.5,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
  }

  // Marker 클릭, hover 변경 state
  const [activeMarker, setActiveMarker] = useState();

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  }
  console.log(timeGroup)
  return (
    <div>
      <div className="z-10 bg-white h-[82px] w-screen absolute text-black" />

      {/* 구글 맵 api 받아오기 */}
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
        <div className="flex">
          <GoogleMap
            mapContainerStyle={containerStyle} // 구글맵 사이즈
            center={position} // 로드시 위치
            zoom={9} // 지도 확대 zoom 크기
            options={options}
          >
            {/* (실시간 데이터) 입력시각 및 정보창 */}
            {signal ? (
              <div className="text-black mt-24 ml-32 z-20 w-[92%] relative">
                <div className="flex justify-between">
                  <p className="text-[16px] bg-white bg-opacity-20 p-1 rounded-md h-8">
                    신호 입력시각 :{showInTime[showInTime.length - 1]}
                  </p>
                  <pre className="text-[16px] bg-white p-1 rounded-md flex border-2 border-black">
                  {" "}
                    현재{" "}
                    <p className="text-red-400">
                      {signal}
                    </p>{" "}
                    선박은 평균{" "}
                    <p className="text-red-400">
                      {shipSpeed[shipSpeed.length - 1]}
                    </p>{" "}
                    (k/n)속도로 이동중에 있으며 남은시간은{" "}
                    <p className="text-red-400">
                      {changeTime[changeTime.length - 1]}
                    </p>{" "}
                    입니다.
                  </pre>

                  {/* list페이지로 이동버튼 */}
                  <button
                    className="ml-96 border-2 border-gray-200 bg-gray-100 hover:bg-gray-300 rounded-md p-1"
                    onClick={() => {
                      navigate("/info");
                    }}>
                    이전
                  </button>
                </div>
              </div>
            ) : (
              "신호없음"
            )}

            {/* 인천항 마커 */}
            <MarkerF
              position={{
                lat: 37.46513050623015,
                lng: 126.61136800252747,
              }}
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
            
            {/* 선박 위치 마커 표시 */}
            {path.map(({ shipName, shipLat, takeTime, shipId }) => (
              
              <MarkerF
                key={takeTime}
                position={{
                  lat: changePath[changePath.length - 1].lat,
                  lng: changePath[changePath.length - 1].lng,
                }}
                icon={{
                  // url : require(`../img/${getMarker(shipUse)}.png`),
                  url: require("../img/m10.png"),
                  scaledSize: { width: 30, height: 30},
                }}
                onLoad={() => handleActiveMarker(shipLat)}
              >
                <Polyline path={changePath} options={pLineOptions} />
                {/* 마커랑 아이디값이 동일하면 infowindow UI 보여줌 */}
                {activeMarker === shipLat ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className="font-bold p-2">
                      <p>선박명 : {shipName}</p>
                      <p>위도 : {changePath[changePath.length - 1].lat}</p>
                      <p>경도 : {changePath[changePath.length - 1].lng}</p>
                      <p className="text-red-500 font-bold">도착예정시간 : <span className="text-[20px]">
                        {changeTime[changeTime.length-1]}분</span>
                      </p>
                    </div>
                  </InfoWindow>
                ) : null}
              </MarkerF>
            ))}

            {/* 관측소 위치 마커 표시 */}
            {obs.map(({ obsId, obsName, obsLat, obsLon }) => (
              <MarkerF
                key={obsId}
                icon={{
                  url: require("../img/m3.png"),
                  scaledSize: { width: 50, height: 50 },
                }}
                position={{ lat: parseFloat(obsLat), lng: parseFloat(obsLon) }}
                onClick={() => {
                  handleActiveMarker(obsName);
                }}
              >
                {/* 관측소 인포윈도우 창 */}
                {activeMarker === obsName ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className="font-bold p-2">
                      <p>관측소명 : {obsName}</p>
                      <p>위도 : {obsLat}</p>
                      <p>경도 : {obsLon}</p>
                      <span className="flex justify-center"></span>
                    </div>
                  </InfoWindow>
                ) : null}

                {/* 선택된 관측소 기준 원 그리기 */}
                {activeMarker === obsName ? (
                  <Circle
                    center={{
                      lat: parseFloat(obsLat),
                      lng: parseFloat(obsLon),
                    }}
                    options={circleOptions}
                  />
                ) : null}
              </MarkerF>
            ))}
            {polyPath && countPath ? <Polyline path={polyPath} /> : null}
          </GoogleMap>
        </div>
      </LoadScript>
    </div>
  )
}

export default ShipMap