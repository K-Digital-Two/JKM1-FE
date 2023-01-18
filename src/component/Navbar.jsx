import React from 'react'
import {BiSearch} from 'react-icons/bi'
import simg from '../img/ship.png'
import Logo from '../img/logo.PNG'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

const navigate = useNavigate()
  return (
    <div className='p-2'>
        <form className='flex items-center'>
          {/* 로고 버튼 누르면 홈으로 */}
          <img src={simg} alt="로고" className="w-[50px] ml-1" onClick={()=>{navigate('/')}}/> 
          <img src={Logo} alt="제목" className='hidden xl:flex sm:flex w-[150px] h-[35px] ml-3'/> 
          <label className='hidden lg:flex font-medium'>
            <input type='text' 
            placeholder="Search" 
            className=' rounded-full border border-3 z-10 w-[30rem] h-[2rem] ml-96 bg-gray-200 font-bold'/>
            <button onClick={()=>{navigate('/Listbar')}} className='z-20 -m-5'>
            <BiSearch className='text-[20px]'/>
            </button>
          </label>
        </form>
        
    </div>




  )
}

export default Navbar