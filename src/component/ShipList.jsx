import React from 'react'

const ShipList = ({ship}) => {

  return (
    <div className='flex justify-center'>
      <div className='text-white space-y-7 '>
        <h2 className='flex font-bold text-[30px] '>선박List</h2>
        {ship.map(({shipId, shipCode, shipName, shipUse})=>(
          <div className='text-white' key={shipId}>
          <p className="hover:bg-black ">선박명 : {shipName}</p>
          </div>
        ))}



      </div>
      </div>
  )
}

export default ShipList