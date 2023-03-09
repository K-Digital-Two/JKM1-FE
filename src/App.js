import { React, useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Info from "./pages/Info";
import ShipMap from "./pages/ShipMap";
import TotalMap from "./pages/TotalMap";
import Home from "./pages/Home";
import Login from "./login/Login";
import NotPage from "./pages/NotPage";

function App() {

  const [timeGroup, setTimeGroup] = useState(1)
  useEffect(() => {
    const interval = setInterval(()=>{
      setTimeGroup(timeGroup + 1)
    }, 1000)
    return () =>{
      clearInterval(interval)
    } 
  });

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotPage/>}/>
        <Route path="/" element={<Home timeGroup={timeGroup}/>}/>
        <Route path="/Info" element={<Info timeGroup={timeGroup}/>} />
        <Route path="/TotalMap" element={<TotalMap timeGroup={timeGroup}/>} />
        <Route path="/ShipMap/:paramId" element={<ShipMap timeGroup={timeGroup}/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
