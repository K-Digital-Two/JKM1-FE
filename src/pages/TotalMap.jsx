import { React, useState, useEffect } from "react"
import MapStyles from "../MapStyles"
import axios from "axios"
import Detail from "../component/Detail"

import {
  Circle,
  GoogleMap,
  InfoWindow,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api"

const TotalMap = ({timeGroup}) => {
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
  ])

  const [changePath, setChangePath] = useState([])
  const [activeMarker, setActiveMarker] = useState(null)
  const [shipClick, setShipClick] = useState()
  const [path, setPath] = useState([])
  const [obs, setObs] = useState([])
  const [signal, setSignal] = useState("")

  useEffect(()=>{
    const interval = setInterval(()=>{
      (async () => {
        const result = await axios.get(`http://localhost:8080/locations/${timeGroup}`);
        setShip(result.data)
      })()
      .catch(()=>{
        setSignal(console.log("데이터못불러옴"))
      })
    })
    return () =>{
      clearInterval(interval)
    } 
  }, [ship])

  // 관측소 데이터 불러오기
  useEffect(()=>{
    (async () => {
      const result2 = await axios.get("http://localhost:8080/obs");
      setObs(result2.data);
    })()
  }, [])

  for (let i in ship) {
    changePath.push({lat:ship[i].shipLat, lng: ship[i].shipLon})
  }

  // 지도 스타일
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  }

  // 처음 중심지 위치
  const [position, setPosition] = useState(
    {
      lat: 37.49012631842129,
      lng: 126.62878763527841,
    },
  )
  
  // 지도 옵션
  const options = {
    styles: MapStyles,
    disableDefaultUI: true, // 지도,위성 UI 제거
    zoomControl: true,
  }

  // 관측소 기준 원 표시 옵션
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
    zIndex: 1,
  }

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return
    }
    setActiveMarker(marker);
  }

  const [showDetail, setShowDetail] = useState()
  const [detailInfo, setDetailInfo] = useState()
  const [countDetail, setCountDetail] = useState(0)

  for (let i in path) {
    changePath.push({lat:path[i].shipLat, lng: path[i].shipLon})
  }

  return (
    <>
      {/* 구글 맵 api 받아오기 */}
      <LoadScript googleMapsApiKey="AIzaSyDgd7TSRgGpk4aaQMdrYG9bJJiKnzdRGDY">
        <div className="z-10 bg-white h-[82px] w-screen absolute"/>
          <div className="z-0 absolute w-screen h-screen">
            <div className="text-black absolute pt-24 ml-32 z-20">
              <div className="text-[16px] bg-white p-1 rounded-md">현재 선박 척수 : {ship.length}척</div>
            </div>
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
                            arrivalName,
                            insertTime})=>(
              <MarkerF
                key={shipName}
                position={{lat : parseFloat(shipLat) , lng : parseFloat(shipLon)}}
                icon={{
                  url :require("../img/ship.png"),
                  scaledSize : {width : 25, height:25}
                }}
                onClick={() => {handleActiveMarker(shipId)}}>

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
                            console.log("클릭")
                            setShowDetail(!showDetail)
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
                          }}>
                            상세보기
                        </button>
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
                  scaledSize : {width : 50, height : 50}
                }}
                animation={2}
                position={{lat : parseFloat(obsLat), lng : parseFloat(obsLon)}}
                onClick={()=>{handleActiveMarker(obsName)}}>

                {activeMarker === obsName ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className="font-bold p-2">
                      <p>관측소명 : {obsName}</p>
                      <p>위도 : {obsLat}</p>
                      <p>경도 : {obsLon}</p>
                    </div>
                  </InfoWindow>
                ) : null}
          
                {activeMarker === obsName ? 
                  <Circle
                    center={{lat :  parseFloat(obsLat), lng : parseFloat(obsLon)}}
                    radius = {30000}
                    options={circleOptions}/>:null}
              </MarkerF>
            ))}
          </GoogleMap>
        </div>
      </LoadScript>
      {!showDetail && countDetail !== 0 ? <Detail detailInfo={detailInfo} timeGroup={timeGroup}/> : null}
    </>
  )
}

export default TotalMap
