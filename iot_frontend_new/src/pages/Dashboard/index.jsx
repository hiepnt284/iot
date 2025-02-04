import React, { useEffect, useState } from "react";
import CardSensor from "../../components/CardSensor";
import CardDevice from "../../components/CardDevice";
import Chart from "../../components/Chart/Chart";
import { WiHumidity } from "react-icons/wi";
import { CiLight } from "react-icons/ci";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { FaWind } from "react-icons/fa";
import lightOn from "./images/light_on.png";
import lightOff from "./images/light_off.png";
import fanOn from "./images/fan_on.gif";
import fanOff from "./images/fan_off.png";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import { Toaster, toast } from "sonner";

import { formattedTime } from "../../utils/formatTime";
import Chart2 from "../../components/Chart/Chart2";

const Dashboard = () => {
  // const [stompClient, setStompClient] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);

  const [temperatureList, setTemperatureList] = useState([]);
  const [humidityList, setHumidityList] = useState([]);
  const [LightList, setLightList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [windList, setWindList] = useState([]);

    const [currentTemperature, setCurrentTemperature] = useState(0);
    const [currentHumidity, setCurrentHumidity] = useState(0);
  const [currentLight, setCurrentLight] = useState(0);
  const [currentWind, setCurrentWind] = useState(0);

useEffect(() => {

  const socket = new SockJS("http://localhost:8081/ws");
  const client = Stomp.over(socket);

  client.connect({}, () => {
    // setIsConnected(true);

    client.subscribe("/topic/sensor", (message) => {
      const newData = JSON.parse(message.body);
      updateData(newData);
    });
    // setStompClient(client);
  });

  return () => {
    // if (isConnected) {
      client.disconnect();
      // setIsConnected(false);
    // }
  };
}, []);
  
  const updateData = (newData) => {
    let temperature = newData.temperature;
    let humidity = newData.humidity;
    let light = newData.light;
    let wind = newData.wind;
    let time = formattedTime(newData.time);

    setCurrentTemperature(temperature);
    setCurrentHumidity(humidity);
    setCurrentLight(light);
    setCurrentWind(wind);

    if (temperature > 85) toast.error("Temperature is too high");
    if (humidity > 90) toast.info("Humidity is too high");
    if (light > 800) toast.warning("Light is too high");
    if (wind > 80) toast.warning("Wind is too high");

    setTemperatureList((prevData) => [...prevData, temperature]);
    setHumidityList((prevData) => [...prevData, humidity]);
    setLightList((prevData) => [...prevData, light]);
    setWindList((prevData) => [...prevData, wind]);

    setTimeList((prevData) => [...prevData, time]);
  };


  if (temperatureList.length > 10) {
    setTemperatureList((prevData) => prevData.slice(1));
    setHumidityList((prevData) => prevData.slice(1));
    setLightList((prevData) => prevData.slice(1));
    setWindList((prevData) => prevData.slice(1));

    setTimeList((prevData) => prevData.slice(1));
  }

  const TempColor1 = "yellow";
  const HumidColor1 = "#8080ff";
  const LightColor1 = "#ffffff";
  const WindColor1 = "#bae7bc";


  let TempColor2 = "";
  let HumidColor2 = "";
  let LightColor2 = "";
  let WindColor2 = "";

  const setTemperatureColor = () => {
    let color = "#ff8080";
    if (currentTemperature < 15) {
      color = "#ff8080";
    } else if (currentTemperature >= 15 && currentTemperature < 30) {
      color = "#ff5050";
    } else if (currentTemperature >= 30) {
      color = "red";
    }
    TempColor2 = color;
  };

  const setHumidColor = () => {
    let color = "#80b3ff";
    if (currentHumidity < 15) {
      color = "#80b3ff";
    } else if (currentHumidity >= 15 && currentHumidity < 30) {
      color = "#0066ff";
    } else if (currentHumidity >= 30) {
      color = "#003d99";
    }
    HumidColor2 = color;
  };

  const setLightColor = () => {
    let color = "#999900";
    if (currentLight < 300) {
      color = "#999900";
    } else if (currentLight >= 300 && currentLight < 600) {
      color = "#cccc00";
    } else if (currentLight >= 600) {
      color = "#ffff00";
    }
    LightColor2 = color;
  };

  const setWindColor = () => {
    let color = "#0ae2ce";
    if (currentWind < 15) {
      color = "#81ebe1";
    } else if (currentWind >= 15 && currentWind < 30) {
      color = "#52ddd0";
    } else if (currentWind >= 30) {
      color = "#0ae2ce";
    }
    WindColor2 = color;
  };

  setTemperatureColor();
  setHumidColor();
  setLightColor();
  setWindColor();

  return (
    <>
      <Toaster expand={true} position="top-center" richColors />
      <div className="h-full">
        <div className="absolute left-[200px] top-[25px] text-xl font-bold">
          Dashboard
        </div>
        <div className="grid grid-cols-4 grid-rows-3 gap-5 h-full w-full px-[50px] pt-[70px] pb-[50px]">
          <CardSensor
            heading="temp"
            dataValue={currentTemperature.toFixed(0).toString() + "°C"}
            icon={<LiaTemperatureHighSolid />}
            color1={TempColor1}
            color2={TempColor2}
          />
          <CardSensor
            heading="humidity"
            dataValue={currentHumidity.toString() + "%"}
            icon={<WiHumidity />}
            color1={HumidColor1}
            color2={HumidColor2}
          />
          <CardSensor
            heading="light"
            dataValue={currentLight.toString() + " lux"}
            icon={<CiLight />}
            color1={LightColor1}
            color2={LightColor2}
          />
          <CardSensor
            heading="wind"
            dataValue={currentWind.toString() + " m/s"}
            icon={<FaWind />}
            color1={WindColor1}
            color2={WindColor2}
          />

          <div className="col-span-3 row-span-2 flex gap-3">
            <Chart
              labels={timeList}
              temperatureData={temperatureList}
              humidityData={humidityList}
              lightData={LightList}
            />
            <Chart2
              labels={timeList}
              windData={windList}
            />
          </div>
          <CardDevice deviceName="den" imgOn={lightOn} imgOff={lightOff} />
          <CardDevice deviceName="quat" imgOn={fanOn} imgOff={fanOff} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
