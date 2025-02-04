import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { RiSensorLine } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import styles from "./styles.module.css";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      <div
        className={isSidebarOpen ? styles["hide"] : styles["btn-menu"]}
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu />
      </div>
      <div className={isSidebarOpen ? styles["side"] : styles["hide"]}>
        <div className={styles["close-btn"]} onClick={toggleSidebar}>
          <FaXmark />
        </div>
        <ul className={styles["menu"]}>
          <li>
            <NavLink
              className={({ isActive }) => {
                const activeClass = isActive ? "bg-gray-400" : "";
                return `${activeClass} flex items-center p-[5px] text-[24px] rounded-lg font-[500] mb-1 hover:bg-gray-400`;
              }}
              to="/"
              onClick={closeSidebar}
            >
              <LuHome className={styles["nav-icon"]} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                const activeClass = isActive ? "bg-gray-400" : "";
                return `${activeClass} flex items-center p-[5px] text-[24px] rounded-lg font-[500] mb-1 hover:bg-gray-400`;
              }}
              to="/sensors"
              onClick={closeSidebar}
            >
              <RiSensorLine className={styles["nav-icon"]} />
              Sensor Data
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                const activeClass = isActive ? "bg-gray-400" : "";
                return `${activeClass} flex items-center p-[5px] text-[24px] rounded-lg font-[500] mb-1 hover:bg-gray-400`;
              }}
              to="/actions"
              onClick={closeSidebar}
            >
              <FaRegLightbulb className={styles["nav-icon"]} />
              Action Data
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                const activeClass = isActive ? "bg-gray-400" : "";
                return `${activeClass} flex items-center p-[5px] text-[24px] rounded-lg font-[500] mb-1 hover:bg-gray-400`;
              }}
              to="/profile"
              onClick={closeSidebar}
            >
              <CgProfile className={styles["nav-icon"]} />
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
