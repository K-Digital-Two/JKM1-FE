import React from 'react'

const ShipList = ({ship}) => {

  return (
    <div className='flex h-full justify-center bg-black bg-opacity-50'>
      <div className='text-white'>
        <h2 className='pt-3 pb-2 flex font-bold text-[30px] '>선박List</h2>
        {ship.map(({shipId,shipName})=>(
          <div className='p-2 text-center text-white hover:text-black hover:text-[20px]' key={shipId}>
          <p className="hover:bg-white">{shipName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShipList