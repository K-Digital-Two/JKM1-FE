import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShipList = ({ship}) => {

 let navigate = useNavigate()
  return (
    <div className='flex justify-center'>
      <div className='text-white space-y-7 '>
        <h2 className='flex font-bold text-[30px] -ml-4'>선박List</h2>
        {ship.map(({shipId,shipName})=>(
          <div className='text-white' key={shipId}>
          <p className="hover:bg-white hover:text-black text-white" onClick={()=>{
           navigate(`/detail/${shipId}`)
          }}>{shipName}</p>
          </div>
        ))}



      </div>
      </div>
  )
}

export default ShipList