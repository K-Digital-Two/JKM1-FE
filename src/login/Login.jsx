import React from "react";

const Login = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-900 text-white mx-auto">
      <section className="flex flex-col space-y-9 w-[20rem]">
        <div className="text-center text-4xl font-medium">로그인</div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input 
          type="text" 
          placeholder="아이디 입력해주세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
        </div>
        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
          <input 
          type="password" 
          placeholder="비밀번호 입력해주세요"
          className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
        </div>
        <button>
          로그인
        </button>
        <a href="##"
        className="transform text-center font-semibold text-gray-600 duration-300 hover:text-gray-300">
          비밀번호 찾기
        </a>
      </section>
    </main>
  );
};

export default Login;