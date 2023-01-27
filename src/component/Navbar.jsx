import React from "react";
import simg from "../img/ship.png";
import Logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";
import Input from "./Input";





const Navbar = ({ ship }) => {
  const ships = ship.map(({ shipName }) => {
    return shipName;
  });

  
  console.log(ship)

  const navigate = useNavigate();
  return (
    <div className="p-3 w-[100%] h-20 absoulte z-10">
      <form className="flex">
        {/* 로고 버튼 누르면 홈으로 */}
        <img
          src={simg}
          alt="로고"
          className="w-[50px] h-[50px] ml-2"
          onClick={() => {
            navigate("/");
          }}
        />
        <img
          src={Logo}
          alt="제목"
          className="hidden mt-2 xl:flex sm:flex w-[150px] h-[35px] ml-3"
          onClick={() => {
            navigate("/Login");
          }}
        />
        <label className="font-medium items-center ml-auto mr-auto mt-3 ">
          {/* <input type='text' input type
            placeholder="Search" 
            className='rounded-full z-10 lg:w-[30rem] lg:h-[2rem] sm:w-[15rem] pl-5 bg-gray-200 font-bold'/>
            <button onClick={()=>{navigate('/Listbar')}} className='z-20 -m-10'>
            <BiSearch className='text-[20px]'/>
            </button> */}
          <Input ship={ship}/>
        </label>
      </form>
    </div>
  );
};

export default Navbar;
