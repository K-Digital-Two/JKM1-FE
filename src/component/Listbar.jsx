import { React, useState } from "react";
import {AiOutlineLeft} from 'react-icons/ai'
import ShipList from "./ShipList";
const Listbar = () => {

const [small, setSmall] = useState()

  return (
    <div className="flex z-10">
      <div className={`${small? "w-24" : "w-72"} list h-560px bg-[#1E293B] relative`}>
        {/* 선박 List */}
        <ShipList/>
        </div>
        <AiOutlineLeft className={`text-white relative z-5 -ml-7  mt-1 w-7 h-6`} onClick={()=>{setSmall(!small)}}/>
        
       
    </div>
  );
};

export default Listbar;
