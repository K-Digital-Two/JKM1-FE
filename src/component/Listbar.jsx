import { React, useState } from "react";
import {AiOutlineLeft, AiOutlineLeftCircle, AiOutlineRight, AiOutlineRightCircle} from 'react-icons/ai'
import { MdOutlineMenuOpen, MdOutlineMenu } from 'react-icons/md'
import ShipList from "./ShipList";

const Listbar = ({ship}) => {

const [open, setOpen] = useState()
const [small, setSmall] = useState()
  return (
   
    <div className="p-5 flex pt-20 z-10 h-screen absolute ">
      <div className={`${open? "w-60" : "w-6"} relative`}>
        {/* 선박 List */}
        { open ? <ShipList ship={ship}/> : null}
        </div>
        {/* Listbar 줄이기 넓히기 */}
       { open ? <MdOutlineMenuOpen
       className={`text-white relative z-5 -ml-7  mt-1 w-7 h-6`} 
       onClick={()=>{setOpen(!open)}}/>
       :
       <MdOutlineMenu
       className={`text-white relative z-5 -ml-7  mt-1 w-10 h-8`} 
       onClick={()=>{setOpen(!open)}}/>}
    </div>
  
    
  );
};

export default Listbar;
