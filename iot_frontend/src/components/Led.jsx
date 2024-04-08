import React, { useState } from 'react';
import light_off from '../img/light_off.png';
import light_on from '../img/light_on.png';
import axios from "axios";

export default function Led(state) {
    const actionURL = "http://localhost:8081/api/action";
    const [isOn, setIsOn] = useState(state==="on"?true:false);

    const handle = (action) => {
        const data = {
          deviceName: "den",
          action: action,
        };

        axios
          .post(actionURL, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
              console.log("success");
              setIsOn(!isOn)
          })
          .catch((error) => {
            console.error("Error:", error);
          });
          
    };


    return (
      <div className="led box">
        <div className="content">
          <img src={isOn ? light_on : light_off} alt="" />
        </div>

        <div className="control">
          <a href="#" onClick={() => handle("on")}>
            <div className={isOn ? "btn btn--on" : "btn"}>ON</div>
          </a>
          <a href="#" onClick={() => handle("off")}>
            <div className={isOn ? "btn" : "btn btn--off"}>OFF</div>
          </a>
        </div>
      </div>
    );
}
