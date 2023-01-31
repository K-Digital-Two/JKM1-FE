import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import {TiArrowSortedUp, TiArrowSortedDown} from 'react-icons/ti';
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

const [path , setPath]  = useState([{
  
  shipId :"",
  shipLat : "",
  shipLon :""
}])

// 진행률 bar 구현부분 함수 
const bar = ((takeTime)=>(takeTime/150)*100)

 
// 용도에 따른 hover 변경함수
const getColor =
  ((shipUse) => {
    if(shipUse === "선박용예선"){
      return 'bg-emerald-300'
    }
    if(shipUse === "화물선"){
      return 'bg-yellow-300'
    }
    if(shipUse === "유람선"){
      return 'bg-gray-300'
    }
    if(shipUse === "유선"){
      return 'bg-red-300'
    }
    if(shipUse === "컨테이너선박"){
      return 'bg-green-300'
    }
    if(shipUse === "견인용예선"){
      return 'bg-slate-300'
    }
    if(shipUse === "통통배"){
      return 'bg-blue-300'
    }
    if(shipUse === "어선"){
      return 'bg-orange-300'
    }
  }
  )

// console.log(useColor)
// 검색 Search filter링 
const changeShip = ship.filter((item) => item.shipName.includes(correct))

const sorting = (item) => changeShip.sort(function(comp1, comp2) {
  console.log("sorting", item.sort(function(a,b) {
    var comp1UC = a.shipName.toUpperCase();
  var comp2UC = b.shipName.toUpperCase();
  if (comp1UC < comp2UC) {
    return -1;
  } else if (comp1UC > comp2UC) {
    return 1;
  }
  return 0;
  }))
  var comp1UC = comp1.item.toUpperCase();
  var comp2UC = comp2.item.toUpperCase();
  if (comp1UC < comp2UC) {
    return -1;
  } else if (comp1UC > comp2UC) {
    return 1;
  }
  return 0;
})

// Modal 함수
const ModalHandler = (shipId)=>{
  setModalVisibledId(shipId)
}

  return (
    <>
      <div className="z-30 h-[82px] p-5">
        <Combobox className="mx-[28%]">
          <ComboboxInput 
          className="bg-gray-100 text-black p-2 w-[40vw] rounded-md"
          placeholder="🔍 선박명검색"
          onChange={(e) => {
            setCorrect(e.target.value)
          }} />
          <ComboboxPopover>
            <ComboboxList className="absolute z-20 bg-white bg-opacity-80">
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
    <div className="absoulte z-10 pl-48 pt-4 pb-[89px] bg-gray-100">
        <div className="text-4xl">
          List
        </div>
        <p className="text-sm mt-1">
          운항중인 선박만 보여집니다.
        </p>
        <div className="mt-4 h-[670px] w-[1300px] overflow-auto">
        
        <div className="shadow-lg bg-white border-collapse">
          <div className="grid grid-cols-7 text-left sticky top-0 bg-white">
              <div className="px-8 py-4 w-52 flex gap-1 items-center">
                <p>선박명</p>
              <button><TiArrowSortedUp className="hover:bg-slate-100"
                onClick={()=>sorting(changeShip)}
                  />
                <TiArrowSortedDown className="hover:bg-slate-100"
                // onClick={changeShip.sort(function(comp1, comp2) {
                //   // 대/소문자 구분 없이
                //   var comp1UC = comp1.shipName.toUpperCase();
                //   var comp2UC = comp2.shipName.toUpperCase();
                //   if (comp1UC < comp2UC) {
                //     return 1;
                //   } else if (comp1UC > comp2UC) {
                //     return -1;
                //   }
                //   return 0;
                // })}
                  />
                </button></div>
              <div className="px-8 py-4 w-52">선박용도</div>
              <div className="px-8 py-4 w-32">출발지</div>
              <div className="px-8 py-4 w-32">도착지</div>
              <div className="px-8 py-4 w-60">출발시각</div>
              <div className="text-red-600 font-bold px-8 py-4 w-60">도착예정시각</div>
              <div align="center" className="px-8 py-4 w-32">진행률</div>
            </div>
            <hr className="border-b-2 border-[#06283D] text-left sticky top-14 w-[1282px]"/>

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
                <div className="grid grid-cols-7 border text-left hover:bg-[#DFF6FF]"
                key={shipId}
                onClick={()=>{ 
                  setModalClick(modalClick)
                  ModalHandler(shipId)}}> 
                    <div className="px-8 py-4 hover:bg--50">{shipName}</div>
                    <div className="px-8 py-4 w-52">{shipUse}</div>
                    <div className="px-8 py-4 w-32">{departure}</div>
                    <div className="px-8 py-4 w-32">{arrivalName}</div>
                    <div className="px-8 py-4 w-60">{departTime}</div>
                    <div className="font-bold px-8 py-4 w-60">{arrivalTime}</div>
                    <div className="px-8 py-4 w-32">
                    <div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                      <div className={`flex flex-col justify-center overflow-hidden ${getColor(shipUse)} text-xs text-white text-center`} 
                      role="progressbar" 
                      aria-valuenow="57"
                      style={{width : Math.round(takeTime/150)*100 }} 
                      aria-valuemin="0" 
                      aria-valuemax="100">{Math.round(takeTime/150)*100}</div>
                      </div>
                    </div>
                    <div className="col-span-7 font-bold">
                <Modal 
                  shipId={shipId} shipLat={shipLat} shipLon={shipLon}
                  modalVisibledId={modalVisibledId} takeTime={takeTime}
                  shipName={shipName} speed={speed} accuracy={accuracy}
                  arrivalName={arrivalName} departure={departure}
                  modalClick={modalClick} setModalClick={setModalClick} shipUse={shipUse} arrivalTime={arrivalTime} departTime={departTime} 
                  setSlideMap={setSlideMap}/></div>
                  </div>
                  </>
            )
          )}
        </div>
        
        {slideMap === true ? <ShipMap/> : null}
        </div>
      </div>
    </>
  );
};

// <tr className="hover:bg-red-300">
// <tr className="hover:bg-yellow-300">
// <tr className="hover:bg-blue-300">
// <tr className="hover:bg-green-300">
// <tr className="hover:bg-slate-300">
// <tr className="hover:bg-orange-300">
//<tr className="hover:bg-gray-300">
//<tr className="hover:bg-emerald-300">

export default Info;