import React, { useState } from "react";
import bg from "../assets/bg.png";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "../apis/user";



const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      if(email.trim().length<3){
        toast.error('Enter email')
      }else if(password.length <6){
        toast.error("Enter valid password")
      }
      const res = await login(email,password)
      console.log('aplog',res);
      if(res.data){
        toast.success(res.data.message)
        localStorage.setItem('token',res.data.token)
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (

      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col md:flex-row h-[500px]">

          <div className="border flex justify-center items-center w-96 py-6">
            <div>
              <div className="text-3xl font-bold text-center text-[#EDA415]">
                <p>Sign In to</p>
                <p>Your Account</p>
              </div>

              <div className="mt-8">
                <form className="" onSubmit={handleSubmit}>
                  <div className="bg-[#F4F8F5] flex items-center text-gray-500 gap-2 px-4 w-72  mt-2">
                    <p className="text-xl"><MdOutlineMail /></p>
                    <input type="email" className="outline-none bg-[#F4F8F5] py-3" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                  </div>
                  <div className="bg-[#F4F8F5] flex items-center text-gray-500 gap-2 px-4 w-72  mt-2">
                    <p className="text-xl"><GoLock /></p>
                    <input type="password" className="outline-none bg-[#F4F8F5] py-3" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"></input>
                  </div>
                  <div className="text-center font-bold mt-4">
                    <p className="underline cursor-pointer">forgot password?</p>
                  </div>
                  <div className="flex justify-center items-center mt-2">
                      <button type="submit" className=" text-white bg-yellow-500 mt-3 border text-sm rounded-full border-white full px-16 py-4 ">
                        SIGN IN
                      </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div
            className="flex justify-center items-center border p-7  w-96 relative"
            style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
          >
            <div className="text-center">
              <p className="text-white font-bold text-3xl">Hello Friend!</p>
              <br />
              <p className="text-white">
                Enter your personal details and start your journey with us
              </p>
              <br />
              <Link to='/signup'>
                <button className="text-white bg-transparent border  rounded-full border-white full px-8 py-2 ">
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
