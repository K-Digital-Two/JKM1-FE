
import {React, useEffect, useState} from 'react'
import Navbar from './component/Navbar';
import { Route, Routes ,useParams} from 'react-router-dom';
import Detail2 from './component/Detail2';
import Content from './component/Content';
import axios from 'axios'
import Login from './login/Login';


function App() {

  const {shipId} = useParams()
  
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
    <div className="">
    {/* <Login/> */}
    <Navbar/>
    <div className='flex'>
      <Content ship={ship}/>
      </div>
    <Routes>
      <Route path='/detail/:shipId' element={<Detail2 ship={ship} shipId={shipId}/>}/>
    </Routes>
    </div>
  );
}

export default App;
