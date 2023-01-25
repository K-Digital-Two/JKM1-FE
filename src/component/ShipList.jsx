import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ShipList = ({ship}) => {

  const navigate = useNavigate()
  return (


    <div className='flex justify-center'>
      <div className='text-white'>
        <h2 className='pt-3 pb-2 flex font-bold text-[30px] '>선박List</h2>
        {ship.map(({shipId,shipName})=>(
          <div className='p-2 text-center text-white hover:text-black hover:text-[20px]' key={shipId}>
          <p className="hover:bg-white"
               onClick={() => navigate(`/detail/${shipId}`)}>{shipName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShipList