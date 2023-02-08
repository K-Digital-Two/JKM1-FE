import React from "react"
import { SiCodeship } from "react-icons/si"
import { BsInfoCircle, BsSpeedometer } from "react-icons/bs"
import { TiMediaPlay, TiMediaPlayReverse } from "react-icons/ti"
import {CgTimer} from 'react-icons/cg'
import { useState, useEffect } from "react"
import {IoCloseOutline} from 'react-icons/io5'
import axios from "axios"

const Detail = ({detailInfo, timeGroup}) => {

  const [signal, setSignal] = useState("")
  
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

  useEffect(()=>{
    const interval = setInterval(()=>{
      (async () => {
        const result = await axios.get(`http://localhost:8080/locations/${timeGroup}/${detailInfo[0].shipId}`)
        setShip(result.data)
      })()
      .catch(()=>{
        setSignal(console.log("데이터못불러옴"))
      })
    })
    return () =>{
      clearInterval(interval)
    } 
  },[ship])

  const [showDetail, setShowDetail] = useState()

  // 두 지점의 위도,경도를 기반으로 한 거리 계산
  const getDistanceBetweenPoints = (latitude1, longitude1, latitude2, longitude2) => {
    let theta = longitude1 - longitude2;
    let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        Math.sin(latitude1 * (Math.PI/180)) * Math.sin(latitude2 * (Math.PI/180)) + 
        Math.cos(latitude1 * (Math.PI/180)) * Math.cos(latitude2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
    ) 
    return Math.round(distance)
  }

  return (
    ship.map(
      ({
        shipId,
        shipName,
        shipLat,
        shipLon,
        shipUse,
        speed,
        departTime,
        arrivalTime
      }) => (
        <>
          { !showDetail ?
            <div className="relative mt-[6rem] mr-1 bg-white float-right align-middle w-[50vh] border-4 border-blue-800">
              <div className="relative flex justify-center font-bold text-blue-900 text-xl mt-1">
                <div className="w-[90%] text-center">선박 상세정보</div>
                <IoCloseOutline className="text-3xl float-right flex"
                onClick={() => setShowDetail(!showDetail)}/>
              </div>
              
              <div className="mt-1">
                {ship.map(()=>{
                  return (
                    <ul className="items-center text-lg mx-2">
                      <li className="flex items-center"><SiCodeship className="mr-2"/>MMSI / 선박명 : {shipId} / {shipName}</li>
                      <li className="flex items-center"><BsInfoCircle className="mr-2"/> 현위치 : (위도){shipLat} / (경도){shipLon}</li>
                      <li className="flex items-center"><BsInfoCircle className="mr-2"/>선박용도 : {shipUse}</li>
                      <li className="flex items-center"><BsSpeedometer className="mr-2"/>선박속도 : {speed}m/s</li>
                      <li className="flex items-center"><TiMediaPlay className="mr-2"/>출발시간 : {departTime}</li>
                      <li className="flex items-center"><TiMediaPlayReverse className="mr-2"/>도착예정시간 : {arrivalTime}</li>
                      <li className="flex items-center"><CgTimer className="mr-2"/>
                        인천항과의 거리 : {getDistanceBetweenPoints(shipLat, shipLon, 37.49012631842129, 126.62878763527841)}마일
                      </li>
                    </ul>
                  )
                })}
              </div>
            </div> 
          : null } 
        </>
      )
    )
  )
}

export default Detail
