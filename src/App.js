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
  // const [ship, setShip] = useState([
  //   {
  //     shipId: "",
  //     shipName: "",
  //     shipLat: "",
  //     shipLon: "",
  //     takeTime: "",
  //     shipUse: "",
  //     speed: "",
  //     departTime: "",
  //     arrivalTime: "",
  //     accuracy: "",
  //     departure: "",
  //     arrivalName: "",
  //   },
  // ]);

  const [timeGroup, setTimeGroup] = useState(1)
  useEffect(() => {
    const interval = setInterval(()=>{
      setTimeGroup(timeGroup + 1)}, 2000)
    return () =>{
      clearInterval(interval)
    } });

    

  // /* 4시간 삽질해서 얻은 useEffect 먼저 동기화 입니다 */
  // useEffect(() => {
  //   (async () => {
  //     const ship = await axios.get(`http://localhost:8080/log/${timeGroup}`);
  //     setShip(ship.data);
  //   })();
  // }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home timeGroup={timeGroup}/>}/>
        <Route path="/Info" element={<Info timeGroup={timeGroup}/>} />
        <Route path="/TotalMap" element={<TotalMap timeGroup={timeGroup}/>} />
        <Route path="/ShipMap/:shipId" element={<ShipMap timeGroup={timeGroup}/>} />
        <Route path="/Login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
