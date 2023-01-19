import { React, useState } from "react";
import {AiOutlineLeft} from 'react-icons/ai'
import ShipList from "./ShipList";

const Listbar = ({ship}) => {

const [open, setOpen] = useState()

  return (
    <div className="flex z-10 h-screen">
      <div className={`${open? "w-72" : "w-24"} list h-560px bg-[#1E293B] relative`}>
        {/* 선박 List */}
        <ShipList ship={ship}/>
        </div>
        <AiOutlineLeft 
        className={`text-white relative z-5 -ml-7  mt-1 w-7 h-6`} 
        onClick={()=>{setOpen(!open)}}/>
        
       
    </div>
  );
};

export default Listbar;
