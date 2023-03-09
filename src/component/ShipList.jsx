import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShipList = ({ship , handleActiveMarker}) => {

  const navigate = useNavigate()
  return (


    <div className='flex justify-center'>
      <div>
        <h2 className='pt-3 pb-2 flex text-[#47B5FF] font-bold text-2xl justify-center'>선박List</h2>
        {ship.map(({shipId,shipName})=>(
          <div className='p-2 text-center text-white hover:text-black hover:text-[20px]' key={shipId}>
          <p className="hover:bg-white"
               onClick={() => handleActiveMarker(shipId)}>{shipName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShipList