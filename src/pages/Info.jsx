import React, { useState } from "react";
import {useNavigate } from "react-router-dom";

import ShipMap from './ShipMap'
import Modal from "../component/Modal";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";


const Info = ({ ship }) => {
  
const [modalClick , setModalClick] = useState(0)  
const [modalVisibledId, setModalVisibledId ] = useState("")
const [slideMap, setSlideMap] = useState(false)
const [correct, setCorrect] = useState("");
const [color, setColor] = useState(['blue', 'red', 'yellow','green'])
const [path , setPath]  = useState([{
  
  shipId :"",
  shipLat : "",
  shipLon :""
}])

// 진행률 bar 구현부분 함수 
const bar = ship.map(({takeTime})=>
  (takeTime/150)*100
)
 
// 용도에 따른 hover 변경함수
// const useColor =
//   ship.map(({shipUse}) => {
//     if(shipUse === "선박용예선"){
//       return 'black'
//     }
//     if(shipUse === "화물선"){
//       return 'yellow'
//     }
//     if(shipUse === "유람선"){
//       return 'gray'
//     }
//   }
//   )

// console.log(useColor)
// 검색 Search filter링 
const changeShip = ship.filter((item) => item.shipName.includes(correct))

// Modal 함수
const ModalHandler = (shipId)=>{
  setModalVisibledId(shipId)
}

  return (
    <>
      <div className="container flex justify-center mx-auto">
      <Combobox className="">
        <ComboboxInput 
        className="bg-gray-200 text-black p-1 w-[30vw]"
        placeholder="선박명검색"
        onChange={(e) => {
          setCorrect(e.target.value)
        }} />
        <ComboboxPopover>
          <ComboboxList className="z-20">
            {changeShip.map(({shipName,shipId})=>{
              const str = `${shipName}`
              return <ComboboxOption 
              key={shipId}
              value={str}/>
            })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
      <div className="flex items-center justify-center mt-4 w-auto ">
        <table className="shadow-lg bg-white border-collapse table-auto">
          <tr className="">
            <th align="right" className="bg-blue-100 border text-left px-6 py-2">선박명</th>
            <th align="right" className="bg-blue-100 border text-left px-6 py-2">선박용도</th>
            <th align="center" className="bg-blue-100 border text-left px-6 py-2">출발지</th>
            <th align="center" className="bg-blue-100 border text-left px-6 py-2">도착지</th>
            <th align="center" className="bg-blue-100 border text-left px-6 py-2">출발시각</th>
            <th align="center" className="text-red-600 font-bold bg-blue-100 border text-left px-6 py-2">도착예정시각</th>
            <th align="center" className="bg-blue-100 border text-left px-6 py-2">진행률</th>
          </tr>

          {changeShip.map(
            ({
              shipId,
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
              arrivalName
            }) => (
             <tbody key={shipId} className="">
                <tr className="relative">
                  <th align="center" 
                  className="border px-8 py-4 hover:bg-blue-200 "
                  onClick={()=>{
                    ModalHandler(shipId)
                    setModalClick(modalClick === 1)
                  }}>{shipName}</th>
                  <td align="center" className={`border px-8 py-4 hover:${color}`}>{shipUse}</td>
                  <td align="center" className="border px-8 py-4 ">{departure}</td>
                  <td align="center" className="border px-8 py-4">{arrivalName}</td>
                  <td align="center" className="border px-8 py-4 ">{departTime}</td>
                  <td align="center" className="font-bold border px-8 py-4 text-red-600">{arrivalTime}</td>
                  <td align="center" className="border px-8 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className=" flex flex-col justify-center overflow-hidden bg-blue-500 text-xs text-white text-center"
                    aria-valuenow="" aria-valuemin="0" aria-valuemax="100"
                    style={{width : {}}}></div>
                  </div>
                  </td>
                </tr>
                <Modal 
                  shipId={shipId} shipLat={shipLat} shipLon={shipLon}
                  modalVisibledId={modalVisibledId} takeTime={takeTime}
                  shipName={shipName} speed={speed} accuracy={accuracy}
                  modalClick={modalClick} setModalClick={setModalClick} shipUse={shipUse} arrivalTime={arrivalTime} departTime={departTime} 
                  setSlideMap={setSlideMap}/>
                  </tbody>
            )
          )}
        </table>
        {slideMap === true ? <ShipMap/> : null}
        </div>
     
    </>
  );
};

export default Info;
