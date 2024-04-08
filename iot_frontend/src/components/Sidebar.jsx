import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../sidebar.css';
import { LuHome } from 'react-icons/lu';
import { RiSensorLine } from 'react-icons/ri';
import { FaRegLightbulb } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaXmark } from 'react-icons/fa6';

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
            <div className={isSidebarOpen ? 'hide' : 'btn-menu'} onClick={toggleSidebar}>
                <GiHamburgerMenu />
            </div>
            <div className={isSidebarOpen ? 'side' : 'hide'}>
                <div className='close-btn' onClick={toggleSidebar}>
                    <FaXmark />
                </div>
                <ul className='menu '>
                    <li>
                        <Link to="/" onClick={closeSidebar}>
                            <LuHome className='nav-icon' />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/sensor" onClick={closeSidebar}>
                            <RiSensorLine className='nav-icon' />
                            Sensor Data
                        </Link>
                    </li>
                    <li>
                        <Link to="/led" onClick={closeSidebar}>
                            <FaRegLightbulb className='nav-icon' />
                            Device Data
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" onClick={closeSidebar}>
                            <CgProfile className='nav-icon' />
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
