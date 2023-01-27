
import {React, useEffect, useState} from 'react'
import Navbar from './component/Navbar';
import { Route, Routes, useParams } from 'react-router-dom';

import Content from './component/Content';
import axios from 'axios'
import Info from './pages/Info';




function App() {

 
  const [ship , setShip]  = useState([{
    shipId :"",
    shipName : "",
    shipLat : "",
    shipLon :"",
    takeTime :"",
    shipUse :"",
    speed : "",
    departTime :"",
    arrivalTime :"",
    accuracy : "",
    departure :"",
    arrivalName:""

  }])
 
  
  /* 4시간 삽질해서 얻은 useEffect 먼저 동기화 입니다 */
  useEffect(()=>{
    (async()=>{
      const ship = await axios.get('http://localhost:8080/info');
      setShip(ship.data)
    }) ()
   },[])





  return (
    <div className="position: 'relative'">
      <Navbar ship={ship}/>
     
      
    {/* <Login/> */}
    {/* <div className=' h-20 absoulte z-10 bg-slate-600'>
    <Navbar ship={ship}/>
    </div> */}
   <Routes>
    <Route path='/Info' element={ <Info ship={ship}/>}/>
    <Route path='/ship' element={ 
    <div className='flex'>
      <Content ship={ship}/>
    </div>}/>
    {/*  */}
   </Routes>
   
    </div>
  );
}

export default App;