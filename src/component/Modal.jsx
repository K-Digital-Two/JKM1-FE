import {React, useState} from 'react'
import MiniMap from '../pages/MiniMap'
import Detail from './Detail'
import {GrClose} from 'react-icons/gr'

const Modal = ({shipId,
  shipName,
  shipLat,
  shipLon,
  takeTime,
  departure,
  speed,
  departTime,
  arrivalTime,
  arrivalName, modalVisibledId, modalClick, setModalClick,setSlideMap}) => {

 


  return (
  <>
    {modalVisibledId === shipId && !modalClick ? 
      <div className='flex'>
        <MiniMap shipId={shipId} setSlideMap={setSlideMap}/> 
        <ul className='ml-3 mx-auto my-auto space-y-3'>
          <li>선박명</li>
          <li>{shipName}</li>
          <li className='pt-2'>현재위치</li>
          <li>{`(위도)${shipLat}`}</li>
          <li>{`(경도)${shipLon}`}</li>
          
        </ul>
        <ul className='ml-2 text-[15px] space-y-3 mx-auto my-auto'>
          <li>출발지 / 출발시간</li>
          <li>{`${departure} / ${departTime}`}</li>
          <li className='py-2'>....🚢....</li>
          <li>도착예정시간</li>
          <li>{`${arrivalName} / ${arrivalTime}`}</li>
        </ul>
        <ul className='ml-3 mx-auto my-auto space-y-3'>
          <li>선박속도</li>
          <li>{speed}</li>
          <li className='pt-10'>소요시간</li>
          <li className='pb-4'>{`${takeTime}분`}</li>
        </ul>
        <GrClose onClick={()=>
          setModalClick(modalClick)}/>
        </div> 
        : null}
        
    </>
  )
}

export default Modal