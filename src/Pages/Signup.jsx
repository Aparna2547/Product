import React, { useState } from 'react'
import bg from "../assets/bg.png";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { signup } from '../apis/user';


const Signup = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate()
  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      if(name.trim().length <2 ){
        toast.error("Enter a name")
      }else if(email.trim().length==0){
        toast.error("Enter email")
      }else if(password.length<6){
        toast.error("Maximum 6 character")
      }
      const res = await signup(name,email,password)
      console.log('res',res);
      if(res.data){
        toast.success("Signed up successfully please login")
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col md:flex-row h-[500px]">
        <div
          className="flex justify-center items-center border p-7  w-96 relative"
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
        >
          <div className="text-center">
            <p className="text-white font-bold text-3xl">Welcome Back!</p>
            <br />
            <p className="text-white">
              To keep connected with us plase login with your personal info
            </p>
            <br />
            <Link to='/login'>
              <button className="text-white bg-transparent border  rounded-full border-white full px-8 py-2 ">
                SIGN IN
              </button>
            </Link>
          </div>
        </div>

        <div className="border flex justify-center items-center w-96 py-6">
          <div>
            <div className="text-3xl font-bold text-center text-[#EDA415]">
              <p>Create Account</p>
            </div>

            <div className="mt-8">
              <form className="" onSubmit={handleSubmit}>
                <div className="bg-[#F4F8F5] flex items-center text-gray-500 gap-2 px-4 w-72  mt-2">
                  <p className="text-xl"><FiUser /></p>
                  <input type="text" className="outline-none bg-[#F4F8F5] py-3" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div className="bg-[#F4F8F5] flex items-center text-gray-500 gap-2 px-4 w-72  mt-2">
                  <p className="text-xl"><MdOutlineMail /></p>
                  <input type="text" className="outline-none bg-[#F4F8F5] py-3" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="bg-[#F4F8F5] flex items-center text-gray-500 gap-2 px-4 w-72  mt-2">
                  <p className="text-xl"><GoLock /></p>
                  <input type="text" className="outline-none bg-[#F4F8F5] py-3" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
                <div className="flex justify-center items-center mt-2">
                    <button type='submit' className=" text-white bg-yellow-500 mt-3 border text-sm rounded-full border-white full px-16 py-4 ">
                      SIGN UP
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup