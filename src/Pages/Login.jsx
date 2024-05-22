import React from "react";
import bg from "../assets/bg.png";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    
    <div>
    <div className="flex justify-center items-center   h-screen">
 <div className="flex w-9/12 h-[80vh]">

   <div className=" border border-3 w-96 flex justify-center items-center">
     <div>
       <h1 className=" text-yellow-500 text-3xl font-bold">
       <p className='text-center'>Sign In to  </p>Your Account            
       </h1>

       <div className="mt-8">

       <form className="">
           
           <div className="bg-gray-200 flex text-sm text-gray-500 gap-2 px-3 py-2 mt-2">
               <p className="mt-1"><MdOutlineMail/></p>
               <input type="text" className="outline-none bg-gray-200" placeholder="Email"></input>
           </div>
           <div className="bg-gray-200 flex text-sm text-gray-500 gap-2 px-3 py-2 mt-2">
               <p className="mt-1"><GoLock/></p>
               <input type="text" className="outline-none bg-gray-200" placeholder="Password"></input>
           </div>
           <div className="flex justify-center items-center mt-2">
               <Link to='/login'>
           <button className=" text-white bg-yellow-500 mt-3 border  rounded-full border-white full px-10 py-2 ">
         SIGN IN 
       </button>
       </Link>
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
       <p className="text-white font-bold text-2xl">Hello Friend!</p>
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
</div>
  );
};

export default Login;
