import { React, useState } from "react";
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import ShipList from "./ShipList";

const Listbar = ({ship}) => {

const [open, setOpen] = useState()
const [small, setSmall] = useState()
  return (
    
    <div className="flex z-20 h-screen">
      <div className={`${open? "w-72" : "w-6"} list h-560px bg-[#1E293B] opacity-80 relative`}>
        {/* 선박 List */}
        { open ? <ShipList ship={ship}/> : null}
        </div>
        {/* Listbar 줄이기 넓히기 */}
        { open ? <AiOutlineLeft
        className={`text-white relative z-5 -ml-7  mt-1 w-7 h-6`} 
        onClick={()=>{setOpen(!open)}}/>
        :
        <AiOutlineRight
        className={`text-white relative z-5 -ml-7  mt-1 w-7 h-6`} 
        onClick={()=>{setOpen(!open)}}/>}
    </div>
  
    
  );
};

export default Listbar;