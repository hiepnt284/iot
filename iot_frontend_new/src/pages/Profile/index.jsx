import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import avt from './avt.png'
const Profile = () => {
  return (
    <div className="h-full">
      <div className=" pl-[200px] pt-[25px] text-xl font-bold">
        Profile
      </div>
      
      <div className="w-[500px] mt-[50px] mx-auto p-[20px] text-center shadow-lg rounded-lg bg-gray-200">
        <img
          src={avt}
          alt=""
          className="w-[200px] h-[200px] rounded-full my-[15px] mx-auto"
        />
        <h1 className="text-2xl mb-[10px] text-[#333]">Nguyen Trong Hiep</h1>
        <h5 className="text-sm text-[#555] mb-[15px]">
          Posts and Telecommunications Institute of Technology
        </h5>
        <p className="text-sm text-[#777] mb-[20px]">
          A web developer is a programmer who specializes in, or is specifically
          engaged in, the development of World Wide Web applications, or
          applications that are run over HTTP from a web server to a web
          browser.
        </p>
        <ul className="flex justify-center">
          <li className="mx-[10px]">
            <a
              href="#"
              className="text-[40px] text-[#333] hover:text-[#007BFF]"
            >
              <FaFacebook />
            </a>
          </li>
          <li className="mx-[10px]">
            <a
              href="#"
              className="text-[40px] text-[#333] hover:text-[#007BFF]"
            >
              <FaInstagram />
            </a>
          </li>
          <li className="mx-[10px]">
            <a
              href="#"
              className="text-[40px] text-[#333] hover:text-[#007BFF]"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile