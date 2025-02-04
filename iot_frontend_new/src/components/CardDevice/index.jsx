import React from "react";
import actionServices from "../../services/actionServices";
import { useDeviceContext } from "../../context/DeviceContext";

const CardDevice = ({ deviceName, imgOn, imgOff }) => {
  const { deviceState, updateState } = useDeviceContext();
  const isOn = deviceState[deviceName];

  const handleClick = (action) => {
    actionServices.sendAction({
      data: {
        deviceName: deviceName,
        action: action,
      },
    });
    updateState(deviceName, action === "on");
  };

  return (
    <div
      className="h-full w-full p-5"
      style={{
        borderRadius: "12px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div className="h-2/3 w-full text-center">
        <img
          src={isOn ? imgOn : imgOff}
          alt={deviceName}
          className="h-full inline-block"
        />
      </div>
      <div className="flex justify-evenly">
        <button
          style={{
            padding: "5px 20px",
            borderRadius: "5px",
            color: "black",
            backgroundColor: isOn ? "#65f765" : "rgb(200, 200, 200)",
          }}
          onClick={() => handleClick("on")}
        >
          ON
        </button>
        <button
          style={{
            padding: "5px 20px",
            borderRadius: "5px",
            color: "black",
            backgroundColor: !isOn ? "red" : "rgb(200, 200, 200)",
          }}
          onClick={() => handleClick("off")}
        >
          OFF
        </button>
      </div>
    </div>
  );
};

export default CardDevice;
