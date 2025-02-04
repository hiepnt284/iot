import React, { createContext, useContext, useState } from "react";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [deviceState, setDeviceState] = useState({
    den: false,
    quat: false,
  });

  const updateState = (deviceName, state) => {
    setDeviceState((prevState) => ({
      ...prevState,
      [deviceName]: state,
    }));
  };

  return (
    <DeviceContext.Provider value={{ deviceState, updateState }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => useContext(DeviceContext);
