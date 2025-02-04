import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DeviceProvider } from "./context/DeviceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

    <DeviceProvider>
      <App />
    </DeviceProvider>
);
