
import {React, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
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
    {/* <Login/> */}
   
    <div className=''>
      <Content ship={ship}/>
      </div>
    </div>
  );
}

export default App;
