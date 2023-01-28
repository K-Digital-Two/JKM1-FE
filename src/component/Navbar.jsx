import React from 'react'
import Logo from '../img/ship.png'
import Tlogo from '../img/logo.png'

import {AiOutlineUnorderedList} from 'react-icons/ai'
import {GrMapLocation} from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

const Navbar2 = ({ship}) => {

  // Link 사용하는 React 훅
 const navigate = useNavigate() 

  return (
      <div className='flex items-center justify-between px-2'>
        <img src={Logo} alt="로고"  className="w-[50px] h-[50px] ml-2" />
        {/* <img src={Tlogo} alt="로고제목" className='hidden mt-2 xl:flex sm:flex w-[150px] h-[35px] ml-3'/> */}
        <div className=''>
          <ul className='flex items-center gap-9 lg:gap-10'>
            <li onClick={()=>{navigate('/info')}}>
              <AiOutlineUnorderedList className='navbtn'/>
              <p className='hidden lg:flex text-[25px]'>리스트 보기</p>
            </li>
            <li onClick={()=>{navigate('/TotalMap')}}>
              <GrMapLocation className='navbtn'/>
              <p className='hidden lg:flex text-[25px]'>지도 보기</p>
            </li>
          </ul>
        </div>
        <div>
          <div>
        
          </div>
        </div>
      </div>
  )
}

export default Navbar2