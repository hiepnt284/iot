import React from "react";
import Sidebar from "./Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <div className="h-[663.273px]">
      <Sidebar />
      {children}
    </div>
  );
};

export default DefaultLayout;
