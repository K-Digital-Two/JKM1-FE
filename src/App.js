import { React, useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { Route, Routes} from "react-router-dom";
import Content from "./component/Content";
import axios from "axios";
import Info from "./pages/Info";
import ShipMap from "./pages/ShipMap";


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
      const ship = await axios.get("http://localhost:8080/log");
      setShip(ship.data);
    })();
  }, []);



  

  return (
    <div className="w-[100vw]">
      <Navbar ship={ship} />
      <Routes>
        <Route path="/Info" element={<Info ship={ship} />} />
        <Route path="/TotalMap"element={<Content ship={ship}/>}/>
        <Route path="/shipMap/:shipId" element={<ShipMap ship={ship}/>}/>
      </Routes>
    </div>
  );
}

export default App;
