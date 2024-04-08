import React, { useState } from 'react';
import fan from '../img/fan.png';
import axios from "axios";

export default function Fan(state) {
    const actionURL = "http://localhost:8081/api/action";
    const [isOn, setIsOn] = useState(state === "on" ? true : false);

    const handle = (action) => {
      const data = {
        deviceName: "quat",
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
            setIsOn(!isOn);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };


    return (
      <div className="led box">
        <div className="content content-fan">
          <img src={fan} alt="" className={isOn ? "rotating" : ""} />
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
