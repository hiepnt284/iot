import React from 'react';
import '../profile.css'
import avt from '../img/soi co don.jpg'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Profile = () => {
    return (
            <div className="card">
                <img src={avt} alt="" className="card-img" />
                <h1>Nguyen Trong Hiep</h1>
            <h5>Posts and Telecommunications Institute of Technology</h5>
                <p>
                    A web developer is a programmer who specializes in, or is specifically engaged in, the development of World Wide Web applications, or applications that are run over HTTP from a web server to a web browser.
                </p>
                <ul>
                <li><a href="#"><FaFacebook /></a></li>
                <li><a href="#"><FaInstagram /></a></li>
                <li><a href="#"><FaGithub /></a></li>
                </ul>
            </div>
        
    );
}

export default Profile;
