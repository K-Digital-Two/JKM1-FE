import React, { useState, useEffect } from "react";
import {TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import axios from "axios";
import Modal from "../component/Modal";
import L1 from '../img/m10.png'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";



const Info = ({ timeGroup }) => {

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
        const ship = await axios.get(
          `http://localhost:8080/log/${timeGroup}`);
        setShip(ship.data);
        // console.log(changePath)
        // console.log(timeGroup)
        // console.log(ship)
      })()
    })
    return () =>{
      clearInterval(interval)
    } 
  },[ship])
  
const [modalClick , setModalClick] = useState(0) 
const [checkChange, setCheckChange] = useState(0) 
const [modalVisibledId, setModalVisibledId ] = useState("")
const [slideMap, setSlideMap] = useState(false)
const [correct, setCorrect] = useState("");
const [dTime, setdTime] = useState('');
const [aTime, setaTime] = useState('');
const [sorted, setSorted] = useState()

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


// 검색 Search filter링 
const changeShip = ship.filter((item) => (item.shipName.includes(correct) 
&& (dTime==='' ? true : item.departTime >= dTime)
&& (aTime==='' ? true : item.arrivalTime <= aTime)
))


const ascSorting = (item,) => item.sort(function(comp1, comp2) {
  var comp1UC = comp1.arrivalTime.toUpperCase();
  var comp2UC = comp2.arrivalTime.toUpperCase();
  if (comp1UC < comp2UC) {
    return -1;
  } else if (comp1UC > comp2UC) {
    return 1;
  }
  return 0;
})

const descSorting = (item,) => item.sort(function(comp1, comp2) {
  var comp1UC = comp1.arrivalTime.toUpperCase();
  var comp2UC = comp2.arrivalTime.toUpperCase();
  if (comp1UC < comp2UC) {
    return 1;
  } else if (comp1UC > comp2UC) {
    return -1;
  }
  return 0;
})


// Modal 함수
const ModalHandler = (shipId)=>{
  setModalVisibledId(shipId)
}








  return (
    <div className="h-screen bg-gray-100">
      <div className="h-[82px] flex justify-center p-5">
        <Combobox className="">
          <ComboboxInput 
          className="bg-gray-100 text-black p-2 w-[30vw] rounded-md absolute z-30"
          placeholder="🔍 선박명검색"
          // value={this.state.shipName}
          onChange={(e) => {
            setCorrect(e.target.value)
            setCheckChange(e.target.value)
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
      <div className="px-[15%] pt-6 bg-gray-100 ">
        <div className="flex justify-between pl-[3%] pr-[10%] items-center">
          <div className="text-5xl font-bold">List</div>
          <div>
            <Combobox>
              <ComboboxInput 
                className="bg-gray-50 text-black p-2 w-[20vw] rounded-md"
                placeholder="출발날짜/시각(YYYY-MM-DD hh:mm:ss)"
                onChange={(e) => {
                  setdTime(e.target.value)
                  setCheckChange(e.target.value)
                }} />
            </Combobox>
          </div>
          <div>
            <Combobox>
              <ComboboxInput 
                className="bg-gray-50 text-black p-2 w-[20vw] rounded-md"
                placeholder="도착날짜/시각(YYYY-MM-DD hh:mm:ss)"
                onChange={(e) => {
                  setaTime(e.target.value)
                  setCheckChange(e.target.value)
                }} />
          </Combobox>
        </div>
        </div>
          <div className="mt-4 h-[60vh] min-w-[1200px] overflow-auto">
          <div className="shadow-lg bg-white border-collapse">
            <div className="grid grid-cols-7 border-b-2 border-[#06283D] text-left items-center sticky top-0 bg-white">
                <div className="px-8 py-4 w-52">선박명</div>
                <div className="px-8 py-4 w-52">선박용도</div>
                <div className="px-8 py-4 w-32">출발지</div>
                <div className="px-8 py-4 w-32">도착지</div>
                <div className="px-8 py-4 w-60">출발시각</div>
                <div className="text-red-600  px-8 py-4 w-52 flex gap-1 items-center">
                  <p>도착예정시각</p>
                <button><TiArrowSortedUp className="hover:bg-slate-100"
                  onClick={()=>setSorted(false)
                  } />
                  <TiArrowSortedDown className="hover:bg-slate-100"
                  onClick={()=>setSorted(true)
                  } />
                  </button></div>
                <div align="center" className="px-8 py-4 w-32">상태</div>
              </div>

            {sorted || checkChange ? descSorting(changeShip).map(
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
                arrivalName,
                status
              }) => (
                <>
                  <div className="grid grid-cols-7 border text-left hover:bg-[#DFF6FF]"> 
                      <div className="px-8 py-4 hover:bg-gray-50"
                        key={shipId}
                        onClick={()=>{ 
                          setModalClick(modalClick)
                          ModalHandler(shipId)}}>{shipName}</div>
                      <div className="px-8 py-4 w-52">{shipUse}</div>
                      <div className="px-8 py-4 w-32">{departure}</div>
                      <div className="px-8 py-4 w-32">{arrivalName}</div>
                      <div className="px-8 py-4 w-60">{departTime}</div>
                      <div className="font-bold px-8 py-4 w-60">{arrivalTime}</div>
                      <div className="px-8 py-4 w-32">
                        <img src={L1} alt="운행중"
                        className={`${status === 0 ? "animate-flash2" : "null"} w-[25px] h-[25px] ml-9`}/>
                        </div>
                      <div className="col-span-7 font-bold">

                  <Modal 
                    shipId={shipId} shipLat={shipLat} shipLon={shipLon}
                    modalVisibledId={modalVisibledId} takeTime={takeTime}
                    shipName={shipName} speed={speed} accuracy={accuracy}
                    arrivalName={arrivalName} departure={departure}
                    modalClick={modalClick} ModalHandler={ModalHandler} setModalClick={setModalClick} shipUse={shipUse} arrivalTime={arrivalTime} departTime={departTime} 
                    setSlideMap={setSlideMap}/></div>
                    </div>
                    </>
              )
            ) : ascSorting(changeShip).map(
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
                arrivalName,
                status
              }) => (
                <>
                  <div className="grid grid-cols-7 border text-left hover:bg-[#DFF6FF]"
                  
                  >
                      <div className="px-8 py-4"
                      key={shipId}
                  onClick={()=>{ 
                    setModalClick(modalClick)
                    ModalHandler(shipId)}}> {shipName}</div>
                      <div className="px-8 py-4">{shipUse}</div>
                      <div className="px-8 py-4">{departure}</div>
                      <div className="px-8 py-4 w-32">{arrivalName}</div>
                      <div className="px-8 py-4 w-60">{departTime}</div>
                      <div className="font-bold px-8 py-4 w-60">{arrivalTime}</div>
                      <div className="px-8 py-4 w-32">
                        <img src={L1} alt="운행중"
                        className={`${status === 0 ? "animate-flash2" : "null"} w-[25px] h-[25px] ml-9`}/>
                        </div>
                      <div className="col-span-7 font-bold">

                  <Modal 
                    shipId={shipId} shipLat={shipLat} shipLon={shipLon}
                    modalVisibledId={modalVisibledId} takeTime={takeTime}
                    shipName={shipName} speed={speed} accuracy={accuracy}
                    arrivalName={arrivalName} departure={departure}
                    modalClick={modalClick} ModalHandler={ModalHandler} setModalClick={setModalClick} shipUse={shipUse} arrivalTime={arrivalTime} departTime={departTime} 
                    setSlideMap={setSlideMap}/></div>
                    </div>
                    </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
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