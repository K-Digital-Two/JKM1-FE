import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [savedUserId, setSavedUserId] = useState("")
  const [savedPassword, setSavedPassword] = useState("")

  
  const navigate = useNavigate()



  useEffect(()=>{
      axios.get(`http://localhost:8080/signin/${userId}`,{
        Id : userId,
        pass : password
      })
      .then((result)=>{
          console.log(result)
          if(result.data.Id === undefined){
            console.log("아이디 일치하지 않음")
          } 
          else if(result.data.pass === null){
            console.log("비밀번호가 일치하지 않음")
          }
          else if(result.data.Id === userId){
            console.log()
            sessionStorage.setItem("id",userId)
            sessionStorage.setItem("password",password);
          }

      })
  },[]) 
  let sessionStorage = window.sessionStorage
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-900 text-white mx-auto">
      <section className="flex flex-col space-y-9 w-[20rem]">
        <div className="text-center text-4xl font-medium">로그인</div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input 
          type="text" 
          placeholder="아이디 입력해주세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" 
          onChange={(e)=>{setUserId(e.target.value)}}/>
        </div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input 
          type="password" 
          placeholder="비밀번호 입력해주세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" 
          onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        <button onClick={()=>{navigate('*')
      
        }}>
          로그인
        </button>
    
      </section>
    </main>
  );
};

export default Login;