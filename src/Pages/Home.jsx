import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { FaAngleRight } from "react-icons/fa6";
import lap from "../assets/Frame 29.png"
import { IoHeartOutline } from "react-icons/io5";


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-between p-5">
        <h1 className="flex font-bold text-xl mt-2">
          Home <FaAngleRight className="mt-1.5" />
        </h1>
        <div className="flex gap-4">
          <button className="bg-[#EDA415] text-white px-4 py-3 rounded-lg">
            Add category
          </button>
          <button className="bg-[#EDA415] text-white px-4 py-3 rounded-lg">
            Add sub category
          </button>
          <button className="bg-[#EDA415] text-white px-4 py-3 rounded-lg">
            Add product
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4 bg-blue-400 p-10">
          <div className="flex gap-3">
          <div className="border border-gray-300 rounded-lg w-1/3 p-2 ">
                <div className="bg-[#B3D4E5] rounded-full mt-2 w-1/12 p-2 flex  justify-end"> <IoHeartOutline className="text-xl text-black"/></div>
            <img src={lap} alt="" className="" />

            <h1 className="text-[#003F62] mt-2">HP AMD RYZEN 3</h1>
            <h1 className="text-[#4A4A4A]">HP AMD RYZEN 3</h1>
          </div>

          <div className="border border-gray-300 rounded-lg w-1/3 p-2 ">
                <div className="bg-[#B3D4E5] rounded-full mt-2 w-1/12 p-2 flex  justify-end"> <IoHeartOutline className="text-xl text-black"/></div>
            <img src={lap} alt="" className="" />

            <h1 className="text-[#003F62] mt-2">HP AMD RYZEN 3</h1>
            <h1 className="text-[#4A4A4A]">HP AMD RYZEN 3</h1>
          </div>

          <div className="border border-gray-300 rounded-lg w-1/3 p-2 ">
                <div className="bg-[#B3D4E5] rounded-full mt-2 w-1/12 p-2 flex  justify-end"> <IoHeartOutline className="text-xl text-black"/></div>
            <img src={lap} alt="" className="" />

            <h1 className="text-[#003F62] mt-2">HP AMD RYZEN 3</h1>
            <h1 className="text-[#4A4A4A]">HP AMD RYZEN 3</h1>
          </div>


          

          
          </div>    
        </div>
      </div>
    </div>
  );
};

export default Home;
