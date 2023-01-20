
import React from 'react'
import {BiSearch} from 'react-icons/bi'
import simg from '../img/ship.png'
import Logo from '../img/logo.PNG'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  

const navigate = useNavigate()
  return (
    <div className='p-2 bg-blue-200'>
        <form className='flex items-center'>
          {/* 로고 버튼 누르면 홈으로 */}
          <img src={simg} alt="로고" className="w-[50px] ml-1" onClick={()=>{navigate('/')}}/> 
          <p 
          className='text-[30px] font-bold ml-3 hidden xl:flex sm:flex'
          onClick={()=>{navigate('/Login')}} >
            ShipTraffic.live</p>
          <label className='flex font-medium items-center  ml-auto mr-auto ' >
            <input type='text' 
            placeholder="Search" 
            className='rounded-full z-10 lg:w-[30rem] lg:h-[2rem] sm:w-[15rem] pl-5 bg-gray-200 font-bold'/>
            <button onClick={()=>{navigate('/Listbar')}} className='z-20 -m-10'>
            <BiSearch className='text-[20px]'/>
            </button>
          </label>
        </form>
        
    </div>




  )
}

export default Navbar



