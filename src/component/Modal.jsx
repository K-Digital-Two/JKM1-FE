import {React, useState} from 'react'
import MiniMap from '../pages/MiniMap'
import Detail from './Detail'
import {GrClose} from 'react-icons/gr'

const Modal = ({shipId,
  shipName,
  shipLat,
  shipLon,
  takeTime,
  shipUse,
  speed,
  departTime,
  arrivalTime,
  accuracy,
  departure,
  arrivalName, modalVisibledId, modalClick, setModalClick, setSlideMap}) => {

 


  return (
  <>
    { modalVisibledId === shipId && !modalClick ? 
      <div className='flex flex-row border-y-4 border-separate font-bold max-w-fit'>
        <MiniMap shipId={shipId} setSlideMap={setSlideMap}/> 
        <ul className='ml-2 text-[15px] space-y-3 mx-auto my-auto'>
          <li>출발시간</li>
          <li>{departTime}</li>
          <span>....🚢....</span>
          <li>도착예정시간</li>
          <li>{arrivalTime}</li>
        </ul>
        <ul className='ml-3 mx-auto my-auto space-y-3'>
          <li>선박명</li>
          <li>{shipName}</li>
          <li>현재위치</li>
          <li>{`(위도)${shipLat} / (경도)${shipLon}`}</li>
        </ul>
        <GrClose onClick={()=>{setModalClick(!modalClick)}}/>
        </div> 
        : null}
        
    </>
  )
}

export default Modal