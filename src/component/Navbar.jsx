import React from 'react'
import Logo from '../img/ship.png'

import {TbList, TbMapPins, TbHome} from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



const Navbar = ({ship}) => {


  const navigate = useNavigate() 
  const [homeClick, setHomeClick] = useState(0)
  const [listClick ,setListClick] = useState(0)
  const [mapClick, setMapClick] = useState(0)



  return (
    <>
      <div className='flex py-4 px-6 items-center absolute z-20 bg-white '>
        <img src={Logo} 
        alt="로고"
        className="w-[50px] h-[50px] mx-2 animate-flash" />
        <p className='font-bold text-[30px] italic animate-swing'>ShipTraffic.live</p>
      </div>
      <div className='w-28 h-screen pt-[90px] absolute z-10 bg-[#06283D]'>
          <ul className='ml-1.5 mt-1  text-[#DFF6FF]' >
          <li className='group' onClick={()=>
              {navigate('/')
              setHomeClick(1)
              setListClick(0)
              setMapClick(0)
              }}>
              <button className={`text-sm h-24 w-24 group-hover:bg-[#06151e]
              ${homeClick === 1 ? "border-l-2 border-[#47B5FF] bg-[#06151e] " :null}`}>
                <TbHome className={`mx-auto h-12 w-12 stroke-[#DFF6FF] group-hover:stroke-[#256D85]
                ${homeClick === 1? "stroke-[#47B5FF]" : null}`}/>
                Home
              </button>
            </li>
            <li className='group' onClick={()=>
              {navigate('/info')
              setListClick(1)
              setMapClick(0)
              setHomeClick(0)
              }}>
              <button className={`text-sm h-24 w-24 group-hover:bg-[#06151e]
              ${listClick === 1 && homeClick=== 0 ? "border-l-2 border-[#47B5FF] bg-[#06151e] " :null}`}>
                <TbList className={`mx-auto h-12 w-12 stroke-[#DFF6FF] group-hover:stroke-[#256D85]
                ${listClick === 1? "stroke-[#47B5FF]" : null}`}/>
                List
              </button>
            </li>
            <li className='group' onClick={()=>{
              navigate('/TotalMap')
              setMapClick(1)
              setListClick(0)
              setHomeClick(0)
             }}>
              <button className={`text-sm h-24 w-24 group-hover:bg-[#06151e]
              ${mapClick === 1 ? " border-l-2 border-[#47B5FF] bg-[#06151e]" : null}`}>
                <TbMapPins className={`mx-auto h-12 w-12 stroke-[#DFF6FF] group-hover:stroke-[#256D85]
               ${mapClick === 1 ? "stroke-[#47B5FF]" : null}`}/>
                Map
              </button>
            </li>
          </ul>
        </div>
    </>
  )
}

export default Navbar