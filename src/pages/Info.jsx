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
        const ship = await axios.get(`http://10.125.121.170:8080/log/${timeGroup}`)
        setShip(ship.data)
      })()
      .catch(()=>{
        setSignal(console.log("데이터못불러옴"))
      })
    },1000)
    return () =>{
      clearInterval(interval)
    } 
  }, [ship])

  const [modalClick , setModalClick] = useState(0) 
  const [checkChange, setCheckChange] = useState(0) 
  const [modalVisibledId, setModalVisibledId ] = useState("")
  const [slideMap, setSlideMap] = useState(false)
  const [correct, setCorrect] = useState("");
  const [dTime, setdTime] = useState('');
  const [aTime, setaTime] = useState('');
  const [sorted, setSorted] = useState()

  // 검색 Search filter링 
  const changeShip = ship.filter((item) => (item.shipName.includes(correct) 
    && (dTime==='' ? true : item.departTime >= dTime)
    && (aTime==='' ? true : item.arrivalTime <= aTime)
  ))

  // 기본정렬(오름차순 정렬)
  const ascSorting = (item,) => item.sort(function(comp1, comp2) {
    var comp1UC = comp1.arrivalTime.toUpperCase()
    var comp2UC = comp2.arrivalTime.toUpperCase()
    if (comp1UC < comp2UC) {
      return -1
    } else if (comp1UC > comp2UC) {
      return 1
    }
    return 0
  })

  // 내림차순 정렬
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
    <div className="h-screen bg-gray-100 bg-ship-screen op">
      {/* 검색 콤보박스 */}
      <div className="h-[82px] flex justify-center p-5">
        <Combobox>
          <ComboboxInput 
            className="bg-gray-100 text-black p-2 w-[30vw] rounded-md absolute z-30"
            placeholder="🔍 선박명검색"
            onChange={(e) => {
              setCorrect(e.target.value)
              setCheckChange(e.target.value)
            }} />
          <ComboboxPopover>
            <ComboboxList className="absolute bg-white bg-opacity-80">
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

      {/* 리스트 상단 */}
      <div className="px-[15%] pt-6">
        <div className="flex justify-between pl-[3%] pr-[10%] items-center">
          <div className="text-5xl font-bold">List</div>
          
          {/* 출발날짜/시각 필터 */}
          <div>
            <Combobox>
              <ComboboxInput 
                className="bg-gray-50 text-black p-2 w-[20vw] rounded-md"
                placeholder="출발날짜/시각(YYYY-MM-DD hh:mm:ss)"
                onChange={(e) => {
                  setdTime(e.target.value)
                  setCheckChange(e.target.value)
                }}/>
            </Combobox>
          </div>

          {/* 도착예정날짜/시각 필터 */}
          <div>
            <Combobox>
              <ComboboxInput 
                className="bg-gray-50 text-black p-2 w-[20vw] rounded-md"
                placeholder="도착예정날짜/시각(YYYY-MM-DD hh:mm:ss)"
                onChange={(e) => {
                  setaTime(e.target.value)
                  setCheckChange(e.target.value)
                }}/>
            </Combobox>
          </div>
        </div>

      {/* 리스트 목록 출력 부분 */}
        <div className="mt-4 h-[60vh] min-w-[1200px] overflow-auto z-50">
          <div className="shadow-lg bg-white border-collapse">
            <div className="grid grid-cols-7 border-b-2 border-[#06283D] text-left items-center sticky top-0 bg-white">
              <div className="px-8 py-4 w-52">선박명</div>
              <div className="px-8 py-4 w-52">선박용도</div>
              <div className="px-8 py-4 w-32">출발지</div>
              <div className="px-8 py-4 w-32">도착지</div>
              <div className="px-8 py-4 w-60">출발시각</div>
              <div className="text-red-600  px-8 py-4 w-52 flex gap-1 items-center">
                <p>도착예정시각</p>
                {/* 정렬버튼 */}
                <button>
                  <TiArrowSortedUp className="hover:bg-slate-100"
                    onClick={()=>setSorted(false)}/>
                  <TiArrowSortedDown className="hover:bg-slate-100"
                    onClick={()=>setSorted(true)}/>
                </button>
              </div>
              <div align="center" className="px-8 py-4 w-32">상태</div>
            </div>

            {/* 실시간 데이터 출력 */}
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
                        // 운행중일시 이미지가 깜빡이며 표시
                        className={`${status === 0 ? "animate-flash2" : "null"} w-[25px] h-[25px] ml-9`}/>
                    </div>
                    <div className="col-span-7 font-bold">
                      {ship ? <Modal 
                        shipId={shipId} shipLat={shipLat} shipLon={shipLon}
                        modalVisibledId={modalVisibledId} takeTime={takeTime}
                        shipName={shipName} speed={speed} accuracy={accuracy}
                        arrivalName={arrivalName} departure={departure}
                        modalClick={modalClick} ModalHandler={ModalHandler} setModalClick={setModalClick} 
                        shipUse={shipUse} arrivalTime={arrivalTime} departTime={departTime} 
                        setSlideMap={setSlideMap}/> : null}
                    </div>
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
                  <div className="grid grid-cols-7 border text-left hover:bg-[#DFF6FF]">
                    <div className="px-8 py-4"
                      key={shipId}
                      onClick={()=>{ 
                        setModalClick(modalClick)
                        ModalHandler(shipId)}}>{shipName}</div>
                    <div className="px-8 py-4">{shipUse}</div>
                    <div className="px-8 py-4">{departure}</div>
                    <div className="px-8 py-4 w-32">{arrivalName}</div>
                    <div className="px-8 py-4 w-60">{departTime}</div>
                    <div className="font-bold px-8 py-4 w-60">{arrivalTime}</div>
                    <div className="px-8 py-4 w-32">
                      <img src={L1} alt="운행중"
                      // 운행중일시 이미지가 깜빡이며 표시
                        className={`${status === 0 ? "animate-flash2" : "null"} w-[25px] h-[25px] ml-9`}/>
                    </div>
                    <div className="col-span-7 font-bold">
                      <Modal 
                        shipId={shipId} shipLat={shipLat} shipLon={shipLon}
                        modalVisibledId={modalVisibledId} takeTime={takeTime}
                        shipName={shipName} speed={speed} accuracy={accuracy}
                        arrivalName={arrivalName} departure={departure}
                        modalClick={modalClick} ModalHandler={ModalHandler} setModalClick={setModalClick} 
                        shipUse={shipUse} arrivalTime={arrivalTime} departTime={departTime} 
                        setSlideMap={setSlideMap}/>
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info