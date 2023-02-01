import { React, useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Info from "./pages/Info";
import ShipMap from "./pages/ShipMap";
import TotalMap from "./pages/TotalMap";
import Home from "./pages/Home";

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

  /* 4시간 삽질해서 얻은 useEffect 먼저 동기화 입니다 */
  useEffect(() => {
    (async () => {
      const ship = await axios.get("http://localhost:8080/log/1");
      setShip(ship.data);
    })();
  }, []);

  return (
    <div className="w-[100vw] ">
      <Navbar ship={ship} />

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Info" element={<Info ship={ship} />} />
        <Route path="/TotalMap" element={<TotalMap ship={ship} />} />
        <Route path="/shipMap/:shipId" element={<ShipMap ship={ship} />} />
      </Routes>
    </div>
  );
}

export default App;
