import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotPage = () => {

  const navigate = useNavigate()
  return (
    <div className='h-screen overflow-auto absolute'>
    <div className="z-10 bg-white h-[82px] sticky top-0"/>
    {/* 배너화면 */}
   
    <div className="pt-20 pb-[89px] w-screen h-[100vh] text-[#06283D] text-xl space-y-10">
      <div className='flex gap-40 justify-center'>
        <p className='text-[30px]'>접근권한이 없습니다</p>
      </div>
      <div className='flex gap-40 justify-center'>
        <p className='text-[30px]'>로그인 후 이용하세요</p>
      </div>
      <div className='flex gap-40 justify-center'>
        <button onClick={()=>{navigate('/login')}}>로그인</button>
        <button onClick={()=>{alert('준비중입니다')}}>회원가입</button>
      </div>
    </div>
    <div className='w-screen h-[100vh] bg-gray-200 py-16'>
   
    </div>
  </div>
  )
}

export default NotPage