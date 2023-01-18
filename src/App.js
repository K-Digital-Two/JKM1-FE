import './App.css';
import {React, useEffect, useState} from 'react'
import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import Detail from './component/Detail';
import Content from './component/Content';
import axios from 'axios'


function App() {

  
  const [ship , setShip]  = useState([{
    shipCode :"",
    shipId : "",
    shipName : "",
    shipUse :""
  }])
  const [info, setInfo] = useState([{
    schedule_ship_shipId :"",
    insertTime : "",
    shipLat : "",
    shipLon : "",
    speed : "",
    arrivalTime : "",
    takeTime : "",
    accuracy : ""
  }])

  useEffect(()=>{
    Promise.all([
      axios.get('http://localhost:8080/ship/44012345').then(result=>{
      ship[0] = result.data
      setShip(ship)
      console.log(ship)
    })
    .catch((error)=>{
      console.log(error)
    })],
    axios.get('http://localhost:8080/info/44012345').then(result=>{
      setInfo(result.data) 
      console.log(info)
    })
    .catch((error)=>{
      console.log(error)
    }))
  },[])



  
  return (
    <>
    <Navbar/>
    <div className='flex'>
      <Content ship={ship} info={info}/>
      
      </div>
    <Routes>
      <Route path='/detail' element={<Detail/>}/>
    </Routes>
    

    </>
  );
}

export default App;
