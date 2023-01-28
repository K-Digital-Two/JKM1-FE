import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../component/Input";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import axios from "axios";


const Info = ({ ship }) => {
  

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
const useColor =
  ship.map(({shipUse}) => {
    if(shipUse === "선박용예선"){
      return 'black'
    }
    if(shipUse === "화물선"){
      return 'yellow'
    }
    if(shipUse === "유람선"){
      return 'gray'
    }
  }
  )

console.log(useColor)
// 검색 Search filter링 
const changeShip = ship.filter((item) => item.shipName.includes(correct))



const navigate = useNavigate()
  return (
    <>
      <div className="flex items-center justify-center">
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
      <div className="flex items-center justify-center mt-4">
        <table className="shadow-lg bg-white border-collapse ">
          <tr>
            <th align="right" className="bg-blue-100 border text-left px-8 py-4">선박명</th>
            <th align="right" className="bg-blue-100 border text-left px-8 py-4">선박용도</th>
            <th align="center" className="bg-blue-100 border text-left px-8 py-4">출발지</th>
            <th align="center" className="bg-blue-100 border text-left px-8 py-4">도착지</th>
            <th align="center" className="bg-blue-100 border text-left px-8 py-4">출발시각</th>
            <th align="center" className="text-red-600 font-bold bg-blue-100 border text-left px-8 py-4">도착예정시각</th>
            <th align="center" className="bg-blue-100 border text-left px-8 py-4">진행률</th>
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
              <>
                <tr>
                  <th align="cneter" 
                  className="border px-8 py-4 hover:bg-blue-200"
                  onClick={()=>{
                    navigate(`/shipMap/${shipId}`)
                  }}>{shipName}</th>
                  <th align="center" className={`border px-8 py-4 hover:${color}`}>{shipUse}</th>
                  <th align="center" className="border px-8 py-4">{departure}</th>
                  <th align="center" className="border px-8 py-4">{arrivalName}</th>
                  <th align="center" className="border px-8 py-4">{departTime}</th>
                  <th align="center" className="font-bold border px-8 py-4">{arrivalTime}</th>
                  <th align="center" className="border px-8 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className=" flex flex-col justify-center overflow-hidden bg-blue-500 text-xs text-white text-center"
                    aria-valuenow="" aria-valuemin="0" aria-valuemax="100"
                    style={{width : {}}}></div>
                  </div></th>
                </tr>
              </>
            )
          )}
        </table>
        </div>
     
    </>
  );
};

export default Info;
