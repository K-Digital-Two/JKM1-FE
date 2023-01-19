
import {React, useEffect, useState} from 'react'
import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import Detail from './component/Detail';
import Content from './component/Content';
import axios from 'axios'
import Login from './login/Login';


function App() {

  
  const [ship , setShip]  = useState([{
    shipId :"",
    shipName : "",
    shipLat : "",
    shipLon :"",
    takeTime :""
  }])
 
  
  /* 4시간 삽질해서 얻은 useEffect 먼저 동기화 입니다 */
  useEffect(()=>{
    (async()=>{
      const ship = await axios.get('http://localhost:8080/summary');
      setShip(ship.data)
    }) ()
   },[])


  return (
    <div className="">
    {/* <Login/> */}
    <Navbar/>
    <div className='flex'>
      <Content ship={ship}/>
      </div>
    <Routes>
      <Route path='/detail' element={<Detail ship={ship}/>}/>
    </Routes>
    </div>
  );
}

export default App;
