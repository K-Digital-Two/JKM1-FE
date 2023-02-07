import { React, useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Info from "./pages/Info";
import ShipMap from "./pages/ShipMap";
import TotalMap from "./pages/TotalMap";
import Home from "./pages/Home";
import Login from "./login/Login";

function App() {
  const [ship, setShip] = useState([
    {
      shipId: "",
      shipName: "",
      shipLat: "",
      shipLon: "",
      takeTime: "",
      shipUse: "",
      speed: "",
      departTime: "",
      arrivalTime: "",
      accuracy: "",
      departure: "",
      arrivalName: "",
    },
  ]);



  const [timeGroup, setTimeGroup] = useState(2)
  /* 4시간 삽질해서 얻은 useEffect 먼저 동기화 입니다 */
  useEffect(() => {
    const interval = setInterval(()=>{
    (async () => {
      const ship = await axios.get(`http://localhost:8080/log/${timeGroup}`);
      setShip(ship.data);
      setTimeGroup(timeGroup + 1)
    })()
    return (
      clearInterval(interval)
    )
  }, 3000) 
  }, [ship]);





  

  return (
    <div className="w-[100vw] ">
      {/* <Login/> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Info" element={<Info ship={ship}/>} />
        <Route path="/TotalMap" element={<TotalMap ship={ship}/>}/>
        <Route path="/shipMap/:shipId" element={<ShipMap ship={ship} timeGroup={timeGroup}/>}/>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
