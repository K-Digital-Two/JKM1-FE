import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useState } from "react";
import { useEffect } from "react";

const Input = ({ ship }) => {


  const [correct, setCorrect] = useState("");
  
  // Filter 함수 이용해서 correct(e.target.value)값이 shipName을 포함하는 배열 생성
  const changeShip = ship.filter((item) => item.shipName.includes(correct))

  // correct state가 변경될때 마다
  useEffect(() => {
    console.log(correct)
  }, [correct]);

  return (
    <div className="">
      <Combobox className="">
        <ComboboxInput type="text-white" onChange={(e) => {
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
  );
};

export default Input;
